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

  getAll: () => {
    const url = `/api/view-users`;
    return axiosClient.get(url);
  },
  getId: (id) => {
    const url = `/api/edit-user/${id}`;
    return axiosClient.get(url);
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
