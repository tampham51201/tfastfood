import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Pagination from "../../../components/admin/Pagination";
import Button from "../../../components/admin/Button";
import Container, {
  ContainerBody,
  ContainerHeader,
  ContainerHeaderRight,
} from "../../../components/admin/Container";

import InputItem from "../../../components/admin/InputItem";
import Table from "../../../components/admin/Table";
import swal from "sweetalert";

import authApi from "../../../api/authApi";
import Loading from "../../Loading";

const Users = () => {
  const coloums = [
    "STT",
    "Tên Đăng Nhập",
    "Email",
    "Quyền",
    "Giới Tính",
    "Trạng Thái",
    "Sửa",
    "Xóa",
  ];
  const [userList, setUserList] = useState([]);

  // search input
  const [searchInput, setSearchInput] = useState("");
  const [searchList, setSearchList] = useState([]);

  // paganation
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  const [isDelete, setIsDelete] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authApi.getAll().then((res) => {
      if (res.data.status === 200) {
        const newUserList = res.data.user;
        setUserList(newUserList);
        setIsDelete(false);
        setLoading(false);
      }
    });
  }, [isDelete]);

  const indexOfLastIndex = currentPage * usersPerPage;
  const indexOfFirtsIndex = indexOfLastIndex - usersPerPage;
  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const newsearchList = userList.filter((user) => {
      return user.username.toLowerCase().includes(searchInput.toLowerCase());
    });
    setSearchList(newsearchList);
  }, [searchInput, userList]);

  //pagenation
  const usersPagination = searchList.slice(indexOfFirtsIndex, indexOfLastIndex);

  const handleDelete = (e, id) => {
    authApi.Delete(id).then((res) => {
      if (res.data.status === 200) {
        setIsDelete(true);
        swal("Success", res.data.message, "success");
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
          <h3>Người Dùng</h3>
          <ContainerHeaderRight>
            <InputItem
              searchbox
              type="text"
              onChange={handleSearch}
              value={searchInput}
              placeholder="Tìm theo tên đăng nhập..."
            />

            <Link to="/admin/user-add">
              <Button>Thêm Người Dùng</Button>
            </Link>
          </ContainerHeaderRight>
        </ContainerHeader>
        <ContainerBody>
          <Table coloums={coloums}>
            {usersPagination.map((item, index) => (
              <tr key={index}>
                <td style={{ width: "6rem" }}>{index + 1}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>

                <td style={{ width: "12rem" }}>{item.roles.name}</td>
                <td style={{ width: "12rem" }}>
                  {item.gender === 0 ? "Nam" : "Nữ"}
                </td>
                <td style={{ width: "12rem", textAlign: "center" }}>
                  <Button
                    size="ssm"
                    bg={item.status === 1 ? "success" : "danger"}
                  >
                    {item.status === 1 ? "Active" : "InActive"}
                  </Button>
                </td>

                {/* <td className="icon-details">
                  <i class="bx bx-dots-horizontal-rounded"></i>
                  <ul className="icon-details__list">
                    <li>
                      <Link to={`edit-product/${item.id}`}>
                        <i className="bx bx-edit-alt"></i>Details User
                      </Link>
                    </li>
                    <li>
                      <Link to={`edit-product/${item.id}`}>
                        <i className="bx bx-edit-alt"></i>Edit User
                      </Link>
                    </li>
                    <li
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                    >
                      <i className="bx bx-trash-alt"></i> Delete User
                    </li>
                  </ul>
                </td> */}
                <td className="edit">
                  <Link to={`user-edit/${item.id}`}>
                    <Button size="sm" bg="success">
                      <i className="bx bx-edit-alt"></i>
                    </Button>
                  </Link>
                </td>
                <td className="delete">
                  <Button
                    size="sm"
                    bg="danger"
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                  >
                    <i className="bx bx-trash-alt"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </Table>
          <Pagination
            postsPage={usersPerPage}
            totalPages={searchList.length}
            paginate={(number) => {
              setCurrentPage(number);
            }}
          />
        </ContainerBody>
      </Container>
    </div>
  );
};

export default Users;
