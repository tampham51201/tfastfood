import React, { useState, useEffect } from "react";

import productApi from "../../api/productApi";
import billsApi from "../../api/billsApi";
import "antd/dist/antd.css";
import authApi from "../../api/authApi";
import { Row, Col, Spin, Form, Button } from "antd";
import FeatureInfo from "../../components/admin/FeatureInfo";

import dateFormat from "dateformat";
import { CalendarOutlined } from "@ant-design/icons";
import { DatePicker, Space } from "antd";
import moment from "moment";
import numberWithCommas, {
  numberWithCommasTotal,
} from "../../utils/numberWithCommas";
import Loading from "../Loading";

import { Link } from "react-router-dom";

import {
  BarChart,
  Bar,
  LabelList,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const baseURL = process.env.REACT_APP_API_URL;

  const day = new Date();
  var day_format_month = dateFormat(day, "mm/yyyy");
  var day_format_year_month = dateFormat(day, "yyyy-mm-dd");
  var day_format_year_month_v1 = dateFormat(day, "yyyy-mm");

  var day_format_year = dateFormat(day, "yyyy");
  const { RangePicker } = DatePicker;
  const [products, setProducts] = useState([]);
  const [bills, setBills] = useState([]);

  const [billDetails, setBillDetails] = useState([]);
  const [billDetailQuantity, setBillDetailQuantity] = useState([]);

  const [billDetailPrice, setBillDetailPrice] = useState([]);

  const [quantityActivity, setQuantityActivity] = useState([]);

  const [quantity, setQuantity] = useState({
    product: "",
    order: "",
    student: "",
    admin: "",
    totalpriceMonth: "",
    totalpriceYear: "",
    billsStatusOne: "",
    billsStatusTwo: "",
  });

  const [timeQuantity, seTimeQuantity] = useState({
    time_start: `'${day_format_year_month_v1}-1'`,
    time_end: `'${day_format_year_month}'`,
  });

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    authApi.getAll().then((res) => {
      const newUser = res.data.user;
      setUsers(newUser);
    });
  }, []);
  useEffect(() => {
    billsApi.getAll().then((res) => {
      const newBills = res.data.bills;
      setBills(newBills);
    });
  }, []);
  useEffect(() => {
    billsApi.getAllGroupBy().then((res) => {
      if (res.data.status === 200) {
        const newbillDetails = res.data.billDetails;
        setBillDetails(newbillDetails);
      }
    });
  }, []);

  useEffect(() => {
    const newBillDetails = billDetails;

    const billSortQuantity = newBillDetails.sort(
      (a, b) => b.quantity - a.quantity
    );
    const billSortQuantitySlice = billSortQuantity.slice(0, 5);
    setBillDetailQuantity(billSortQuantitySlice);

    const billSortPrice = newBillDetails.sort(
      (a, b) => b.price_total - a.price_total
    );
    const billSortPriceSlice = billSortPrice.slice(0, 5);
    setBillDetailPrice(billSortPriceSlice);
  }, [billDetails]);

  useEffect(() => {
    productApi.getAll().then((res) => {
      const newProducts = res.data.product;
      setProducts(newProducts);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const userAdmin = users.filter((item) => {
      return item.role_as === 1;
    });

    const userStudent = users.filter((item) => {
      return item.role_as === 0;
    });
    setQuantity({
      ...quantity,
      admin: userAdmin.length,
      student: userStudent.length,
      order: bills.length,
      product: products.length,
    });
  }, [users, products, bills]);

  useEffect(() => {
    const data = timeQuantity;
    console.log(data);

    billsApi.getBillDayPrice(data).then((res) => {
      if (res.data.status == 200) {
        const newQuantityActivity = res.data.bills;
        console.log(newQuantityActivity);

        setQuantityActivity(newQuantityActivity);

        setLoading(false);
      }
    });
  }, [timeQuantity]);

  useEffect(() => {
    const billsMonth = bills.filter((item) => {
      const day_format = dateFormat(item.created_at, "mm/yyyy");
      return day_format.includes(day_format_month) && item.status === 2;
    });

    const totalpriceMonth = billsMonth.reduce(
      (total, item) => total + Number(item.total_price),
      0
    );

    const billsYear = bills.filter((item) => {
      const day_format = dateFormat(item.created_at, "yyyy");
      return day_format.includes(day_format_year) && item.status === 2;
    });
    const totalpriceYear = billsYear.reduce(
      (total, item) => total + Number(item.total_price),
      0
    );

    const billsStatusOne = bills.filter((item) => {
      return item.status === 0;
    });
    const billsStatusTwo = bills.filter((item) => {
      return item.status === 1;
    });

    setQuantity({
      ...quantity,
      totalpriceYear: totalpriceYear,
      totalpriceMonth: totalpriceMonth,
      billsStatusOne: billsStatusOne.length,
      billsStatusTwo: billsStatusTwo.length,
    });
  }, [bills]);

  const onFinish = (fieldsValue) => {
    // Should format date value before submit.
    const rangeValue = fieldsValue["range-picker"];

    const values = {
      time_start:
        rangeValue === null
          ? `'${day_format_year_month_v1}-1'`
          : `'${rangeValue[0].format("YYYY-MM-DD")}'`,
      time_end:
        rangeValue === null
          ? `'${day_format_year_month}'`
          : `'${rangeValue[1].format("YYYY-MM-DD")}'`,
    };
    seTimeQuantity(values);
  };

  if (loading) {
    return (
      <Loading />
      // <Spin
      //   style={{
      //     width: "100%",
      //     marginTop: "10rem",
      //     marginBottom: "10rem",
      //   }}
      //   tip="Loading..."
      // ></Spin>
    );
  }
  return (
    <div className="dashboard">
      <Row gutter={[20, 20]}>
        <Col span={24} md={12} xl={6}>
          <FeatureInfo
            title="Đơn Hàng"
            value={quantity.order.toString()}
            icon="bx bx-book-bookmark"
            color="green"
          />
        </Col>
        <Col span={24} md={12} xl={6}>
          <FeatureInfo
            title="Sản Phẩm"
            value={quantity.product.toString()}
            icon="bx bx-book-bookmark"
            color="blue"
          />
        </Col>
        <Col span={24} md={12} xl={6}>
          <FeatureInfo
            title="Khách Hàng"
            value={quantity.student.toString()}
            icon="bx bx-user"
            color="yellow"
          />
        </Col>
        <Col span={24} md={12} xl={6}>
          <FeatureInfo
            title="Nhân Viên"
            value={quantity.admin.toString()}
            icon="bx bx-user"
            color="light-blue"
          />
        </Col>
        <Col span={24} md={12} xl={6}>
          <FeatureInfo
            title="Doanh Thu Tháng Này"
            value={numberWithCommasTotal(quantity.totalpriceMonth)}
            icon="bx bx-money"
            color="yellow"
          />
        </Col>
        <Col span={24} md={12} xl={6}>
          <FeatureInfo
            title="Danh Thu Năm Này"
            value={numberWithCommasTotal(quantity.totalpriceYear)}
            icon="bx bx-money"
            color="light-blue"
          />
        </Col>
        <Col span={24} md={12} xl={6}>
          <FeatureInfo
            title="Đơn Hàng Đang Giao"
            value={quantity.billsStatusTwo.toString()}
            icon="bx bx-receipt"
            color="green"
          />
        </Col>
        <Col span={24} md={12} xl={6}>
          <FeatureInfo
            title="Đơn Hàng Chưa Duyệt"
            value={quantity.billsStatusOne.toString()}
            icon="bx bx-receipt"
            color="blue"
          />
        </Col>
        <Col span={24} md={24} xl={24}>
          <div className="dashboard__chart">
            <div className="dashboard__chart__title">
              <h3>Thống Kê Doanh Thu Theo Ngày</h3>
              <Form
                name="time_related_controls"
                onValuesChange={onFinish}
                initialValues={{
                  "range-picker": [
                    moment(day_format_year_month_v1 + "-1", "YYYY/MM/DD"),
                    moment(day_format_year_month, "YYYY/MM/DD"),
                  ],
                }}
              >
                <Form.Item
                  name="range-picker"
                  style={{
                    display: "inline-block",
                  }}
                >
                  <RangePicker format={"DD/MM/YYYY"} />
                </Form.Item>
              </Form>
            </div>
            <div className="dashboard__chart__content">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={quantityActivity}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 10,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time_date" fontSize={13} />
                  <YAxis
                    domain={[0, 10000000]}
                    type="number"
                    // format={numberWithCommasTotal(number)}
                    tickFormatter={(tick) => {
                      return numberWithCommasTotal(tick);
                    }}
                  />
                  <Tooltip formatter={(value) => numberWithCommas(value)} />

                  <Bar
                    dataKey="quantity_activity"
                    name="Doanh Thu"
                    fill="#8884d8"
                    barSize={40}
                  >
                    <LabelList
                      dataKey="quantity_activity"
                      position="top"
                      formatter={(value) => numberWithCommas(value)}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Col>
        <Col span={24} md={24} xl={12}>
          <div className="dashboard__chart">
            <div className="dashboard__chart__title">
              <h3>Top 5 Sản Phẩm Theo Số Lượng Mua</h3>
            </div>
            <div className="dashboard__chart__content_quantity">
              {billDetailQuantity.map((item, index) => (
                <div
                  className="activity-item-quantity"
                  key={index}
                  style={{ textAlign: "left" }}
                >
                  <div className="activity-item-quantity__img">
                    <img src={`${baseURL}/${item.img01}`} alt="" />
                  </div>

                  <div>
                    {/* <div className="activity-item-quantity__id">
                      Mã Sản Phẩm: SP00{item.id_product}
                    </div> */}

                    <div className="activity-item-quantity__title">
                      <Link to={`/product/${item.slug}}`}>{item.name}</Link>
                    </div>
                    {/* <div className="activity-item-quantity__quantity">
                    Đơn Vị Tổ Chức: {item.category.name}
                  </div> */}
                    <div className="activity-item-quantity__quantity">
                      Số Lượng Đã Bán: {item.quantity}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Col>
        <Col span={24} md={24} xl={12}>
          <div className="dashboard__chart">
            <div className="dashboard__chart__title">
              <h3>Top 5 Sản Phẩm Theo Doanh Thu</h3>
            </div>
            <div className="dashboard__chart__content_quantity">
              {billDetailPrice.map((item, index) => (
                <div
                  className="activity-item-quantity"
                  key={index}
                  style={{ textAlign: "left" }}
                >
                  <div className="activity-item-quantity__img">
                    <img src={`${baseURL}/${item.img01}`} alt="" />
                  </div>

                  <div>
                    {/* <div className="activity-item-quantity__id">
                      Mã Sản Phẩm: SP00{item.id_product}
                    </div> */}

                    <div className="activity-item-quantity__title">
                      <Link to={`/product/${item.slug}}`}>{item.name}</Link>
                    </div>
                    {/* <div className="activity-item-quantity__quantity">
                    Đơn Vị Tổ Chức: {item.category.name}
                  </div> */}
                    <div className="activity-item-quantity__quantity">
                      Doanh Thu: {numberWithCommasTotal(item.price_total)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
