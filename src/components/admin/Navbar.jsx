import React, { useRef } from "react";

import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import axiosClient from "../../api/axiosClient";

const Navbar = () => {
  const refAuth = useRef(null);
  const history = useHistory();
  let authButton = "";
  const handleLogout = () => {
    axiosClient.post("api/logout").then((res) => {
      if (res.data.status === 200) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        history.push("/login");
        swal("Success", res.data.message, "success");
      }
    });
  };

  const handleAuth = () => {
    refAuth.current.classList.toggle("active");
  };

  if (localStorage.getItem("auth_token")) {
    authButton = (
      <ul className="navbar__right__auth" ref={refAuth}>
        <Link to="/profile">
          <li className="navbar__right__auth__item">
            <i className="bx bx-user"></i>Profile
          </li>
        </Link>
        <Link to="/">
          <li className="navbar__right__auth__item">
            <i className="bx bx-log-in"></i>Home
          </li>
        </Link>
        <li className="navbar__right__auth__item" onClick={handleLogout}>
          <i className="bx bx-log-out"></i>Logout
        </li>
      </ul>
    );
  }

  return (
    <div>
      <div className="navbar">
        <div className="navbar__search">
          <i className="bx bx-search"></i>
          <input type="text" placeholder="Search anything" />
        </div>
        <div className="navbar__right">
          <div className="navbar__right__item">
            <i className="bx bxs-bell"></i>
            <div className="navbar__right__item__quantity">4</div>
          </div>
          <div className="navbar__right__item">
            <i className="bx bxs-envelope"></i>
            <div className="navbar__right__item__quantity">4</div>
          </div>
          <div
            className="navbar__right__profile"
            onClick={authButton !== "" ? handleAuth : null}
          >
            <div className="navbar__right__profile__logo">
              <i className="bx bx-user"></i>
            </div>
            tampham512
            <i className="bx bx-chevron-down"></i>
            {authButton}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
