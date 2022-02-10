import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

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

import categoryApi from "../../../api/categoryApi";
import Loading from "../../Loading";

const EditCategory = (props) => {
  const history = useHistory();
  const [category, setCategory] = useState([]);
  const [error, setError] = useState([]);
  const [checkStatus, setCheckStatus] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleInputCategory = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const category_id = props.match.params.id;
    categoryApi.getId(category_id).then((res) => {
      if (res.data.status === 200) {
        const newCategory = res.data.category;
        setCategory(newCategory);
        setCheckStatus(newCategory.status);
        setLoading(false);
      } else if (res.data.status === 404) {
        swal("Erorr", res.data.message, "error");
        history.push("admin/category");
      }
    });
  }, [props]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: category.name,
      description: category.description,
      slug: category.slug,
      status: checkStatus,
    };
    const category_id = props.match.params.id;
    categoryApi.Update(category_id, data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
      } else if (res.data.status === 422) {
        setError(res.data.errors);
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
           Chỉnh Sửa Danh Mục
            <ContainerDescription>
             Chỉnh sửa thông tin danh mục.
            </ContainerDescription>
          </ContainerTitle>
          <ContainerHeaderRight>
            <Link to="/admin/category">
              <Button>Trở Về</Button>
            </Link>
          </ContainerHeaderRight>
        </ContainerHeader>
        <ContainerBody>
          <form onSubmit={handleSubmit}>
            <InputItem
              label="Tên Danh Mục"
              type="text"
              onChange={handleInputCategory}
              name="name"
              value={category.name}
              message={error.name}
            />
            <InputItem
              label="Mô Tả"
              type="textarea"
              onChange={handleInputCategory}
              name="description"
              value={category.description}
            />

            <InputItem
              label="Slug"
              type="text"
              onChange={handleInputCategory}
              name="slug"
              value={category.slug}
              message={error.slug}
            />
            <InputItem
              label="Trạng Thái"
              type="checkbox"
              onChange={(e) => {
                const value = e.target.checked ? 1 : 0;
                setCheckStatus(value);
              }}
              name="status"
              checked={checkStatus === 1 ? true : false}
            />
            <Button submit>Lưu</Button>
          </form>
        </ContainerBody>
      </Container>
    </div>
  );
};

export default EditCategory;
