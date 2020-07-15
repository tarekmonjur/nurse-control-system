const DBConnection = require('./../lib/DBConnection');

class User{
    collection = 'users';

    constructor() {
        this.db = new DBConnection(this.collection);
        return this;
    }

    async find(conditions) {
        const result = await this.db.connect((db) => {
            const result = db.find(conditions);
            return result.toArray();
        });
        return result;
    }
}

module.exports = User;