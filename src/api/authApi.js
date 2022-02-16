import axiosClient from "./axiosClient";

const authApi = {
  getUser: () => {
    const url = `/api/users`;
    return axiosClient.get(url);
  },

  addUser: (data) => {
    const url = `/api/store-user`;
    return axiosClient.post(url, data);
  },

  forgotPassword: (data) => {
    const url = `/api/forgot-password`;
    return axiosClient.post(url, data);
  },

  resetForgotPassword: (data) => {
    const url = `/api/reset-password`;
    return axiosClient.post(url, data);
  },

  updateUser: (data) => {
    const url = `/api/update-customer`;
    return axiosClient.post(url, data);
  },
  resetPassword: (data) => {
    const url = `//api/reset-pass-customer`;
    return axiosClient.post(url, data);
  },
  getAll: () => {
    const url = `/api/view-users`;
    return axiosClient.get(url);
  },
  getId: (id) => {
    const url = `/api/edit-user/${id}`;
    return axiosClient.get(url);
  },
  Update: (id, data) => {
    const url = `/api/update-user/${id}`;
    return axiosClient.post(url, data);
  },
  Delete: (id) => {
    const url = `/api/delete-user/${id}`;
    return axiosClient.delete(url);
  },

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
