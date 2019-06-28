const RegisterKey = require('../models/registerKey');
const User = require('../models/user');
const PasswordRestoreKey = require('../models/passwordRestoreKey');


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

module.exports.credentials = async ([email, password]) => {

    const passwordHash = await encrypt(password);

    const user = await User.findOne({
        email: email,
        password: passwordHash
    });
    if (!user)
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


