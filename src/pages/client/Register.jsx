import React, { useState } from "react";
import { Link } from "react-router-dom";

import InputItem from "../../components/client/InputItem";
import { useHistory } from "react-router";
import swal from "sweetalert";
import authApi from "../../api/authApi";
import axios from "axios";
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

    axios
      .get(`${process.env.REACT_APP_API_URL}/sanctum/csrf-cookie`)
      .then((response) => {
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
          <h3>Tạo Tài Khoản</h3>
          <p>Vui lòng tạo tài khoản để tiếp tục!</p>
        </div>
        <form className="auth__form">
          <InputItem
            label="Tên Đăng Nhập"
            placeholder="Nhập tên đăng nhập của bạn"
            type="text"
            icon="bx bx-user"
            name="username"
            onChange={handleInput}
            value={register.username}
            message={register.message.username}
          />
          <InputItem
            label="Email"
            placeholder="Nhập email của bạn"
            type="email"
            icon="bx bx-envelope"
            name="email"
            onChange={handleInput}
            value={register.email}
            message={register.message.email}
          />
          <InputItem
            label="Mật Khẩu"
            placeholder="Nhập mật khẩu của bạn"
            type="password"
            icon="bx bx-lock-alt"
            name="password"
            onChange={handleInput}
            value={register.password}
            message={register.message.password}
          />
          <InputItem
            label="Xác Nhận Mật Khẩu"
            placeholder="Nhập mật khẩu xác nhận của bạn"
            type="password"
            icon="bx bx-lock-alt"
            name="confirm_password"
            onChange={handleInput}
            value={register.confirm_password}
            message={register.message.confirm_password}
          />
          <button className="auth__form__submit" onClick={registerSubmit}>
            Đăng Kí
          </button>
        </form>
        <div className="auth__bottom">
          <p>
            Bạn đã có tài khoản? <Link to="/login">Đăng Nhập</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
