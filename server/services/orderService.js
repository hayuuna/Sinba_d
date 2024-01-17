const { Order, User, Product } = require('../models');
const httpStatus = require('http-status');
const APIError = require('../utils/ApiError');
const TIME_ZONE = 9 * 60 * 60 * 1000;

//주문 새로 등록하기
const createOrder = async (orderBody) => {
  if (
    orderBody.id.length < 1 ||
    orderBody.items.length < 1 ||
    orderBody.address.length < 1 ||
    orderBody.addressDetail.length < 1 ||
    orderBody.total_price.length < 1
  ) {
    throw new APIError(
      httpStatus.NO_CONTENT,
      'Order data is Inconsistent data'
    );
  }

  const user = await User.findOne({ email: orderBody.id }).exec();

  if (!user) {
    throw new APIError(httpStatus.NOT_FOUND, 'User is not exist.');
  }

  const orderTime = new Date(Date.now() + TIME_ZONE)
    .toISOString()
    .split('.')[0];

  const data = {
    user_id: orderBody.id,
    items: orderBody.items,
    address: orderBody.address,
    addressDetail: orderBody.addressDetail.length,
    total_price: orderBody.total_price,
    date: orderTime,
  };

  const newOrder = await Order.create(data);

  return newOrder;
};

// 주문 내역 불러오기
const getOrder = async (id, order) => {
  const user = await User.findOne({ email: id }).exec();
  let data;

  if (!user) {
    throw new APIError(httpStatus.NOT_FOUND, 'User is not exist.');
  }

  if (!order) {
    data = await Order.find({ user_id: id });
  } else {
    data = await Order.find({ _id: order });
    if (!data) {
      throw new APIError(httpStatus.NOT_FOUND, 'Order is not exist');
    }
  }

  return data;
};

//주소 수정하기
const updateOrder = async (id, orderBody) => {
  const order = await Order.findOne({ _id: id }).exec();

  if (!order) {
    throw new APIError(httpStatus.NOT_FOUND, 'Order is not exist');
  }

  if (order.delivery_state === '배송중') {
    throw new APIError(httpStatus[500], 'Order Update is denied.');
  }

  const updatedItem = Order.updateOne(
    { _id: id },
    {
      $set: {
        address: orderBody.address,
        addressDetail: orderBody.addressDetail,
      },
    }
  ).exec();

  return updatedItem;
};

// 주문 삭제하기
const deleteOrder = async (id) => {
  const order = await Order.findOne({ _id: id }).exec();

  if (!order) {
    throw new APIError(httpStatus.NOT_FOUND, 'Order is not exist');
  }

  if (order.delivery_state === '배송중') {
    throw new APIError(httpStatus[500], 'Order Update is denied.');
  }

  const result = await Order.deleteOne({ _id: id });

  return result;
};

module.exports = {
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
};
