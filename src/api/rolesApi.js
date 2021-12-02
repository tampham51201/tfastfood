import axiosClient from "./axiosClient";

const rolesApi = {
  getAll: () => {
    const url = `/api/roles`;
    return axiosClient.get(url);
  },
};

export default rolesApi;
