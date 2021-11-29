import React, { useState, useEffect } from "react";

import Container, {
  ContainerBody,
  ContainerTitle,
  ContainerDescription,
} from "../../../components/admin/Container";

import InputItem from "../../../components/admin/InputItem";
import Button from "../../../components/admin/Button";

import swal from "sweetalert";
import SelectInput from "../../../components/admin/SelectInput";
import categoryApi from "../../../api/categoryApi";
import productApi from "../../../api/productApi";
import Loading from "../../Loading";
import { useHistory } from "react-router";

const EditProduct = (props) => {
  const PictureInits = {
    img01: "",
    img02: "",
  };

  const [categorys, setCategorys] = useState([]);
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(PictureInits);
  const [product, setProduct] = useState([]);
  const [errors, setErorrs] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  useEffect(() => {
    categoryApi.getStatus().then((res) => {
      if (res.status === 200) {
        const newCategorys = res.data.categorys;
        setCategorys(newCategorys);
      }
    });
  }, []);

  useEffect(() => {
    const product_id = props.match.params.id;
    productApi.getId(product_id).then((res) => {
      if (res.data.status === 200) {
        const newProduct = res.data.product;
        setProduct(newProduct);
        setDescription(newProduct.description);
        setPicture({
          img01: newProduct.img01,
          img02: newProduct.img02,
        });

        setLoading(false);
      } else if (res.data.status === 404) {
        swal("Erorr", res.data.message, "error");
        history.push("admin/category");
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
    formData.append("img01", `${picture.img01}`);
    formData.append("img02", picture.img02);
    formData.append("orginal_price", product.orginal_price);
    formData.append("selling_price", product.selling_price);
    formData.append("featured", product.featured);
    formData.append("popular", product.popular);
    formData.append("status", product.status);

    const product_id = props.match.params.id;
    productApi.Update(product_id, formData).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
      }
      if (res.data.status === 422) {
        setErorrs(res.data.errors);
      }
    });
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Container>
        <ContainerTitle> Edit Product</ContainerTitle>
        <ContainerDescription>Edit information product.</ContainerDescription>
        <ContainerBody>
          <form onSubmit={handleSubmit}>
            <SelectInput
              name="category_id"
              onChange={handleInputProduct}
              value={`${product.category_id}`}
              data={categorys}
              label="Select Category"
              // message={errors.category_id}
            />
            <InputItem
              label="Product Title"
              type="text"
              onChange={handleInputProduct}
              name="name"
              value={product.name}
              message={errors.name}
            />

            <InputItem
              label="Slug"
              type="text"
              onChange={handleInputProduct}
              name="slug"
              value={product.slug}
              message={errors.slug}
            />

            <InputItem
              label="Orginal Price"
              type="text"
              onChange={handleInputProduct}
              name="orginal_price"
              value={product.orginal_price}
              message={errors.orginal_price}
            />
            <InputItem
              label="Selling Price"
              type="text"
              onChange={handleInputProduct}
              name="selling_price"
              value={product.selling_price}
              message={errors.selling_price}
            />
            <InputItem
              label="Quantity"
              type="text"
              onChange={handleInputProduct}
              name="qty"
              value={`${product.qty}`}
              message={errors.qty}
            />
            <InputItem
              label="Image 01"
              type="file"
              onChange={handleFiletProduct}
              name="img01"
              message={errors.img01}
            />
            <div className="img_input">
              <img src={`http://localhost:8000/${product.img01}`} alt="img01" />
            </div>

            <InputItem
              label="Image 02"
              type="file"
              onChange={handleFiletProduct}
              name="img02"
              message={errors.img02}
            />
            <div className="img_input">
              <img src={`http://localhost:8000/${product.img02}`} alt="img02" />
            </div>

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
              // valueNumber={product.featured}
              message={errors.featured}
            />
            <InputItem
              label="Popular"
              type="checkbox"
              onChange={handleInputProduct}
              name="popular"
              // valueNumber={product.popular}
              message={errors.popular}
            />
            <InputItem
              label="Status"
              type="checkbox"
              onChange={handleInputProduct}
              name="status"
              // valueNumber={product.status}
            />
            <Button submit>Add New</Button>
          </form>
        </ContainerBody>
      </Container>
    </div>
  );
};

export default EditProduct;
