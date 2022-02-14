import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { InputNumber } from "antd";
import numberWithCommas from "../../utils/numberWithCommas";
import {
  updateItems,
  removeItem,
} from "../../redux/shopping-cart/cartItemsSlice";
const CartItem = (props) => {
  const baseURL = process.env.REACT_APP_API_URL;
  const dispatch1 = useDispatch();

  const [item, setItem] = useState(props.item);

  const [quantity, setQuantity] = useState(props.item.quantity);

  useEffect(() => {
    setItem(props.item);
    setQuantity(props.item.quantity);
  }, [props.item]);
  useEffect(() => {
    dispatch1(
      updateItems({
        ...item,
        quantity: quantity,
      })
    );
  }, [quantity]);

  const removeCartItem = () => {
    dispatch1(removeItem(item));
  };

  return (
    <div className="cart__item">
      <div className="cart__item__img">
        <img src={`${baseURL}/${item.product.img01}`} alt="" />
      </div>
      <div className="cart__item__info">
        <div className="cart__item__info__name">
          <Link to={`/product/${item.slug}`}>{`${item.product.name}`}</Link>
        </div>
        <div className="cart__item__info__price">
          {numberWithCommas(item.product.selling_price)}
        </div>

        <InputNumber
          size="large"
          min={1}
          max={100000}
          defaultValue={quantity}
          onChange={(value) => setQuantity(value)}
          className="product__info__item__quantity"
        />
        <div className="cart__item__info__del" onClick={removeCartItem}>
          <i className="bx bx-trash"></i>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
