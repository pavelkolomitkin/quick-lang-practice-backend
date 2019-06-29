const mongoose = require('mongoose');
const config = require('./config/mongo');

mongoose.connect(config.connectionString, {
    useNewUrlParser: true,
    dbName: config.databaseName,
    autoIndex: false
});

mongoose.set('debug', process.env.APP_ENV === 'dev');

module.exports = mongoose;
