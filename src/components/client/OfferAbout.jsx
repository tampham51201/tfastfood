import React from "react";
import PropTypes from "prop-types";
import Section, { SectionBody, SectionTitle } from "./Section";
import Button from "./Button";

const OfferAbout = (props) => {
  const bg = props.backgroundColor ? "bg-color-" + props.backgroundColor : "";
  const reserve = props.reserve ? "reserve" : "";
  return (
    <div className={`offer-about ${bg}`}>
      <div className={`content ${reserve}`}>
        <div className="offer-about__img">
          <img src={props.img} alt="" className="offer-about__img__main" />
          <img
            src={props.imgDiscount}
            alt=""
            className="offer-about__img__discount"
          />
        </div>
        <Section>
          <SectionTitle>{props.title}</SectionTitle>
          <SectionBody>
            <div className="offer-about__info">
              <p className="offer-about__info__description">
                {props.description}
              </p>
              <div className="offer-about__info__btn">
                <Button backgroundColor="second">Xem Thêm</Button>
              </div>
            </div>
          </SectionBody>
        </Section>
      </div>
    </div>
  );
};

OfferAbout.propTypes = {
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  imgDiscount: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  reserve: PropTypes.bool,
  backgroundColor: PropTypes.string,
};

export default OfferAbout;
