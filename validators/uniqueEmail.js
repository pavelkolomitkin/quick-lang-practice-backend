const User = require('../models/user');

module.exports = (value, { req }) => {
    return new Promise((resolve, reject) => {

        User
            .findOne({ email: value })
            .then((user) => {

                reject('This email already exists!');

            })
            .catch(() => {

                resolve();

            });

    });
};
