import axiosClient from "./axiosClient";

const authApi = {
  postLogin: (data) => {
    const url = "/api/login";
    return axiosClient.post(url, data);
  },
  postRegister: (data) => {
    const url = `/api/register`;
    return axiosClient.post(url, data);
  },
  postLogout: () => {
    const url = `/api/logout`;
    return axiosClient.post(url);
  },
};

export default authApi;
