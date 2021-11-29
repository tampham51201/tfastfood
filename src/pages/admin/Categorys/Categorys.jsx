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
import categoryApi from "../../../api/categoryApi";
import Loading from "../../Loading";
const Categorys = () => {
  const coloums = ["STT", "Name", "Slug", "Status", "Edit", "Delete"];
  const [categorylist, setCategorylist] = useState([]);

  // search input
  const [searchInput, setSearchInput] = useState("");
  const [searchList, setSearchList] = useState([]);

  // paganation
  const [currentPage, setCurrentPage] = useState(1);
  const [categorysPerPage] = useState(5);

  const [isDelete, setIsDelete] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoryApi.getAll().then((res) => {
      if (res.data.status === 200) {
        const newCategoryList = res.data.category;
        setCategorylist(newCategoryList);
        setIsDelete(false);
      }
      setLoading(false);
    });
  }, [isDelete]);
  const indexOfLastIndex = currentPage * categorysPerPage;
  const indexOfFirtsIndex = indexOfLastIndex - categorysPerPage;
  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const newsearchList = categorylist.filter((category) => {
      return category.name.toLowerCase().includes(searchInput.toLowerCase());
    });
    setSearchList(newsearchList);
  }, [searchInput, categorylist]);

  //pagenation
  const categorysPagination = searchList.slice(
    indexOfFirtsIndex,
    indexOfLastIndex
  );

  if (loading) {
    return <Loading />;
  }

  const handleDelete = (e, id) => {
    categoryApi.Delete(id).then((res) => {
      if (res.data.status === 200) {
        setIsDelete(true);
        swal("Success", res.data.message, "success");
      }
    });
  };

  return (
    <div>
      <Container>
        <ContainerHeader>
          <h3>Categorys</h3>
          <ContainerHeaderRight>
            <InputItem
              searchbox
              type="text"
              onChange={handleSearch}
              value={searchInput}
              placeholder="Search by name"
            />

            <Link to="/admin/add-category">
              <Button>Add Category</Button>
            </Link>
          </ContainerHeaderRight>
        </ContainerHeader>
        <ContainerBody>
          <Table coloums={coloums}>
            {categorysPagination.map((item, index) => (
              <tr key={index}>
                <td style={{ width: "8rem" }}>{index + 1}</td>
                <td>{item.name}</td>
                <td style={{ width: "16rem" }}>{item.slug}</td>

                <td style={{ width: "16rem", textAlign: "center" }}>
                  <Button
                    size="ssm"
                    bg={item.status === 1 ? "success" : "danger"}
                  >
                    {item.status === 1 ? "Active" : "InActive"}
                  </Button>
                </td>
                <td className="edit">
                  <Link to={`edit-category/${item.id}`}>
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
            postsPage={categorysPerPage}
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

export default Categorys;
