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
import billsApi from "../../../api/billsApi";
import numberWithCommas from "../../../utils/numberWithCommas";
import dateFormat from "dateformat";
const Orders = () => {
  const coloums = [
    "STT",
    "Mã Hóa Đơn",
    "Tên Khách Hàng",
    "Số Điện Thoại",

    "Địa Chỉ",
    "Ngày Đặt Hàng",
    "Đơn Giá",
    "Trạng Thái",
    "",
  ];
  const [categorylist, setCategorylist] = useState([]);

  // search input
  const [searchInput, setSearchInput] = useState("");
  const [searchList, setSearchList] = useState([]);

  // paganation
  const [currentPage, setCurrentPage] = useState(1);
  const [categorysPerPage] = useState(8);

  const [isDelete, setIsDelete] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    billsApi.getAll().then((res) => {
      if (res.data.status === 200) {
        const newCategoryList = res.data.bills;
        setCategorylist(newCategoryList);
        newCategoryList.sort((a, b) => b.id - a.id);
        console.log(newCategoryList);
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
      return (
        category.full_name.toLowerCase().includes(searchInput.toLowerCase()) ||
        ("hd000" + category.id)
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        category.phone_number
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        dateFormat(category.created_at, "dd/mm/yyyy h:MM TT")
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      );
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
          <h3>Hóa Đơn</h3>
          <ContainerHeaderRight>
            <InputItem
              searchbox
              type="text"
              onChange={handleSearch}
              value={searchInput}
              placeholder="Tìm với mã hóa đơn hoặc tên..."
            />

            {/* <Link to="/admin/category-add">
              <Button>Add Category</Button>
            </Link> */}
          </ContainerHeaderRight>
        </ContainerHeader>
        <ContainerBody>
          <Table coloums={coloums}>
            {categorysPagination.map((item, index) => (
              <tr key={index}>
                <td style={{ width: "8rem" }}>{index + 1}</td>
                <td style={{ width: "12rem" }}>HD000{item.id}</td>
                <td style={{ width: "20rem" }}>{item.full_name}</td>

                <td style={{ width: "16rem" }}>{item.phone_number}</td>
                <td style={{ width: "20rem" }}>{item.andress}</td>
                <td style={{ width: "16rem" }}>
                  {dateFormat(item.created_at, "dd/mm/yyyy h:MM TT")}
                </td>
                <td style={{ width: "16rem" }}>
                  {numberWithCommas(item.total_price)}
                </td>

                <td style={{ width: "20rem" }}>
                  <Button
                    size="ssm"
                    bg={
                      item.status === 2
                        ? "success"
                        : item.status === 1
                        ? "warning"
                        : "danger"
                    }
                  >
                    {item.status === 0 ? "Chưa Duyệt" : ""}
                    {item.status === 1 ? "Đã Duyệt - Đang Giao" : ""}
                    {item.status === 2 ? "Đã Giao Hàng" : ""}
                    {item.status === 3 ? "Đã Hủy" : ""}
                  </Button>
                </td>
                <td className="edit" style={{ width: "14rem" }}>
                  <Link to={`/admin/details-order/${item.id}`}>
                    <Button size="sm" bg="success">
                      XEM CHI TIẾT
                    </Button>
                  </Link>
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

export default Orders;
