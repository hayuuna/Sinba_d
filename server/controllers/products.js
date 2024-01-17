const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const logger = require('../config/logger');
const productsService = require('../services/products');
const imageService = require('../services/image');
const catchAsync = require('../utils/catchAsync');

exports.getProduct = catchAsync(async (req, res, next) => {
  const product_id = req.params.id;

  const product = await productsService.getProductById(product_id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, '상품을 찾지 못하였습니다.');
  }
  logger.info(`[pid=${product_id}] : ${product}`);
  res.status(httpStatus.OK).json(product);
});

exports.getProducts = catchAsync(async (req, res, next) => {
  let category_id = req.query.category_id;
  if (category_id instanceof Array) {
    category_id = [...category_id];
  } else if (category_id === undefined) {
    category_id = undefined;
  } else {
    category_id = [category_id];
  }
  const page = req.query.page;
  const products = await productsService.getProducts(page || 1, category_id);
  res.status(httpStatus.OK).json(products);
});

exports.createProduct = catchAsync(async (req, res, next) => {
  logger.info('상품생성');
  const product = await productsService.createProduct(req.body);
  logger.info(product);
  res.status(httpStatus.OK).json(product);
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product_id = req.params.id;
  const product = await productsService.getProductById(product_id);

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, '상품을 찾지 못하였습니다.');
  }
  const result = await productsService.deleteProduct(product_id);
  res.status(httpStatus.OK).json(result);
});

exports.patchProduct = catchAsync(async (req, res, next) => {
  logger.info('상품수정');
  const product_id = req.params.id;
  let product = await productsService.getProductById(product_id);

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, '상품을 찾지 못하였습니다.');
  }

  const result = await productsService.patchProduct(product, req.body);
  product = await productsService.getProductById(product_id);
  logger.info(product);
  res.status(httpStatus.OK).json(product);
});

exports.addImagesToProduct = catchAsync(async (req, res, next) => {
  logger.info('상품 이미지 추가');
  const product_id = req.params.id;
  const image_type = req.params.image_type;
  const product = await productsService.getProductById(product_id);

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, '상품을 찾지 못하였습니다.');
  }

  const images = await imageService.addImages(req.files);
  let result;
  if (image_type === 'main') {
    result = await productsService.addMainImagesToProduct(product, images);
  } else if (image_type === 'detail') {
    result = await productsService.addDetailImagesToProduct(product, images);
  }
  logger.info(result);
  res.status(httpStatus.OK).json(result);
});

exports.deleteImagesInProduct = catchAsync(async (req, res, next) => {
  logger.info('상품 이미지 삭제');
  const product_id = req.params.id;
  const image_type = req.params.image_type;
  const product = await productsService.getProductById(product_id);

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, '상품을 찾지 못하였습니다.');
  }

  const images = req.body.images;

  let result;
  if (image_type === 'main') {
    result = await productsService.deleteMainImagesToProduct(product, images);
  } else if (image_type === 'detail') {
    result = await productsService.deleteDetailImagesToProduct(product, images);
  }
  logger.info(result);
  res.status(httpStatus.OK).json(result);
});

exports.deleteAllImagesInProduct = catchAsync(async (req, res, next) => {
  logger.info('상품 이미지 전체 삭제');
  const product_id = req.params.id;
  const image_type = req.params.image_type;

  const product = await productsService.getProductById(product_id);

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, '상품을 찾지 못하였습니다.');
  }

  let result;
  if (image_type === 'main') {
    result = await productsService.deleteAllMainImagesToProduct(product);
  } else if (image_type === 'detail') {
    result = await productsService.deleteDetailMainImagesToProduct(product);
  }

  logger.info(result);
  res.status(httpStatus.OK).json(result);
});
