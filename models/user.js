const mongoose = require('../mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    fullName: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: false
    }
}, 
    { 
        timestamps: true,
    }
);

UserSchema.methods.getRoles = () => {
    return ['ROLE_USER'];
};

module.exports = mongoose.model('User', UserSchema);
