const { Router } = require('express');
const router = Router();

const userController = require('../../controllers/userController');

// /**
//  * 각 라우터별 데이터 검증하는 미들웨어 체크하기
//  */
const validate = require('../../middlewares/vaildate');
const userValidation = require('../../validation/userValidation');

// 일반 사용자 : 사용자 현재 정보 가져오기
router.get('/:id', validate(userValidation.userInfo), userController.getUser);

// 일반 사용자 (탈퇴)
router.delete(
  '/:id',
  validate(userValidation.withdraw),
  userController.userWithdraw
);

// 일반 사용자 : 현재 정보 수정
router.patch(
  '/:id',
  validate(userValidation.updateUserInfo),
  userController.updateUserInfo
);

module.exports = router;
