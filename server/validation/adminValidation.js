const Joi = require('joi');

// 사용자 목록 요청 시 검증 데이터
const getUsers = {
  params: Joi.object()
    .keys({
      id: Joi.string().min(1).required(),
    })
    .unknown(false),
};

// 사용자 주문 정보 가져오기 (목록/특정 정보)
const getUserOrder = {
  params: Joi.object()
    .keys({
      id: Joi.string().min(1).required(),
      user_id: Joi.string().min(1).required(),
    })
    .unknown(false),
};

// 사용자 배송 상태 변경
const updateDeliveryState = {
  params: Joi.object()
    .keys({
      id: Joi.string().min(1).required(),
      user_id: Joi.string().min(1).required(),
    })
    .unknown(false),
  body: Joi.object()
    .keys({
      delivery_state: Joi.string().min(1).required(),
    })
    .unknown(false),
};

const deleteUserOrder = {
  params: Joi.object()
    .keys({
      id: Joi.string().min(1).required(),
      user_id: Joi.string().min(1).required(),
    })
    .unknown(false),
  query: Joi.object()
    .keys({
      order_id: Joi.string().min(1).required(),
    })
    .unknown(false),
};

module.exports = {
  getUsers,
  getUserOrder,
  updateDeliveryState,
  deleteUserOrder,
};
