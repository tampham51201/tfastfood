import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import swal from "sweetalert";
import InputItem from "../../components/client/InputItem";
import authApi from "../../api/authApi";
import axiosClient from "../../api/axiosClient";
import axios from "axios";
import "antd/dist/antd.css";
import logo from "../../assets/Image/footer-logo_1.png";
import Helmet from "../../components/Helmet";

const Login = () => {
  const history = useHistory();
  const [login, setLogin] = useState({
    username: "",
    password: "",
    message: [],
  });

  const handleInput = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: login.username,
      password: login.password,
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}/sanctum/csrf-cookie`)
      .then((response) => {
        authApi.postLogin(data).then((res) => {
          console.log(res);
          if (res.data.status === 200) {
            localStorage.setItem("auth_token", res.data.token);
            localStorage.setItem("auth_name", res.data.username);
            swal("Success", res.data.message, "success");
            history.push("/");
          } else {
            if (res.data.status === 401) {
              swal("Warning", res.data.message, "warning");
            } else {
              setLogin({ ...login, message: res.data.validation_errors });
            }
          }
        });
      });
  };
  return (
    <Helmet title="Login">
      <div className="auth">
        <div className="auth__container">
          <div className="auth__logo">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className="auth__title">
            <h3>Đăng Nhập</h3>
            <p>Vui Lòng Đăng Nhập Để Tiếp Tục!</p>
          </div>
          <form className="auth__form" onSubmit={handleSubmit}>
            <InputItem
              label="Email hoặc tên đăng nhập"
              placeholder="Nhập email hoặc tên đăng nhập của bạn"
              type="text"
              icon="bx bx-user"
              name="username"
              onChange={handleInput}
              value={login.username}
              message={login.message.username}
            />
            <InputItem
              label="Mật Khẩu"
              placeholder="Mật khẩu của bạn"
              type="password"
              icon="bx bx-lock-alt"
              name="password"
              onChange={handleInput}
              value={login.password}
              message={login.message.password}
            />

            <div className="auth__form__forgot">
              <Link to="/forgot-password">Quên Mật Khẩu?</Link>
            </div>
            <button type="submit" className="auth__form__submit">
              Đăng Nhập
            </button>
          </form>
          <div className="auth__bottom">
            Bạn Chưa Có Tài Khoản? <Link to="/register">Tạo Tài Khoản</Link>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default Login;
