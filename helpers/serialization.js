const Context = require('../serialization/context');
const { groups } = require('../serialization/entityTransformer');

module.exports.extractContextFromRequest = (req) => {

    const result = new Context();

    // TODO: add some groups here if it's needed
    const { user } = req;
    if (user)
    {
        if (user.roles.indexOf('ROLE_ADMIN_USER') !== -1)
        {
            result.addGroup(groups.USER_ADMIN);
        }
    }

    return result;
};
