import React from "react";
import { useLocation } from "react-router";
import ReactLoading from "react-loading";
import img from "../../src/assets/Image/ajax-loader.gif";

const Loading = () => {
  const location = useLocation();

  return (
    <div className="loading">
      {location.pathname.includes("admin") ? (
        <ReactLoading type="bars" color="#9d72ff" />
      ) : (
        <img src={img} alt="ds" />
      )}
    </div>
  );
};

export default Loading;
