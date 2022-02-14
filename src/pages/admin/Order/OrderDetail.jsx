import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Pagination from "../../../components/admin/Pagination";
import Button from "../../../components/admin/Button";
import Container, {
  ContainerBody,
  ContainerHeader,
  ContainerHeaderRight,
} from "../../../components/admin/Container";

import numberWithCommas, {
  numberWithCommasTotal,
} from "../../../utils/numberWithCommas";

import { notification } from "antd";

import dateFormat from "dateformat";
import InputItem from "../../../components/admin/InputItem";
import Table from "../../../components/admin/Table";
import swal from "sweetalert";

import billsApi from "../../../api/billsApi";
import Loading from "../../Loading";

const Products = (props) => {
  const coloums = [
    "STT",
    "Mã Sản Phẩm",
    "Tên Sản Phẩm",
    "Đơn Giá",
    "Hình Ảnh",
    "Số Lượng",
    "Thành Tiền",
  ];
  const [productList, setProductList] = useState([]);
  const [bill, setBill] = useState({});
  var idBill = props.match.params.id;
  // search input
  const [searchInput, setSearchInput] = useState("");
  const [searchList, setSearchList] = useState([]);

  // paganation
  const [currentPage, setCurrentPage] = useState(1);
  const [categorysPerPage] = useState(7);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    billsApi.getIdDetails(idBill).then((res) => {
      if (res.data.status === 200) {
        const newProductList = res.data.billDetails;
        setProductList(newProductList);
      }
    });
    billsApi.getId(idBill).then((res) => {
      if (res.data.status === 200) {
        const newBill = res.data.bill;
        setBill(newBill);
        console.log(newBill);
        setLoading(false);
      }
    });
  }, [loading]);
  var checkStatus = "";

  switch (bill.status) {
    case 0:
      checkStatus = (
        <>
          <Button size="sm" bg="success" onClick={() => handleCheck(1)}>
            Duyệt Đơn
          </Button>
          <p style={{ height: "1rem" }} />
          <Button size="sm" bg="danger" onClick={() => handleCheck(3)}>
            Hủy Đơn Hàng
          </Button>
        </>
      );
      break;
    case 1:
      checkStatus = (
        <>
          <Button size="sm" bg="success" onClick={() => handleCheck(2)}>
            Xác Nhận Đã Giao Hàng
          </Button>
          <p style={{ height: "1rem" }} />
          <Button size="sm" bg="danger" onClick={() => handleCheck(0)}>
            Hủy Duyệt Đơn
          </Button>
        </>
      );
      break;
    case 2:
      checkStatus = (
        <>
          <Button size="sm" bg="success">
            Đơn Hàng Đã Được Giao
          </Button>
          <p style={{ height: "1rem" }} />
          <Button size="sm" bg="danger" onClick={() => handleCheck(1)}>
            Hoàn Tác Giao Hàng
          </Button>
        </>
      );
      break;
    case 3:
      checkStatus = (
        <>
          <Button size="sm" bg="danger">
            Đơn Đã Hủy
          </Button>
          <p style={{ height: "1rem" }} />
          <Button size="sm" bg="danger" onClick={() => handleCheck(0)}>
            Hoàn Tác Hủy Đơn
          </Button>
        </>
      );
      break;
  }

  const indexOfLastIndex = currentPage * categorysPerPage;
  const indexOfFirtsIndex = indexOfLastIndex - categorysPerPage;
  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    setCurrentPage(1);
  };

  const handleCheck = (value) => {
    const data = {
      id_bill: bill.id,
      status: value,
    };
    console.log(data);
    billsApi.UpdateStatus(data).then((res) => {
      if (res.data.status == 200) {
        notification.success({
          message: `Thành Công`,
          description: res.data.message,
          duration: 2,
          placement: "topRight",
        });
        setLoading(true);
      }
    });
  };

  useEffect(() => {
    const newsearchList = productList.filter((item) => {
      return (
        item.product.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        ("sp000" + item.product.id)
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      );
    });
    setSearchList(newsearchList);
  }, [searchInput, productList]);

  //pagenation
  const productsPagination = searchList.slice(
    indexOfFirtsIndex,
    indexOfLastIndex
  );

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <Container>
        <ContainerHeader>
          <h3>Danh Sách Sản Phẩm</h3>
          <ContainerHeaderRight>
            <InputItem
              searchbox
              type="text"
              onChange={handleSearch}
              value={searchInput}
              placeholder="Tìm kiếm với tên và mã SP"
            />
            <Link to="/admin/order">
              <Button>Trở về</Button>
            </Link>
          </ContainerHeaderRight>
        </ContainerHeader>
        <ContainerBody>
          <div className="order-detail">
            <div className="order-details__info">
              <div className="order-detail__id">
                <span>Mã Đơn Hàng:</span> DH000{bill.id}
              </div>
              <div className="order-detail__id">
                <span>Tên Khách Hàng:</span> {bill.full_name}
              </div>
              <div className="order-detail__id">
                <span>Số Điện Thoại:</span> {bill.phone_number}
              </div>
              <div className="order-detail__id">
                <span>Ngày Đặt:</span>{" "}
                {dateFormat(bill.created_at, "dd/mm/yyyy h:MM TT")}
              </div>
              <div className="order-detail__id">
                <span>Địa Chỉ Nhận Hàng:</span> {bill.andress}
              </div>
              <div className="order-detail__id">
                <span>Đơn Giá:</span> {numberWithCommas(bill.total_price)}
              </div>
              <div className="order-detail__id">
                <span>Trạng Thái:</span>
                {bill.status === 0
                  ? " Chưa Duyệt"
                  : bill.status === 1
                  ? " Đã Duyệt - Đang Giao Hàng"
                  : bill.status === 2
                  ? " Đã Giao Hàng"
                  : "Đã Hủy"}
              </div>
            </div>
            <div className="order-details__right">
              {/* {bill.status === 0 ? (
                <Button size="sm" bg="success" onClick={() => handleCheck(1)}>
                  Duyệt Đơn
                </Button>
              ) : bill.status === 1 ? (
                <>
                  <Button size="sm" bg="success" onClick={() => handleCheck(2)}>
                    Đã Giao Hàng
                  </Button>
                  <p style={{ height: "1rem" }} />

                  <Button size="sm" bg="danger" onClick={() => handleCheck(0)}>
                    Hủy Duyệt Đơn
                  </Button>
                </>
              ) : bill.status === 2 ? (
                <Button size="sm" bg="success">
                  Đơn Đã Giao
                </Button>
              ) : (
                <Button size="sm" bg="danger">
                  Đơn Đã Hủy
                </Button>
              )} */}
              {checkStatus}
            </div>
          </div>
          <Table coloums={coloums}>
            {productsPagination.map((item, index) => (
              <tr key={index}>
                <td style={{ width: "6rem" }}>{index + 1}</td>

                <td style={{ width: "16rem" }}>SP000{item.id_product}</td>
                <td style={{ width: "16rem" }}>{item.product.name}</td>
                <td style={{ width: "16rem" }}>
                  {numberWithCommas(item.product.selling_price)}
                </td>
                <td style={{ width: "12rem" }}>
                  <img
                    src={`${process.env.REACT_APP_API_URL}/${item.product.img01}`}
                    alt="img01"
                  />
                </td>
                <td style={{ width: "16rem" }}>{item.quantity}</td>
                <td style={{ width: "16rem" }}>
                  {numberWithCommasTotal(item.total_price)}
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
