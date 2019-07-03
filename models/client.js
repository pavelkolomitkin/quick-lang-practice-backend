const mongoose = require('../mongoose');
const serialization = require('../serialization/entityTransformer');

const User = require('./user');

const ClientUserSchema = new mongoose.Schema(
    {

    },
    {
        toJSON: {

            transform: serialization.clientUser,
            virtuals: true

        }
    }
);

ClientUserSchema.virtual('roles').get(() => {

    return ['ROLE_CLIENT_USER'];

});

const ClientUser = User.discriminator('ClientUser',
        ClientUserSchema,
        {
            discriminatorKey: 'kind'
        }
    );

module.exports = ClientUser;
