const authController = require('../../controllers/authController');
const { Router } = require('express');
const router = Router();

/**
 * 각 라우터별 데이터 검증하는 미들웨어 체크하기
 */
const validate = require('../../middlewares/vaildate');
const authValidation = require('../../validation/authValidation');

// 로그인
router.post('/login', validate(authValidation.login), authController.login);

//로그아웃
router.get('/logout', authController.logout);

// 회원가입
router.post('/join', validate(authValidation.join), authController.join);

module.exports = router;
