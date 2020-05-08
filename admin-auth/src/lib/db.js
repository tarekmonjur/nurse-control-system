const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = process.env.DB_URL;
// Database Name
const dbName = process.env.DB_NAME;
// Create a new MongoClient
const client = new MongoClient(url,  { useUnifiedTopology: true });

const dbConnect = async () => {
    return new Promise((resolve, reject) => {
        client.connect(function(err) {
            if (err) reject(err);
            assert.equal(null, err);
            const db = client.db(dbName);
            console.log("Connected successfully to server");
            resolve(db, client);
            console.log('close');
        });
    });
};


const operation = async (collectionName, callback) => {
    return new Promise((resolve, reject) => {
        client.connect(async function(err) {
            if (err) reject(err);
            assert.equal(null, err);
            console.log("Connected successfully to server");
            const db = client.db(dbName);
            console.log('callback...');
            const result = await callback(db.collection(collectionName), client);
            client.close();
            resolve(result);
        });
    });
};

exports.operation = operation;
exports.connect = dbConnect;