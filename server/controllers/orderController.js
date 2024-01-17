const orderService = require('../services/orderService');
const APIError = require('../utils/ApiError');
const httpStatus = require('http-status');

// 주문 조회하기
exports.getOrder = async (req, res, next) => {
  try {
    //cookie 의 Token으로 로그인 상태 확인
    if (!req.cookies.token) {
      throw new APIError(httpStatus[400], 'User Token is not exist.');
    }
    const { id } = req.params;
    const { order } = req.query;

    const result = await orderService.getOrder(id, order);

    res.status(200).json(result);
  } catch (e) {
    res.status(500).json('[ERROR] Get Order List is FAILED');
    next(e);
  }
};

// 주문 등록 하기
exports.postOrder = async (req, res, next) => {
  try {
    //cookie 의 Token으로 로그인 상태 확인
    if (!req.cookies.token) {
      throw new APIError(httpStatus[400], 'User Token is not exist.');
    }

    const result = await orderService.createOrder(req.body);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json('[ERROR] Create new Order is FAILED');
    next(e);
  }
};

// 주문 정보 수정
exports.updateOrder = async (req, res, next) => {
  try {
    //cookie 의 Token으로 로그인 상태 확인
    if (!req.cookies.token) {
      throw new APIError(httpStatus[400], 'User Token is not exist.');
    }

    const { id } = req.params;
    const orderBody = req.body;

    const result = await orderService.updateOrder(id, orderBody);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json('[ERROR] Updated Order is FAILED');
    next(e);
  }
};

// 주문 삭제
exports.deleteOrder = async (req, res, next) => {
  try {
    //cookie 의 Token으로 로그인 상태 확인
    if (!req.cookies.token) {
      throw new APIError(httpStatus[400], 'User Token is not exist.');
    }

    const { id } = req.params;

    const result = await orderService.deleteOrder(id);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json('[ERROR] Delete Order is FAILED');
    next(e);
  }
};
