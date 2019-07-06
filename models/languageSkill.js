const mongoose = require('../mongoose');
const serialization = require('../serialization/entityTransformer');

const LanguageSkillSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClientUser',
        required: true
    },

    language: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Language',
        required: true,
        autopopulate: true
    },

    level: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LanguageLevel',
        required: true,
        autopopulate: true
    }

},
    {
        toJSON: {
            transform: serialization.languageSkill
        }
    });

LanguageSkillSchema.plugin(require('mongoose-autopopulate'));


module.exports = mongoose.model('LanguageSkill', LanguageSkillSchema);
