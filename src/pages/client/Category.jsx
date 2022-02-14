import Breadcrumb from "../../components/client/Breadcrumb ";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

// import Checkbox from "../../components/client/Checkbox";
import Grid from "../../components/Grid";
import Button from "../../components/client/Button";
import Loading from "../Loading";
import ProductCard from "../../components/client/ProductCard";

import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/user/userSlice";

import { Checkbox, Row, Col } from "antd";

import productApi from "../../api/productApi";
import categoryApi from "../../api/categoryApi";

import Pagination from "../../components/admin/Pagination";

import banner from "../../assets/Image/sandwich.jpg";
import Helmet from "../../components/Helmet";
import Form from "antd/lib/form/Form";
import FormItem from "antd/lib/form/FormItem";

const Category = (props) => {
  const baseURL = process.env.REACT_APP_API_URL;
  const [isSort, setIsSort] = useState(false);
  const [isFilter, setIsFilter] = useState(false);

  const [check, setCheck] = useState([]);
  const filterRef = useRef(null);

  const [category, setCategory] = useState({});

  const [products, setProducts] = useState([]);
  const [productsFilter, setProductsFilter] = useState([]);
  const [productsCategory, setProductsCategory] = useState([]);
  const [productsCategorySort, setProductsCategorySort] = useState([]);

  // paganation
  const [currentPage, setCurrentPage] = useState(1);
  const [categorysPerPage] = useState(8);
  const indexOfLastIndex = currentPage * categorysPerPage;
  const indexOfFirtsIndex = indexOfLastIndex - categorysPerPage;

  const [loading, setLoading] = useState(true);
  let slug = props.match.params.slug;

  const dispatch = useDispatch();
  useEffect(() => {
    return dispatch(getUser());
  }, [dispatch]);
  const user = useSelector((state) => state.users.value);

  useEffect(() => {
    categoryApi.getSlug(slug).then((res) => {
      if (res.data.status === 200) {
        const newCategory = res.data.category;
        console.log(newCategory);
        setCategory(newCategory);
        setCheck([]);
        window.scrollTo(0, 0);
      }
    });
  }, [slug]);

  useEffect(() => {
    productApi.getAllStatus().then((res) => {
      if (res.data.status === 200) {
        const newProductList = res.data.product;
        setProducts(newProductList);
        setLoading(false);
      }
    });
  }, []);
  useEffect(() => {
    const newProductCategorys = products.filter(
      (product) => product.category.slug === slug
    );
    setProductsCategory(newProductCategorys);
  }, [products, slug]);

  const handleToggleClick = () => {
    filterRef.current.classList.toggle("toggle");
  };

  const handleSortBy = (e) => {
    let temp = productsCategory;
    switch (e.target.value) {
      case "NAME_A-Z":
        temp = temp.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
        break;
      case "NAME_Z-A":
        temp = temp.sort((a, b) =>
          a.name < b.name ? 1 : b.name < a.name ? -1 : 0
        );
        break;
      case "PRICE_LOW-HIGH":
        temp = temp.sort((a, b) => b.selling_price - a.selling_price);
        break;
      case "PRICE_HIGH-LOW":
        temp = temp.sort((a, b) => a.selling_price - b.selling_price);
        break;
      default:
        temp = temp.sort((a, b) => a.id - b.id);
    }
    setIsSort(true);
    setProductsCategorySort(temp);
  };

  function onChange(checkedValues) {
    // console.log(checkedValues);
    const newProductCategorys = products.filter(
      (product) => product.category.slug === slug
    );
    setProductsCategory(newProductCategorys);
    var temp = [];
    setCheck(checkedValues);
    checkedValues.forEach((item) => {
      if (item === "1") {
        const new1 = newProductCategorys.filter(
          (item) => item.selling_price <= 50000
        );
        console.log(new1);
        temp = temp.concat(new1);
        setProductsCategory(temp);
      }
      if (item === "2") {
        const new2 = newProductCategorys.filter(
          (item) => item.selling_price > 50000 && item.selling_price <= 100000
        );
        temp = temp.concat(new2);
        setProductsCategory(temp);
      }
      if (item === "3") {
        const new3 = newProductCategorys.filter(
          (item) => item.selling_price > 100000 && item.selling_price <= 150000
        );
        temp = temp.concat(new3);
        setProductsCategory(temp);
      }
      if (item === "4") {
        const new4 = newProductCategorys.filter(
          (item) => item.selling_price > 150000 && item.selling_price <= 250000
        );
        temp = temp.concat(new4);
        setProductsCategory(temp);
      }
      if (item === "5") {
        const new5 = newProductCategorys.filter(
          (item) => item.selling_price > 250000
        );
        temp = temp.concat(new5);
        setProductsCategory(temp);
      }
    });
  }

  useEffect(() => {
    setProductsCategory(productsCategorySort);
    setIsSort(false);
  }, [isSort]);

  //pagenation
  const productsPagination = productsCategory.slice(
    indexOfFirtsIndex,
    indexOfLastIndex
  );
  if (loading) {
    return <Loading />;
  }
  return (
    <Helmet title={category[0].name}>
      <Breadcrumb>
        <Link to="/">Trang Chủ</Link> /<Link to={slug}>{slug}</Link>
      </Breadcrumb>
      <div className="category content">
        <div className="category__filter" ref={filterRef}>
          <div className="category__filter__title">Lọc Theo</div>
          <Button
            icon="bx bx-x"
            backgroundColor="second"
            size="md"
            onClick={() => {
              onChange([]);
              // setCheck([]);
            }}
          >
            Xóa tất cả
          </Button>

          <div className="category__filter__widget">
            <div className="category__filter__widget__title">Giá Tiền</div>
            <div className="category__filter__widget__content">
              <Checkbox.Group
                style={{ width: "100%" }}
                onChange={onChange}
                value={check}
              >
                <Row>
                  <Col span={24}>
                    <Checkbox value="1" className="ant-checkbox">
                      Nhỏ Hơn 50.000đ
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="2" className="ant-checkbox" name="1">
                      50.000đ - 100.000đ
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="3" className="ant-checkbox" name="1">
                      100.000đ - 150.000đ
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="4" className="ant-checkbox" name="1">
                      150.000đ - 250.000đ
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="5" className="ant-checkbox" name="1">
                      Lớn Hơn 250.000đ
                    </Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </div>
          </div>
        </div>
        <div className="category__content">
          <div className="category__content__banner">
            <img src={banner} alt="" />
          </div>
          <div className="category__content__info">
            <div className="category__content__info__title">
              {category[0].name}
            </div>
            <div className="category__content__info__description">
              {category[0].description}
            </div>
          </div>
          <div className="category__content__section">
            <div className="category__content__section__total">
              <i className="bx bxs-grid"></i>
              {/* <i class="bx bx-list-ul"></i> */}
              Có {productsCategory.length} sản phẩm.
            </div>
            <div className="category__content__section__sort-by">
              <span>Sắp Xếp:</span>
              <select onChange={handleSortBy}>
                <option value="relevance">Mặc định</option>
                <option value="NAME_A-Z">Tên: A đến Z</option>
                <option value="NAME_Z-A">Tên: Z đến A</option>
                <option value="PRICE_HIGH-LOW">Giá: nhỏ lên lớn</option>
                <option value="PRICE_LOW-HIGH">Giá: lớn xuống nhỏ </option>
              </select>
              <div className="category__toggle" onClick={handleToggleClick}>
                <Button
                  backgroundColor="second"
                  size="md"
                  onClick={() => {
                    onChange([]);
                    // setCheck([]);
                  }}
                >
                  Bộ Lọc
                </Button>
              </div>
            </div>
          </div>

          <div className="category__content__list-product">
            {productsPagination.lenght !== 0 ? (
              <Grid col={4} mdCol={2} smCol={1} gap={1}>
                {productsPagination.map((item, index) => (
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
                      user === null || user.data === "" ? 0 : user.data.user.id
                    }
                  />
                ))}
              </Grid>
            ) : (
              ""
            )}
          </div>
          <Pagination
            postsPage={categorysPerPage}
            totalPages={productsCategory.length}
            paginate={(number) => {
              setCurrentPage(number);
            }}
          />
        </div>
      </div>
    </Helmet>
  );
};

export default Category;
