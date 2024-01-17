import axios from "axios";

// 로그인
export const getUser = async ({ email, password }) => {
  try {
    const getItem = { id: email, password: password };
    const response = await axios.post("/api/auth/login", getItem, {
      withCredentials: true,
    });

    return response.data;
  } catch (err) {
    if (err.response.status === 404) {
      return "no user";
    }
    throw new Error(err);
  }
};

// 유저정보 보내기 (회원가입)
export const postUser = async ({ name, password, email }) => {
  try {
    const newItem = { name, password, email };
    const response = await axios.post("/api/auth/join", newItem, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

// 로그아웃
export const logout = async () => {
  try {
    const response = await axios.get("/api/auth/logout");
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};
