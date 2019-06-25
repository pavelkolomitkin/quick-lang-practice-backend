const express        = require('express');
const bodyParser     = require('body-parser');
const cors           = require('cors');
const mongoose       = require('./mongoose');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

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
