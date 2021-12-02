import React, { useState, useEffect } from "react";

import Container, {
  ContainerBody,
  ContainerTitle,
  ContainerDescription,
  ContainerHeader,
  ContainerHeaderRight,
} from "../../../components/admin/Container";

import { Link } from "react-router-dom";
import InputItem from "../../../components/admin/InputItem";
import Button from "../../../components/admin/Button";

import swal from "sweetalert";
import SelectInput from "../../../components/admin/SelectInput";
import categoryApi from "../../../api/categoryApi";
import productApi from "../../../api/productApi";

const AddProduct = () => {
  const ProductInits = {
    category_id: "",
    name: "",
    slug: "",
    description: "",
    img01: "",
    img02: "",

    orginal_price: "",
    selling_price: "",
    qty: "",
    featured: "",
    popular: "",
    status: "",
    message: [],
  };
  const PictureInits = {
    img01: "",
    img02: "",
  };

  const [categorys, setCategorys] = useState([]);
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(PictureInits);
  const [product, setProduct] = useState(ProductInits);

  useEffect(() => {
    categoryApi.getStatus().then((res) => {
      if (res.status === 200) {
        const newCategorys = res.data.categorys;
        setCategorys(newCategorys);
      }
    });
  }, []);
  const handleInputProduct = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleDescProduct = (value) => {
    setDescription(value);
  };

  const handleFiletProduct = (e) => {
    setPicture({ ...picture, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category_id", product.category_id);
    formData.append("name", product.name);
    formData.append("description", description);
    formData.append("slug", product.slug);
    formData.append("qty", product.qty);

    formData.append("img01", picture.img01);
    formData.append("img02", picture.img02);

    formData.append("orginal_price", product.orginal_price);
    formData.append("selling_price", product.selling_price);
    formData.append("featured", product.featured);
    formData.append("popular", product.popular);
    formData.append("status", product.status);

    productApi.addProduct(formData).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setProduct(ProductInits);
        setDescription("");
      } else {
        swal("Success", "error", "erorr");
        setProduct({ ...product, message: res.data.errors });
      }
    });
  };

  return (
    <div>
      <Container>
        <ContainerHeader>
          <ContainerTitle>
            New Product
            <ContainerDescription>
              Add information and add new product.
            </ContainerDescription>
          </ContainerTitle>
          <ContainerHeaderRight>
            <Link to="/admin/product">
              <Button>Back</Button>
            </Link>
          </ContainerHeaderRight>
        </ContainerHeader>
        <ContainerBody>
          <form onSubmit={handleSubmit}>
            <SelectInput
              name="category_id"
              onChange={handleInputProduct}
              value={product.category_id}
              data={categorys}
              label="Select Category"
              message={product.message.category_id}
            />
            <InputItem
              label="Product Title"
              type="text"
              onChange={handleInputProduct}
              name="name"
              value={product.name}
              message={product.message.name}
            />

            <InputItem
              label="Slug"
              type="text"
              onChange={handleInputProduct}
              name="slug"
              value={product.slug}
              message={product.message.slug}
            />

            <InputItem
              label="Orginal Price"
              type="text"
              onChange={handleInputProduct}
              name="orginal_price"
              value={product.orginal_price}
              message={product.message.orginal_price}
            />
            <InputItem
              label="Selling Price"
              type="text"
              onChange={handleInputProduct}
              name="selling_price"
              value={product.selling_price}
              message={product.message.selling_price}
            />
            <InputItem
              label="Quantity"
              type="text"
              onChange={handleInputProduct}
              name="qty"
              value={product.qty}
              message={product.message.qty}
            />
            <InputItem
              label="Image 01"
              type="file"
              onChange={handleFiletProduct}
              name="img01"
              message={product.message.img01}
            />

            <InputItem
              label="Image 02"
              type="file"
              onChange={handleFiletProduct}
              name="img02"
              message={product.message.img02}
            />

            <InputItem
              label="Description"
              type="ckedit"
              onChange={(value) => {
                handleDescProduct(value);
              }}
              value={description}
            />

            <InputItem
              label="Featured"
              type="checkbox"
              onChange={handleInputProduct}
              name="featured"
              value={product.featured}
              message={product.message.featured}
            />
            <InputItem
              label="Popular"
              type="checkbox"
              onChange={handleInputProduct}
              name="popular"
              value={product.popular}
              message={product.message.popular}
            />
            <InputItem
              label="Status"
              type="checkbox"
              onChange={handleInputProduct}
              name="status"
              value={product.status}
            />
            <Button submit>Add New</Button>
          </form>
        </ContainerBody>
      </Container>
    </div>
  );
};

export default AddProduct;
