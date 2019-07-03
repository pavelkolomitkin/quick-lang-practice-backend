const userInit = require('../middlewares/security/initUser');
const securityGuard = require('../middlewares/security/guard');

module.exports = (app, Router) => {

    app.use('/api/security', require('./security')(app, Router()));

    app.use('/api/profile', [

        userInit

    ], require('./profile')(app, Router()));

    app.use('/api/client', [

        userInit,
        securityGuard

    ] ,require('./client')(app, Router()));

};
