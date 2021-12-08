import Breadcrumb from "../../components/client/Breadcrumb ";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Checkbox from "../../components/client/Checkbox";
import Grid from "../../components/Grid";
import Button from "../../components/client/Button";
import Loading from "../Loading";
import ProductCard from "../../components/client/ProductCard";

import productApi from "../../api/productApi";
import categoryApi from "../../api/categoryApi";

import Pagination from "../../components/admin/Pagination";

import banner from "../../assets/Image/sandwich.jpg";

const Category = (props) => {
  const baseURL = "http://localhost:8000";
  const [isSort, setIsSort] = useState(false);

  const [category, setCategory] = useState({});

  const [products, setProducts] = useState([]);
  const [productsCategory, setProductsCategory] = useState([]);
  const [productsCategorySort, setProductsCategorySort] = useState([]);

  // paganation
  const [currentPage, setCurrentPage] = useState(1);
  const [categorysPerPage] = useState(8);
  const indexOfLastIndex = currentPage * categorysPerPage;
  const indexOfFirtsIndex = indexOfLastIndex - categorysPerPage;

  const [loading, setLoading] = useState(true);
  let slug = props.match.params.slug;

  useEffect(() => {
    categoryApi.getSlug(slug).then((res) => {
      if (res.data.status === 200) {
        const newCategory = res.data.category;
        console.log(newCategory);
        setCategory(newCategory);
      }
    });
  }, [slug]);

  useEffect(() => {
    productApi.getAll().then((res) => {
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
    <>
      <Breadcrumb>
        <Link to="/">Home</Link> /<Link to={slug}>{slug}</Link>
      </Breadcrumb>
      <div className="category content">
        <div className="category__filter">
          <div className="category__filter__title">Filter By</div>
          <Button icon="bx bx-x" backgroundColor="second" size="md">
            Clear All
          </Button>
          <div className="category__filter__widget">
            <div className="category__filter__widget__title">Color</div>
            <div className="category__filter__widget__content">
              <Checkbox label="Green" />
              <Checkbox label="Yellow" />
              <Checkbox label="Blue" />
              <Checkbox label="Red" />
            </div>
          </div>
          <div className="category__filter__widget">
            <div className="category__filter__widget__title">Size</div>
            <div className="category__filter__widget__content">
              <Checkbox label="Small" />
              <Checkbox label="Medium" />
              <Checkbox label="Large" />
            </div>
          </div>
          <div className="category__filter__widget">
            <div className="category__filter__widget__title">Price</div>
            <div className="category__filter__widget__content">
              <Checkbox label="Smaller than $10.00" />
              <Checkbox label="$11.00 - $30.00" />
              <Checkbox label="$31.00 - $50.00" />
              <Checkbox label="$51.00 - $80.00" />
              <Checkbox label="Larger $81.00" />
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
              There are {productsCategory.length} products.
            </div>
            <div className="category__content__section__sort-by">
              <span>Sort by:</span>
              <select onChange={handleSortBy}>
                <option value="relevance">Relevance</option>
                <option value="NAME_A-Z">Name: A to Z</option>
                <option value="NAME_Z-A">Name: Z to A</option>
                <option value="PRICE_LOW-HIGH">Price: low to high </option>
                <option value="PRICE_HIGH-LOW">Price: high to low</option>
              </select>
            </div>
          </div>
          <div className="category__content__list-product">
            {productsPagination.lenght !== 0 ? (
              <Grid col={4} mdCol={2} smCol={1} gap={1}>
                {productsPagination.map((item, index) => (
                  <ProductCard
                    key={index}
                    img01={`${baseURL}/${item.img01}`}
                    img02={`${baseURL}/${item.img02}`}
                    name={item.name}
                    priceSell={item.selling_price}
                    priceOld={item.orginal_price}
                    border
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
    </>
  );
};

export default Category;
