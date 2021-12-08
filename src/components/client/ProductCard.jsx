import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import { Link } from "react-router-dom";
import numberWithCommas from "../../utils/numberWithCommas";

const ProductCard = (props) => {
  const border = props.border ? "border-product" : "";
  return (
    <div className={`product-card ${border}`}>
      <Link to={`/category/${props.slug}`}>
        <div className="product-card__img">
          <img src={props.img01} alt="" />
          <div className="product-card__btn">
            <div className="product-card__btn__item">
              <Button
                type="cricle"
                backgroundColor="second"
                icon="bx bxs-cart-alt"
              ></Button>
            </div>
            <div className="product-card__btn__item">
              <Button
                type="cricle"
                backgroundColor="second"
                icon="bx bxs-heart"
              ></Button>
            </div>
            <div className="product-card__btn__item">
              <Button
                type="cricle"
                backgroundColor="second"
                icon="bx bx-revision"
              ></Button>
            </div>
            <div className="product-card__btn__item">
              <Button
                type="cricle"
                backgroundColor="second"
                icon="bx bxs-show"
              ></Button>
            </div>
          </div>
        </div>
      </Link>
      <div className="product-card__info">
        <div className="product-card__info__name">{props.name}</div>
        <div className="product-card__info__price">
          {numberWithCommas(props.priceSell)}
          <del className="product-card__info__price__old">
            {numberWithCommas(props.priceOld)}
          </del>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  img01: PropTypes.string,
  img02: PropTypes.string,
  slug: PropTypes.string,
  name: PropTypes.string,
  priceOld: PropTypes.string,
  priceSell: PropTypes.string,
  border: PropTypes.bool,
};

export default ProductCard;
