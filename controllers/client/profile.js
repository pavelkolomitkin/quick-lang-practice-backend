const ClientUser = require('../../models/client');
const Langualage = require('../../models/language');
const LangualageLevel = require('../../models/languageLevel');
const LangualageSkill = require('../../models/languageSkill');

module.exports.editAboutYourSelf = async (req, res) => {

    let { user, body: { text } } = req;

    user.aboutYourSelf = text;
    await user.save();

    res.status(200).json({});
};


module.exports.addLanguageSkill = async (req, res) => {

    const { body: { language, level }} = req;
    let { user } = req;

    const languageEntityGet = Langualage.findById(language);
    const languageLevelEntityGet = LangualageLevel.findById(level);

    const languageEntity = await languageEntityGet;
    const languageLevelEntity = await languageLevelEntityGet;

    let skill = new LangualageSkill({
        user: user,
        level: languageLevelEntity,
        language: languageEntity
    });

    await skill.save();
    user.skills.push(skill);

    res.status(201).json(skill);
};

module.exports.updateLanguageSkill = async (req, res) => {

    const { params: { id } } = req;
    const { body: { level } } = req;

    const skillEntityGet = LangualageSkill.findById(id);
    const languageLevelEntityGet = LangualageLevel.findById(level);

    const skillEntity = await skillEntityGet;
    const languageLevelEntity = await languageLevelEntityGet;

    skillEntity.level = languageLevelEntity;
    await skillEntity.save();

    res.status(200).json(skillEntity);
};

module.exports.removeLanguageSkill = async (req, res) => {

    const { params: { id } } = req;

    await LangualageSkill.deleteOne({_id: id});

    res.status(200).json({});
};
