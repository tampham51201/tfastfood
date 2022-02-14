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
import Loading from "../../Loading";
import { useHistory } from "react-router";

const EditProduct = (props) => {
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
  const [product, setProduct] = useState([]);
  const [check, setCheck] = useState(CheckInits);

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
        setCheck({
          featured: newProduct.featured,
          popular: newProduct.popular,
          status: newProduct.status,
        });
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
  const handleCheck = (e) => {
    setCheck({ ...check, [e.target.name]: e.target.checked ? 1 : 0 });
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
        <ContainerHeader>
          <ContainerTitle>
            Chỉnh Sửa Sản Phẩm
            <ContainerDescription>
              Chỉnh sửa thông tin sản phẩm.
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
              value={`${product.category_id}`}
              data={categorys}
              label="Chọn Danh Mục"
              // message={errors.category_id}
            />
            <InputItem
              label="Tên Sản Phẩm"
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
              label="Giá Cũ"
              type="text"
              onChange={handleInputProduct}
              name="orginal_price"
              value={product.orginal_price}
              message={errors.orginal_price}
            />
            <InputItem
              label="Giá Mới"
              type="text"
              onChange={handleInputProduct}
              name="selling_price"
              value={product.selling_price}
              message={errors.selling_price}
            />
            <InputItem
              label="Số Lượng"
              type="text"
              onChange={handleInputProduct}
              name="qty"
              value={`${product.qty}`}
              message={errors.qty}
            />
            <InputItem
              label="Ảnh"
              type="file"
              onChange={handleFiletProduct}
              name="img01"
              message={errors.img01}
            />
            <div className="img_input">
              <img
                src={`${process.env.REACT_APP_API_URL}/${product.img01}`}
                alt="img01"
              />
            </div>

            {/* <InputItem
              label="Image 02"
              type="file"
              onChange={handleFiletProduct}
              name="img02"
              message={errors.img02}
            />
            {product.img02 !== null ? (
              <div className="img_input">
                <img src={`http://localhost:8000/${product.img02}`} />
              </div>
            ) : (
              ""
            )} */}

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
              checked={check.featured === 1 ? true : false}
            />
            <InputItem
              label="Phổ Biến"
              type="checkbox"
              onChange={handleCheck}
              name="popular"
              checked={check.popular === 1 ? true : false}
            />
            <InputItem
              label="Trạng Thái"
              type="checkbox"
              onChange={handleCheck}
              checked={check.status === 1 ? true : false}
              name="status"
            />
            <Button submit>Lưu</Button>
          </form>
        </ContainerBody>
      </Container>
    </div>
  );
};

export default EditProduct;
