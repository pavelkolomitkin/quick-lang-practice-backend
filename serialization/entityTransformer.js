const groups = {
    USER_ME: 'USER_ME',
    USER_ADMIN: 'USER_ADMIN'
};

module.exports.groups = groups;

const extractOptionContext = (options) => {

    return options.context;

};

const resolveProperty = (entity, property, context, allowedGroups) => {

    let propertyAllowed = false;

    const contextGroups = context.getGroups();
    for (let group of contextGroups)
    {
        if (allowedGroups.indexOf(group) !== -1)
        {
            propertyAllowed = true;
            break;
        }
    }

    if (!propertyAllowed && (property in entity))
    {
        delete entity[property];
    }

};

const cleanUpProperties = (entity, properties) => {

    for (let i = 0; i < properties.length; i++)
    {
        if (properties[i] in entity)
        {
            delete entity[properties[i]];
        }
    }

};

const normalizeDefault = (entity) => {

    entity.id = entity._id;

    cleanUpProperties(entity, [
        '__v', '_id', '__t'
    ]);
};

module.exports.clientUser = (doc, ret, opt) => {

    normalizeDefault(ret);
    cleanUpProperties(ret, ['password']);

    const context = extractOptionContext(opt);
    if (context)
    {
        resolveProperty(ret, 'email', context, [
            groups.USER_ME,
            groups.USER_ADMIN
        ]);


        resolveProperty(ret, 'isActive', context, [
            groups.USER_ADMIN
        ]);

    }

};
