import axiosClient from "./axiosClient";

const bannerApi = {
  getAll: () => {
    const url = "/api/view-banner";
    return axiosClient.get(url);
  },

  getId: (id) => {
    const url = `/api/edit-banner/${id}`;
    return axiosClient.get(url);
  },

  addBanner: (data) => {
    const url = "/api/store-banner";
    return axiosClient.post(url, data);
  },

  Update: (id, data) => {
    const url = `/api/update-banner/${id}`;
    return axiosClient.post(url, data);
  },

  Delete: (id) => {
    const url = `/api/delete-banner/${id}`;
    return axiosClient.delete(url);
  },
};

export default bannerApi;
