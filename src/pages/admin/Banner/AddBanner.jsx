import React, { useState } from "react";

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

import productApi from "../../../api/productApi";
import bannerApi from "../../../api/bannerApi";

const Banner = () => {
  const pictureInit = {
    img: "",
    message: [],
  };

  const [picture, setPicture] = useState(pictureInit);

  const handleFiletProduct = (e) => {
    setPicture({ ...picture, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("img", picture.img);

    bannerApi.addBanner(formData).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
      } else {
        // swal("Success", "error", "erorr");
        setPicture({ ...picture, message: res.data.errors });
      }
    });
  };

  return (
    <div>
      <Container>
        <ContainerHeader>
          <ContainerTitle>
            Thêm Banner Mới
            <ContainerDescription>
              Thêm thông tin và banner mới
            </ContainerDescription>
          </ContainerTitle>
          <ContainerHeaderRight>
            <Link to="/admin/banner">
              <Button>Trở Lại</Button>
            </Link>
          </ContainerHeaderRight>
        </ContainerHeader>
        <ContainerBody>
          <form onSubmit={handleSubmit}>
            <InputItem
              label="Hình Ảnh"
              type="file"
              onChange={handleFiletProduct}
              name="img"
              message={picture.message.img}
            />

            <Button submit>Thêm Mới</Button>
          </form>
        </ContainerBody>
      </Container>
    </div>
  );
};

export default Banner;
