const mongoose = require('../mongoose');

const User = require('./user');

const AdminUserSchema = User.discriminator('AdminUser',
    new mongoose.Schema({}),
    {discriminatorKey: 'kind'}
    );

module.exports = mongoose.model('AdminUser', AdminUserSchema);
