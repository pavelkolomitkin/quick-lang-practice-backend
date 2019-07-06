const Language = require('../models/language');
const LanguageLevel = require('../models/languageLevel');


module.exports.getLanguageList = async (req, res) => {

    const list = await Language.find({});

    res.status(200).json({
        languages: list
    });
};

module.exports.getLanguageLevels = async (req, res) => {

    const list = await LanguageLevel.find();

    res.status(200).json({
        levels: list
    });

};
