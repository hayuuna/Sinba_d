const Joi = require('joi');

const getProduct = {
  params: Joi.object()
    .keys({
      id: Joi.string().required(),
    })
    .unknown(false),
};
const getProducts = {
  query: Joi.object().keys({
    category_id: Joi.any().optional(),
    page: Joi.number().min(1).optional(),
  }),
};
const deleteProduct = {
  params: Joi.object()
    .keys({
      id: Joi.string(),
    })
    .unknown(false),
};

const createProduct = {
  body: Joi.object()
    .keys({
      title: Joi.string().min(5).required(),
      // brand: Joi.string().required(),
      // type: Joi.string().required(),
      model_number: Joi.string().required(),
      gender: Joi.string().required(),
      size: Joi.string().required(),
      price: Joi.number().min(0).required(),
      category_id: Joi.array(),
      // main_images: Joi.array().items({
      //   filename: Joi.string().required(),
      //   raw: Joi.any().reqruied(),
      // })
    })
    .unknown(false),
};

const patchProduct = {};

const addImage = {
  params: Joi.object()
    .keys({
      id: Joi.string(),
      image_type: Joi.string().valid('main', 'detail').required(),
    })
    .unknown(false),
};
const deleteImage = {
  params: Joi.object()
    .keys({
      id: Joi.string(),
      image_type: Joi.string().valid('main', 'detail').required(),
    })
    .unknown(false),
};

module.exports = {
  getProduct,
  getProducts,
  deleteProduct,
  createProduct,
  patchProduct,
  addImage,
  deleteImage,
};
