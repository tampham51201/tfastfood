import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { InputNumber, Rate } from "antd";
import { notification } from "antd";
import Breadcrumb from "../../components/client/Breadcrumb ";
import Loading from "../Loading";
import numberWithCommas from "../../utils/numberWithCommas";

import Grid from "../../components/Grid";

import ProductCard from "../../components/client/ProductCard";

import productApi from "../../api/productApi";
import Button from "../../components/client/Button";

import Comment from "../../components/client/CommentUser";

import Section, {
  SectionTitle,
  SectionBody,
} from "../../components/client/Section";

import dateFormat from "dateformat";

import { useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addItems } from "../../redux/shopping-cart/cartItemsSlice";

import { addItemsFavorite } from "../../redux/favorite-products/favoriteItemsSlice";

import { getUser } from "../../redux/user/userSlice";

import Helmet from "../../components/Helmet";
import { useHistory } from "react-router-dom";

const Product = (props) => {
  const baseURL = process.env.REACT_APP_API_URL;

  let slug = props.match.params.slug;

  const [product, setProduct] = useState({});
  const [productList, setProductList] = useState([]);
  const [productsRelated, setProductsRelated] = useState([]);

  const [loading, setLoading] = useState(true);

  const [totalStar, setTotalStar] = useState(5);

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
      var newtotalStar = 0;
      if (newProduct.review.length !== 0) {
        newtotalStar =
          newProduct.review.reduce(
            (total, item) => total + Number(item.rate_star),
            0
          ) / newProduct.review.length;
      } else {
        newtotalStar = 0;
      }
      setTotalStar(newtotalStar);
      setProduct(newProduct);
      setLoading(false);
      window.scrollTo(0, 0);
    });
  }, [slug]);

  useEffect(() => {
    productApi.getAllStatus().then((res) => {
      const newProductList = res.data.product;
      console.log(newProductList);
      setProductList(newProductList);
    });
  }, []);

  useEffect(() => {
    const newFeature = productList.filter(
      (item) => item.category_id === product.category_id
    );

    setProductsRelated(newFeature.slice(0, 4));
  }, [product, productList]);

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
      notification.success({
        message: `Thành Công`,
        description: "Đã Thêm Vào Giỏ Hàng",
        duration: 2,
        placement: "topRight",
      });
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
      notification.success({
        message: `Thành Công`,
        description: "Đã Thêm Vào Giỏ Hàng",
        duration: 2,
        placement: "topRight",
      });
    }
  };

  const addFavorite = () => {
    if (check()) {
      dispatch(
        addItemsFavorite({
          idProduct: product.id,
          slug: product.slug,
          price: product.selling_price,
          idUser: user === null || user.data === "" ? 0 : user.data.user.id,
        })
      );
      notification.success({
        message: `Thành Công`,
        description: "Đã Thêm Vào Danh Sách Yêu Thích",
        duration: 2,
        placement: "topRight",
      });
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
                  allowHalf
                  defaultValue={totalStar}
                  className="product__info__item__rate"
                />
                {"  "} ({product.review.length} Đánh Giá Của Khách Hàng)
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
                    onClick={addFavorite}
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
                <Comment comment={product.comment} idProduct={product.id} />
              </div>
              <div
                className="product__tab__content__review"
                ref={refContentReview}
              >
                <div className="product__tab__content__review__rate-star">
                  <Rate
                    allowHalf
                    className="product__tab__content__review__rate-star__star"
                    defaultValue={totalStar}
                    disabled
                  />
                  <span> ({totalStar} Trên 5 Sao)</span>
                </div>
                {product.review.map((item, index) => (
                  <div
                    className="product__tab__content__review__item"
                    key={index}
                  >
                    <div className="product__tab__content__review__item__user">
                      <div className="product__tab__content__review__item__user__avata">
                        <i className="bx bxs-user-circle"></i>
                      </div>
                      <div className="product__tab__content__review__item__user__info">
                        <span> {item.user.username}</span>
                        <Rate
                          allowHalf
                          className="product__tab__content__review__item__user__info__star"
                          defaultValue={item.rate_star}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="product__tab__content__review__item__content">
                      {item.content}
                    </div>
                    <div className="product__tab__content__review__item__time">
                      {dateFormat(item.created_at, "dd/mm/yyyy h:MM TT")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="product__feature" style={{ marginTop: "10rem" }}>
            <Section>
              <SectionTitle>Món Ăn Liên Quan</SectionTitle>
              <SectionBody>
                {productsRelated.lenght !== 0 ? (
                  <Grid col={4} mdCol={2} smCol={1} gap={1}>
                    {productsRelated.map((item, index) => (
                      <ProductCard
                        key={index}
                        slug={item.slug}
                        img01={`${baseURL}/${item.img01}`}
                        img02={`${baseURL}/${item.img02}`}
                        name={item.name}
                        idProduct={item.id}
                        priceSell={item.selling_price}
                        priceOld={item.orginal_price}
                        border
                        idUser={
                          user === null || user.data === ""
                            ? 0
                            : user.data.user.id
                        }
                      />
                    ))}
                  </Grid>
                ) : (
                  ""
                )}
              </SectionBody>
            </Section>
          </div>
        </div>
      </Helmet>
    </>
  );
};

export default Product;
