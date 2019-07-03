const RegisterKey = require('../models/registerKey');
const User = require('../models/user');
const PasswordRestoreKey = require('../models/passwordRestoreKey');
const encrypt = require('../helpers/encrypt');


module.exports.passwordRepeat = async (value, { req }) => {

    if (value.trim() !== req.body.password.trim())
    {
        throw new Error('Passwords should be equal!');
    }
};

module.exports.registerKey = async (value, { req }) => {

    const keyEntity = await RegisterKey.findOne({key: value});
    if (!keyEntity)
    {
        throw new Error('The key is invalid!');
    }

};

module.exports.uniqueEmail = async (value, { req }) => {

    const user = await User.findOne({ email: value });
    if (user)
    {
        throw new Error('This email already exists!');
    }
};

module.exports.credentials = async (email, { req }) => {

    const { password } = req.body;

    const user = await User.findOne({
        email: email,
        isActive: true
    });
    if (!user)
    {
        throw new Error('Bad credentials');
    }

    const isEqual = await encrypt.compare(password, user.password);
    if (!isEqual)
    {
        throw new Error('Bad credentials');
    }

};

module.exports.emailExists = async (email) => {

    const user = await User.findOne({ email: email });
    if (!user)
    {
        throw new Error('The email does not exist!');
    }
};

module.exports.passwordRestoreKey = async (key) => {

    const keyEntity = await PasswordRestoreKey.findOne({key: key});
    if (!keyEntity)
    {
        throw new Error('The key is not valid!');
    }
};


