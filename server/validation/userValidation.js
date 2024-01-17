const Joi = require('joi');

// 사용자 정보 요청 시 검증 데이터
const userInfo = {
  params: Joi.object()
    .keys({
      id: Joi.string().min(1).required(),
    })
    .unknown(false),
};

const withDraw = {
  params: Joi.object()
    .keys({
      id: Joi.string().min(1).required(),
    })
    .unknown(false),
};

const updateUserInfo = {
  body: Joi.object()
    .keys({
      name: Joi.string().min(1).required(),
      password: Joi.string().required(),
    })
    .unknown(false),
  params: Joi.object()
    .keys({
      id: Joi.string().min(1).required(),
    })
    .unknown(false),
};

module.exports = {
  userInfo,
  withDraw,
  updateUserInfo,
};
