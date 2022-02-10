import axiosClient from "./axiosClient";

const infoShopApi = {
  getInfo: () => {
    const url = `/api/get-infoshop`;
    return axiosClient.get(url);
  },

  Update: (data) => {
    const url = `/api/update-infoshop`;
    return axiosClient.post(url, data);
  },
};

export default infoShopApi;
