module.exports.entityExists = async (Model, id, message) => {

    const item = await Model.findById(id);
    if (!item)
    {
        throw new Error(message);
    }

};
