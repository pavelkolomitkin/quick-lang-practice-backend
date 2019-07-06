const mongoose = require('../mongoose');
const serialization = require('../serialization/entityTransformer');

const LanguageSchema = new mongoose.Schema(
    {
        _id: {
            type: Number
        },
        name: {
            type: String
        },
        code: {
            type: String
        }
    },
    {
        toJSON: {
            transform: serialization.defaultTransformer,
            virtuals: true
        }
    });

module.exports = mongoose.model('Language', LanguageSchema);
