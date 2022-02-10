import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../redux/user/userSlice";
import {
  Form,
  Input,
  Button,
  Select,
  notification,
  Radio,
  DatePicker,
} from "antd";
import { Link } from "react-router-dom";

import moment from "moment";

import Helmet from "../../components/Helmet";
import Breadcrumb from "../../components/client/Breadcrumb ";
import authApi from "../../api/authApi";

const Profile = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const refProfile = useRef(null);
  const refPassword = useRef(null);
  const [isControl, setIsControl] = useState(1);

  const init = {
    confirm_pass_erorr: null,
    old_pass_erorr: null,
  };
  const passwordInit = {
    password_new_confirm: "",
    password_new: "",
    password_old: "",
  };

  const [erorr, setErorr] = useState(init);
  const [password, serPassword] = useState(passwordInit);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  const user = useSelector((state) => state.users.value);

  const handleToggle = (value) => {
    switch (value) {
      case "profile":
        refPassword.current.classList.remove("active");
        refProfile.current.classList.toggle("active");
        setIsControl(1);

        break;
      case "password":
        refProfile.current.classList.remove("active");
        refPassword.current.classList.toggle("active");
        setIsControl(2);
        break;
    }
  };

  useEffect(() => {
    if (user !== null) {
      console.log(user);
      form.setFieldsValue({
        username: user.data.user.username,
        full_name: user.data.user.full_name,
        email: user.data.user.email,
        mobile_phone: user.data.user.phone_number,
        andress: user.data.user.andress,
        gender: user.data.user.gender,
        date_birth: moment(user.data.user.date_birth, "YYYY MM DD"),
      });
    }
  }, [user]);

  const onFinish = (value) => {
    console.log(value);
    const data = {
      ...value,
      date_birth:
        value["date_birth"] !== null
          ? value["date_birth"].format("YYYY-MM-DD")
          : null,
    };
    console.log(data);
    authApi.updateUser(data).then((res) => {
      if (res.data.status === 200) {
        notification.success({
          message: `Thành Công`,
          description: res.data.message,
          duration: 2,
          placement: "topRight",
        });
      }
    });
  };
  const onFinishPassword = (value) => {
    console.log(value);
    authApi.resetPassword(value).then((res) => {
      if (res.data.status === 200) {
        notification.success({
          message: `Thành Công`,
          description: res.data.message,
          duration: 2,
          placement: "topRight",
        });
        form.resetFields();
        setErorr(init);
      } else {
        if (res.data.status === 401) {
          setErorr({
            confirm_pass_erorr: null,
            old_pass_erorr: res.data.errors,
          });
        } else {
          setErorr({
            old_pass_erorr: null,
            confirm_pass_erorr: res.data.errors,
          });
        }
      }
    });
  };
  console.log(erorr.old_pass_erorr);

  return (
    <>
      <Helmet title="Tài Khoản">
        <Breadcrumb>
          <Link to="/">Trang Chủ</Link> / <Link to="/profile"> Tài Khoản</Link>
        </Breadcrumb>
        <div className="profile content">
          <div className="profile__title">
            <h2>Hồ Sơ Của Tôi</h2>
            <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
          </div>
          <div className="profile__content">
            <div
              className="profile__content__header"
              onClick={() => handleToggle("profile")}
            >
              <h3>Thông Tin Cá Nhân</h3>
              <i className="bx bx-plus"></i>
              {/* <i class='bx bx-minus' ></i> */}
            </div>
            <div className="profile__content__form active" ref={refProfile}>
              {isControl === 1 ? (
                <Form
                  name="category_add"
                  className="profile__content__form__box"
                  size="large"
                  form={form}
                  labelCol={{ span: 3 }}
                  wrapperCol={{ span: 22 }}
                  // layout="vertical"
                  style={{ width: "100%", marginTop: "3rem" }}
                  color="primary"
                  initialValues={{ status: true }}
                  onFinish={onFinish}
                >
                  <Form.Item label="Tên Đăng Nhập" name="username">
                    <Input disabled />
                  </Form.Item>
                  <Form.Item label="Tên " name="full_name">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Email " name="email">
                    <Input disabled />
                  </Form.Item>
                  <Form.Item label="Số Điện Thoại " name="mobile_phone">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Địa Chỉ" name="andress">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Giới Tính " name="gender">
                    <Radio.Group>
                      <Radio value={1}>Nam</Radio>
                      <Radio value={0}>Nữ</Radio>
                      <Radio value={3}>Khác</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item label="Ngày Sinh" name="date_birth">
                    <DatePicker
                      format="DD-MM-YYYY"
                      placeholder="Chọn Ngày Sinh"
                    />
                  </Form.Item>
                  <Form.Item label=" ">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      style={{
                        width: "10rem",
                        backgroundColor: "rgb(224, 45, 45)",
                        borderColor: "rgb(224, 45, 45)",
                      }}
                    >
                      Lưu
                    </Button>
                  </Form.Item>{" "}
                </Form>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="profile__content">
            <div
              className="profile__content__header"
              onClick={() => handleToggle("password")}
            >
              <h3>Đổi Mật Khẩu</h3>
              <i className="bx bx-plus"></i>
              {/* <i class='bx bx-minus' ></i> */}
            </div>
            <div className="profile__content__form" ref={refPassword}>
              {isControl === 2 ? (
                <Form
                  name="password_form"
                  className="profile__content__form__box"
                  action="luu"
                  size="large"
                  form={form}
                  labelCol={{ span: 3 }}
                  wrapperCol={{ span: 22 }}
                  // layout="vertical"
                  style={{ width: "100%", marginTop: "3rem" }}
                  color="primary"
                  initialValues={{ status: true }}
                  onFinish={onFinishPassword}
                >
                  <Form.Item
                    label="Mật Khẩu Cũ"
                    name="password_old"
                    validateStatus={
                      erorr.old_pass_erorr !== null ? "error" : null
                    }
                    help={erorr.old_pass_erorr}
                    rules={[
                      {
                        required: true,
                        message: "Vui Lòng Nhập Trường Này!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    label="Mật Khẩu Mới"
                    name="password_new"
                    rules={[
                      {
                        required: true,
                        message: "Vui Lòng Nhập Trường Này!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    label="Xác Nhận Mật Khẩu "
                    name="password_new_confirm"
                    validateStatus={
                      erorr.confirm_pass_erorr !== null ? "error" : null
                    }
                    help={erorr.confirm_pass_erorr}
                    rules={[
                      {
                        required: true,
                        message: "Vui Lòng Nhập Trường Này!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item label=" ">
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{
                        width: "10rem",
                        backgroundColor: "rgb(224, 45, 45)",
                        borderColor: "rgb(224, 45, 45)",
                      }}
                    >
                      Xác Nhận
                    </Button>
                  </Form.Item>{" "}
                </Form>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </Helmet>
    </>
  );
};

export default Profile;
