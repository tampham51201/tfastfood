import React, { useState, useEffect } from "react";
import Helmet from "../../components/Helmet";
import { useSelector, useDispatch } from "react-redux";

import { getUser } from "../../redux/user/userSlice";

// import numberWithCommas from "../utils/numberWithCommas";
import { Link } from "react-router-dom";

import Button from "../../components/client/Button";
import FavoriteItem from "../../components/client/FavoriteItem";
import productApi from "../../api/productApi";
import Loading from "../Loading";
import Breadcrumb from "../../components/client/Breadcrumb ";
import numberWithCommas, {
  numberWithCommasTotal,
} from "../../utils/numberWithCommas";

const MyFavorite = () => {
  const cartItemsAll = useSelector((state) => state.favoriteProducts.value);
  console.log(cartItemsAll);

  const [cartProduct, setCartProduct] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

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
  }, [cartItems, products]);
  console.log(cartProduct);

  if (loading) {
    return <Loading />;
  }
  return (
    <Helmet title="Giỏ Hàng">
      <Breadcrumb>
        <Link to="/">Trang Chủ</Link>/<Link to="/cart">Sản Phẩm Yêu Thích</Link>
      </Breadcrumb>
      <div className="my-favorite content">
        <div className="my-favorite__header">Danh Sách Sản Phẩm Yêu Thích</div>
        <div className="my-favorite__list">
          {cartProduct.map((item, index) => (
            <FavoriteItem item={item} key={index} />
          ))}
        </div>
      </div>
    </Helmet>
  );
};

export default MyFavorite;
