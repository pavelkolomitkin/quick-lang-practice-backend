const { check } = require('express-validator');

const {
    uniqueEmail,
    passwordRepeat,
    registerKey,
    credentials,
    emailExists,
    passwordRestoreKey

} = require('../validators/security');
const validationErrorHandler = require('../validators/validationErrorHandler');

const securityControllers = require('../controllers/security');


module.exports = (app, router) => {

    router.post('/register', [

        check('email')
            .trim()
            .isEmail()
            .custom(uniqueEmail)
        ,
        check('password')
            .trim()
            .not()
            .isEmpty()
            .isLength({ min: 6 })
        ,
        check('passwordRepeat')
            .trim()
            .not()
            .isEmpty()
            .custom(passwordRepeat)
        ,
        check('fullName')
            .trim()
            .not()
            .isEmpty()
            .isLength({ max: 255 })
        ,
        validationErrorHandler

    ], securityControllers.register);

    router.post('/register-confirm', [

        check('key')
            .not()
            .isEmpty()
            .custom(registerKey)
        ,
        validationErrorHandler

    ], securityControllers.registerConfirm);

    router.post('/login', [
        check('email')
            .trim()
            .not()
            .isEmpty()
        ,
        check('password')
            .trim()
            .not()
            .isEmpty()
        ,
        check('email')
            .custom(credentials)
        ,

        validationErrorHandler

    ], securityControllers.login);

    router.post('/restore-password-request', [
        check('email')
            .not()
            .isEmpty()
            .custom(emailExists),

        validationErrorHandler

    ], securityControllers.restorePasswordRequest);

    router.get('/validate-restore-password-key/:key', [

        check('key')
            .trim()
            .not()
            .isEmpty()
            .custom(passwordRestoreKey)
        ,
        validationErrorHandler

    ], securityControllers.validateRestorePasswordKey);

    router.post('/restore-password', [

        check('key')
            .trim()
            .not()
            .isEmpty()
            .custom(passwordRestoreKey)
        ,
        check('password')
            .trim()
            .not()
            .isEmpty()
            .isLength({ min: 6 })
        ,
        check('passwordRepeat')
            .trim()
            .not()
            .isEmpty()
        ,
        check('passwordRepeat')
            .custom(passwordRepeat)

    ], securityControllers.restorePassword);


    return router;
};
