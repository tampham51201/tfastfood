import React, { useState, useEffect } from "react";
import Helmet from "../../components/Helmet";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../../redux/shopping-cart/cartItemsSlice";

import { getUser } from "../../redux/user/userSlice";

// import numberWithCommas from "../utils/numberWithCommas";
import { Link } from "react-router-dom";

import {
  Form,
  Input,
  Switch,
  notification,
  Select,
  Upload,
  DatePicker,
  Spin,
} from "antd";

import Button from "../../components/client/Button";
import CartItem from "../../components/client/CartItem";
import productApi from "../../api/productApi";
import Loading from "../Loading";
import Breadcrumb from "../../components/client/Breadcrumb ";
import numberWithCommas, {
  numberWithCommasTotal,
} from "../../utils/numberWithCommas";
import billsApi from "../../api/billsApi";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Checkout = () => {
  const [form] = Form.useForm();
  const baseURL = "http://localhost:8000";
  const cartItemsAll = useSelector((state) => state.shoppingCart.value);

  const history = useHistory();

  const [cartProduct, setCartProduct] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  const [totalProduct, setTotalProduct] = useState(0);

  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    return dispatch(getUser());
  }, [dispatch]);
  const user = useSelector((state) => state.users.value);

  // const getProductSlug = (slug) => products.find((e) => e.slug === slug);
  useEffect(() => {
    var newCartItems = [];
    if (!localStorage.getItem("auth_token")) {
      newCartItems = cartItemsAll.filter((item) => item.idUser === 0);
    } else {
      if (user !== null) {
        newCartItems = cartItemsAll.filter(
          (item) => item.idUser === user.data.user.id
        );

        form.setFieldsValue({
          full_name: user.data.user.full_name,
          email: user.data.user.email,
          mobile_phone: user.data.user.phone_number,
          andress: user.data.user.andress,
        });
      }
    }
    setCartItems(newCartItems);
  }, [cartItemsAll, user]);

  useEffect(() => {
    productApi.getAll().then((res) => {
      if (res.data.status === 200) {
        const newProduct = res.data.product;
        setProducts(newProduct);
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    let res = [];
    if (cartItems.length > 0) {
      cartItems.forEach((item) => {
        res.push({
          ...item,
          product: products.find((e) => e.slug === item.slug),
        });
      });
    }
    setCartProduct(res);
    setTotalProduct(
      cartItems.reduce((total, item) => total + Number(item.quantity), 0)
    );
    setTotalPrice(
      cartItems.reduce(
        (total, item) => total + Number(item.quantity) * Number(item.price),
        0
      )
    );
  }, [cartItems, products]);
  const onFinish = (value) => {
    const data = {
      ...value,
      id_user: user === null || user.data === "" ? "0" : user.data.user.id,
      product_list: cartProduct,
      total_price: totalPrice + 15000,
    };

    billsApi.addBill(data).then((res) => {
      if (res.data.status == 200) {
        notification.success({
          message: `Thành Công`,
          description: res.data.message,
          duration: 2,
          placement: "topRight",
        });
        cartItems.forEach((item) => {
          dispatch(removeItem(item));
        });
        history.push("/history-order");
      }
    });
  };
  if (loading) {
    return <h1></h1>;
  }
  return (
    <Helmet title="Thanh Toán">
      <Breadcrumb>
        <Link to="/">Trang Chủ</Link>/<Link to="/cart">Giỏ Hàng</Link>/
        <Link to="/checkout">Thanh Toán</Link>
      </Breadcrumb>
      <div className="checkout content">
        <div className="checkout__info">
          <div className="checkout__info__txt">
            <h2>Sản Phẩm</h2>

            <div className="checkout__list">
              {cartProduct.map((item, index) => (
                <div className="checkout__item" key={index}>
                  <div className="checkout__item__img">
                    <img src={`${baseURL}/${item.product.img01}`} alt="" />
                  </div>
                  <div className="checkout__item__info">
                    <div className="checkout__item__info__name">
                      <Link
                        to={`/product/${item.slug}`}
                      >{`${item.product.name}`}</Link>
                    </div>
                    <div className="checkout__item__info__right">
                      <div className="checkout__item__info__quantity">
                        x{item.quantity}
                      </div>
                      <div className="checkout__item__info__price">
                        {numberWithCommas(item.product.selling_price)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* <div className="checkout__info__btn">
            <Link
              to="/checkout"
              style={{ marginBottom: "1rem", display: "block" }}
            >
              <Button backgroundColor="second">ĐẶT HÀNG</Button>
            </Link>
            <Link to="/">
              <Button backgroundColor="second">TIẾP TỤC MUA HÀNG</Button>
            </Link>
          </div> */}
        </div>
        <div className="checkout__info">
          <div className="checkout__info__txt">
            <h2>Phương Thức Thanh Toán</h2>

            <div className="checkout__info__txt__method">
              <span>Thanh Toán Khi Nhận Hàng</span>
              <span>Thay Đổi</span>
            </div>
          </div>
          <div className="checkout__info__txt">
            <h2 style={{ marginTop: "3rem" }}>Thông Tin Nhận Hàng</h2>
          </div>

          <div className="checkout__info__customer">
            <Form
              name="customer_edit"
              className="checkout__info__customer__form"
              size="large"
              form={form}
              layout="vertical"
              style={{ width: "100%", marginTop: "3rem" }}
              color="primary"
              onFinish={onFinish}
            >
              <Form.Item
                label="Họ Và Tên"
                name="full_name"
                // hasFeedback
                style={{ marginBottom: ".5rem" }}
                rules={[
                  {
                    required: true,

                    message: "Vui Lòng Nhập Trường Này!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                style={{ marginBottom: ".5rem" }}
                // hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui Lòng Nhập Trường Này!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Địa Chỉ"
                name="andress"
                style={{ marginBottom: ".5rem" }}
                rules={[
                  {
                    required: true,
                    message: "Vui Lòng Chọn Trường Này!",
                  },
                ]}
                // hasFeedback
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Số Điện Thoại"
                name="mobile_phone"
                style={{ marginBottom: ".5rem" }}
                rules={[
                  {
                    required: true,
                    message: "Vui Lòng Chọn Trường Này!",
                  },
                ]}
                // hasFeedback
              >
                <Input />
              </Form.Item>
              <div className="checkout__info__txt">
                <h2 style={{ marginTop: "3rem", marginBottom: "1rem" }}>
                  Hóa Đơn
                </h2>
                <div className="checkout__info__txt__method">
                  <span>Tổng Tiền Hàng</span>
                  <span>{numberWithCommasTotal(totalPrice)}</span>
                </div>
                <div className="checkout__info__txt__method">
                  <span>Phí Vận Chuyển</span>
                  <span>{numberWithCommasTotal(15000)}</span>
                </div>
                <div className="checkout__info__txt__method">
                  <span>Giảm Giá</span>
                  <span>{numberWithCommasTotal(0)}</span>
                </div>
                <div className="checkout__info__txt__method">
                  <span>Vat</span>
                  <span>{numberWithCommasTotal(0)}</span>
                </div>
                <div className="checkout__info__txt__method">
                  <span>Tổng Thanh Toán</span>
                  <span>{numberWithCommasTotal(totalPrice + 15000)}</span>
                </div>
              </div>
              <Form.Item style={{ width: "100%" }}>
                <Button backgroundColor="second" type="submit">
                  ĐẶT HÀNG
                </Button>

                {/* <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ width: "10rem" }}
              >
                Lưu
              </Button> */}
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default Checkout;
