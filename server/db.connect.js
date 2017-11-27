/**
 * Created by Ravy on 17.03.2017.
 */
let config = require("./config.json"),
    db = undefined,
    mongoClient = require("mongodb").MongoClient,
    format = require('util').format;

mongoClient.connect(config.url + '/' + config.dbName, function(err, db){
    if (db) {
        console.info('DB-SERVER: Mongodb activated. Address: ' + config.url + '. Database: ' + config.dbName);

        db.close();
    } else {
        console.log('DB-SERVER: CONNECTION FAILURE!');
    }
});

/**
 * Получение любого элемента
 * @param collection - name of collection from need extract
 * @param obj - Object with needed key : value that find
 */
function getSingleItem(collection, obj) {
    db.collection(collection, function(err, collection) {
        collection.find(obj, function(err, cursor) {
            // Преобразовываем в массив
            return cursor;
        });
    });
}

/**
 * Insert single object into collection
 * @param collection - Collection name
 * @param obj - { key : value } - Object that need to insert
 */
function setSingleItem(collection, obj) {
    db.collection(collection).insertOne(obj, function(err, result) {
        console.log("Inserted into:",collection,', data:',result.ops);
    });
}

function getAllItemsToArray(collection) {
    return function() {
        db.collection(collection).find({}).toArray(function(err, result){
            return result;
        });
    }
}