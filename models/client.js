const mongoose = require('../mongoose');

const User = require('./user');

const ClientUserSchema = User.discriminator('ClientUser',
    mongoose.Schema({

    }),
    {discriminatorKey: 'kind'}
    );

module.exports = mongoose.model('ClientUser', ClientUserSchema);
