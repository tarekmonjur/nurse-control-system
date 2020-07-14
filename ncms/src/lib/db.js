
const mongoose = require('mongoose');

(function(){
    async function dbConnect() {
        await mongoose.connect(
            `${process.env.DB_URL}`,
            { useNewUrlParser: true, useUnifiedTopology: true, poolSize: 10 });

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            console.log('database successfully connected..');
        });
    }
    try {
        dbConnect();
    } catch (err) {
        dbConnect();
        console.log(err.message);
    }
})();
