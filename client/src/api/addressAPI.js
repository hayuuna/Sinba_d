import axios from 'axios';

// 주소 수정하기
export const updateAddress = async ({ id, address, addressDetail }) => {
  try {
    const updateData = { address, addressDetail };
    const response = await axios.patch(`/api/order/${id}`, updateData, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};
