import React from "react";

import PropTypes from "prop-types";
import Section, { SectionTitle, SectionBody } from "../components/Section";
import BannerItem from "./BannerItem";
import Grid from "./Grid";

import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import SwiperCore, { Autoplay } from "swiper";
SwiperCore.use([Autoplay]);
// Import Swiper styles

const Featured = (props) => {
  return (
    <Section>
      <SectionTitle>Getting Hungry</SectionTitle>
      <SectionBody>
        <div className="content">
          <div className="featured">
            <Swiper
              slidesPerView={2}
              spaceBetween={2}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                740: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}
              className="featured__banner"
            >
              {props.data.map((item, index) => (
                <SwiperSlide key={index}>
                  <BannerItem img={item.img} path={item.path} animate={true} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </SectionBody>
      <Grid col={2} mdCol={2} smCol={1}>
        <div className="featured-about__img">
          <img src="" alt="" />
        </div>
      </Grid>
    </Section>
  );
};

Featured.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Featured;
