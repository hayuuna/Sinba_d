import axios from 'axios';

// 사용자 정보 가져오기
export const getUser = async (email) => {
  try {
    const response = await axios.get(`/api/user/${email}`);
    return response.data;
  } catch (err) {
    if (err.message === 'Request failed with status code 504') {
      return 'no user';
    }
    throw new Error(err);
  }
};

// 정보 수정하기
export const updateUserInfo = async ({ id, name, password }) => {
  try {
    const updateData = { name, password };
    const response = await axios.patch(`/api/user/${id}`, updateData, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

// 사용자 탈퇴하기
export const withDrawUser = async (id) => {
  try {
    const response = await axios.delete(`/api/user/${id}`);

    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};
