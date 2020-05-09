import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import socketIOClient from "socket.io-client";


const endpoint= "localhost:8888"
const socket = socketIOClient(endpoint);
socket.on("connection", data => console.log(data));
socket.on("my_response", data=> alert(JSON.stringify(data)));

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
