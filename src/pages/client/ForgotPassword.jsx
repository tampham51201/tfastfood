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

const ForgetPassword = () => {
  const history = useHistory();
  const [login, setLogin] = useState({
    email: "",

    message: "",
  });

  const handleInput = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: login.email,
    };
    axiosClient.get(`/sanctum/csrf-cookie`).then((response) => {
      authApi.forgotPassword(data).then((res) => {
       
        if (res.data.status === "We have emailed your password reset link!")
       {
      swal(
            "Thành Công",
            "Chúng tôi đã gửi email liên kết đặt lại mật khẩu của bạn!",
            "success"
          );
          history.push("/login")
       }  
        else {
          swal("Thành Công", res.data.status, "success");
        }

        // else {
        //   if (res.data.status === 401) {
        //     swal("Warning", res.data.message, "warning");
        //   } else {
        //     setLogin({ ...login, message: res.data.validation_errors });
        //   }
        // }
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
            <h3>Đặt Lại Mật Khẩu</h3>
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
              value={login.email}
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

export default ForgetPassword;
