const express = require('express');
const cookieParser = require('cookie-parser');

const { apiRouter } = require('./routes/index');
const path = require('path');
const config = require('./config/config');
const logger = require('./config/logger');
const morgan = require('./config/morgan');

const httpStatus = require('http-status');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');

const app = express();
const cors = require('cors');

const EXPRESS_PORT = config.express.primary.port;
const LOCATION = config.express.primary.location;

// app.use(express.static(__dirname + "/front/dist"));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 라우터 설정

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

// app.use("/", (req, res, next) => {
//   logger.info(`${req.method} ${req.path}`);
//   next();
// });

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5002' }));
app.use(cookieParser());
app.use('/api', apiRouter);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
