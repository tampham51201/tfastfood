import axiosClient from "./axiosClient";

const commentApi = {
  addComment: (data) => {
    const url = "/api/store-comment";
    return axiosClient.post(url, data);
  },
  addRelyComment: (data) => {
    const url = "/api/store-reply-comment";
    return axiosClient.post(url, data);
  },
  getAll: () => {
    const url = "/api/view-comment";
    return axiosClient.get(url);
  },
};

export default commentApi;
