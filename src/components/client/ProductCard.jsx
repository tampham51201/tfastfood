import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import { Link } from "react-router-dom";
import numberWithCommas from "../../utils/numberWithCommas";

import { notification } from "antd";

import { useDispatch } from "react-redux";
import { addItems } from "../../redux/shopping-cart/cartItemsSlice";
import { addItemsFavorite } from "../../redux/favorite-products/favoriteItemsSlice";

const ProductCard = (props) => {
  const border = props.border ? "border-product" : "";
  const dispatch = useDispatch();
  const addCart = () => {
    dispatch(
      addItems({
        idProduct: props.idProduct,
        slug: props.slug,
        quantity: 1,
        price: props.priceSell,
        idUser: props.idUser,
      })
    );
    notification.success({
      message: `Thành Công`,
      description: "Đã Thêm Vào Giỏ Hàng",
      duration: 2,
      placement: "topRight",
    });
  };

  const addFavorite = () => {
    dispatch(
      addItemsFavorite({
        idProduct: props.idProduct,
        slug: props.slug,
        price: props.priceSell,
        idUser: props.idUser,
      })
    );

    notification.success({
      message: `Thành Công`,
      description: "Đã Thêm Vào Danh Sách Yêu Thích",
      duration: 2,
      placement: "topRight",
    });
  };
  return (
    <div className={`product-card ${border}`}>
      <div className="product-card__img">
        <Link to={`/product/${props.slug}`}>
          <img src={props.img01} alt="" />
        </Link>
        <div className="product-card__btn">
          <div className="product-card__btn__item">
            <Button
              type="cricle"
              onClick={addCart}
              backgroundColor="second"
              icon="bx bxs-cart-alt"
            ></Button>
          </div>
          <div className="product-card__btn__item">
            <Button
              onClick={addFavorite}
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
  idProduct: PropTypes.number,
  idUser: PropTypes.number,
};

export default ProductCard;
