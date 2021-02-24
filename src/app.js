const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const {dev: corsSettings} = require('./config/cors');
const db = require('./models');
const routes = require('./routes');
const errorHandler = require('./middlewares/handleError');
const routeNotFoundError = require('./errors/routeNotFound');

const app = express();
//db.sequelize.sync({'alter': true});

app.use(cors(corsSettings));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(routes); 
app.use((req, res, next) => next(routeNotFoundError())); //If the request has got here, it found no suitable router
app.use(errorHandler);

module.exports = app;
