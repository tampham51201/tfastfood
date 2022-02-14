import React, { useRef } from "react";
import PropTypes from "prop-types";

import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
// Import Swiper styles

import SwiperCore, { Navigation, Autoplay } from "swiper";

// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);

const HeroSlider = (props) => {
  const btnPrevRef = useRef(null);
  const btnNextRef = useRef(null);
  return (
    <>
      <Swiper
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: btnPrevRef.current,
          nextEl: btnNextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = btnPrevRef.current;
          swiper.params.navigation.nextEl = btnNextRef.current;
        }}
        className="hero-slider"
      >
        {props.data.map((item, index) => (
          <SwiperSlide className="hero-slider__item" key={index}>
            <img
              src={`${process.env.REACT_APP_API_URL}/${item.img}`}
              alt="slider"
            />
          </SwiperSlide>
        ))}
        <div className="hero-slider__control">
          <div className="hero-slider__control__prev" ref={btnPrevRef}>
            <i className="bx bx-chevron-left"></i>
          </div>
          <div className="hero-slider__control__next" ref={btnNextRef}>
            <i className="bx bx-chevron-right"></i>
          </div>
        </div>
      </Swiper>
    </>
  );
};

HeroSlider.propTypes = {
  data: PropTypes.array.isRequired,
};

export default HeroSlider;
