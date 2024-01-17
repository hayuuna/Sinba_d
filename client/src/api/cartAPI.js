import axios from 'axios';

// 주문하기
export const newOrder = async ({
  id,
  items,
  address,
  addressDetail,
  total_price,
}) => {
  try {
    const getItem = {
      id,
      items,
      address,
      addressDetail,
      total_price: total_price.toString(),
    };
    console.log('API!!!', getItem);
    const response = await axios.post('/api/order', getItem, {
      withCredentials: true,
    });

    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};
