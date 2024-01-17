const adminService = require('../services/adminService');

//사용자 리스트 가져오기
exports.getUsers = async (req, res, next) => {
  try {
    //cookie 의 Token으로 로그인 상태 확인
    if (!req.cookies.token) {
      throw new APIError(httpStatus[400], 'User Token is not exist.');
    }

    const adminID = req.params;

    const data = await adminService.getUsers(adminID.id);

    res.json(data);
  } catch (e) {
    res.status(404).json('[ERROR] User list is not exist');
    next(e);
  }
};

// 사용자 주문 정보 목록 가져오기
exports.getUserOrder = async (req, res, next) => {
  try {
    //cookie 의 Token으로 로그인 상태 확인
    if (!req.cookies.token) {
      throw new APIError(httpStatus[400], 'User Token is not exist.');
    }

    const data = await adminService.getUserOrder(
      req.params.id,
      req.params.user_id,
      req.query.order_id
    );

    res.json(data);
  } catch (e) {
    res.status(404).json('[ERROR] Order list is not exist');
    next(e);
  }
};

//주문 배송상태 업데이트
exports.updateDeliveryState = async (req, res, next) => {
  try {
    //cookie 의 Token으로 로그인 상태 확인
    if (!req.cookies.token) {
      throw new APIError(httpStatus[400], 'User Token is not exist.');
    }

    const data = await adminService.updateDeliveryState(
      req.params.id,
      req.params.user_id,
      req.query.order_id,
      req.body.delivery_state
    );

    res.json(data);
  } catch (e) {
    res.status(500).json('[ERROR] Update Delivery state is failed');
    next(e);
  }
};

//TODO: 주문삭제
exports.deleteUserOrder = async (req, res, next) => {
  try {
    //cookie 의 Token으로 로그인 상태 확인
    if (!req.cookies.token) {
      throw new APIError(httpStatus[400], 'User Token is not exist.');
    }

    const data = await adminService.deleteUserOrder(
      req.params.id,
      req.params.user_id,
      req.query.order_id
    );

    res.json(data);
  } catch (e) {
    res.status(500).json('[ERROR] Delete user order is failed');
    next(e);
  }
};
