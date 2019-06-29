const mongoose = require('../mongoose');
const serialization = require('../serialization/entityTransformer');

const User = require('./user');

const ClientUser = User.discriminator('ClientUser',
    mongoose.Schema({

        },
        {
        toJSON: {
            transform: serialization.clientUser
        }
        }),
        {
            discriminatorKey: 'kind'
        }
    );

module.exports = ClientUser;
