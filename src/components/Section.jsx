import React from "react";

const img_title = require("../assets/Image/title.png").default;

const Section = (props) => {
  return <div className="section">{props.children}</div>;
};
export const SectionTitle = (props) => {
  return (
    <div className="section__box-title">
      <img src={img_title} alt="" />
      <h3>{props.children}</h3>
    </div>
  );
};
export const SectionBody = (props) => {
  return <div className="section__body">{props.children}</div>;
};

export default Section;
