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

import numberWithCommas from "../../../utils/numberWithCommas";

import InputItem from "../../../components/admin/InputItem";
import Table from "../../../components/admin/Table";
import swal from "sweetalert";

import productApi from "../../../api/productApi";
import Loading from "../../Loading";

const Products = () => {
  const coloums = [
    "STT",
    "Tên Sản Phẩm",
    "Tên Danh Mục",
    "Giá",
    "Image",

    "Trạng Thái",
    "Thao Tác",
  ];
  const [productList, setProductList] = useState([]);

  // search input
  const [searchInput, setSearchInput] = useState("");
  const [searchList, setSearchList] = useState([]);

  // paganation
  const [currentPage, setCurrentPage] = useState(1);
  const [categorysPerPage] = useState(7);

  const [isDelete, setIsDelete] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productApi.getAll().then((res) => {
      if (res.data.status === 200) {
        const newProductList = res.data.product;
        setProductList(newProductList);
        setIsDelete(false);
        setLoading(false);
      }
    });
  }, [isDelete]);
  const indexOfLastIndex = currentPage * categorysPerPage;
  const indexOfFirtsIndex = indexOfLastIndex - categorysPerPage;
  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const newsearchList = productList.filter((category) => {
      return category.name.toLowerCase().includes(searchInput.toLowerCase());
    });
    setSearchList(newsearchList);
  }, [searchInput, productList]);

  //pagenation
  const productsPagination = searchList.slice(
    indexOfFirtsIndex,
    indexOfLastIndex
  );

  const handleDelete = (e, id) => {
    productApi.Delete(id).then((res) => {
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
          <h3>Sản Phẩm</h3>
          <ContainerHeaderRight>
            <InputItem
              searchbox
              type="text"
              onChange={handleSearch}
              value={searchInput}
              placeholder="Tìm kiếm theo tên..."
            />
            <Link to="/admin/product-add">
              <Button>Thêm Sản Phẩm</Button>
            </Link>
          </ContainerHeaderRight>
        </ContainerHeader>
        <ContainerBody>
          <Table coloums={coloums}>
            {productsPagination.map((item, index) => (
              <tr key={index}>
                <td style={{ width: "6rem" }}>{index + 1}</td>
                <td>{item.name}</td>
                <td style={{ width: "16rem" }}>{item.category.name}</td>
                <td style={{ width: "14rem" }}>
                  {numberWithCommas(item.selling_price)}
                </td>
                <td style={{ width: "12rem" }}>
                  <img
                    src={`${process.env.REACT_APP_API_URL}/${item.img01}`}
                    alt="img01"
                  />
                </td>
                {/* <td style={{ width: "12rem" }}>
           
                  <img
                    src={`http://localhost:8000/${item.img02}`}
                    alt="img02"
                  />
                </td> */}
                <td style={{ width: "12rem", textAlign: "center" }}>
                  <Button
                    size="ssm"
                    bg={item.status === 1 ? "success" : "danger"}
                  >
                    {item.status === 1 ? "Active" : "InActive"}
                  </Button>
                </td>

                <td className="edit" style={{ width: "20rem" }}>
                  <Link to={`product-edit/${item.id}`}>
                    <Button size="sm" bg="success">
                      <i className="bx bx-edit-alt"></i>
                    </Button>
                  </Link>
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

export default Products;
