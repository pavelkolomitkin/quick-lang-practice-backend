const Context = require('../serialization/context');

module.exports.extractContextFromRequest = (req) => {

    const result = new Context();

    // TODO: add some groups here if it's needed

    return result;
};
