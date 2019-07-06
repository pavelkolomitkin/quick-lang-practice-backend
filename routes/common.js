const commonControllers = require('../controllers/common');


module.exports = (app, router) => {

    router.get('/language/list', commonControllers.getLanguageList);

    router.get('/language-level/list', commonControllers.getLanguageLevels);


    return router;
};
