const profileControllers = require('../controllers/profile');

module.exports = (app, router) => {

    router.get('/', profileControllers.getProfile);

    return router;
};
