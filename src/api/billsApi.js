import axiosClient from "./axiosClient";

const billsApi = {
  getAll: () => {
    const url = "/api/view-bill";
    return axiosClient.get(url);
  },

  getId: (id) => {
    const url = `/api/get-bill/${id}`;
    return axiosClient.get(url);
  },

  getIdDetails: (id) => {
    const url = `/api/get-bill-detail/${id}`;
    return axiosClient.get(url);
  },

  getBillDayPrice: (data) => {
    const url = `/api/view-bill-order`;
    return axiosClient.post(url, data);
  },

  getBillUser: () => {
    const url = `/api/get-bill-user`;
    return axiosClient.get(url);
  },

  getAllGroupBy: () => {
    const url = `/api/get-bill-group`;
    return axiosClient.get(url);
  },
  getStatus: () => {
    const url = `/api/all-category`;
    return axiosClient.get(url);
  },

  addBill: (data) => {
    const url = "/api/store-bill";
    return axiosClient.post(url, data);
  },

  Update: (id, data) => {
    const url = `/api/update-category/${id}`;
    return axiosClient.put(url, data);
  },
  UpdateStatus: (data) => {
    const url = `/api/update-bill-status`;
    return axiosClient.post(url, data);
  },

  Delete: (id) => {
    const url = `/api/delete-category/${id}`;
    return axiosClient.delete(url);
  },
};

export default billsApi;
