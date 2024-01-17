const mongoose = require('mongoose');
const httpStatus = require('http-status');
const config = require('../config/config');
const logger = require('../config/logger');
const ApiError = require('../utils/ApiError');

/**
 * 모든 에러를 ApiError로 변경해준다.
 *      들어온 에러의 상태코드가 있거나 해당 에러가 몽구스의 에러라면
 *          상태코드에 BAD_REQUEST가 들어간다.
 *      상태코드가 없고 몽구스의 에러도 아니라면
 *          상태코드가 INTERNAL_SERVER_ERROR로 들어간다.
 *
 *      이렇게 바꿔주는 이유는 모든 에러를 처리할 수 없기 때문에 하나의 에러로 처리해버린다.
 *      이렇게 할 수 있는 이유는 에러메세지와 스택트레이스 만으로도 충분히 어떤 에러인지 판단할 수 있기 때문이다.
 *
 * 에러메세지가 있다면 그대로 담아주고
 * 없다면 해당 코드의 내용을 httpStatus에서 준비해둔 내용을 가져와서 담아준다.
 *
 * isOperational의 역할
 *      isOperational이 true인 경우는 ApiError를 직접 던진 경우이고
 *
 *      isOperational이 false인 경우는 기존의 에러가 errorConverter를 통해서
 *      ApiError로 치환되는 경우이다.
 *
 *      그러니까 나중에 errorHandler에서 isOperational의 값을 보고
 *      runtime error인지 아닌지를 구분하는 역할을 하는구나.
 *
 */
const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

/**
 * 에러처리할 때 현재 프로덕션 환경이고 개발자가 직접던진게 아니고
 * converter를 통해서 변환된 에러라면 한번 더 에러를 처리해준다.
 *
 * 이렇게 처리해주는 이유는 보안상의 이유로 외부에 서버 내부에서
 * 어떤 에러가 발생하는지를 감추기 위함이다~
 *
 * 프로덕션이 아닌 테스트나 데브 환경에서는 어떤 에러가 발생하는지
 * 확인해야하기 때문에 config.env를 체크해주는 것이다.
 *
 * 개발환경에서는 응답에 스택트레이스를 포함시켜서 확인가능하게!
 * 테스트 환경에서는 궂이 필요없는건가??
 *
 * 개발환경에서는 로그까지 남겨준다.
 */
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (config.env === 'PROD' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }
  res.locals.errorMessage = err.message;
  // 이 부분이 왜 필요한지 모르겠음
  // res.locals가 어떤 역할인지는 알겠는데
  // 왜 이 에러 메세지를 궂이 여기다 넣어놓는거지??
  // https://expressjs.com/en/api.html#res.locals

  const response = {
    code: statusCode,
    message,
    ...(config.env === 'DEV' && { stack: err.stack }),
  };

  if (config.env === 'DEV') {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};
