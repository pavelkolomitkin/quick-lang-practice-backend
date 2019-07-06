const ClientUser = require('../../models/client');
const Language = require('../../models/language');
const LanguageLevel = require('../../models/languageLevel');
const LanguageSkill = require('../../models/languageSkill');

const { extractContextFromRequest } = require('../../helpers/serialization');
const { groups } = require('../../serialization/entityTransformer');

module.exports.getProfile = async (req, res) => {

    const { params: { id } } = req;

    const user = await ClientUser.findById(id).populate('skills');
    if (!user)
    {
        res.status(404).json({});
    }
    else
    {
        const context = extractContextFromRequest(req);

        if (user.id === req.user.id)
        {
            context
                .addGroup(groups.USER_ME);
        }

        res.status(200).json(user.toJSON({
            context: context
        }));
    }

};

module.exports.editAboutYourSelf = async (req, res) => {

    let { user, body: { text } } = req;

    user.aboutYourSelf = text;
    await user.save();

    res.status(200).json({});
};


module.exports.addLanguageSkill = async (req, res) => {

    const { body: { language, level }} = req;
    let { user } = req;

    const languageEntityGet = Language.findById(language);
    const languageLevelEntityGet = LanguageLevel.findById(level);

    const languageEntity = await languageEntityGet;
    const languageLevelEntity = await languageLevelEntityGet;

    let skill = new LanguageSkill({
        user: user,
        level: languageLevelEntity,
        language: languageEntity
    });

    await skill.save();
    user.skills.push(skill);
    await user.save();

    res.status(201).json({
        skill: {
            id: skill.id,
            language: skill.language,
            level: skill.level
        }
    });
};

module.exports.updateLanguageSkill = async (req, res) => {

    const { params: { id } } = req;
    const { body: { level } } = req;

    const skillEntityGet = LanguageSkill.findById(id);
    const languageLevelEntityGet = LanguageLevel.findById(level);

    const skillEntity = await skillEntityGet;
    const languageLevelEntity = await languageLevelEntityGet;

    skillEntity.level = languageLevelEntity;
    await skillEntity.save();

    res.status(200).json(skillEntity);
};

module.exports.removeLanguageSkill = async (req, res) => {

    const { params: { id } } = req;

    await LanguageSkill.deleteOne({_id: id});

    res.status(200).json({});
};
