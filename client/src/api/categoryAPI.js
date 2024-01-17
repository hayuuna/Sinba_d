import axios from 'axios';

// 카테고리 목록 불러오기
export const getCategory = async () => {
  try {
    const response = await axios.get('/api/category');
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

//카테고리 1개 불러오기
export const getCategoryById = async (id) => {
  try {
    const response = await axios.get(`/api/category/1/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

// 카테고리 보내기
export const postCategory = async ({ name, parentCategory, categoryType }) => {
  try {
    const newItem = { name, parentCategory, categoryType };
    const response = await axios.post('/api/category', newItem);

    return response;
  } catch (err) {
    throw new Error(err);
  }
};

//  카테고리 지우기
export const deleteCategory = async ({ _id }) => {
  try {
    const response = await axios.delete(`/api/category/${_id}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

// 카테고리 업데이트

export const updateCategory = async ({
  id,
  name,
  parentCategory,
  categoryType,
}) => {
  try {
    const updateData = { id, name, parentCategory, categoryType };

    const response = await axios.patch(`/api/category`, updateData);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

// 대분류 카테고리 불러오기
export const getBigCategory = async () => {
  try {
    const response = await axios.get('/api/category/-1');
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

// 카테고리 소분류(대분류ID)
export const getChildCategory = async (parentCategoryId) => {
  try {
    const response = await axios.get(`/api/category/${parentCategoryId}`);
    console.log(response.data);

    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};
