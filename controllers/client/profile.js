const { extractContextFromRequest } = require('../../helpers/serialization');
const { groups } = require('../../serialization/entityTransformer');

module.exports.getProfile = (req, res) => {

    const context = extractContextFromRequest(req);
    context
        .addGroup(groups.USER_ME);

    res.status(200).json(req.user.toJSON({
        context: context
    }));
};
