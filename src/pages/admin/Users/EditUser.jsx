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
import Loading from "../../Loading";

const EditUser = (props) => {
  const [user, setUser] = useState([]);
  const [roles, setRoles] = useState([]);

  const [checkStatus, setCheckStatus] = useState(0);
  const [checkGender, setCheckGender] = useState(0);
  const [loading, setLoading] = useState(true);

  const [avata, setAvata] = useState("");

  useEffect(() => {
    const idUser = props.match.params.id;
    authApi.getId(idUser).then((res) => {
      if (res.data.status === 200) {
        const newUser = res.data.user;
        setCheckStatus(newUser.status);
        setCheckGender(newUser.gender);
        setUser(newUser);
        setLoading(false);
      } else if (res.data.status === 404) {
        swal("Erorr", res.data.message, "error");
        // history.push("admin/category");
      }
    });
  }, []);

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
    formData.append("username", user.username_input);
    formData.append("email", user.email_input);
    formData.append("password", user.password_input);
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
      } else if (res.data.status === 400) {
        setUser({ ...user, message: res.data.errors });
        console.log(res.data.errors);
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
            Edit User
            <ContainerDescription>Edit information user.</ContainerDescription>
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
              name="username"
              value={user.username}
              // message={user.message.usename}
            />
            <InputItem
              label="Email"
              type="text"
              onChange={handleInputUser}
              name="email"
              value={user.email}
              // message={user.message.email_input}
            />
            <InputItem
              label="Password"
              type="password"
              onChange={handleInputUser}
              name="password"
              value={user.password}
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
            {user.avata ? (
              <div className="img_input">
                user.avata?{" "}
                <img src={`http://localhost:8000/${user.avata}`} alt="img01" />
              </div>
            ) : (
              ""
            )}

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

export default EditUser;
