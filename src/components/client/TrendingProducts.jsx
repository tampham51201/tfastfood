import React, { useEffect, useRef, useState, useCallback } from "react";
import PropTypes from "prop-types";
import Section, { SectionTitle, SectionBody } from "./Section";
import Button from "./Button";

import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import { useSelector, useDispatch } from "react-redux";

import { getUser } from "../../redux/user/userSlice";

import ProductCard from "./ProductCard";

// Import Swiper styles
import SwiperCore, { Navigation, Grid } from "swiper";
// install Swiper modules
SwiperCore.use([Navigation, Grid]);

const TrendingProducts = (props) => {
  const baseURL = "http://localhost:8000";
  const btnPrevRef = useRef(null);
  const btnNextRef = useRef(null);

  const [isActive, setIsActive] = useState(0);
  const [products, setProducts] = useState([]);
  const [productsActive, setProductsActive] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    return dispatch(getUser());
  }, [dispatch]);
  const user = useSelector((state) => state.users.value);
  console.log(user);

  const handleClick = (type) => {
    let temp = props.data;

    switch (type) {
      case "FEATURED":
        temp = temp.filter((product) => product.featured === 1);
        setIsActive(0);
        break;
      case "BEST":
        temp = temp.filter((product) => product.popular === 1);
        setIsActive(1);
        break;
      case "NEW":
        temp = temp.filter((product) => product.status === 1);
        setIsActive(2);
        break;
    }
    setProductsActive(temp);
  };

  useEffect(() => {
    handleClick("FEATURED");
  }, []);

  useEffect(() => {
    setProducts(productsActive);
  }, [productsActive]);

  // const update = useCallback(() => {
  //   setProducts(productsActive);
  // }, [productsActive]);

  // useEffect(() => {
  //   update();
  // }, [update]);

  return (
    <div className="trending-product">
      <Section>
        <SectionTitle color="white">Sản Phẩm Thịnh Hành</SectionTitle>
        <SectionBody>
          <div className="content">
            <div className="trending-product__select">
              <Button
                backgroundColor={isActive === 0 ? "main" : "white"}
                size="sm"
                onClick={() => {
                  handleClick("FEATURED");
                }}
              >
                Đặt Sắc
              </Button>
              <Button
                backgroundColor={isActive === 1 ? "main" : "white"}
                size="sm"
                onClick={() => {
                  handleClick("BEST");
                }}
              >
                Sản Phẩm Mới
              </Button>
              <Button
                backgroundColor={isActive === 2 ? "main" : "white"}
                size="sm"
                onClick={() => {
                  handleClick("NEW");
                }}
              >
                Bán Chạy Nhất
              </Button>
            </div>

            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              grid={{
                fill: "row",
                rows: 2,
              }}
              breakpoints={{
                740: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                  grid: {
                    fill: "row",
                    rows: 2,
                  },
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                  grid: {
                    fill: "row",
                    rows: 2,
                  },
                },
              }}
              navigation={{
                prevEl: btnPrevRef.current,
                nextEl: btnNextRef.current,
              }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = btnPrevRef.current;
                swiper.params.navigation.nextEl = btnNextRef.current;
              }}
              className="trending-product__content"
            >
              {products.map((item, index) => (
                <SwiperSlide key={index}>
                  <ProductCard
                    slug={item.slug}
                    img01={`${baseURL}/${item.img01}`}
                    img02={`${baseURL}/${item.img02}`}
                    name={item.name}
                    priceSell={item.selling_price}
                    priceOld={item.orginal_price}
                    idProduct={item.id}
                    idUser={
                      user === null || user.data === "" ? 0 : user.data.user.id
                    }
                  />
                </SwiperSlide>
              ))}
              <div className="trending-product__control">
                <div
                  className="trending-product__control__prev"
                  ref={btnPrevRef}
                >
                  <Button
                    type="cricle"
                    backgroundColor="white"
                    icon="bx bx-left-arrow-alt"
                  ></Button>
                </div>
                <div
                  className="trending-product__control__next"
                  ref={btnNextRef}
                >
                  <Button
                    type="cricle"
                    backgroundColor="white"
                    icon="bx bx-right-arrow-alt"
                  ></Button>
                </div>
              </div>
            </Swiper>
          </div>
          {/* </div> */}
        </SectionBody>
      </Section>
    </div>
  );
};

TrendingProducts.propTypes = {
  data: PropTypes.array,
};

export default TrendingProducts;
