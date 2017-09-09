/**
 * WebSocket server for static http server
 * Connection: var socket = new WebSocket("ws:// address : port")
 * Get messages: socket.onmessage = function(data) {}
 * Post message: socket.send('sample data')
 * Check WebSockets rules: (window.WebSocket)
 */

'use strict';
const WebSocketServer = new require('ws');

var clients = {}, // подключенные клиенты
    socketConfig = {
        port: 8081
    };

/**
 * Создание WebSocket сервера
 * @type {*|Server}
 */
var webSocketServer = new WebSocketServer.Server(socketConfig);
console.log("WEBSOCKET: server activated");

webSocketServer.on('connection', function(ws) {

    var userId = guid();
    clients[userId] = ws;
    console.log("WEBSOCKET: new user. UserID: " + userId);

    wsOnMessage(ws,userId); //Отслеживание новых сообщений

    wsClose(ws, userId); //Отработка прерывания WS соединения

});

/**
 * Отслеживание новых сообщений
 */
function wsOnMessage(ws,userId) {
    ws.on('message', function(message) {

        console.log('WEBSOCKET (in): ' + message);

        wsSend(message); //Отправка сообщение всем или адруссату
    });
}

/**
 * Отправка сообщение всем или адруссату
 * @param message - тело сообщение
 * @param userId - ID поьзователя
 */
function wsSend(message, userId){
    var sendUserCound = 0;
    if (userId){
        sendUserCound = 1;
        console.log('WEBSOCKET (out): ' + message);
        clients[userId].send('Это твое сообщение');
    } else {
        for(var key in clients) {
            sendUserCound++;
            clients[key].send(message);
        }
    }
    console.log('WEBSOCKET (out): user: ', sendUserCound, 'msg', message);
}

/**
 * Отработка прерывания WS соединения
 */
function wsClose(ws, id) {
    ws.on('close', function(resolve) {
        console.log('WEBSOCKET: user connection lose - ' + id, resolve);
        delete clients[id];
    });
}

/**
 * Создание userId
 * @returns {string} - user Id
 */
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4();
}
