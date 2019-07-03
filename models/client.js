const mongoose = require('../mongoose');
const serialization = require('../serialization/entityTransformer');

const User = require('./user');

const ClientUserSchema = new mongoose.Schema(
    {
        aboutYourSelf: {
            type: String,
            required: false
        },

        skills: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'LanguageSkill',
            autopopulate: true
        }],

        readyToPracticeSkill: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'LanguageSkill',
            required: false,
            autopopulate: true
        }
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

ClientUserSchema.plugin(require('mongoose-autopopulate'));

const ClientUser = User.discriminator('ClientUser',
        ClientUserSchema,
        {
            discriminatorKey: 'kind'
        }
    );

module.exports = ClientUser;
