const mongoose = require('../mongoose');

const LanguageSchema = new mongoose.Schema({
    name: {
        type: String
    },
    code: {
        type: String
    }
});

module.exports = mongoose.model('Language', LanguageSchema);
