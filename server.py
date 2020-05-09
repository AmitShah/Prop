import os
import tornado.ioloop
from tornado.options import define, options, parse_command_line
import tornado.web
import nba_api
import socketio
from tornado.httpclient import AsyncHTTPClient

sio = socketio.AsyncServer(async_mode='tornado')

http_client = AsyncHTTPClient()
status_counter = {}

URL="https://data.nba.com/data/10s/v2015/json/mobile_teams/nba/2019/scores/pbp/0021900291_full_pbp.json"

#holds the latest play by play state
GAME_STATE ={}

PROPS=[]

async def refresh_data():
    while True:
        
        await sio.sleep(5)
        try:
            response = await http_client.fetch(URL)
            if(response.code in status_counter):
                status_counter[response.code] = status_counter[response.code] + 1
            else:
                status_counter[response.code] = 1
            print(response.code)
        except Exception as e:
            print("Error: %s" % e)
        else:
            print(response.body)
            print (status_counter)

class MainHandler(tornado.web.RequestHandler):

    def get(self):
        self.render("prop/public/index.html")


@sio.event
async def my_event(sid, message):
    await sio.emit('my_response', {'data': message['data']}, room=sid)


@sio.event
async def my_broadcast_event(sid, message):
    await sio.emit('my_response', {'data': message['data']})


@sio.event
async def join(sid, message):
    sio.enter_room(sid, message['room'])
    await sio.emit('my_response', {'data': 'Entered room: ' + message['room']},
                   room=sid)


@sio.event
async def leave(sid, message):
    sio.leave_room(sid, message['room'])
    await sio.emit('my_response', {'data': 'Left room: ' + message['room']},
                   room=sid)


@sio.event
async def close_room(sid, message):
    await sio.emit('my_response',
                   {'data': 'Room ' + message['room'] + ' is closing.'},
                   room=message['room'])
    await sio.close_room(message['room'])


@sio.event
async def my_room_event(sid, message):
    await sio.emit('my_response', {'data': message['data']},
                   room=message['room'])


@sio.event
async def disconnect_request(sid):
    await sio.disconnect(sid)


@sio.event
async def connect(sid, environ):
    print("client Connected")
    await sio.emit('my_response', {'data': 'Connected', 'count': 0}, room=sid)


@sio.event
def disconnect(sid):
    print('Client disconnected')


def main():
    parse_command_line()
    app = tornado.web.Application(
        [
            (r"/", MainHandler),
            (r"/socket.io/", socketio.get_tornado_handler(sio)),
            (r"/assets/(.*)", tornado.web.StaticFileHandler,
             {"path": "frontend/prop/public/assets"},),
        ],
        template_path=os.path.join(os.path.dirname(__file__), "frontend"),
        static_path=os.path.join(os.path.dirname(__file__), "static"),

    )
    tornado.ioloop.IOLoop.instance().spawn_callback(refresh_data)
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()


if __name__ == "__main__":
    main()
