import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { InputNumber, Rate, Comment, Avatar } from "antd";

import Breadcrumb from "../../components/client/Breadcrumb ";
import Loading from "../Loading";
import numberWithCommas from "../../utils/numberWithCommas";

import productApi from "../../api/productApi";
import Button from "../../components/client/Button";
import { Input } from "antd";

import { useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addItems } from "../../redux/shopping-cart/cartItemsSlice";
import { getUser } from "../../redux/user/userSlice";

import Helmet from "../../components/Helmet";
import { useHistory } from "react-router-dom";

const Product = (props) => {
  const baseURL = "http://localhost:8000";

  let slug = props.match.params.slug;

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const refDesc = useRef(null);
  const refComment = useRef(null);
  const refReview = useRef(null);
  const refContentDesc = useRef(null);
  const refContentComment = useRef(null);
  const refContentReview = useRef(null);

  const handleClickTab = (type) => {
    refDesc.current.classList.remove("active");
    refComment.current.classList.remove("active");
    refReview.current.classList.remove("active");
    refContentDesc.current.classList.remove("active");
    refContentComment.current.classList.remove("active");
    refContentReview.current.classList.remove("active");
    switch (type) {
      case "DESC":
        {
          refDesc.current.classList.add("active");
          refContentDesc.current.classList.add("active");
        }
        break;
      case "COMMENT":
        {
          refComment.current.classList.add("active");
          refContentComment.current.classList.add("active");
        }
        break;
      case "REVIEW": {
        refReview.current.classList.add("active");
        refContentReview.current.classList.add("active");
      }
    }
  };

  const check = () => {
    if (quantity === undefined) {
      alert("Vui lòng chọn màu!");
      return false;
    }

    return true;
  };

  useEffect(() => {
    return dispatch(getUser());
  }, [dispatch]);
  const user = useSelector((state) => state.users.value);
  console.log(user);
  useEffect(() => {
    productApi.getSlug(slug).then((res) => {
      const newProduct = res.data.product;
      console.log(newProduct);
      setProduct(newProduct);
      setLoading(false);
    });
  }, [slug]);

  const addCart = () => {
    if (check()) {
      dispatch(
        addItems({
          idProduct: product.id,
          slug: product.slug,
          quantity: quantity,
          price: product.selling_price,
          idUser: user === null || user.data === "" ? 0 : user.data.user.id,
        })
      );
      alert("Đã thêm vào giỏ hàng!");
    }
  };
  const addToCart = () => {
    if (check()) {
      dispatch(
        addItems({
          idProduct: product.id,
          slug: product.slug,
          quantity: quantity,
          price: product.selling_price,
          idUser: user === null || user.data === "" ? 0 : user.data.user.id,
        })
      );
      history.push("/cart");
      alert("Đã thêm vào giỏ hàng!");
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Helmet title={product.name}>
        <Breadcrumb>
          <Link to="/">Trang Chủ</Link>/
          <Link to={`/category/${product.category.slug}`}>
            {product.category.slug}
          </Link>
          /<Link to={slug}>{slug}</Link>
        </Breadcrumb>
        <div className="product content">
          <div className="product__container">
            <div className="product__img">
              <img src={`${baseURL}/${product.img01}`} alt="" />
            </div>
            <div className="product__info">
              <div className="product__info__item">
                <div className="product__info__item__name">{product.name}</div>
              </div>
              <div className="product__info__item">
                <Rate
                  disabled
                  defaultValue={2}
                  className="product__info__item__rate"
                />
                {"  "} (1 Đánh Giá Của Khách Hàng)
              </div>

              <div className="product__info__item">
                <div className="product__info__item__price">
                  {numberWithCommas(product.selling_price)}
                  <span className="product__info__item__price__old">
                    {"   "}
                    <del>{numberWithCommas(product.orginal_price)}</del>
                  </span>
                </div>
              </div>

              <div className="product__info__item">
                {/* <div className="product__info__item__title">Số Lượng</div> */}

                <InputNumber
                  size="large"
                  min={1}
                  max={100000}
                  defaultValue={1}
                  onChange={(value) => setQuantity(value)}
                  className="product__info__item__quantity"
                />
              </div>
              <div className="product__info__item">
                <div className="product__info__item__btn">
                  <Button backgroundColor="main" onClick={addCart}>
                    Thêm Vào Giỏ
                  </Button>
                  <Button backgroundColor="main" onClick={addToCart}>
                    Mua Hàng
                  </Button>
                  <Button
                    type="cricle"
                    icon="bx bxs-heart"
                    backgroundColor="second"
                  ></Button>
                </div>
              </div>

              <div className="product__info__item">
                <div className="product__info__item__share">
                  SHARE:
                  <Link to="">
                    <i className="bx bxl-facebook"></i>
                  </Link>
                  <Link to="">
                    <i className="bx bxl-twitter"></i>
                  </Link>
                  <Link to="">
                    <i className="bx bxl-google-plus"></i>
                  </Link>
                  <Link to="">
                    <i className="bx bxl-messenger"></i>
                  </Link>
                </div>
              </div>
              <div className="product__info__item">
                <ul className="product__info__item__policy">
                  <li className="product__info__item__policy__item">
                    <i className="bx bxs-check-shield"></i>
                    Chính sách bảo mật (Chỉnh sửa với mô-đun bảo hiểm khách
                    hàng)
                  </li>
                  <li className="product__info__item__policy__item">
                    <i className="bx bxs-car"></i>
                    Chính sách giao hàng (Chỉnh sửa với mô-đun bảo hiểm khách
                    hàng)
                  </li>
                  <li className="product__info__item__policy__item">
                    <i className="bx bx-transfer"></i>
                    Chính sách hoàn trả (Chỉnh sửa với mô-đun bảo hiểm khách
                    hàng)
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="product__tab">
            <div className="product__tab__control">
              <div
                className="product__tab__control__item active"
                onClick={() => handleClickTab("DESC")}
                ref={refDesc}
              >
                Mô Tả
              </div>
              <div
                className="product__tab__control__item"
                onClick={() => handleClickTab("COMMENT")}
                ref={refComment}
              >
                Bình Luận
              </div>
              <div
                className="product__tab__control__item"
                onClick={() => handleClickTab("REVIEW")}
                ref={refReview}
              >
                Đánh Giá
              </div>
            </div>
            <div className="product__tab__content">
              <div
                className="product__tab__content__description active"
                dangerouslySetInnerHTML={{ __html: product.description }}
                ref={refContentDesc}
              ></div>
              <div
                className="product__tab__content__comment"
                ref={refContentComment}
              >
                <Comment
                  actions={[
                    <span key="comment-nested-reply-to">Reply to</span>,
                  ]}
                  author={<a>Han Solo</a>}
                  avatar={
                    <Avatar
                      src="https://joeschmoe.io/api/v1/random"
                      alt="Han Solo"
                    />
                  }
                  content={
                    <p>
                      We supply a series of design principles, practical
                      patterns and high quality design resources (Sketch and
                      Axure).
                    </p>
                  }
                >
                  <Comment
                    actions={[
                      <span key="comment-nested-reply-to">Reply to</span>,
                    ]}
                    author={<a>Han Solo</a>}
                    avatar={
                      <Avatar
                        src="https://joeschmoe.io/api/v1/random"
                        alt="Han Solo"
                      />
                    }
                    content={
                      <p>
                        We supply a series of design principles, practical
                        patterns and high quality design resources (Sketch and
                        Axure).
                      </p>
                    }
                  ></Comment>
                </Comment>
              </div>
              <div
                className="product__tab__content__review"
                ref={refContentReview}
              >
                {product.description}
              </div>
            </div>
          </div>
        </div>
      </Helmet>
    </>
  );
};

export default Product;
