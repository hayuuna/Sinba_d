const { User } = require('../models');
const httpStatus = require('http-status');
const hash = require('../utils/hash-password');
const APIError = require('../utils/ApiError');

//사용자 정보 가져오기
const getUserInfo = async (userParams) => {
  const user = await User.findOne({ email: userParams.id }).exec();

  if (!user) {
    throw new APIError(httpStatus.NOT_FOUND, 'User is not exist.');
  }
  return user;
};

// 사용자 회원 탈퇴
const deleteUser = async (userParams) => {
  const deleteUser = await User.findOne({ email: userParams.id }).exec();

  if (!deleteUser) {
    throw new APIError(httpStatus.NOT_FOUND, 'User is not exist.');
  }

  const result = await User.deleteOne({ _id: deleteUser._id });

  return { result, deleteUser };
};

// 사용자 정보 업데이트
const updateUser = async (request) => {
  const { id } = request.params;
  const data = request.body;

  const user = await User.findOne({ email: id }).exec();

  if (!user) {
    throw new APIError(httpStatus.NOT_FOUND, 'User is not exist.');
  }

  const updatedUser = User.updateOne(
    { _id: user._id },
    {
      $set: {
        name: data.name,
        password: hash(data.password),
      },
    }
  ).exec();

  return updatedUser;
};

module.exports = {
  getUserInfo,
  deleteUser,
  updateUser,
};
