const mongoose = require('mongoose');

let connectionString = 'mongodb://'
    + process.env.MONGO_INITDB_ROOT_USERNAME + ':' + process.env.MONGO_INITDB_ROOT_PASSWORD + '@mongodb-service:' + process.env.MONGO_DATABASE_PORT;

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    dbName: process.env.MONGO_INITDB_DATABASE
});

mongoose.set('debug', process.env.APP_ENV === 'dev');

module.exports = mongoose;
