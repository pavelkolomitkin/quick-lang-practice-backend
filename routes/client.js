const Language = require('../models/language');
const LanguageLevel = require('../models/languageLevel');

const { check } = require('express-validator');

const {
    entityExists
} = require('../validators/common');

const {
    skillDoesNotExist,
    skillBelongsToUser
} = require('../validators/client');

const validationErrorHandler = require('../validators/validationErrorHandler');

const profileControllers = require('../controllers/client/profile');


module.exports = (app, router) => {

    /*==================== PROFILE MANAGEMENT =======================*/

    router.get('/profile/:id', profileControllers.getProfile);

    router.put('/about-yourself', [
        check('text')
            .trim()
            .isLength({ max: 4000 }).withMessage('Maximum 4000 symbols')
        ,

        validationErrorHandler

    ], profileControllers.editAboutYourSelf);

    router.post('/skill', [

        check('language')
            .custom(async (value) => {
                return entityExists(Language, value, 'Language does not exist!');
            })
        ,

        check('level')
            .custom(async (value) => {
                    return entityExists(LanguageLevel, value, 'Language level does not exist!');
                })
        ,

        check('language')
            .custom(skillDoesNotExist)
            .withMessage('You have already got this skill!')
        ,

        validationErrorHandler

    ], profileControllers.addLanguageSkill);


    router.put('/skill/:id', [

        check('id')
            .custom(skillBelongsToUser)
        ,

        check('level')
            .isNumeric()
            .custom((() => {
                return (id) => {
                    return entityExists(LanguageLevel, id);
                };
            })())

        ,

        validationErrorHandler

    ], profileControllers.updateLanguageSkill);

    router.delete('/skill/:id', [

        check('id')
            .custom(skillBelongsToUser)
        ,

        validationErrorHandler

    ], profileControllers.removeLanguageSkill);

    /*==================// PROFILE MANAGEMENT =======================*/


    /*==================== READY TO PRACTICE STATUS MANAGEMENT ======*/

    router.put('/practice-skill/on/:id', [

        check('id')
            .custom(skillBelongsToUser)
        ,

        validationErrorHandler
    ], profileControllers.practiceSkillOn);

    router.put('/practice-skill/off', profileControllers.practiceSkillOff);

    /*==================// READY TO PRACTICE STATUS MANAGEMENT ======*/


    return router;
};

