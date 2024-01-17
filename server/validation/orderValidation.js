const Joi = require('joi');

// 사용자 주문 등록 시 검증 데이터
const newOrder = {
  body: Joi.object()
    .keys({
      id: Joi.string().min(1).required(),
      items: Joi.array().min(1).required(),
      total_price: Joi.string().min(1).required(),
      address: Joi.string().min(1).required(),
      addressDetail: Joi.string().min(1).required(),
    })
    .unknown(false),
};

const getOrder = {
  params: Joi.object()
    .keys({
      id: Joi.string().min(1).required(),
    })
    .unknown(false),
};

const updateOrder = {
  body: Joi.object()
    .keys({
      address: Joi.string().min(1).required(),
      addressDetail: Joi.string().min(1).required(),
    })
    .unknown(false),
  params: Joi.object()
    .keys({
      id: Joi.string().min(1).required(),
    })
    .unknown(false),
};

const deleteOrder = {
  params: Joi.object()
    .keys({
      id: Joi.string().min(1).required(),
    })
    .unknown(false),
};

module.exports = {
  newOrder,
  updateOrder,
  getOrder,
  deleteOrder,
};
