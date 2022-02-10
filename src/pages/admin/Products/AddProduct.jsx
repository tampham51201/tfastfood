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

  const CheckInits = {
    featured: "",
    popular: "",
    status: "",
  };

  const [categorys, setCategorys] = useState([]);
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(PictureInits);
  const [product, setProduct] = useState(ProductInits);

  const [check, setCheck] = useState(CheckInits);

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
    console.log(e.target.files[0]);
  };

  const handleCheck = (e) => {
    setCheck({ ...check, [e.target.name]: e.target.checked });
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
    formData.append("featured", check.featured);
    formData.append("popular", check.popular);
    formData.append("status", check.status);

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
         Thêm Sản Phẩm
            <ContainerDescription>
          Thêm thông tin và sản phẩm mới.
            </ContainerDescription>
          </ContainerTitle>
          <ContainerHeaderRight>
            <Link to="/admin/product">
              <Button>Trở Về</Button>
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
              label="Chọn Danh Mục"
              message={product.message.category_id}
            />
            <InputItem
              label="Tên Sản Phẩm"
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
              label="Giá Cũ"
              type="text"
              onChange={handleInputProduct}
              name="orginal_price"
              value={product.orginal_price}
              message={product.message.orginal_price}
            />
            <InputItem
              label="Giá Mới"
              type="text"
              onChange={handleInputProduct}
              name="selling_price"
              value={product.selling_price}
              message={product.message.selling_price}
            />
            <InputItem
              label="Số Lượng"
              type="text"
              onChange={handleInputProduct}
              name="qty"
              value={product.qty}
              message={product.message.qty}
            />
            <InputItem
              label="Ảnh"
              type="file"
              onChange={handleFiletProduct}
              name="img01"
              message={product.message.img01}
            />

            {/* <InputItem
              label="Image 02"
              type="file"
              onChange={handleFiletProduct}
              name="img02"
              message={product.message.img02}
            /> */}

            <InputItem
              label="Mô Tả"
              type="ckedit"
              onChange={(value) => {
                handleDescProduct(value);
              }}
              value={description}
            />

            <InputItem
              label="Đặc Sắc"
              type="checkbox"
              onChange={handleCheck}
              name="featured"
              value={check.featured}
              message={product.message.featured}
            />
            <InputItem
              label="Phổ Biến"
              type="checkbox"
              onChange={handleCheck}
              name="popular"
              value={check.popular}
              message={product.message.popular}
            />
            <InputItem
              label="Trạng Thái"
              type="checkbox"
              onChange={handleCheck}
              name="status"
              value={check.status}
              message={product.message.status}
            />
            <Button submit>Thêm Mới</Button>
          </form>
        </ContainerBody>
      </Container>
    </div>
  );
};

export default AddProduct;
