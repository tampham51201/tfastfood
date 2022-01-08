import React from "react";

import PropTypes from "prop-types";
import Section, { SectionTitle, SectionBody } from "../client/Section";
import BannerItem from "../client/BannerItem";

import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import SwiperCore, { Autoplay } from "swiper";
SwiperCore.use([Autoplay]);
// Import Swiper styles
const Featured = (props) => {
  return (
    <Section>
      <SectionTitle>Cảm Thấy Đói Bụng</SectionTitle>
      <SectionBody>
        <div className="content">
          <div className="featured">
            <Swiper
              slidesPerView={props.slidesPerViewMobile}
              spaceBetween={props.spaceBetweenMobile}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                740: {
                  slidesPerView: props.slidesPerView,
                  spaceBetween: props.spaceBetween,
                },
              }}
              className="featured__banner"
            >
              {props.data.map((item, index) => (
                <SwiperSlide key={index}>
                  <BannerItem img={item.img} path={item.path} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </SectionBody>
    </Section>
  );
};

Featured.propTypes = {
  data: PropTypes.array.isRequired,
  slidesPerView: PropTypes.number.isRequired,
  spaceBetween: PropTypes.number.isRequired,
  slidesPerViewMobile: PropTypes.number.isRequired,
  spaceBetweenMobile: PropTypes.number.isRequired,
};

export default Featured;
