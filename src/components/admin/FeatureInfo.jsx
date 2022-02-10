import React from "react";
import PropTypes from "prop-types";

const FeatureInfo = (props) => {
  const bgColor = props.color ? "bg-" + props.color : "";
  return (
    <div className={`feature-info ${bgColor}`}>
      <div className="feature-info__content">
        <div className="feature-info__content__title">{props.title}</div>
        <div className="feature-info__content__value">{props.value}</div>
      </div>
      <div className="feature-info__icon">
        <i className={props.icon}></i>
      </div>
    </div>
  );
};

FeatureInfo.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
};

export default FeatureInfo;
