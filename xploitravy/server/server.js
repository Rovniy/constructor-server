'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
const WebSocketServer = new require('ws');

/** SOCKET **/
var clients = {};
var socketConfig = {
    port: 8081
  };

var app = module.exports = loopback();

app.start = function() {
  // start the web server


  /**
   * Отслеживание новых сообщений
   */
  function wsOnMessage(ws,userId) {
    ws.on('message', function(message) {

      console.log('WEBSOCKET (in): ' + message.message_type, message);

      wsSend(message,userId); //Отправка сообщение всем или адруссату
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
      if (message.message_type === 'PING') {
        clients[userId].send({
          message_type: 'PING'
        });
      } else {
        clients[userId].send(message);
      }

    } else {
      for(var key in clients) {
        sendUserCound++;
        if (message.message_type === 'PING') {
          clients[key].send({
            message_type: 'PING'
          });
        } else {
          clients[key].send(message);
        }
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




  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at: %s%s', baseUrl, explorerPath);
    }
    var webSocketServer = new WebSocketServer.Server(socketConfig);
    console.log("Websocket server listening at: ws://localhost:8081");

    webSocketServer.on('connection', function(ws) {
      var userId = guid();
      clients[userId] = ws;
      console.log("WEBSOCKET: new user. UserID: " + userId);
      wsOnMessage(ws,userId); //Отслеживание новых сообщений
      wsClose(ws, userId); //Отработка прерывания WS соединения
    });
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
