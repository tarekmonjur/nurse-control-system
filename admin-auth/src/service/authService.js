const DB = require('./../lib/db');
const _ = require('lodash');
const bcrypt = require('bcrypt');

class AuthService {

    static collection = 'users';
    static DB = DB;

    static async createUser(data) {
        const result = await DB.connect().then(db => {
            data.password = bcrypt.hashSync(data.password, 10);
            return db.collection(this.collection).insertOne(data);
        });
        return result;
    }

    static async getUser(conditions) {
        const user = await this.DB.operation(this.collection, (db) => {
            return db.find(conditions).toArray();
        });
        return user;
    }

    static async checkAuth(payload) {
        const result = await this.DB.operation(this.collection, async (db) => {
            return db.find({email: payload.email}).toArray();
        });
        if (!_.isEmpty(result) && bcrypt.compareSync(payload.password, result[0].password)) {
            return result[0];
        }
        return null;
    }
}

module.exports = AuthService;