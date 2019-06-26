

module.exports = (app) => {

    app.use('/api/security', require('./security')(app));

};
