import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import swal from "sweetalert";
import InputItem from "../../components/client/InputItem";
import authApi from "../../api/authApi";
import axiosClient from "../../api/axiosClient";
import "antd/dist/antd.css";
import logo from "../../assets/Image/footer-logo_1.png";
import Helmet from "../../components/Helmet";

const ResetPassword = (props) => {
  // let slug = props.match.params.slug;
  var emailText = props.match.params.emailUser;
  var tokenText = props.match.params.token;

  const history = useHistory();
  const [login, setLogin] = useState({
    password: "",
    password_confirmation: "",

    message: [],
  });

  const handleInput = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      password: login.password,
      password_confirmation: login.password_confirmation,
      token: tokenText,
      email: emailText,
    };

    console.log(data);
    axiosClient.get(`/sanctum/csrf-cookie`).then((response) => {
      authApi.resetForgotPassword(data).then((res) => {
        console.log(res.data);
        if (res.data.status === 200) {
          swal("Success", res.data.message, "success");
          
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
          <div className="auth__title" style={{ marginBottom: "4rem" }}>
            <h3>Lấy Lại Mật Khẩu</h3>
            <p>Vui Lòng Nhập Email Để Xác Nhận!</p>
          </div>
          <form className="auth__form" onSubmit={handleSubmit}>
            <InputItem
              label="Email"
              placeholder="Nhập Email Của Bạn"
              type="text"
              icon="bx bx-user"
              name="email"
              onChange={handleInput}
              value={emailText}
              //   message={login.message.username}
            />
            <InputItem
              label="Mật Khẩu Mới"
              placeholder="Nhập mật khẩu mới"
              icon="bx bx-lock-alt"
              type="password"
              name="password"
              onChange={handleInput}
              value={login.password}
              icon="bx bx-lock-alt"
              //   message={login.message.username}
            />
            <InputItem
              label="Xác Nhận Mật Khẩu"
              placeholder="Nhập mật khẩu mới xác nhận"
              type="password"
              icon="bx bx-user"
              name="password_confirmation"
              onChange={handleInput}
              icon="bx bx-lock-alt"
              value={login.password_confirmation}
              //   message={login.message.username}
            />

            <button type="submit" className="auth__form__submit">
              Xác Nhận
            </button>
          </form>
          <div className="auth__bottom" style={{ marginTop: "0rem" }}>
            <Link to="/login">
              <button
                type="button"
                className="auth__form__submit"
                style={{ backGround: "white" }}
              >
                Đăng Nhập
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default ResetPassword;
