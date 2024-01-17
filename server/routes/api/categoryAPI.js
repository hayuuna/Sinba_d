const categoryController = require('../../controllers/categoryController');
const { Router } = require('express');
const router = Router();

/**
 * 각 라우터별 데이터 검증하는 미들웨어 체크하기
 */
const validate = require('../../middlewares/vaildate');
const categoryValidation = require('../../validation/categoryValidation');

//카테고리 리스트 가져오기
router.get('/', categoryController.getCategoryList);

// 대분류 /소분류 카테고리 리스트만 불러오기
router.get(
  '/:parentCategory',
  validate(categoryValidation.getCategoryByParentId),
  categoryController.getCategoryByParentId
);

//특정 카테고리 정보 불러오기
router.get(
  '/1/:id',
  validate(categoryValidation.getCategory),
  categoryController.getCategory
);

//관리자가 카테고리 새로 추가
router.post(
  '/',
  validate(categoryValidation.createCategory),
  categoryController.createCategory
);

//카테고리 수정
router.patch(
  '/',
  validate(categoryValidation.updateCategory),
  categoryController.updateCategory
);

// 카테고리 삭제
router.delete(
  '/:id',
  validate(categoryValidation.deleteCategory),
  categoryController.deleteCategory
);

module.exports = router;
