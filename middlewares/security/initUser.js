const {
    getUser
} = require('../../helpers/security');


const extractRequestToken = (req) => {

    let result = null;

    const authHeader = req.headers['authorization'];
    if (authHeader)
    {
        const items = authHeader.split('Bearer');
        if (items.length === 2)
        {
            result = items[1].trim();
        }
    }

    return result;
};

module.exports = async (req, res, next) => {

    req.user = null;

    const token = extractRequestToken(req);
    if (!token)
    {
        next();
        return;
    }

    try {
        req.user = await getUser(token);
    }
    catch (error) { }

    next();
};
