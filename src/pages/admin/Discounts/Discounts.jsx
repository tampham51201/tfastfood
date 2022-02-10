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

import { numberWithCommasTotal } from "../../../utils/numberWithCommas";

import dateFormat from "dateformat";

import InputItem from "../../../components/admin/InputItem";
import Table from "../../../components/admin/Table";
import swal from "sweetalert";

import productApi from "../../../api/productApi";
import Loading from "../../Loading";
import discountApi from "../../../api/discountApi";

const Discounts = () => {
  const coloums = [
    "STT",
    "Mã Giảm Giá",
    "Giá Trị",
    "Số Lượng",
    "Số Lượt Đã Dùng",
    "Thời Gian",

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
    discountApi.getAll().then((res) => {
      if (res.data.status === 200) {
        const newProductList = res.data.discounts;
        console.log(newProductList);
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
      return category.idDiscount
        .toLowerCase()
        .includes(searchInput.toLowerCase());
    });
    setSearchList(newsearchList);
  }, [searchInput, productList]);

  //pagenation
  const productsPagination = searchList.slice(
    indexOfFirtsIndex,
    indexOfLastIndex
  );

  const handleDelete = (e, id) => {
    axios.delete(`/api/delete-category/${id}`).then((res) => {
      if (res.data.status === 200) {
        setIsDelete(true);
        swal("Success", res.data.message, "success");
      }
    });
  };

  const checkTimeHandle = (end, start, item) => {
    const time_start = new Date(start);
    const time_end = new Date(end);
    const date = new Date();
    console.log(date);

    if (start === null) {
      if (item.quatity <= item.quatity_used && item.quatity !== 0) {
        return (
          <Button size="sm" bg="danger">
            Đã Hết Lượt Dùng
          </Button>
        );
      } else {
        return (
          <Button size="sm" bg="success">
            Đang Diễn Ra
          </Button>
        );
      }
    } else {
      if (time_start <= date && date <= time_end) {
        if (item.quatity <= item.quatity_used && item.quatity !== 0) {
          return (
            <Button size="sm" bg="danger">
              Đã Hết Lượt Dùng
            </Button>
          );
        } else {
          return (
            <Button size="sm" bg="success">
              Đang Diễn Ra
            </Button>
          );
        }
      } else {
        if (time_start > date) {
          return (
            <Button size="sm" bg="warning">
              Chưa Được Mở
            </Button>
          );
        } else {
          return (
            <Button size="sm" bg="danger">
              Đã Hết Hạn
            </Button>
          );
        }
      }
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <Container>
        <ContainerHeader>
          <h3>Khuyến Mãi</h3>
          <ContainerHeaderRight>
            <InputItem
              searchbox
              type="text"
              onChange={handleSearch}
              value={searchInput}
              placeholder="Tìm Theo Mã"
            />
            <Link to="/admin/discount-add">
              <Button>Thêm Khuyến Mãi</Button>
            </Link>
          </ContainerHeaderRight>
        </ContainerHeader>
        <ContainerBody>
          <div className="table">
            <Table coloums={coloums}>
              {productsPagination.map((item, index) => (
                <tr key={index}>
                  <td style={{ width: "6rem" }}>{index + 1}</td>
                  <td>{item.idDiscount}</td>
                  <td style={{ width: "16rem" }}>
                    {item.unit === 0
                      ? item.value + "%"
                      : numberWithCommasTotal(item.value)}
                  </td>

                  <td style={{ width: "14rem", textAlign: "left" }}>
                    {item.quatity === 0 ? (
                      <Button size="ssm" bg="success">
                        Không Giới Hạn
                      </Button>
                    ) : (
                      item.quatity
                    )}
                  </td>

                  <td style={{ width: "14rem" }}>{item.quatity_used}</td>

                  <td style={{ width: "18rem", textAlign: "left" }}>
                    {item.time_start === null
                      ? ""
                      : dateFormat(item.time_start, "dd/mm/yyyy h:MM TT   ")}

                    {/* <i className="bx bxs-right-arrow-alt"></i> */}
                    {/* <i class="bx bxs-chevron-right-circle"></i> */}
                    {item.time_end === null
                      ? ""
                      : dateFormat(item.time_end, "dd/mm/yyyy h:MM TT")}
                  </td>

                  <td style={{ width: "16rem", textAlign: "left" }}>
                    {checkTimeHandle(item.time_end, item.time_start, item)}
                  </td>
                  {/* <td style={{ width: "16rem" }}>{item.category.name}</td> */}

                  {/*        
                <td style={{ width: "12rem", textAlign: "center" }}>
                  <Button
                    size="ssm"
                    bg={item.status === 1 ? "success" : "danger"}
                  >
                    {item.status === 1 ? "Active" : "InActive"}
                  </Button>
                </td> */}

                  <td className="edit" style={{ width: "22rem" }}>
                    <Link to={`discount-edit/${item.id}`}>
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
          </div>

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

export default Discounts;
