import axios from 'axios';

// 유저정보 목록 불러오기
export const getUserOrderList = async (email) => {
  try {
    const response = await axios.get(`/api/order/${email}`);
    let orderList = response.data;
    if (orderList.length >= 1) {
      for (let order of orderList) {
        const productId = order.items[0];
        const imgSrc = await axios
          .get(`/api/products/${productId}`)
          .then((res) => {
            const imgSrc = res.data.main_images[0].url;
            return imgSrc;
          })
          .catch((err) => {
            console.log(err);
            const imgSrc = '없음';
            return imgSrc;
          });
        order['imgUrl'] = imgSrc;
      }
    }
    console.log('-->', orderList);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

// 주문 삭제하기
export const deleteOrder = async (order_id) => {
  try {
    const response = await axios.delete(`/api/order/${order_id}`);

    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getImage = async (id) => {
  try {
    const response = await axios.get(`/api/products/${id}`);

    console.log(response.data);

    // return response.data;
  } catch (err) {
    throw new Error(err);
  }
};
