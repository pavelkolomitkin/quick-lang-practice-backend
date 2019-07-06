const mongoose = require('../mongoose');
const serialization = require('../serialization/entityTransformer');

const LanguageLevelSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
    level: {
        type: Number
    },
    code: {
        type: String
    },
    title: {
        type: String
    }
},
    {
        toJSON: {
            transform: serialization.defaultTransformer,
            virtuals: true
        }
    });

module.exports = mongoose.model('LanguageLevel', LanguageLevelSchema);
