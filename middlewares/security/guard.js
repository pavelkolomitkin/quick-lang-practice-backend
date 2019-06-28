const API_BASE_PREFIX = '/api';

const USER_ROLE_ROUTE_PREFIXES = {
    'ClientUser': API_BASE_PREFIX + '/client',
    'AdminUser': API_BASE_PREFIX + '/admin'
};

module.exports = (req, res, next) => {

    const { user } = req;
    if (!user)
    {
        res.status(401).json({});
        return;
    }

    const currentRoute = req.originalUrl;
    let routeUserType = null;

    for (let [userType, baseRoute] of Object.entries(USER_ROLE_ROUTE_PREFIXES))
    {
        if (currentRoute.indexOf(baseRoute) === 0)
        {
            routeUserType = userType;
            break;
        }
    }

    if (!routeUserType)
    {
        res.status(401).json({});
        return;
    }

    if (req.user.__t !== routeUserType)
    {
        res.status(401).json({});
        return;
    }

    next();
};
