const jwt = require('jsonwebtoken');
const sha256 = require('crypto-js/sha256');
const User = require('../models/user');

module.exports.getToken = (user) => {

    return new Promise((resolve, reject) => {

        jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.APP_SECRET, (error, token) => {

            if (error)
            {
                reject('Can not sign user data');
                return;
            }


            resolve(token);

        });


    });

};

module.exports.getUser = (token) =>
{

    return new Promise((resolve, reject) => {

        jwt.verify(token, process.env.APP_SECRET, (error, data) => {

            if (error)
            {
                reject('Token is invalid!');
                return;
            }


            User
                .findById(data.id)
                .then((user) => {

                    resolve(user);

                })
                .catch(() => {

                    reject('Token is invalid!');

                });

        });

    });

};


module.exports.generateSecureRandomKey = (salt = '') => {

    const value = (+new Date()) + '' + Math.random() + salt;

    return sha256(value);

};


