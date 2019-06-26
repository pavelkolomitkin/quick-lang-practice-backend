const ClientUser = require('../models/client');
const RegisterKey = require('../models/registerKey');

const encrypt = require('../helpers/encrypt');
const mailer = require('../helpers/mailer');


module.exports.register = async (req, res) => {

    const { email, password, fullName } = req.body;

    const passwordHash = await encrypt(password);

    let client = new ClientUser({
        email: email,
        password: passwordHash,
        fullName: fullName
    });

    client = await client.save();

    await mailer.sendRegisterConfirmation(client);

    res.status(201);
};

module.exports.registerConfirm = async (req, res) => {

    const { key } = req.params;

    let item = await RegisterKey.findOne({key: key}).populate('client');

    item.client.isActive = true;

    await item.client.save();

    res.status(200);
};


module.exports.login = (req, res) => {



};

module.exports.restorePasswordRequest = (req, res) => {

};

module.exports.validateRestorePasswordKey = (req, res) => {

};

module.exports.restorePassword = (req, res) => {

};
