const Joi = require('joi');

// 회원가입 시 검증 데이터
const join = {
  body: Joi.object()
    .keys({
      name: Joi.string().min(1).required(),
      email: Joi.string().min(1).required(),
      password: Joi.string().min(1).required(),
    })
    .unknown(false),
};

//로그인시 검증 데이터
const login = {
  body: Joi.object()
    .keys({
      id: Joi.string().min(1).required(),
      password: Joi.string().min(1).required(),
    })
    .unknown(false),
};

module.exports = {
  join,
  login,
};
