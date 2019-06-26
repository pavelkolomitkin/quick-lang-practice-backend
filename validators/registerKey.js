const RegisterKey = require('../models');

module.exports = (value, { req }) => {

    return new Promise((resolve, reject) => {

        RegisterKey.findOne({key: value})
            .then((item) => {

                resolve();

            })
            .catch(() => {

                reject('The key is invalid!');

            });

    });

};
