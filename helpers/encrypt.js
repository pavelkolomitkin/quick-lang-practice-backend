const bcrypt = require('bcrypt');

module.exports = (value, salt = 10) => {

    return bcrypt.hash(value, salt);
};
