const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const logger = require('../config/logger');
const imageService = require('../services/image');

exports.addImages = catchAsync(async (req, res, next) => {
  logger.info('이미지 추가');

  const result = await imageService.addImages(req.files);
  logger.info(result);
  res.status(httpStatus.OK).json(result);
});

exports.deleteImages = catchAsync(async (req, res, next) => {
  logger.info('이미지 삭제');

  const files = req.body.files;

  const result = await imageService.deleteImages(files);
  logger.info(result);
  res.status(httpStatus.OK).json(result);
});
