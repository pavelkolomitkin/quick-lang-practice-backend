const mongoose = require('../mongoose');

const RegisterKeySchema = new mongoose.Schema({
    key: {
        type: String,
        unique: true
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClientUser',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('RegisterKey', RegisterKeySchema);
