import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BannerItem = (props) => {
  const animate = props.animate ? "animate-" + props.animate : "animate";
  return (
    <Link to={props.path}>
      <div className="banner__item">
        <div className="border">
          <div className="banner__item__img">
            <img src={props.img} alt="banner" className={animate} />
          </div>
        </div>
      </div>
    </Link>
  );
};

BannerItem.propTypes = {
  path: PropTypes.string,
  img: PropTypes.string.isRequired,
  animate: PropTypes.string,
};

export default BannerItem;
