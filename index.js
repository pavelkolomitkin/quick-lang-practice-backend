const express        = require('express');
const mongoose       = require('./mongoose');

const app = express();

require('./appConfig')(app);

mongoose.connection.once('open', () => {
    console.log('Connection to mongo is succeed!');

    app.get('/', (req, res) => {
        res.json({
            message: 'test'
        });
    });
    app.listen(process.env.PORT || 3000, () => {
        console.log('Star application!');
    });
});

mongoose.connection.on('error', (error) => {

    console.error(error);
});
