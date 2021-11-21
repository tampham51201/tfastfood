import React from "react";
import Helmet from "../../components/Helmet";
import HeroSlider from "../../components/client/HeroSlider";
import Featured from "../../components/client/Featured";
import OfferAbout from "../../components/client/OfferAbout";

import bannerFeatured from "../../api/banner/banner-featured";

import featuredAbout, { offerAbout } from "../../api/featured/fetured";

const slider01 = require("../../assets/Image/Banner/slider_01.jpg").default;
const slider02 = require("../../assets/Image/Banner/slider_02.jpg").default;

const sliderList = [
  {
    img: slider01,
  },
  {
    img: slider02,
  },
];

const Home = () => {
  return (
    <Helmet title="Home">
      {/* slider start */}
      <HeroSlider data={sliderList} />
      {/* slider end */}

      {/* banner start */}
      <Featured
        data={bannerFeatured}
        slidesPerView={3}
        slidesPerViewMobile={2}
        spaceBetween={10}
        spaceBetweenMobile={20}
      />

      {/* banner end */}
      {/* offerAbout start */}
      <OfferAbout
        title={featuredAbout.title}
        img={featuredAbout.img}
        imgDiscount={featuredAbout.imgDiscout}
        description={featuredAbout.description}
      />
      {/* offerAbout end */}

      <OfferAbout
        backgroundColor="second"
        title={offerAbout.title}
        img={offerAbout.img}
        imgDiscount={offerAbout.imgDiscout}
        description={offerAbout.description}
        reserve
      />
      {/* offerAbout end */}
    </Helmet>
  );
};

export default Home;
