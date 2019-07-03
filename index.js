const express        = require('express');
const mongoose       = require('./mongoose');
const systemErrorHandler = require('./helpers/systemErrorHandler');

const app = express();

const Router = require('express').Router;

require('./appConfig')(app);

mongoose.connection.once('open', () => {
    console.log('Connection to mongo is succeed!');

    require('./routes/index')(app, Router);

    app.get('/', (req, res) => {
        res.json({
            message: 'test'
        });
    });

    app.use(systemErrorHandler);

    app.listen(process.env.PORT || 3000, () => {
        console.log('Star application!');
    });
});

mongoose.connection.on('error', (error) => {

    console.error(error);
});
