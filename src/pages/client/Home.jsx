import React, { useEffect, useState } from "react";
import Helmet from "../../components/Helmet";
import HeroSlider from "../../components/client/HeroSlider";
import Featured from "../../components/client/Featured";
import OfferAbout from "../../components/client/OfferAbout";

import bannerFeatured from "../../api/banner/banner-featured";

import featuredAbout, { offerAbout } from "../../api/featured/fetured";
import TrendingProducts from "../../components/client/TrendingProducts";
import productApi from "../../api/productApi";
import Loading from "../Loading";
import bannerApi from "../../api/bannerApi";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sliderList, setSliderList] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await productApi.getAllStatus();
      if (res.data.status === 200) {
        const newProductList = res.data.product;
        setProducts(newProductList);
        console.log(res);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    const getBanner = async () => {
      const res = await bannerApi.getAll();
      if (res.data.status === 200) {
        const newBannerList = res.data.banners;
        setSliderList(newBannerList);
        console.log(res);
        setLoading(false);
      }
    };
    getBanner();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Helmet title="Trang Chủ">
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
      {/* trending-product start */}
      <TrendingProducts data={products} />
      {/* trending-product end */}
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
