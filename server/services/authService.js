const { User } = require('../models');
const hash = require('../utils/hash-password');
const httpStatus = require('http-status');
const APIError = require('../utils/ApiError');

//로그인
const login = async (userBody) => {
  if (userBody['id'].length < 1 || userBody['password'] < 1) {
    throw new APIError(
      httpStatus.NO_CONTENT,
      'Login user data is Inconsistent data'
    );
  }

  const { id, password } = userBody;

  const user = await User.findOne({ email: id });
  const hashedPassword = hash(password);

  if (!user) {
    return 'User is not Exist.';
  }

  if (user.password !== hashedPassword) {
    return 'INCORRECT';
  }

  return user;
};

//회원가입
const join = async (userBody) => {
  if (
    userBody['name'].length < 1 ||
    userBody['password'].length < 1 ||
    userBody['email'].length < 1
  ) {
    throw new APIError(httpStatus.NO_CONTENT, 'User data is Inconsistent data');
  }

  const isExistEmail = await User.findOne({ email: userBody['email'] });

  if (isExistEmail) {
    return 'EXIST';
  }

  const data = {
    name: userBody['name'],
    password: hash(userBody['password']),
    email: userBody['email'],
  };

  const newUser = await User.create(data);
  return newUser;
};

module.exports = {
  join,
  login,
};
