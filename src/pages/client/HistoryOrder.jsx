import React, { useEffect, useRef, useState } from "react";
import Helmet from "../../components/Helmet";

import { Link } from "react-router-dom";
import Breadcrumb from "../../components/client/Breadcrumb ";
import billsApi from "../../api/billsApi";
import dateFormat from "dateformat";
import { numberWithCommasTotal } from "../../utils/numberWithCommas";
import Button from "../../components/client/Button";
import { notification, Rate } from "antd";

import InputItem from "../../components/admin/InputItem";
import ReviewItem from "../../components/client/ReviewItem";

const HistoryOrder = () => {
  const baseURL = process.env.REACT_APP_API_URL;
  const [billsUser, setBillsUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const [billsUserFilter, setBillsUserFilter] = useState([]);
  const controlOneRef = useRef(null);
  const controlTwoRef = useRef(null);
  const controlThreeRef = useRef(null);
  const controlFourRef = useRef(null);

  useEffect(() => {
    billsApi.getBillUser().then((res) => {
      if (res.data.status === 200) {
        console.log(res.data.billsUser);
        const newBillsUser = res.data.billsUser;
        setBillsUser(newBillsUser);
        setLoading(true);
      }
    });
  }, [loading]);

  useEffect(() => {
    handleTab(1);
  }, [billsUser]);

  const handleTab = (value) => {
    controlOneRef.current.classList.remove("active");
    controlTwoRef.current.classList.remove("active");
    controlThreeRef.current.classList.remove("active");
    controlFourRef.current.classList.remove("active");
    var newbillsUserFilter = [];
    switch (value) {
      case 1:
        controlOneRef.current.classList.add("active");
        newbillsUserFilter = billsUser.filter((item) => item.status === 0);
        break;
      case 2:
        controlTwoRef.current.classList.add("active");
        newbillsUserFilter = billsUser.filter((item) => item.status === 1);
        break;
      case 3:
        controlThreeRef.current.classList.add("active");
        newbillsUserFilter = billsUser.filter((item) => item.status === 2);
        break;
      case 4:
        controlFourRef.current.classList.add("active");
        newbillsUserFilter = billsUser.filter((item) => item.status === 3);
        break;
    }
    newbillsUserFilter.sort((a, b) => b.id - a.id);
    setBillsUserFilter(newbillsUserFilter);
  };

  const handleCheck = (value, id_bill) => {
    const data = {
      id_bill: id_bill,
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
        setLoading(false);
      }
    });
  };

  return (
    <Helmet title="Đơn Hàng">
      <Breadcrumb>
        <Link to="/">Trang Chủ</Link> /<Link to="history-order">Đơn Hàng</Link>
      </Breadcrumb>
      <div className="history-order content">
        <ul className="history-order__control">
          <li
            className="history-order__control__item"
            ref={controlOneRef}
            onClick={() => handleTab(1)}
          >
            Đang Chờ Xác Nhận
          </li>
          <li
            className="history-order__control__item"
            ref={controlTwoRef}
            onClick={() => handleTab(2)}
          >
            Đang Giao
          </li>
          <li
            className="history-order__control__item"
            ref={controlThreeRef}
            onClick={() => handleTab(3)}
          >
            Đã Giao
          </li>
          <li
            className="history-order__control__item"
            ref={controlFourRef}
            onClick={() => handleTab(4)}
          >
            Đã Hủy
          </li>
        </ul>
        <div className="history-order__content">
          {billsUserFilter.length > 0 ? (
            billsUserFilter.map((item, index) => (
              <div className="history-order__content__item" key={index}>
                <div className="history-order__content__item__info">
                  <div className="history-order__content__item__info__left">
                    <i className="bx bx-receipt"></i> Mã Hóa Đơn: HD000{item.id}{" "}
                    - Ngày Đặt :
                    {dateFormat(item.created_at, "dd/mm/yyyy h:MM TT")}
                  </div>
                  <div className="history-order__content__item__info__right">
                    {item.status === 0 ? (
                      <>
                        Đang Chờ Xác Nhận{" "}
                        <Button
                          size="md"
                          backgroundColor="main"
                          onClick={() => handleCheck(3, item.id)}
                        >
                          HỦY ĐƠN HÀNG
                        </Button>
                      </>
                    ) : (
                      ""
                    )}
                    {item.status === 1 ? "Đang Giao" : ""}
                    {item.status === 2 ? "Đã Giao" : ""}
                    {item.status === 3 ? "Đã Hủy" : ""}
                  </div>
                </div>
                <div className="history-order__content__item__list">
                  {item.bill_detail.map((item1, index) => (
                    <div key={index}>
                      <div className="history-order__content__item__list__item">
                        <div className="history-order__content__item__list__item__img">
                          <img
                            src={`${baseURL}/${item1.product.img01}`}
                            alt=""
                          />
                        </div>
                        <div className="history-order__content__item__list__item__name">
                          <Link to={`/product/${item1.product.slug}`}>
                            {item1.product.name}
                          </Link>
                        </div>
                        <div className="history-order__content__item__list__item__quantity">
                          <p>x{item1.quantity}</p>

                          {numberWithCommasTotal(item1.total_price)}
                        </div>
                      </div>
                      <ReviewItem item={item} idProduct={item1.product.id} />
                    </div>
                  ))}
                </div>
                <div className="history-order__content__item__bottom">
                  <i className="bx bxs-badge-dollar"></i> Tổng Số Tiền:
                  <span>{numberWithCommasTotal(item.total_price)}</span>
                </div>
                {/* <div className="history-order__content__item__bottom">
                  <i class="bx bxs-badge-dollar"></i> Tổng Số Tiền:
                  <span>{numberWithCommasTotal(item.total_price)}</span>
                  {item.status === 2 ? (
                    <button onClick={handleClickReview}>Đánh Giá</button>
                  ) : (
                    ""
                  )}
                </div>
                {item.status === 2 ? (
                  <div
                    className="history-order__content__item__review toggle"
                    ref={reviewRef}
                  >
                    <div className="history-order__content__item__review__info">
                      <span>
                        Cảm ơn bạn đã tin tưởng Cửa hàng, hãy tiếp tục ủng hộ
                        Cửa hàng nhé ❤️
                      </span>
                      <Rate
                        allowHalf
                        defaultValue={4.5}
                        className="history-order__content__item__review__info__rate-star"
                      />
                    </div>

                    <InputItem type="textarea" />
                    <div className="history-order__content__item__review__btn">
                      <Button backgroundColor="second">Gửi</Button>
                    </div>
                  </div>
                ) : (
                  ""
                )} */}
              </div>
            ))
          ) : (
            <div className="history-order__content__null">
              <p>
                <i className="bx bx-basket"></i>
                Chưa Có Đơn Hàng
              </p>
            </div>
          )}
        </div>
      </div>
    </Helmet>
  );
};

export default HistoryOrder;
