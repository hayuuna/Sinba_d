const jwt = require('jsonwebtoken');

exports.setUserToken = (res, user) => {
  // 유저 jwt 토큰 생성
  const token = jwt.sign(user, process.env.JWT_SECRETE_KEY);

  // 토큰을 쿠키로 전달
  res.cookie('token', token);
};
