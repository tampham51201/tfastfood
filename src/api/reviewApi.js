import axiosClient from "./axiosClient";

const reviewApi = {
  addReview: (data) => {
    const url = "/api/store-review";
    return axiosClient.post(url, data);
  },
};

export default reviewApi;
