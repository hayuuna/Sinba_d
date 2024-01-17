const authService = require('../services/authService');
const { setUserToken } = require('../utils/jwt');
const logger = require('../config/logger');
const APIError = require('../utils/ApiError');
const httpStatus = require('http-status');

// 로그인
exports.login = async (req, res, next) => {
  try {
    const user = await authService.login(req.body);

    if (user === 'INCORRECT') {
      res.json('INCORRECT');
      return;
    }

    if (user === 'User is not Exist.') {
      res.status(404).json(user);
      return;
    }
    logger.info(`Login Success : ${user.email}`);

    //UserToken 생성 후 response 헤더 cookie에 토큰 값 저장
    setUserToken(res, user.email);
    res.cookie('user_id', user.email);

    res.status(200).json({
      message: 'Login Success',
      id: user.email,
    });
  } catch (e) {
    res.status(500).json('[ERROR] Login is FAILED');
    next(e);
  }
};

// 로그아웃
exports.logout = async (req, res) => {
  if (!req.cookies.token) {
    throw new APIError(httpStatus[400], 'User Token is not exist');
  }

  try {
    res.clearCookie('token');
    res.clearCookie('user_id');
    // res.clearCookie('token').redirect('/login');

    res.status(200).json({
      message: 'Logout Success',
      info: '성공 후 메인 로그인 화면으로 리다이렉트 할 예정',
    });
  } catch (e) {
    res.status(500).json('[ERROR] Logout is FAILED');
    next(e);
  }
};

// 회원가입
exports.join = async (req, res, next) => {
  try {
    const user = await authService.join(req.body);

    if (user === 'EXIST') {
      res.json('EXIST');
      return;
    }

    //UserToken 생성 후 response 헤더 cookie에 토큰 값 저장
    setUserToken(res, user.email);

    logger.info(`Join Success : ${user.email}`);

    res.status(200).json({
      id: user.email,
      message: '성공 후 메인 페이지 또는 로그인 화면으로 리다이렉트 할 예정',
    });
  } catch (e) {
    res.status(500).json('[ERROR] Join is FAILED');
    next(e);
  }
};
