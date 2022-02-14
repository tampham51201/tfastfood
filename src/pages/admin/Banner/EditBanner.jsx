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
import bannerApi from "../../../api/bannerApi";

const EditBanner = (props) => {
  const PictureInits = {
    img: "",
  };

  const [picture, setPicture] = useState(PictureInits);
  const [banner, setBanner] = useState({});

  const [errors, setErorrs] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const banner_id = props.match.params.id;
    bannerApi.getId(banner_id).then((res) => {
      if (res.data.status === 200) {
        const newBanner = res.data.banner;
        console.log(newBanner);
        setBanner(newBanner);
        setPicture({ img: newBanner.img });
        setLoading(false);
      } else if (res.data.status === 404) {
        swal("Erorr", res.data.message, "error");
        history.push("admin/category");
      }
    });
  }, [loading]);

  const handleFiletProduct = (e) => {
    setPicture({ ...picture, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("img", picture.img);

    const banner_id = props.match.params.id;
    bannerApi.Update(banner_id, formData).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setLoading(true);
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
            Chỉnh Sửa Banner
            <ContainerDescription>
              Chỉnh sửa thông tin banner
            </ContainerDescription>
          </ContainerTitle>
          <ContainerHeaderRight>
            <Link to="/admin/banner">
              <Button>Trở Về</Button>
            </Link>
          </ContainerHeaderRight>
        </ContainerHeader>
        <ContainerBody>
          <form onSubmit={handleSubmit}>
            <InputItem
              label="Image"
              type="file"
              onChange={handleFiletProduct}
              name="img"
            />
            <div className="img_input">
              <img
                src={`${process.env.REACT_APP_API_URL}/${banner.img}`}
                alt="img"
              />
            </div>

            <Button submit>Lưu</Button>
          </form>
        </ContainerBody>
      </Container>
    </div>
  );
};

export default EditBanner;
