const categoryService = require('../services/categoryService');

//카테고리 리스트
exports.getCategoryList = async (req, res, next) => {
  try {
    const data = await categoryService.categoryList();
    res.json(data);
  } catch (e) {
    next(e);
    res.status(404).json('[ERROR] Category list is not exist');
  }
};

// 특정 카테고리 정보 불러오기
exports.getCategory = async (req, res, next) => {
  try {
    const data = await categoryService.getCategory(req.params);

    res.json(data);
  } catch (e) {
    res.status(404).json('[ERROR] Get Category is Failed');
    next(e);
  }
};

// 부모 카테고리 id로 카테고리 리스트 불러오기
exports.getCategoryByParentId = async (req, res, next) => {
  try {
    const data = await categoryService.getCategoryByParentId(req.params);

    res.json(data);
  } catch (e) {
    next(e);
    res.status(404).json('[ERROR] Get Category List is Failed');
  }
};

//카테고리 생성
exports.createCategory = async (req, res, next) => {
  try {
    const data = await categoryService.createCategory(req.body);
    res.status(201).json(data);
  } catch (e) {
    res.status(500).json('[ERROR] Category create is FAILED');
    next(e);
  }
};

//카테고리 수정
exports.updateCategory = async (req, res, next) => {
  try {
    const data = await categoryService.updateCategory(req.body);
    res.json(data);
  } catch (e) {
    res.status(500).json('[ERROR] Category updated is FAILED');
    next(e);
  }
};

//카테고리 삭제
exports.deleteCategory = async (req, res, next) => {
  try {
    const data = await categoryService.deleteCategory(req.params);
    res.json(data);
  } catch (e) {
    res.status(500).json('[ERROR] Category delete is FAILED');
    next(e);
  }
};
