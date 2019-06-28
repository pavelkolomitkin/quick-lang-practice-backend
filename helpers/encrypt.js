const bcrypt = require('bcrypt');

module.exports.hash = (value, salt = 10) => {

    return bcrypt.hash(value, salt);
};

module.exports.compare = (value, hash) => {

    return bcrypt.compare(value, hash);

};
