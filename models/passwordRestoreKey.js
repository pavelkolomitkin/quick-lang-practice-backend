const mongoose = require('../mongoose');

const PasswordRestoreKeySchema = new mongoose.Schema({

    key: {
        type: String,
        unique: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, { timestamps: true });


module.exports = mongoose.model('PasswordRestoreKey', PasswordRestoreKeySchema);
