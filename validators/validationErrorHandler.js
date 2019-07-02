const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        const errorHash = {};
        for (let error of errors.array())
        {
            if (typeof errorHash[error.param] === 'undefined')
            {
                errorHash[error.param] = [];
            }

            errorHash[error.param].push(error);
        }

        res.status(400).json(errorHash);
    }
    else
    {
        next();
    }
};
