const mongoose = require('../mongoose');

const User = require('./user');

const AdminUser = User.discriminator('AdminUser',
    new mongoose.Schema({}),
    {discriminatorKey: 'kind'}
    );

module.exports = AdminUser;
