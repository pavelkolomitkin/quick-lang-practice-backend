const bcrypt = require('bcrypt');

module.exports = (value, salt = '') => {

    return bcrypt.hash(value, salt + process.env.APP_SECRET);

};
