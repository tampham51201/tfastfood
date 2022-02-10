import React, { useRef, useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

import logo from "../../assets/Image/footer-logo_1.png";
import Button from "./Button";
import NavTopItem from "./NavTopItem";

import numberWithCommas from "../../utils/numberWithCommas";

import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../redux/user/userSlice";

import axiosClient from "../../api/axiosClient";
import swal from "sweetalert";

import categoryApi from "../../api/categoryApi";
import productApi from "../../api/productApi";
import infoShopApi from "../../api/infoShopApi";

const img =
  require("../../assets/Image/Product/brown-bear-printed-sweater.jpg").default;

const Header = () => {
  const baseURL = "http://localhost:8000";
  const iconSearchRef = useRef(null);
  const searchRef = useRef(null);
  const toggleRef = useRef(null);
  const iconToggleRef = useRef(null);
  const headerRef = useRef(null);
  const dispatch = useDispatch();

  //my cart
  const [categorys, setCategorys] = useState([]);
  const [cartProduct, setCartProduct] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return dispatch(getUser());
  }, [dispatch]);

  var user = useSelector((state) => state.users.value);
  const cartItemsAll = useSelector((state) => state.shoppingCart.value);

  useEffect(() => {
    var newCartItems = [];
    if (!localStorage.getItem("auth_token")) {
      newCartItems = cartItemsAll.filter((item) => item.idUser === 0);
    } else {
      if (user !== null && user.data !== "") {
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
    console.log(res);
  }, [cartItems, products]);

  var authButton = [];

  //menuNav
  if (!localStorage.getItem("auth_token")) {
    authButton = [
      {
        name: "Đăng Nhập",
        path: "/login",
      },
      {
        name: "Sản Phẩm Yêu Thích",
        path: "/my-favorite",
      },
    ];
  } else {
    if (user !== null && user.data !== "") {
      if (user.data.user.role_as == 0) {
        authButton = [
          {
            name: "Thông Tin Cá Nhân",
            path: "/profile",
          },

          {
            name: "Sản Phẩm Yêu Thích",
            path: "/my-favorite",
          },
          {
            name: "Đơn Hàng",
            path: "/history-order",
          },

          {
            name: "Đăng Xuất",
            path: "/login",
          },
        ];
      } else {
        if (user.data.user.role_as == 1) {
          authButton = [
            {
              name: "Thông tin cá nhân",
              path: "/profile",
            },

            {
              name: "Sản Phẩm Yêu Thích",
              path: "/my-favorite",
            },
            {
              name: "Đơn Hàng",
              path: "/history-order",
            },
            {
              name: "Trang quản trị",
              path: "/admin/order",
            },

            {
              name: "Đăng Xuất",
              path: "/login",
            },
          ];
        } else {
          authButton = [
            {
              name: "Thông tin cá nhân",
              path: "/profile",
            },

            {
              name: "Sản Phẩm Yêu Thích",
              path: "/my-favorite",
            },
            {
              name: "Đơn Hàng",
              path: "/history-order",
            },
            {
              name: "Trang quản trị",
              path: "/admin",
            },

            {
              name: "Đăng Xuất",
              path: "/login",
            },
          ];
        }
      }
    }
  }

  const navTopList = [
    {
      label: "tài khoản của tôi",
      display: "tài khoản của tôi",
      icon: "bx bx-user",
      listItem: authButton,
    },
    {
      label: "Tiền Tệ",
      display: "VNĐ đ",
      icon: "",
      listItem: [
        {
          name: "VNĐ đ",
          path: "/",
        },
        {
          name: "USD $",
          path: "/",
        },
        {
          name: "EUR $",
          path: "/",
        },
      ],
    },
    {
      label: "Ngôn Ngữ",
      display: "Vietnamese",
      icon: "",
      listItem: [
        {
          name: "Vietnamese",
          path: "/",
        },
        {
          name: "English",
          path: "/",
        },
      ],
    },
  ];
  const navTopMobile = navTopList.slice(1, 3);
  const navTopAccount = navTopList.slice(0, 1);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    categoryApi.getStatus().then((res) => {
      if (res.data.status === 200) {
        const newCategoryList = res.data.categorys;
        console.log(newCategoryList);
        setCategorys(newCategoryList);
      }
    });
  }, []);

  const [infoShop, setInfoShop] = useState({});
  useEffect(() => {
    infoShopApi.getInfo().then((res) => {
      if (res.data.status === 200) {
        const newInfoshop = res.data.infoshop;
        console.log(newInfoshop);
        setInfoShop(newInfoshop);

        setLoading(false);
      }
    });
  }, []);
  const handleToggleSearch = () => {
    searchRef.current.classList.toggle("active");
    iconSearchRef.current.classList.toggle("bx-x");
  };

  const handleCartClick = () => {
    history.push("/cart");
  };

  const handleMenuClick = () => {
    toggleRef.current.classList.toggle("toggle");
    iconToggleRef.current.classList.toggle("bx-x");
  };
  if (location.pathname === "/logout") {
    history.replace("/");
  }

  const handleLogout = (value) => {
    if (value === "Đăng Xuất") {
      console.log("dd");
      axiosClient.post("api/logout").then((res) => {
        console.log("log");
        if (res.data.status === 200) {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_name");
          history.push("/login");
          swal("Success", res.data.message, "success");
        }
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 310 ||
        document.documentElement.scrollTop > 310
      ) {
        if (headerRef.current !== null)
          headerRef.current.classList.add("shrink");
      } else {
        if (headerRef.current !== null)
          headerRef.current.classList.remove("shrink");
      }
    });
    return () => {
      window.addEventListener("scroll", null);
    };
  }, []);
  if (loading) {
    return <div></div>;
  }

  return (
    <div className="header" ref={headerRef}>
      <div className="header__top-nav">
        <div className="content">
          <div className="header__top-nav__left">
            <i className="bx bxs-purchase-tag"></i>
            <p style={{ fontSize: "1.3rem" }}>
              {infoShop.header_sale}
              {/* Được Hoàn Tiền Lên Đến 25% Khi Mua Đơn Hàng Đầu Tiên : GET25OFF */}
            </p>
          </div>
          <div className="header__top-nav__right">
            {navTopList.map((item, index) => (
              <NavTopItem
                key={index}
                data={item.listItem}
                icon={item.icon}
                onClick={handleLogout}
              >
                {item.display}
              </NavTopItem>
            ))}
          </div>
        </div>
      </div>
      <div className="header__main">
        <div className=" content">
          <div className="header-line"></div>
          <div className="header__main__top">
            <div className="header__main__top__logo">
              <Link to="/">
                <img
                  src={`http://localhost:8000/${infoShop.logo}`}
                  alt="logo"
                />
              </Link>
            </div>

            <div
              className="header__main__top__item__mobile-toggle"
              onClick={handleMenuClick}
            >
              <i className="bx bx-menu-alt-left" ref={iconToggleRef}></i>
            </div>

            <div className="header__main__top__item header-call hide-mobile">
              <div className="header__main__top__item__icon">
                <i className="bx bxs-phone-call"></i>
              </div>

              <div className="header__main__top__item__content">
                <p>Đặt Hàng Gọi</p>
                <p>{infoShop.mobile_phone}</p>
              </div>
            </div>

            <div className="header__main__top__right">
              <div className="header__main__top__right__search">
                <div
                  className="header__main__top__right__search__icon"
                  onClick={handleToggleSearch}
                >
                  <i className=" bx bx-search" ref={iconSearchRef}></i>
                </div>
                <div
                  className="header__main__top__right__search__box"
                  ref={searchRef}
                >
                  <input
                    type="text"
                    className="header__main__top__right__search__box__input"
                    placeholder="Search out product"
                  />
                  <i className="bx bx-search"></i>
                </div>
              </div>
              <div className="header__main__top__right__accout">
                {navTopAccount.map((item, index) => (
                  <NavTopItem
                    icondown
                    key={index}
                    data={item.listItem}
                    icon={item.icon}
                    onClick={handleLogout}
                  ></NavTopItem>
                ))}
              </div>

              <div className="header__main__top__item header-card ">
                <div
                  className="header__main__top__item__icon"
                  onClick={handleCartClick}
                >
                  <i className="bx bx-cart"></i>
                  <div className="header__main__top__item__icon__quantity">
                    {cartProduct.length}
                  </div>
                </div>
                <div
                  className="header__main__top__item__content hide-mobile"
                  onClick={handleCartClick}
                >
                  <p>Giỏ Hàng</p>
                  <p>{cartProduct.length} Sản Phẩm</p>
                </div>
                <div className="header__main__top__item__list">
                  {cartProduct.length <= 0 ? (
                    <p className="header__main__top__item__list__null">
                      Không Có Sản Phẩm Trong Giỏ Hàng
                    </p>
                  ) : (
                    <>
                      <p className="header__main__top__item__list__title">
                        Sản Phẩm Đã Thêm
                      </p>
                      <ul className="header__main__top__item__list__content">
                        {cartProduct.map((item, index) => (
                          <Link to={`/product/${item.slug}`} key={index}>
                            <li className="header__main__top__item__list__item">
                              <div className="header__main__top__item__list__item__img">
                                <img
                                  src={`${baseURL}/${item.product.img01}`}
                                  alt=""
                                />
                              </div>

                              <p>{item.product.name}</p>
                              <p>{numberWithCommas(item.price)}</p>
                            </li>
                          </Link>
                        ))}
                      </ul>

                      <div className="header__main__top__item__list__more">
                        <p>{cartProduct.length} Sản Phẩm Thêm Vào Giỏ Hàng </p>
                        <Link to="/cart">
                          <Button backgroundColor="second">Xem Giỏ Hàng</Button>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="header__main__menu" ref={toggleRef}>
            {categorys.map((item, index) => (
              <div className="header__main__menu__item" key={index}>
                <Link to={`/category/${item.slug}`}>
                  <Button
                    backgroundColor="transparent"
                    onClick={handleMenuClick}
                  >
                    {item.name}
                  </Button>
                </Link>
              </div>
            ))}

            <div className="header__main__menu__item">
              <Link to="/profile">
                <Button backgroundColor="transparent" onClick={handleMenuClick}>
                  Tài Khoản
                </Button>
              </Link>
            </div>

            <div className="header__main__menu__item__mobile">
              {navTopMobile.map((item, index) => (
                <NavTopItem key={index} data={item.listItem} icon={item.icon}>
                  {`${item.label}: ${item.display}`}
                </NavTopItem>
              ))}
              <div className="header__main__top__item">
                <div className="header__main__top__item__icon">
                  <i className="bx bxs-phone-call"></i>
                </div>

                <div className="header__main__top__item__content">
                  <p>Đặt Hàng Gọi</p>
                  <p>0339045945</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
