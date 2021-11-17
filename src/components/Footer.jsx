import React, { useRef } from "react";

import logoFooter from "../assets/Image/footer-logo_1.png";
import bannerFooter from "../assets/Image/footer-banner.jpg";

import { Link } from "react-router-dom";

import Grid from "../components/Grid";
import Button from "../components/Button";

const footerAbout = [
  {
    display: "Store Viet Nam",
    icon: "bx bxs-map",
  },
  {
    display: "0339045945",
    icon: "bx bxs-phone",
  },
  {
    display: "0339-045-945",
    icon: "bx bxs-mobile",
  },
  {
    display: "pttquangnam@gmail.com",
    icon: "bx bxs-envelope",
  },
];

const footerAboutLink = [
  {
    display: "Prices drop",
    path: "/about",
  },
  {
    display: "New product",
    path: "/about",
  },
  {
    display: "Best sales",
    path: "/about",
  },
  {
    display: "Contact us",
    path: "/about",
  },
  {
    display: "Sitemap",
    path: "/about",
  },
];

const footerIcon = [
  {
    icon: "bx bxl-facebook",
    path: "www.facebook.com/PhamThanhTam2001",
    color: "blue",
  },
  {
    icon: "bx bxl-twitter",
    path: "www.facebook.com/PhamThanhTam2001",
    color: "blue",
  },
  {
    icon: "bx bxl-google-plus",
    path: "www.facebook.com/PhamThanhTam2001",
    color: "blue",
  },
  {
    icon: "bx bxl-pinterest-alt",
    path: "www.facebook.com/PhamThanhTam2001",
    color: "blue",
  },
  {
    icon: "bx bxl-instagram-alt",
    path: "www.facebook.com/PhamThanhTam2001",
    color: "blue",
  },
];

const Footer = () => {
  const iconBoxProductRef = useRef(null);
  const boxProductRef = useRef(null);

  const iconBoxContactRef = useRef(null);
  const boxContactRef = useRef(null);

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
              Products
            </h3>
            <div className="footer__box-title" onClick={handleClickBoxProduct}>
              <h3>Product</h3>
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
            <h3>Store Infomation</h3>
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
            <h3 className="footer__notify__title">Newsletter</h3>
            <p className="footer__notify__description">
              Sign Up And Get Exculsive Disc
            </p>
            <div className="footer__notify__input">
              <input type="text" placeholder="Your email address" />
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
                <Link to={item.path}>
                  <i className={item.icon}></i>
                </Link>
              </div>
            ))}
          </div>
          <p className="footer__bottom__blank">
            © 2021 - Ecommerce Software By Tama
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
