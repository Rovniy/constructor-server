/**
 * Created by Ravy on 17.03.2017.
 */
const WebSocketServer = new require('ws');

let clients = {}, // подключенные клиенты
    config = require("./config.json");

/**
 * Создание WebSocket сервера
 * @type {*|Server}
 */
let webSocketServer = new WebSocketServer.Server({
    location: config.socketLocation,
    port: config.socketPort
});
console.log('WS-SERVER: WebSockets ready to broadcast. Address: ws://'+config.socketLocation+':'+config.socketPort);

webSocketServer.on('connection', function(ws) {

    let userId = guid();
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
    let sendUserCound = 0;
    if (userId){
        sendUserCound = 1;
        console.log('WS-SERVER (out): ' + message);
        clients[userId].send('Это твое сообщение');
    } else {
        for(let key in clients) {
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
