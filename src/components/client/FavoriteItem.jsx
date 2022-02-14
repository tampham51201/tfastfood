import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import numberWithCommas from "../../utils/numberWithCommas";
import { removeItemFavorite } from "../../redux/favorite-products/favoriteItemsSlice";

import { addItems } from "../../redux/shopping-cart/cartItemsSlice";

const FavoriteItem = (props) => {
  const baseURL = process.env.REACT_APP_API_URL;
  const dispatch1 = useDispatch();

  const [item, setItem] = useState(props.item);

  useEffect(() => {
    setItem(props.item);
  }, [props.item]);
  console.log(props.item);
  console.log(item);

  const addCart = () => {
    dispatch1(
      addItems({
        idProduct: item.idProduct,
        slug: item.slug,
        quantity: 1,
        price: item.price,
        idUser: item.idUser,
      })
    );
    alert("Đã thêm vào giỏ hàng!");
  };

  const removeCartItem = () => {
    dispatch1(removeItemFavorite(item));
  };

  return (
    <div className="my-favorite__item">
      <div className="my-favorite__item__img">
        <img src={`${baseURL}/${item.product.img01}`} alt="" />
      </div>
      <div className="my-favorite__item__info">
        <div className="my-favorite__item__info__name">
          <Link to={`/product/${item.slug}`}>{`${item.product.name}`}</Link>
        </div>
        <div className="my-favorite__item__info__price">
          {numberWithCommas(item.product.selling_price)}
        </div>
        <div className="my-favorite__item__info__icon">
          <div className="my-favorite__item__info__del" onClick={addCart}>
            <i className="bx bxs-cart-alt"></i>
          </div>

          <div
            className="my-favorite__item__info__del"
            onClick={removeCartItem}
          >
            <i className="bx bx-trash"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteItem;
