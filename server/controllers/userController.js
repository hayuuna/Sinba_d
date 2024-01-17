const userService = require('../services/userService');
const APIError = require('../utils/ApiError');
const httpStatus = require('http-status');

// 사용자 정보 가져오기
exports.getUser = async (req, res, next) => {
  try {
    //cookie 의 Token으로 로그인 상태 확인

    if (!req.cookies.token) {
      throw new APIError(httpStatus[400], 'User Token is not exist.');
    }

    const user = await userService.getUserInfo(req.params);

    res.status(200).json(user);
  } catch (e) {
    res.status(500).json('[ERROR] Get User Info is FAILED');
    next(e);
  }
};

// 사용자 탈퇴
exports.userWithdraw = async (req, res, next) => {
  try {
    //cookie 의 Token으로 로그인 상태 확인

    if (!req.cookies.token) {
      throw new APIError(httpStatus[400], 'User Token is not exist.');
    }

    const data = await userService.deleteUser(req.params);

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json('[ERROR] Withdraw User Info is FAILED');
    next(e);
  }
};

// 사용자 정보 수정
exports.updateUserInfo = async (req, res, next) => {
  try {
    //cookie 의 Token으로 로그인 상태 확인
    if (!req.cookies.token) {
      throw new APIError(httpStatus[400], 'User Token is not exist.');
    }

    const result = await userService.updateUser(req);

    res.status(200).json(result);
  } catch (e) {
    res.status(500).json('[ERROR] Update User Info is FAILED');
    next(e);
  }
};
