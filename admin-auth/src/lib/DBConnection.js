const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

class DBConnection {
    constructor(collection = null) {
        this.url = process.env.DB_URL;
        this.dbName = process.env.DB_NAME;
        this.collection = collection;
        this.client = new MongoClient(this.url,  { useUnifiedTopology: true });
        return this;
    }

    async connect(operations) {
        return new Promise((resolve, reject) => {
            this.client.connect(async (err) => {
                if (err) reject(err);
                assert.equal(null, err);
                console.log("Connected successfully to server");
                const db = this.client.db(this.dbName);
                console.log('callback...');
                const result = await operations(db.collection(this.collection));
                console.log('close....');
                this.client.close();
                resolve(result);
            });
        });
    }
}

module.exports = DBConnection;