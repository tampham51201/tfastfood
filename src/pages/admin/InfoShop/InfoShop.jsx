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

import infoShopApi from "../../../api/infoShopApi";
import Loading from "../../Loading";
import { useHistory } from "react-router";

const EditProduct = (props) => {
  const PictureInits = {
    logo: "",
  };

  const [picture, setPicture] = useState(PictureInits);

  const [isUpdate, setIsUpdate] = useState(false);

  const [loading, setLoading] = useState(true);

  const [infoShop, setInfoShop] = useState({});
  useEffect(() => {
    setIsUpdate(false);
    infoShopApi.getInfo().then((res) => {
      if (res.data.status === 200) {
        const newInfoshop = res.data.infoshop;
        console.log(newInfoshop);
        setInfoShop(newInfoshop);

        // setPicture({
        //   logo: newInfoshop.logo,
        // });
        setLoading(false);
      }
    });
  }, [isUpdate]);

  const handleInputProduct = (e) => {
    setInfoShop({ ...infoShop, [e.target.name]: e.target.value });
  };

  const handleFiletProduct = (e) => {
    setPicture({ ...picture, [e.target.name]: e.target.files[0] });
  };
  console.log(picture);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(infoShop);
    formData.append("header_sale", infoShop.header_sale);
    formData.append("mobile_phone", infoShop.mobile_phone);
    formData.append("andress", infoShop.andress);
    formData.append("email", infoShop.email);
    formData.append("link_fb", infoShop.link_fb);

    formData.append("logo", picture.logo);

    formData.append("link_pinterest", infoShop.link_pinterest);
    formData.append("link_gg_plus", infoShop.link_gg_plus);
    formData.append("link_instagram", infoShop.link_instagram);
    formData.append("coppyright", infoShop.coppyright);

    infoShopApi.Update(formData).then((res) => {
      if (res.data.status === 200) {
        setIsUpdate(true);
        console.log(res.data);
        swal("Success", res.data.message, "success");
      }
      if (res.data.status === 422) {
        // setErorrs(res.data.errors);
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
            Thi???t L???p Th??ng Tin
            <ContainerDescription>
              Ch???nh Th??ng Tin Website C???a B???n!
            </ContainerDescription>
          </ContainerTitle>
          <ContainerHeaderRight></ContainerHeaderRight>
        </ContainerHeader>
        <ContainerBody>
          <form onSubmit={handleSubmit}>
            <InputItem
              label="Ti??u ????? Header"
              type="text"
              onChange={handleInputProduct}
              name="header_sale"
              value={infoShop.header_sale}
            />
            <InputItem
              label="S??? ??i???n Tho???i C???a H??ng"
              type="text"
              onChange={handleInputProduct}
              name="mobile_phone"
              value={infoShop.mobile_phone}
            />

            <InputItem
              label="?????a Ch??? C???a H??ng"
              type="text"
              onChange={handleInputProduct}
              name="andress"
              value={infoShop.andress}
            />

            <InputItem
              label="Email C???a H??ng"
              type="text"
              onChange={handleInputProduct}
              name="email"
              value={infoShop.email}
            />

            <InputItem
              label="Li??n K???t Facebook"
              type="text"
              onChange={handleInputProduct}
              name="link_fb"
              value={infoShop.link_fb}
            />
            <InputItem
              label="Li??n K???t Google Plus"
              type="text"
              onChange={handleInputProduct}
              name="link_gg_plus"
              value={infoShop.link_gg_plus}
            />
            <InputItem
              label="Li??n K???t Pinterest"
              type="text"
              onChange={handleInputProduct}
              name="link_pinterest"
              value={infoShop.link_pinterest}
            />
            <InputItem
              label="Li??n K???t Instagram"
              type="text"
              onChange={handleInputProduct}
              name="link_instagram"
              value={infoShop.link_instagram}
            />
            <InputItem
              label="Logo C???a H??ng"
              type="file"
              onChange={handleFiletProduct}
              name="logo"
            />
            <div className="img_input">
              <img
                src={`${process.env.REACT_APP_API_URL}/${infoShop.logo}`}
                alt="logo"
              />
            </div>

            <InputItem
              label="Th??ng Tin B???n Quy???n Website"
              type="text"
              onChange={handleInputProduct}
              name="coppyright"
              value={infoShop.coppyright}
            />

            <Button submit>C???p Nh???t</Button>
          </form>
        </ContainerBody>
      </Container>
    </div>
  );
};

export default EditProduct;
