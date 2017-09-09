/**
 * Created by Ravy on 17.03.2017.
 */
'use strict';
const WebSocketServer = new require('ws');

var clients = {}, // подключенные клиенты
    socketConfig = {
        location: 'localhost',
        port: 8081
    };

/**
 * Создание WebSocket сервера
 * @type {*|Server}
 */
var webSocketServer = new WebSocketServer.Server(socketConfig);
console.log('WS-SERVER: server ready to broadcast. Address: ws://'+socketConfig.location+':'+socketConfig.port);

webSocketServer.on('connection', function(ws) {

    var userId = guid();
    clients[userId] = ws;
    console.log("WS-SERVER: new user. UserID: " + userId);

    wsOnMessage(ws,userId); //Отслеживание новых сообщений

    wsClose(ws, userId); //Отработка прерывания WS соединения

});

/**
 * Отслеживание новых сообщений
 */
function wsOnMessage(ws,userId) {
    ws.on('message', function(message) {

        console.log('WS-SERVER (in): ' + message);

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
        console.log('WS-SERVER (out): ' + message);
        clients[userId].send('Это твое сообщение');
    } else {
        for(var key in clients) {
            sendUserCound++;
            clients[key].send(message);
        }
    }
    console.log('WS-SERVER (out): user: ', sendUserCound, 'msg', message);
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
    function part() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return part() + '-' + part() + '-' + part() + '-' + part() + '-' + part();
}
