import React from "react";
import { useHistory } from "react-router";
import axiosClient from "../../api/axiosClient";
import swal from "sweetalert";

const Profile = () => {
  const history = useHistory();

  if (!localStorage.getItem("auth_token")) {
    history.push("/");
  }

  const logoutSubmit = (e) => {
    axiosClient.post("api/logout").then((res) => {
      if (res.data.status === 200) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        swal("Success", res.data.message, "success");
        history.push("/");
      }
    });
  };

  return <button onClick={logoutSubmit}>Logout</button>;
};

export default Profile;
