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
import axios from "axios";

import Button from "../../components/client/Button";
import CartItem from "../../components/client/CartItem";
import productApi from "../../api/productApi";
import discountApi from "../../api/discountApi";

import Breadcrumb from "../../components/client/Breadcrumb ";
import numberWithCommas, {
  numberWithCommasTotal,
} from "../../utils/numberWithCommas";
import billsApi from "../../api/billsApi";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Checkout = () => {
  const { Option } = Select;

  const [form] = Form.useForm();
  const baseURL = process.env.REACT_APP_API_URL;
  const cartItemsAll = useSelector((state) => state.shoppingCart.value);

  const history = useHistory();

  const [cartProduct, setCartProduct] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  const [discount, setDiscount] = useState([]);
  const [discountTotal, setDiscountTotal] = useState(0);
  const [discountString, setDiscountString] = useState("");
  const [discountMessage, setDiscountMessage] = useState("");
  const [discountError, setDiscountError] = useState("");

  const [shipfee, setShipfee] = useState(0);

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

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
          // andress: user.data.user.andress,
        });
      }
    }
    setCartItems(newCartItems);
  }, [cartItemsAll, user, states]);

  const handleGetDiscount = () => {
    setDiscountTotal(0);
    setDiscountMessage("");
    const getDiscount = discount.filter(
      (item) => item.idDiscount === discountString
    );
    if (getDiscount.length > 0) {
      const time_start = new Date(getDiscount[0].time_start);
      const time_end = new Date(getDiscount[0].time_end);
      const date = new Date();

      if (getDiscount[0].time_start === null) {
        if (
          getDiscount[0].quatity <= getDiscount[0].quatity_used &&
          getDiscount[0].quatity !== 0
        ) {
          setDiscountError("???? H???t L?????t D??ng");
        } else {
          if (getDiscount[0].unit === 0) {
            setDiscountTotal((getDiscount[0].value / 100) * totalPrice);
            setDiscountMessage(` (Gi???m ${getDiscount[0].value}%) `);
            setDiscountError(` (Gi???m ${getDiscount[0].value}%) `);
          } else {
            setDiscountTotal(getDiscount[0].value);
            setDiscountMessage(
              ` (Gi???m ${numberWithCommasTotal(getDiscount[0].value)})`
            );
            setDiscountError(
              ` (Gi???m ${numberWithCommasTotal(getDiscount[0].value)})`
            );
          }
        }
      } else {
        if (time_start <= date && date <= time_end) {
          if (
            getDiscount[0].quatity <= getDiscount[0].quatity_used &&
            getDiscount[0].quatity !== 0
          ) {
            setDiscountError("???? H???t L?????t D??ng");
          } else {
            if (getDiscount[0].unit === 0) {
              setDiscountTotal((getDiscount[0].value / 100) * totalPrice);
              setDiscountMessage(` (Gi???m ${getDiscount[0].value}%) `);
              setDiscountError(` (Gi???m ${getDiscount[0].value}%) `);
            } else {
              setDiscountTotal(getDiscount[0].value);
              setDiscountMessage(
                ` (Gi???m ${numberWithCommasTotal(getDiscount[0].value)})`
              );
              setDiscountError(
                ` (Gi???m ${numberWithCommasTotal(getDiscount[0].value)})`
              );
            }
          }
        } else {
          if (time_start > date) {
            setDiscountError("M?? Gi???m Gi?? Ch??a ???????c M???");
          } else {
            setDiscountError("M?? Gi???m Gi?? ???? H???t H???n");
          }
        }
      }
    } else {
      setDiscountError("M?? Gi???m Gi?? Kh??ng T???n T???i!");
    }
  };

  useEffect(() => {
    discountApi.getAll().then((res) => {
      if (res.data.status === 200) {
        const newDiscounts = res.data.discounts;

        setDiscount(newDiscounts);
      }
    });
  }, []);

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
    axios.get("https://provinces.open-api.vn/api/?depth=3").then((res) => {
      const newState = res.data.filter(
        (item) => item.code === 46 || item.code === 48 || item.code === 49
      );

      setStates(newState);
    });
  }, []);

  const onChangeState = (value) => {
    const statesCheck = states.filter((item) => item.code === value);

    switch (value) {
      case 46:
        setShipfee(25000);
        break;
      case 48:
        setShipfee(20000);
        break;

      case 49:
        setShipfee(30000);
        break;
    }

    setDistricts(statesCheck[0].districts);
    form.setFieldsValue({
      districts_name: null,
      wards_name: null,
    });
  };

  const onChangeDistrict = (value) => {
    const districtCheck = districts.filter((item) => item.name === value);

    setWards(districtCheck[0].wards);
    form.setFieldsValue({
      wards_name: null,
    });
  };

  const handleOnChangeDiscount = (value) => {
    setDiscountString(value.target.value);
  };

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
      total_price: totalPrice - discountTotal + shipfee,
      andress: `${value["andress"]}, ${value["wards_name"]}, ${value["districts_name"]}, ${value["states_name"]}`,
    };

    billsApi.addBill(data).then((res) => {
      if (res.data.status == 200) {
        notification.success({
          message: `Th??nh C??ng`,
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
    <Helmet title="Thanh To??n">
      <Breadcrumb>
        <Link to="/">Trang Ch???</Link>/<Link to="/cart">Gi??? H??ng</Link>/
        <Link to="/checkout">Thanh To??n</Link>
      </Breadcrumb>
      <div className="checkout content">
        <div className="checkout__info">
          <div className="checkout__info__txt">
            <h2>S???n Ph???m</h2>
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
        </div>
        <div className="checkout__info">
          <div className="checkout__info__txt">
            <h2>Ph????ng Th???c Thanh To??n</h2>

            <div className="checkout__info__txt__method">
              <span>Thanh To??n Khi Nh???n H??ng</span>
              <span>Thay ?????i</span>
            </div>
          </div>
          <div className="checkout__info__txt">
            <h2 style={{ marginTop: "3rem" }}>M?? Gi???m Gi??</h2>
          </div>
          <div className="checkout__info__customer">
            <Form.Item
              label="Nh???p M?? Gi???m Gi?? N???u C??"
              name="checkout_discount"
              style={{ display: "block" }}
              help={discountError}
            >
              <Input
                size="large"
                onChange={handleOnChangeDiscount}
                style={{
                  marginTop: "1rem",
                }}
              />
            </Form.Item>
            <Form.Item style={{ width: "100%" }}>
              <Button
                backgroundColor="second"
                onClick={handleGetDiscount}
                type="button"

                // type="button"
              >
                ??P D???NG
              </Button>
            </Form.Item>
          </div>

          <div className="checkout__info__txt">
            <h2 style={{ marginTop: "3rem" }}>Th??ng Tin Nh???n H??ng</h2>
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
                label="H??? V?? T??n"
                name="full_name"
                style={{ marginBottom: ".5rem" }}
                rules={[
                  {
                    required: true,

                    message: "Vui L??ng Nh???p Tr?????ng N??y!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                style={{ marginBottom: ".5rem" }}
                rules={[
                  {
                    required: true,
                    message: "Vui L??ng Nh???p Tr?????ng N??y!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="S??? ??i???n Tho???i"
                name="mobile_phone"
                style={{ marginBottom: ".5rem" }}
                rules={[
                  {
                    required: true,
                    message: "Vui L??ng Ch???n Tr?????ng N??y!",
                  },
                ]}
                // hasFeedback
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="T???nh Th??nh"
                name="states_name"
                rules={[
                  {
                    required: true,
                    message: "Vui L??ng Ch???n Tr?????ng N??y!",
                  },
                ]}
              >
                <Select
                  showSearch
                  // style={{ width: "100%" }}
                  placeholder="Ch???n T???nh Th??nh"
                  optionFilterProp="children"
                  onChange={onChangeState}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {states.map((item, index) => (
                    <Option key={index} value={item.code}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Qu???n Huy???n"
                style={{ marginTop: "-2rem" }}
                name="districts_name"
                rules={[
                  {
                    required: true,
                    message: "Vui L??ng Ch???n Tr?????ng N??y!",
                  },
                ]}
              >
                <Select
                  showSearch
                  // style={{ width: "100%" }}
                  placeholder="Ch???n Qu???n Huy???n"
                  optionFilterProp="children"
                  onChange={onChangeDistrict}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {districts.map((item, index) => (
                    <Option key={index} value={item.name}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Ph?????ng X??"
                style={{ marginTop: "-2rem" }}
                name="wards_name"
                rules={[
                  {
                    required: true,
                    message: "Vui L??ng Ch???n Tr?????ng N??y!",
                  },
                ]}
              >
                <Select
                  showSearch
                  // style={{ width: "100%" }}
                  placeholder="Ch???n Ph?????ng X??"
                  optionFilterProp="children"
                  // onChange={onChangeDistrict}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {wards.map((item, index) => (
                    <Option key={index} value={item.name}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="?????a Ch??? Chi Ti???t( S??? Nh??, ???????ng)"
                name="andress"
                style={{ marginBottom: ".5rem", marginTop: "-2rem" }}
                rules={[
                  {
                    required: true,
                    message: "Vui L??ng Ch???n Tr?????ng N??y!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <div className="checkout__info__txt">
                <h2 style={{ marginTop: "3rem", marginBottom: "1rem" }}>
                  H??a ????n
                </h2>
                <div className="checkout__info__txt__method">
                  <span>T???ng Ti???n H??ng</span>
                  <span>{numberWithCommasTotal(totalPrice)}</span>
                </div>
                <div className="checkout__info__txt__method">
                  <span>Ph?? V???n Chuy???n</span>
                  <span>{numberWithCommasTotal(shipfee)}</span>
                </div>
                <div className="checkout__info__txt__method">
                  <span>Gi???m Gi??</span>
                  <span>
                    {discountMessage} - {numberWithCommasTotal(discountTotal)}
                  </span>
                </div>
                <div className="checkout__info__txt__method">
                  <span>Vat</span>
                  <span>{numberWithCommasTotal(0)}</span>
                </div>
                <div className="checkout__info__txt__method">
                  <span>T???ng Thanh To??n</span>
                  <span>
                    {numberWithCommasTotal(
                      totalPrice - discountTotal + shipfee
                    )}
                  </span>
                </div>
              </div>
              <Form.Item style={{ width: "100%" }}>
                <Button backgroundColor="second" type="submit">
                  ?????T H??NG
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default Checkout;
