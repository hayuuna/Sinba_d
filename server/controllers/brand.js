const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const logger = require('../config/logger');
const brandService = require('../services/brand');

exports.getBrand = catchAsync(async (req, res, next) => {
  const brand_id = req.params.id;
  logger.info('브랜드');
  const result = await brandService.getBrand(brand_id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, '상품을 찾지 못하였습니다.');
  }
  res.status(httpStatus.OK).json(result);
});

exports.getBrands = catchAsync(async (req, res, next) => {
  logger.info('브랜드리스트');
  const result = await brandService.getBrands();
  res.status(httpStatus.OK).json(result);
});

exports.createBrand = catchAsync(async (req, res, next) => {
  logger.info('브랜드 만들기');
  const name = req.body.name;
  const result = await brandService.createBrand(name);
  res.status(httpStatus.OK).json(result);
});

exports.deleteBrand = catchAsync(async (req, res, next) => {
  logger.info('브랜드 삭제');
  const all = req.query.all;
  if (all) {
    const result = await brandService.deleteAllBrands();
    res.status(httpStatus.OK).json(result);
  } else {
    const brandId = req.params.id;
    const target = await brandService.getBrand(brandId);
    if (!target) {
      throw new ApiError(httpStatus.NOT_FOUND, '상품을 찾지 못하였습니다.');
    }
    const result = await brandService.deleteBrand(brandId);
    res.status(httpStatus.OK).json(result);
  }
});
