import React, { useState, useEffect } from "react";
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
import rolesApi from "../../../api/rolesApi";
import SelectInput from "../../../components/admin/SelectInput";
import authApi from "../../../api/authApi";

const AddUser = () => {
  const userInit = {
    username_input: "",
    email_input: "",
    password_input: "",
    password_confirm: "",
    role_as: "",

    first_name: "",
    last_name: "",
    phone_number: "",
    andress: "",
    date_birth: "",

    message: [],
  };

  const [user, setUser] = useState(userInit);
  const [roles, setRoles] = useState([]);

  const [checkStatus, setCheckStatus] = useState(0);
  const [checkGender, setCheckGender] = useState(0);

  const [avata, setAvata] = useState("");
  console.log(avata);
  const handleInputUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlecheckGender = (value) => {
    setCheckGender(value);
  };
  const handleCheckStatus = (e) => {
    setCheckStatus(e.target.checked ? 1 : 0);
  };

  const handleFileAvata = (e) => {
    setAvata(e.target.files[0]);
  };

  useEffect(() => {
    rolesApi.getAll().then((res) => {
      const newRoles = res.data.roles;

      setRoles(newRoles);
    });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username_input", user.username_input);
    formData.append("email_input", user.email_input);
    formData.append("password_input", user.password_input);
    formData.append("password_confirm", user.password_confirm);
    formData.append("role_as", user.role_as);

    formData.append("first_name", user.first_name);
    formData.append("last_name", user.last_name);
    formData.append("phone_number", user.phone_number);
    formData.append("andress", user.andress);
    formData.append("data_birth", user.date_birth);

    formData.append("avata", avata);
    formData.append("gender", checkGender);
    formData.append("status", checkStatus);
    console.log(checkStatus);

    authApi.addUser(formData).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setUser(userInit);
      } else if (res.data.status === 400) {
        setUser({ ...user, message: res.data.errors });
        console.log(res.data.errors);
      }
    });
  };

  return (
    <div>
      <Container>
        <ContainerHeader>
          <ContainerTitle>
            New User
            <ContainerDescription>
              Add information and add new user.
            </ContainerDescription>
          </ContainerTitle>
          <ContainerHeaderRight>
            <Link to="/admin/user">
              <Button>Back</Button>
            </Link>
          </ContainerHeaderRight>
        </ContainerHeader>
        <ContainerBody>
          <form onSubmit={handleSubmit}>
            <InputItem
              label="Username"
              type="text"
              onChange={handleInputUser}
              name="username_input"
              value={user.username_input}
              message={user.message.usename}
            />
            <InputItem
              label="Email"
              type="text"
              onChange={handleInputUser}
              name="email_input"
              value={user.email_input}
              message={user.message.email_input}
            />
            <InputItem
              label="Password"
              type="password"
              onChange={handleInputUser}
              name="password_input"
              value={user.password_input}
            />
            <InputItem
              label="Password Confirm"
              type="password"
              onChange={handleInputUser}
              name="password_confirm"
              value={user.password_confirm}
            />
            <SelectInput
              label="Select Role"
              value={user.role_as}
              name="role_as"
              onChange={handleInputUser}
              data={roles}
            />

            <InputItem
              label="First Name"
              type="text"
              onChange={handleInputUser}
              name="first_name"
              value={user.first_name}
            />
            <InputItem
              label="Last Name"
              type="text"
              onChange={handleInputUser}
              name="last_name"
              value={user.last_name}
            />
            <InputItem
              label="Image Avata"
              type="file"
              onChange={handleFileAvata}
              name="avata"
            />
            <InputItem
              label="Phone Number"
              type="text"
              onChange={handleInputUser}
              name="phone_number"
              value={user.phone_number}
            />
            <InputItem
              label="Andress"
              type="text"
              onChange={handleInputUser}
              name="andress"
              value={user.andress}
            />
            <InputItem
              label="Date of Birth"
              type="text"
              onChange={handleInputUser}
              name="date_birth"
              value={user.date_birth}
            />
            <InputItem
              label="Genner"
              labelRadio="Male"
              type="radio"
              onChange={() => handlecheckGender(0)}
              name="gender"
              checked={checkGender === 0 ? true : false}
            />
            <InputItem
              labelRadio="Female"
              type="radio"
              onChange={() => handlecheckGender(1)}
              name="gender"
              checked={checkGender === 1 ? true : false}
            />
            <InputItem
              label="Status"
              type="checkbox"
              onChange={handleCheckStatus}
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

export default AddUser;
