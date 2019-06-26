const { check } = require('express-validator');
const uniqueEmailValidator = require('../validators/uniqueEmail');
const passwordRepeatValidator = require('../validators/passwordRepeat');
const registerKeyValidator = require('../validators/registerKey');
const validationErrorHandler = require('../validators/validationErrorHandler');

const securityControllers = require('../controllers/security');


module.exports = (app) => {

    const router = app.Router();

    router.post('/register', [

        check('email')
            .trim()
            .isEmail()
            .custom(uniqueEmailValidator)
        ,
        check('password')
            .trim()
            .not()
            .isEmpty()
        ,
        check('passwordRepeat')
            .trim()
            .not()
            .isEmpty()
        ,
        check('passwordRepeat')
            .custom(passwordRepeatValidator)
        ,
        check('fullName')
            .trim()
            .not()
            .isEmpty(),
        validationErrorHandler

    ], securityControllers.register);

    router.post('/register-confirm', [

        check('key')
            .not()
            .isEmpty()
            .custom(registerKeyValidator)
        ,
        validationErrorHandler

    ], securityControllers.registerConfirm);

    router.post('/login', securityControllers.login);

    router.post('/restore-password-request', securityControllers.restorePasswordRequest);

    router.get('/validate-restore-password-key/:key', securityControllers.validateRestorePasswordKey);

    router.post('/restore-password', securityControllers.restorePassword);


    return router;
};
