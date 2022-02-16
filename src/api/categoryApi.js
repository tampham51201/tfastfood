import axiosClient from "./axiosClient";

const categoryApi = {
  getAll: () => {
    const url = "/api/view-category";
    return axiosClient.get(url);
  },

  getId: (id) => {
    const url = `/api/edit-category/${id}`;
    return axiosClient.get(url);
  },

  getSlug: (slug) => {
    const url = `/api/slug-category/${slug}`;
    return axiosClient.get(url);
  },
  getStatus: () => {
    const url = `/api/all-category`;
    return axiosClient.get(url);
  },

  addCategory: (data) => {
    const url = "/api/store-category";
    return axiosClient.post(url, data);
  },

  Update: (id, data) => {
    const url = `/api/update-category/${id}`;
    return axiosClient.put(url, data);
  },

  Delete: (id) => {
    const url = `/api/delete-category/${id}`;
    return axiosClient.delete(url);
  },
};

export default categoryApi;
