module.exports.entityExists = async (Model, id, message) => {

    const item = await Model.findById(id.toString());
    if (!item)
    {
        throw new Error(message);
    }

};
