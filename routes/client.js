const profile = require('../controllers/client/profile');


module.exports = (app, router) => {

    router.get('/profile', profile.getProfile);

    
    return router;
};
