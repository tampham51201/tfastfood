import axiosClient from "./axiosClient";

const productApi = {
  getAll: () => {
    const url = "/api/view-product";
    return axiosClient.get(url);
  },
  getAllStatus: () => {
    const url = "/api/view-product-status";
    return axiosClient.get(url);
  },
  getId: (id) => {
    const url = `/api/edit-product/${id}`;
    return axiosClient.get(url);
  },

  getSlug: (slug) => {
    const url = `/api/slug-product/${slug}`;
    return axiosClient.get(url);
  },

  getStatus: () => {
    const url = `/api/all-product`;
    return axiosClient.get(url);
  },

  addProduct: (data) => {
    const url = "/api/store-product";
    return axiosClient.post(url, data);
  },

  Update: (id, data) => {
    const url = `/api/update-product/${id}`;
    return axiosClient.post(url, data);
  },

  Delete: (id) => {
    const url = `/api/delete-product/${id}`;
    return axiosClient.delete(url);
  },
};

export default productApi;
