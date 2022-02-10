import axiosClient from "./axiosClient";

const discountApi = {
  getAll: () => {
    const url = "/api/view-discount";
    return axiosClient.get(url);
  },

  getId: (id) => {
    const url = `/api/edit-discount/${id}`;
    return axiosClient.get(url);
  },

  addDiscount: (data) => {
    const url = "/api/store-discount";
    return axiosClient.post(url, data);
  },

  Update: (id, data) => {
    const url = `/api/update-discount/${id}`;
    return axiosClient.post(url, data);
  },

  Delete: (id) => {
    const url = `/api/delete-discount/${id}`;
    return axiosClient.delete(url);
  },
};

export default discountApi;
