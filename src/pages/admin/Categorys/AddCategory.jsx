import React, { useState } from "react";
import Container, {
  ContainerBody,
  ContainerTitle,
  ContainerDescription,
  ContainerHeader,
  ContainerHeaderRight,
} from "../../../components/admin/Container";
import InputItem from "../../../components/admin/InputItem";
import Button from "../../../components/admin/Button";

import { Link } from "react-router-dom";

import swal from "sweetalert";
import categoryApi from "../../../api/categoryApi";

const AddCategory = () => {
  const categoryInit = {
    name: "",
    description: "",
    slug: "",
    status: "",
    message: [],
  };

  const [category, setCategory] = useState(categoryInit);
  const [checkStatus, setCheckStatus] = useState(0);

  const handleInputCategory = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: category.name,
      description: category.description,
      slug: category.slug,
      status: checkStatus,
    };

    categoryApi.addCategory(data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setCategory(categoryInit);
      } else if (res.data.status === 400) {
        setCategory({ ...category, message: res.data.errors });
      }
    });
  };

  return (
    <div>
      <Container>
        <ContainerHeader>
          <ContainerTitle>
            New Category
            <ContainerDescription>
              Add information and add new category.
            </ContainerDescription>
          </ContainerTitle>
          <ContainerHeaderRight>
            <Link to="/admin/category">
              <Button>Back</Button>
            </Link>
          </ContainerHeaderRight>
        </ContainerHeader>
        <ContainerBody>
          <form onSubmit={handleSubmit}>
            <InputItem
              label="Category Title"
              type="text"
              onChange={handleInputCategory}
              name="name"
              value={category.name}
              message={category.message.name}
            />
            <InputItem
              label="Description"
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
              message={category.message.slug}
            />
            <InputItem
              label="Status"
              type="checkbox"
              onChange={(e) => {
                const value = e.target.checked ? 1 : 0;
                setCheckStatus(value);
              }}
              name="status"
              checked={checkStatus === 1 ? true : false}
            />
            <Button submit>Add New</Button>
          </form>
        </ContainerBody>
      </Container>
    </div>
  );
};

export default AddCategory;
