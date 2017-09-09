/**
 * Created by Ravy on 17.03.2017.
 */
'use strict';

var mysql = require('mysql');

var dbClient, 
    dbConfig = {
    host: 'smartf.beget.tech',
    user: 'smartf_rpg',
    password: '%c4nHn*f',
    database: 'smartf_rpg'
};

handleDisconnect();

/**
 * Создание подключение к серверу. Переподключение при потере соединения
 */
function handleDisconnect() {
    dbClient = mysql.createConnection(dbConfig);
    dbClient.connect(function(err) {
        if(err) {
            console.log('DB-CONNECT: error connection:', err);
            setTimeout(handleDisconnect, 2000);
        } else {
            console.log('DB-CONNECT: connect successfully');
        }
    });

    dbClient.on('error', function(err) {
        if (!err.fatal) {
            console.log('DB-CONNECT: connection lose', err);
        } else if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}


/**
 * Оформление запроса к БД
 * @param query - тело запроса - {@type:SELECT / PUT / UPDATE / DELETE, @field: field name, @from: table name, @if: condition }
 */
function db(query) {
    dbClient.query(query, function(error, result, fields){
        console.log('DB-CONNECT: response: ', result[0]);
    });
}

db('SELECT * FROM users');