const { Category } = require('../models');
const httpStatus = require('http-status');
const APIError = require('../utils/ApiError');

//카테고리 전체 가져오기
const categoryList = async () => {
  const data = await Category.find({});

  if (!data) {
    throw new APIError(httpStatus.NOT_FOUND, 'GET Category list is not exist');
  }

  return data;
};

// 특정 카테고리 가져오기
//try catch : 내가 핸들링 할 수 있는걸 넣자
//NOT found는 서비스에서 던지는게 낫다 (취향차이!)
const getCategory = async (categoryParams) => {
  const data = categoryParams;
  const category = await Category.findById({ _id: data.id }).exec();
  if (!category) {
    throw new APIError(httpStatus.NOT_FOUND, 'Category is not exist.');
  }
  return category;
};

// 부모 카테고리 id로 리스트 가져오기
const getCategoryByParentId = async (categoryParams) => {
  const data = categoryParams;
  const category = await Category.find({
    parentCategory: data.parentCategory,
  }).exec();
  if (!category) {
    throw new APIError(httpStatus.NOT_FOUND, 'Category is not exist.');
  }
  return category;
};

//카테고리 추가하기
const createCategory = async (categoryBody) => {
  if (
    categoryBody['name'].length < 1 ||
    categoryBody['categoryType'].length < 1
  ) {
    throw new APIError(
      httpStatus.NO_CONTENT,
      'Category data is Inconsistent data'
    );
  }

  const newCategory = await Category.create(categoryBody);

  return newCategory;
};

//카테고리 수정하기
const updateCategory = async (categoryBody) => {
  const data = categoryBody;
  if (data['name'].length < 1 || categoryBody['categoryType'].length < 1) {
    throw new APIError(
      httpStatus.NO_CONTENT,
      'Category data is Inconsistent data'
    );
  }

  const _id = data.id;
  const name = data.name;
  const parentCategory = data.parentCategory;
  const categoryType = data.categoryType;

  if (!(await Category.findById({ _id }))) {
    throw new APIError(httpStatus.NOT_FOUND, 'Category is not exist');
  }

  const updatedCategory = await Category.updateOne(
    { _id },
    { $set: { name, parentCategory, categoryType } }
  ).exec();

  return updatedCategory;
};

//카테고리 삭제하기
const deleteCategory = async (categoryParams) => {
  const data = categoryParams;
  const deleteItem = await Category.findById({ _id: data.id }).exec();

  if (deleteItem === null) {
    throw new APIError(httpStatus.NOT_FOUND, 'Category is not exist.');
  }
  const result = await Category.deleteOne({ _id: data.id });

  return { message: 'Delete category Success', deleteItem, result };
};

module.exports = {
  categoryList,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  getCategoryByParentId,
};

// multer : 이미지 저장하기
