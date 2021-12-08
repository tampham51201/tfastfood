import React from "react";

const img_title = require("../../assets/Image/title.png").default;

const Section = (props) => {
  return <div className="section">{props.children}</div>;
};
export const SectionTitle = (props) => {
  const color = props.color ? "color-" + props.color : "";
  return (
    <div className={`section__box-title ${color}`}>
      <img src={img_title} alt="" />
      <h3>{props.children}</h3>
    </div>
  );
};
export const SectionBody = (props) => {
  return <div className="section__body">{props.children}</div>;
};

export default Section;
