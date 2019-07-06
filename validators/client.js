module.exports.skillDoesNotExist = async (langId, { req }) => {

    const { user } = req;

    if (user.skills && user.skills.length > 0)
    {
        const index = user.skills.findIndex((item) => {

            return (item.language.id.toString() === langId.toString());

        });

        if (index !== -1)
        {
            throw new Error('You have already a skill of this language!');
        }
    }

};

module.exports.skillBelongsToUser = async (skillId, { req }) => {

    const { user } = req;

    if (user.skills && user.skills.length > 0)
    {
        const index = user.skills.findIndex((skill) => {
            return (skill.id.toString() === skillId.toString());
        });

        if (index === -1)
        {
            throw new Error('You have not this skill!');
        }
    }
    else
    {
        throw new Error('You have not this skill!');
    }
};
