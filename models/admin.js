const mongoose = require('../mongoose');

const User = require('./user');

const AdminUserSchema = new mongoose.Schema(
    {

    },
);

AdminUserSchema.virtual('roles').get(() => {

    return ['ROLE_ADMIN_USER'];

});

const AdminUser = User.discriminator('AdminUser',
    AdminUserSchema,
    {discriminatorKey: 'kind'}
);

module.exports = AdminUser;
