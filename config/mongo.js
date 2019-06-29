module.exports = {
    connectionString: 'mongodb://'
        + process.env.MONGO_INITDB_ROOT_USERNAME + ':' + process.env.MONGO_INITDB_ROOT_PASSWORD + '@mongodb-service:' + process.env.MONGO_DATABASE_PORT,
    databaseName: process.env.MONGO_INITDB_DATABASE
};
