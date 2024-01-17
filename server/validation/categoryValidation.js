const Joi = require('joi');

// 카테고리 추가 시 검증할 데이터
const createCategory = {
  body: Joi.object()
    .keys({
      name: Joi.string().min(1).required(),
      parentCategory: Joi.string(),
      categoryType: Joi.string().min(1).required(),
    })
    .unknown(false),
};

// 특정 카테고리 불러올 시 검증할 데이터
const getCategory = {
  params: Joi.object()
    .keys({
      id: Joi.string().required(),
    })
    .unknown(false),
};

// 카테고리 수정 시 검증할 데이터
const updateCategory = {
  body: Joi.object()
    .keys({
      id: Joi.string().min(1).required(),
      name: Joi.string().min(1).required(),
      parentCategory: Joi.string(),
      categoryType: Joi.string().min(1).required(),
    })
    .unknown(false),
};

// 카테고리 삭제 시 검증할 데이터
const deleteCategory = {
  params: Joi.object()
    .keys({
      id: Joi.string().min(1).required(),
    })
    .unknown(false),
};

// 대분류 / 소분류 카테고리만 가져올 때 검증할 데이터
const getCategoryByParentId = {
  params: Joi.object()
    .keys({
      parentCategory: Joi.string().min(1).required(),
    })
    .unknown(false),
};

module.exports = {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  getCategoryByParentId,
};
