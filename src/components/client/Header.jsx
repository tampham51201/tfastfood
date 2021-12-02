import React, { useRef, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

import logo from "../../assets/Image/footer-logo_1.png";
import Button from "./Button";
import NavTopItem from "./NavTopItem";

import axiosClient from "../../api/axiosClient";
import swal from "sweetalert";

const img =
  require("../../assets/Image/Product/brown-bear-printed-sweater.jpg").default;

const navList = [
  {
    display: "Home",
    path: "/",
  },
  {
    display: "Product",
    path: "/category",
  },
  {
    display: "Contact",
    path: "/contact",
  },
  {
    display: "My Account",
    path: "/profile",
  },
];

const cardList = [
  {
    id: 1,
    title: "Quaerat outt voluptatem ewuaerat outt voluptatem 1",
    img: img,
    price: "10$",
  },
  {
    id: 2,
    title: "quaerat outt voluptatem 2",
    img: img,
    price: "33$",
  },
  {
    id: 3,
    title: "quaerat outt voluptatem 3",
    img: img,
    price: "55$",
  },
  {
    id: 4,
    title: "quaerat outt voluptatem 4",
    img: img,
    price: "100$",
  },
  {
    id: 4,
    title: "quaerat outt voluptatem 4",
    img: img,
    price: "100$",
  },
  {
    id: 4,
    title: "quaerat outt voluptatem 4",
    img: img,
    price: "100$",
  },
];

const Header = () => {
  const iconSearchRef = useRef(null);
  const searchRef = useRef(null);
  const toggleRef = useRef(null);
  const iconToggleRef = useRef(null);
  const headerRef = useRef(null);

  var authButton = [];
  if (!localStorage.getItem("auth_token")) {
    authButton = [
      {
        name: "Sign in",
        path: "/login",
      },
      {
        name: "Compare",
        path: "/compare",
      },
      {
        name: "Wishlist",
        path: "/wishlist",
      },
    ];
  } else {
    authButton = [
      {
        name: "Profile",
        path: "/profile",
      },
      {
        name: "Compare",
        path: "/compare",
      },
      {
        name: "Wishlist",
        path: "/wishlist",
      },
      {
        name: "Admin",
        path: "/admin",
      },
      {
        name: "Logout",
        path: "/login",
      },
    ];
  }
  const navTopList = [
    {
      label: "my accout",
      display: "My Account",
      icon: "bx bx-user",
      listItem: authButton,
    },
    {
      label: "Currency",
      display: "USD $",
      icon: "",
      listItem: [
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
      label: "Language",
      display: "English",
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
    if (value === "Logout") {
      axiosClient.post("api/logout").then((res) => {
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
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    });
    return () => {
      window.addEventListener("scroll", null);
    };
  }, []);

  return (
    <div className="header" ref={headerRef}>
      <div className="header__top-nav">
        <div className="content">
          <div className="header__top-nav__left">
            <i className="bx bxs-purchase-tag"></i>
            <p>Get Upto 25% Cashback On First Order : GET25OFF</p>
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
                <img src={logo} alt="logo" />
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
                <p>Call On Order</p>
                <p>0339045945</p>
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
                    {cardList.length}
                  </div>
                </div>
                <div
                  className="header__main__top__item__content hide-mobile"
                  onClick={handleCartClick}
                >
                  <p>Shopping Cart</p>
                  <p>{cardList.length} items</p>
                </div>
                <div className="header__main__top__item__list">
                  {cardList.length <= 0 ? (
                    <p header__main__top__item__list__null>
                      No products in the cart
                    </p>
                  ) : (
                    <>
                      <p className="header__main__top__item__list__title">
                        Product added
                      </p>
                      <ul className="header__main__top__item__list__content">
                        {cardList.map((item, index) => (
                          <Link to={`/category/product-${item.id}`} key={index}>
                            <li className="header__main__top__item__list__item">
                              <img src={item.img} alt="anh" />
                              <p>{item.title}</p>
                              <p>{item.price}</p>
                            </li>
                          </Link>
                        ))}
                      </ul>

                      <div className="header__main__top__item__list__more">
                        <p>{cardList.length} Add to cart </p>
                        <Link to="/cart">
                          <Button backgroundColor="second">View Cart </Button>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="header__main__menu" ref={toggleRef}>
            {navList.map((item, index) => (
              <div className="header__main__menu__item" key={index}>
                <Link to={item.path}>
                  <Button
                    backgroundColor="transparent"
                    onClick={handleMenuClick}
                  >
                    {item.display}
                  </Button>
                </Link>
              </div>
            ))}
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
                  <p>Call On Order</p>
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
