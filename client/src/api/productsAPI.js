// 업데이트 메시지, 제품정보
// FIXME api요청주소 BASE_URL/api로 변경
import axios from 'axios';

// // get response:
const API_BASE_URL = '';
export const getProducts = async (categories, page) => {
  try {
    let query = { params: { page: page || 1 } };

    if (categories.length) {
      query['params']['category_id'] = categories;
    }
    const response = await axios.get(`${API_BASE_URL}/api/products`, query);

    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getProduct = async (id) => {
  try {
    const response = await axios.get(`/api/products/${id}`);

    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const addProduct = async (newProduct) => {
  try {
    const response = await axios.post(
      '/api/products',
      JSON.stringify(newProduct),
      { headers: { 'Content-Type': 'application/json' } }
    );

    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const updateProduct = async (id, updatedItem) => {
  try {
    console.log();
    console.log('???', updatedItem);
    console.log('제목', updatedItem.title);
    const response = await axios.patch(
      `/api/products/${id}`,
      JSON.stringify(updatedItem),
      { headers: { 'Content-Type': 'application/json' } }
    );

    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`/api/products/${id}`);

    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getBrands = async () => {
  try {
    const response = await axios.get('/api/brand');

    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};
