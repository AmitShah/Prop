# import tornado.websocket
# import tornado.ioloop


# ioloop = tornado.ioloop.IOLoop.current()
import tornado
from tornado.ioloop import IOLoop, PeriodicCallback
from tornado import gen
from tornado.websocket import websocket_connect

url="wss://localhost:51888"

def clbk(message):
    print('received', message)

username= "riot"
credentials="arjic_UsbPmmM6OcoNygDg"

# if __name__ == '__main__':
#     request= tornado.httpclient.HTTPRequest(url=url, validate_cert=False,auth_username=username, auth_password=credentials)
#     conn = tornado.websocket.websocket_connect(url=request,on_message_callback=clbk)
#     ioloop.start()




class Client(object):
    def __init__(self, url, timeout):
        self.url = tornado.httpclient.HTTPRequest(url=url, validate_cert=False,auth_username=username, auth_password=credentials)
        self._id = 'python-client'
        self.timeout = timeout
        self.ioloop = IOLoop.instance()
        self.ws = None
        self.connect()
        #PeriodicCallback(self.keep_alive, 20000, io_loop=self.ioloop).start()
        self.ioloop.start()

    @gen.coroutine
    def connect(self):
        print("trying to connect")
        try:
            self.ws = yield websocket_connect(self.url)
        except Exception:
            print("connection error")
        else:
            print("connected")
            yield self.ws.write_message("[5,\"OnJsonApiEvent\"]")
            print("wrote to socket")
            self.run()

    @gen.coroutine
    def run(self):
        while True:
            msg = yield self.ws.read_message()
            if msg is None:
                print("connection closed")
                self.ws = None
                break
            print(msg)

    def keep_alive(self):
        if self.ws is None:
            self.connect()
        else:
            self.ws.write_message("keep alive %s" % self._id)

if __name__ == "__main__":
    Client(url, 5)



# async def main():
#     request= tornado.httpclient.HTTPRequest(url=url, validate_cert=False,auth_username=username, auth_password=credentials)
#     conn = await tornado.websocket.websocket_connect(url=request)
#     await conn.write_message("[5,\"OnJsonApiEvent\"]")
#     while True:
#         print("connected")
#         message = yield test_ws.read_message()
#         print(message)
#         if message is None:
#             break


# ioloop.run_sync(main)