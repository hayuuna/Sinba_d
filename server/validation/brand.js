const Joi = require('joi');

const getBrand = {
  params: Joi.object()
    .keys({
      id: Joi.string().length(24).required(),
    })
    .unknown(false),
};

const getBrands = {};

const createBrand = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const deleteBrand = {
  params: Joi.object()
    .keys({
      id: Joi.string().length(24).required(),
    })
    .unknown(false),
};

module.exports = {
  getBrand,
  getBrands,
  createBrand,
  deleteBrand,
};
