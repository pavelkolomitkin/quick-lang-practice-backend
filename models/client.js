const mongoose = require('../mongoose');

const User = require('./user');

const ClientUser = User.discriminator('ClientUser',
    mongoose.Schema({

    }),
    {discriminatorKey: 'kind'}
    );

module.exports = ClientUser;
