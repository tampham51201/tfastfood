import React, { useState, useEffect } from "react";
import Helmet from "../../components/Helmet";
import { useSelector, useDispatch } from "react-redux";

import { getUser } from "../../redux/user/userSlice";

// import numberWithCommas from "../utils/numberWithCommas";
import { Link } from "react-router-dom";

import Button from "../../components/client/Button";
import CartItem from "../../components/client/CartItem";
import productApi from "../../api/productApi";
import Loading from "../Loading";
import Breadcrumb from "../../components/client/Breadcrumb ";
import numberWithCommas, {
  numberWithCommasTotal,
} from "../../utils/numberWithCommas";

const Cart = () => {
  const cartItemsAll = useSelector((state) => state.shoppingCart.value);

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
      }
    }
    setCartItems(newCartItems);
  }, [cartItemsAll, user]);

  useEffect(() => {
    productApi.getAll().then((res) => {
      if (res.data.status === 200) {
        const newProduct = res.data.product;
        console.log(newProduct);
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

  if (loading) {
    return <Loading />;
  }
  return (
    <Helmet title="Giỏ Hàng">
      <Breadcrumb>
        <Link to="/">Trang Chủ</Link>/<Link to="/cart">Giỏ Hàng</Link>
      </Breadcrumb>
      <div className="cart content">
        <div className="cart__info">
          <div className="cart__info__txt">
            <p>Bạn đang có {totalProduct} sản phẩm trong giỏ hàng</p>
            <div className="cart__info__txt__price">
              <span>Thành Tiền</span>
              <span> {numberWithCommasTotal(totalPrice)}</span>
            </div>
          </div>
          <div className="cart__info__btn">
            {cartProduct.length > 0 ? (
              <Link
                to="/checkout"
                style={{ marginBottom: "1rem", display: "block" }}
              >
                <Button backgroundColor="second">ĐẶT HÀNG</Button>
              </Link>
            ) : (
              <Button backgroundColor="second">ĐẶT HÀNG</Button>
            )}
            {/* <Link
              to="/checkout"
              style={{ marginBottom: "1rem", display: "block" }}
            >
              <Button backgroundColor="second">ĐẶT HÀNG</Button>
            </Link> */}
            <Link to="/">
              <Button backgroundColor="second">TIẾP TỤC MUA HÀNG</Button>
            </Link>
          </div>
        </div>
        <div className="cart__list">
          {cartProduct.map((item, index) => (
            <CartItem item={item} key={index} />
          ))}
        </div>
      </div>
    </Helmet>
  );
};

export default Cart;
