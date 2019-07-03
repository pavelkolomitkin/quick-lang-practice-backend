const ClientUser = require('../models/client');
const User = require('../models/user');
const RegisterKey = require('../models/registerKey');
const PasswordRestoreKey = require('../models/passwordRestoreKey');

const encrypt = require('../helpers/encrypt');
const mailer = require('../helpers/mail/mailer');
const { getToken, generateSecureRandomKey } = require('../helpers/security');


module.exports.register = async (req, res) => {

    const { email, password, fullName } = req.body;

    const passwordHash = await encrypt.hash(password);

    let client = new ClientUser({
        email: email,
        password: passwordHash,
        fullName: fullName
    });

    client = await client.save();

    let registerKey = new RegisterKey({
        key: generateSecureRandomKey(),
        client: client
    });

    registerKey = await registerKey.save();

    await mailer.sendRegisterConfirmation(registerKey);

    res.status(201).json({});
};

module.exports.registerConfirm = async (req, res) => {

    const { key } = req.body;

    let item = await RegisterKey.findOne({key: key}).populate('client');

    item.client.isActive = true;

    await item.client.save();
    await RegisterKey.deleteOne({ _id: item.id });

    res.status(200).json({});
};


module.exports.login = async (req, res) => {

    const { email } = req.body;

    const user = await User.findOne({ email: email });
    const token = await getToken(user);

    res.status(200).json({
        token: token
    });
};

module.exports.restorePasswordRequest = async (req, res) => {

    const { email } = req.body;

    const user = await User.findOne({ email: email });

    let restoreKey = await PasswordRestoreKey.findOne({user: user}).populate('user');
    if (!restoreKey)
    {
        restoreKey = new PasswordRestoreKey({
            key: generateSecureRandomKey(),
            user: user
        });

        restoreKey = await restoreKey.save();
    }

    await mailer.sendPasswordRestoreLink(restoreKey);

    res.status(200).json({});
};

module.exports.validateRestorePasswordKey = (req, res) => {

    res.status(200).json({});

};

module.exports.restorePassword = async (req, res) => {

    const { key, password } = req.body;

    let keyEntity = await PasswordRestoreKey.findOne({ key: key }).populate('user');
    let user = keyEntity.user;

    user.password = await encrypt.hash(password);
    await user.save();

    await PasswordRestoreKey.deleteOne({ _id: keyEntity.id });

    mailer.sendPasswordRestoredNotify(user);

    res.status(200).json({});
};
