const adminController = require('../../controllers/adminController');
const { Router } = require('express');
const router = Router();

/**
 * 각 라우터별 데이터 검증하는 미들웨어 체크하기
 */
const validate = require('../../middlewares/vaildate');
const adminValidation = require('../../validation/adminValidation');

// 사용자 목록 가져오기
router.get(
  '/:id/users',
  validate(adminValidation.getUsers),
  adminController.getUsers
);

// 사용자 주문 정보 목록 가져오기
router.get(
  '/:id/users/:user_id/orders',
  validate(adminValidation.getUserOrder),
  adminController.getUserOrder
);

// 사용자 주문 배송 상태 변경하기
router.patch(
  '/:id/users/:user_id/orders',
  validate(adminValidation.updateDeliveryState),
  adminController.updateDeliveryState
);

// 사용자 주문 삭제
router.delete(
  '/:id/users/:user_id/orders',
  validate(adminValidation.deleteUserOrder),
  adminController.deleteUserOrder
);

module.exports = router;
