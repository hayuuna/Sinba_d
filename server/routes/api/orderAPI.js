const { Router } = require('express');
const router = Router();

const orderController = require('../../controllers/orderController');

/**
 * 각 라우터별 데이터 검증하는 미들웨어 체크하기
 */
const validate = require('../../middlewares/vaildate');
const orderValidation = require('../../validation/orderValidation');

// 일반 사용자 : 주문 내역 조회하기
router.get(
  '/:id',
  validate(orderValidation.getOrder),
  orderController.getOrder
);

// 일반 사용자 : 주문 등록하기
router.post('/', validate(orderValidation.newOrder), orderController.postOrder);

// 일반 사용자 : 주문 정보 수정하기
router.patch(
  '/:id',
  validate(orderValidation.updateOrder),
  orderController.updateOrder
);

// 일반 사용자 : 주문 정보 삭제하기
router.delete(
  '/:id',
  validate(orderValidation.deleteOrder),
  orderController.deleteOrder
);

module.exports = router;
