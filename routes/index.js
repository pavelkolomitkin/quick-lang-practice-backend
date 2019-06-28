

module.exports = (app, Router) => {

    app.use('/api/security', require('./security')(app, Router()));

};
