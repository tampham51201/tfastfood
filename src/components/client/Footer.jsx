import React, { useRef, useEffect, useState } from "react";

import logoFooter from "../../assets/Image/footer-logo_1.png";
import bannerFooter from "../../assets/Image/footer-banner.jpg";

import { Link } from "react-router-dom";

import infoShopApi from "../../api/infoShopApi";

import Grid from "../../components/Grid";
import Button from "../client/Button";

const footerAboutLink = [
  {
    display: "Giảm Giá",
    path: "/about",
  },
  {
    display: "Sản Phẩm Mới",
    path: "/home",
  },
  {
    display: "Sản Phẩm Tốt Nhất",
    path: "/home",
  },
  {
    display: "Liên Hệ",
    path: "/about",
  },
  {
    display: "Bản Đồ",
    path: "/about",
  },
];

const Footer = () => {
  const iconBoxProductRef = useRef(null);
  const boxProductRef = useRef(null);
  const iconBoxContactRef = useRef(null);
  const boxContactRef = useRef(null);
  const [infoShop, setInfoShop] = useState({});
  useEffect(() => {
    const getInfoShop = async () => {
      const res = await infoShopApi.getInfo();
      if (res.data.status === 200) {
        const newInfoshop = res.data.infoshop;

        setInfoShop(newInfoshop);
      }
    };
    getInfoShop();
  }, []);
  var footerIcon = [
    {
      icon: "bx bxl-facebook",
      path: `${infoShop.link_fb}`,
      color: "blue",
    },
    {
      icon: "bx bxl-twitter",
      path: `${infoShop.twitter}`,
      color: "blue",
    },
    {
      icon: "bx bxl-google-plus",
      path: `${infoShop.link_gg_plus}`,
      color: "blue",
    },
    {
      icon: "bx bxl-pinterest-alt",
      path: `${infoShop.link_pinterest}`,
      color: "blue",
    },
    {
      icon: "bx bxl-instagram-alt",
      path: `${infoShop.link_instagram}`,
      color: "blue",
    },
  ];

  var footerAbout = [
    {
      display: `Store ${infoShop.andress}`,
      icon: "bx bxs-map",
    },
    {
      display: infoShop.mobile_phone,
      icon: "bx bxs-phone",
    },
    // {
    //   display: "0339-045-945",
    //   icon: "bx bxs-mobile",
    // },
    {
      display: infoShop.email,
      icon: "bx bxs-envelope",
    },
  ];
  const superToggle = (refBox, refIcon) => {
    refBox.current.classList.toggle("active");
    refIcon.current.classList.toggle("bx-minus");
    refIcon.current.classList.toggle("bx-plus");
  };

  const handleClickBoxProduct = () => {
    superToggle(boxProductRef, iconBoxProductRef);
  };

  const handleClickBoxContact = () => {
    superToggle(boxContactRef, iconBoxContactRef);
  };

  return (
    <div className="footer">
      <div className="content">
        <div className="footer__logo">
          <img src={logoFooter} alt="logo" />
        </div>
        <div className="footer__banner">
          <img src={bannerFooter} alt="banner" />
        </div>
        <Grid col={3} mdCol={1} smCol={1} gap={2}>
          <div className="footer__product-about">
            <h3 className="footer__product-about__title hide-mobile">
              CÁC SẢN PHẨM
            </h3>
            <div className="footer__box-title" onClick={handleClickBoxProduct}>
              <h3>CÁC SẢN PHẨM</h3>
              <i className="bx bx-plus" ref={iconBoxProductRef}></i>
            </div>
            <div className="footer__product-about__list" ref={boxProductRef}>
              {footerAboutLink.map((item, index) => (
                <span key={index} className="footer__product-about__list__item">
                  <Link to={item.path}>{item.display}</Link>
                </span>
              ))}
            </div>
          </div>
          <div className="footer__box-title" onClick={handleClickBoxContact}>
            <h3>THÔNG TIN CỬA HÀNG</h3>
            <i className="bx bx-plus" ref={iconBoxContactRef}></i>
          </div>
          <div className="footer__contact-about" ref={boxContactRef}>
            {footerAbout.map((item, index) => (
              <li key={index} className="footer__contact-about__item">
                <i className={item.icon}></i>
                <p>{item.display}</p>
              </li>
            ))}
          </div>
          <div className="footer__notify">
            <h3 className="footer__notify__title">BẢN TIN</h3>
            <p className="footer__notify__description">
              Đăng Ký Và Nhận Đĩa Exculsive
            </p>
            <div className="footer__notify__input">
              <input type="text" placeholder="Địa Chỉ Email Của Bản" />
              <Button
                icon="bx bx-paper-plane"
                backgroundColor="second"
                type="icon"
              ></Button>
            </div>
          </div>
        </Grid>
      </div>
      <div className="footer__bottom">
        <div className="content">
          <div className="footer__bottom__list-icon">
            {footerIcon.map((item, index) => (
              <div key={index} className="footer__bottom__list-icon__item">
                <a href={item.path}>
                  <i className={item.icon}></i>
                </a>
              </div>
            ))}
          </div>
          <p className="footer__bottom__blank">© {infoShop.coppyright}</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
