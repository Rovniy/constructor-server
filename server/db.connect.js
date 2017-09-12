/**
 * Created by Ravy on 17.03.2017.
 */
'use strict';

var config = {
    url: 'mongodb://localhost:27017',
    dbName: 'uspy'
},
mongoClient = require("mongodb").MongoClient;

mongoClient.connect(config.url + '/' + config.dbName, function(err, db){
    if (db) console.log('DB-SERVER: Mongodb activated. Address: ' + config.url + '. Database: ' + config.dbName);
    //getItem(db); //Получение списка элементов и поиск по элементам
    
    db.close();
});

/**
 * Получение списка элементов и поиск по элементам
 * @param db
 */
function getItem(db) {
    db.collection('Users', function(err, collection) {
        collection.find({'name':'Ravy'}, function(err, cursor) {
            // Преобразовываем в массив
            cursor.toArray(function(err, items) {
                console.log(items)
            });
        });
    });
}