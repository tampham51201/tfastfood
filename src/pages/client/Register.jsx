import React, { useState } from "react";
import { Link } from "react-router-dom";

import InputItem from "../../components/client/InputItem";
import { useHistory } from "react-router";
import swal from "sweetalert";
import authApi from "../../api/authApi";
import axiosClient from "../../api/axiosClient";
import logo from "../../assets/Image/footer-logo_1.png";

const Register = () => {
  const history = useHistory();
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    message: [],
  });
  const handleInput = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: register.username,
      email: register.email,
      password: register.password,
      confirm_password: register.confirm_password,
    };

    axiosClient.get(`/sanctum/csrf-cookie`).then((response) => {
      authApi.postRegister(data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);
          swal("Success", res.data.message, "success");
          history.push("/");
        } else {
          setRegister({ ...register, message: res.data.validation_errors });
        }
      });
    });
  };

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="auth__title">
          <h3>Register</h3>
          <p>Please register to continue!</p>
        </div>
        <form className="auth__form">
          <InputItem
            label="Username"
            placeholder="Type your username"
            type="text"
            icon="bx bx-user"
            name="username"
            onChange={handleInput}
            value={register.username}
            message={register.message.username}
          />
          <InputItem
            label="Email"
            placeholder="Type your email"
            type="email"
            icon="bx bx-envelope"
            name="email"
            onChange={handleInput}
            value={register.email}
            message={register.message.email}
          />
          <InputItem
            label="Password"
            placeholder="Type your password"
            type="password"
            icon="bx bx-lock-alt"
            name="password"
            onChange={handleInput}
            value={register.password}
            message={register.message.password}
          />
          <InputItem
            label="Confirm Password"
            placeholder="Type your confirm password"
            type="password"
            icon="bx bx-lock-alt"
            name="confirm_password"
            onChange={handleInput}
            value={register.confirm_password}
            message={register.message.confirm_password}
          />
          <button className="auth__form__submit" onClick={registerSubmit}>
            CREATE
          </button>
        </form>
        <div className="auth__bottom">
          <p>
            Do you already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
