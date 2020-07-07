const bodyParser = require('body-parser');
const express = require('express');
const methodOverride = require('method-override');
const logger = require('morgan');

var app = express();
const PORT = process.env.PORT || 3000;

/******************* Express App Setup ********************/
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

/************************* Routes *************************/
var router = require('./api/routes/routes');
app.use(router);

app.listen(PORT, () => console.log(`App is listening on port ${PORT}!`));