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
import bannerApi from "../../../api/bannerApi";

const Banner = () => {
  const coloums = ["STT", "Mã Banner", "Hình Ảnh", "Thao Tác"];
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
    bannerApi.getAll().then((res) => {
      if (res.data.status === 200) {
        const newBanners = res.data.banners;
        setProductList(newBanners);
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
      return ("bn000" + category.id)
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
    bannerApi.Delete(id).then((res) => {
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
          <h3>Banner</h3>
          <ContainerHeaderRight>
            <InputItem
              searchbox
              type="text"
              onChange={handleSearch}
              value={searchInput}
              placeholder="Tìm kiếm theo mã..."
            />
            <Link to="/admin/banner-add">
              <Button>Thêm Banner</Button>
            </Link>
          </ContainerHeaderRight>
        </ContainerHeader>
        <ContainerBody>
          <Table coloums={coloums}>
            {productsPagination.map((item, index) => (
              <tr key={index}>
                <td style={{ width: "7rem" }}>{index + 1}</td>
                <td style={{ width: "15rem" }}>BN000{item.id}</td>

                <td>
                  <img
                    src={`${process.env.REACT_APP_API_URL}/${item.img}`}
                    alt="img"
                  />
                </td>

                <td className="edit" style={{ width: "20rem" }}>
                  <Link to={`banner-edit/${item.id}`}>
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
                {/* <td className="delete">
                  
                </td> */}
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

export default Banner;
