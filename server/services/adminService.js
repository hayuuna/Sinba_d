const { User, Order } = require('../models');
const httpStatus = require('http-status');
const APIError = require('../utils/ApiError');

//사용자 전체 리스트 가져오기
const getUsers = async (id) => {
  if (!isAdmin(id)) {
    throw new APIError(httpStatus.UNAUTHORIZED, 'User is not Admin');
  }

  const users = await User.find({}).then((data) =>
    data.filter((item) => item.role_type !== 'ADMIN')
  );

  return users;
};

// 사용자 주문 정보 목록 가져오기
const getUserOrder = async (id, user_id, order_id) => {
  let data;

  if (!isAdmin(id)) {
    throw new APIError(httpStatus.UNAUTHORIZED, 'User is not Admin');
  }

  if (!(await User.findOne({ email: user_id }))) {
    throw new APIError(httpStatus.NOT_FOUND, 'User is not Exist');
  }

  if (!order_id) {
    data = await Order.find({ user_id });
  } else {
    data = await Order.findOne({ _id: order_id });
  }

  if (!data) {
    throw new APIError(httpStatus.NOT_FOUND, 'Order is not Eixst');
  }

  return data;
};

// 배송 상태 수정하기
const updateDeliveryState = async (id, user_id, order_id, delivery_state) => {
  if (!isAdmin(id)) {
    throw new APIError(httpStatus.UNAUTHORIZED, 'User is not Admin');
  }
  if (!(await User.findOne({ email: user_id }))) {
    throw new APIError(httpStatus.NOT_FOUND, 'User is not Exist');
  }

  const order = await Order.findOne({ _id: order_id });

  if (!order) {
    throw new APIError(httpStatus.NOT_FOUND, 'Order is not Eixst');
  }

  const updatedOrder = Order.updateOne(
    { _id: order_id },
    {
      $set: {
        delivery_state,
      },
    }
  ).exec();

  return updatedOrder;
};

// 사용자 주문 삭제
const deleteUserOrder = async (id, user_id, order_id) => {
  if (!isAdmin(id)) {
    throw new APIError(httpStatus.UNAUTHORIZED, 'User is not Admin');
  }
  if (!(await User.findOne({ email: user_id }))) {
    throw new APIError(httpStatus.NOT_FOUND, 'User is not Exist');
  }

  const order = await Order.findOne({ _id: order_id });

  if (!order) {
    throw new APIError(httpStatus.NOT_FOUND, 'Order is not Eixst');
  }

  const result = Order.deleteOne({ _id: order_id });

  return result;
};

const isAdmin = async (id) => {
  const admin = await User.findOne({ email: id });

  if (!admin || admin.role_type !== 'ADMIN') {
    return false;
  }

  return true;
};

module.exports = {
  getUsers,
  getUserOrder,
  updateDeliveryState,
  deleteUserOrder,
};
