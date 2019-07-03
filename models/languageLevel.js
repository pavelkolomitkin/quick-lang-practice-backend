const mongoose = require('../mongoose');

const LanguageLevelSchema = new mongoose.Schema({
    level: {
        type: Number
    },
    code: {
        type: String
    },
    title: {
        type: String
    }
});

module.exports = mongoose.model('LanguageLevel', LanguageLevelSchema);
