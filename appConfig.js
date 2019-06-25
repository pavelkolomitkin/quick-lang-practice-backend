const bodyParser     = require('body-parser');

module.exports = (app) => {

    if (process.env.APP_ENV === 'dev')
    {
        const cors = require('cors');
        app.use(cors());
    }

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    return app;
};
