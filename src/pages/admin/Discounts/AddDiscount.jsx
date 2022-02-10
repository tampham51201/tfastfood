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
import { Form, DatePicker } from "antd";

import swal from "sweetalert";
import rolesApi from "../../../api/rolesApi";
import SelectInput from "../../../components/admin/SelectInput";
import authApi from "../../../api/authApi";
import discountApi from "../../../api/discountApi";

const AddUser = () => {
  const { RangePicker } = DatePicker;
  const discountInit = {
    idDiscount: "",
    value: "",
    unit: -1,
    quatity: "",
    message: [],
  };
  const timeInit = {
    time_start: "",
    time_end: "",
  };

  const [discount, setDiscount] = useState(discountInit);
  const [time, setTime] = useState(timeInit);

  const onChangeTime = (value, stringvalue) => {
    console.log(value[0].format("YYYY-MM-DD HH:mm"));
    setTime({
      time_start: value[0].format("YYYY-MM-DD HH:mm"),
      time_end: value[1].format("YYYY-MM-DD HH:mm"),
    });
  };
  console.log(time);
  const unit = [
    {
      id: 0,
      name: "%",
    },
    {
      id: 1,
      name: "VNĐ",
    },
  ];

  const handleInputDiscount = (e) => {
    setDiscount({ ...discount, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      idDiscount: discount.idDiscount,
      value: discount.value,
      unit: discount.unit,
      quatity: discount.quatity,
      time_start: time.time_start,
      time_end: time.time_end,
    };
    console.log(data);

    discountApi.addDiscount(data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setDiscount(discountInit);
        setTime({
          time_start: "",
          time_end: "",
        });
      } else if (res.data.status === 400) {
        setDiscount({ ...discount, message: res.data.errors });
        console.log(res.data.errors);
      }
    });
  };

  return (
    <div>
      <Container>
        <ContainerHeader>
          <ContainerTitle>
            Thêm Mã Giảm Giá
            <ContainerDescription>
              Thêm Thông Tin Và Thêm Mã Giảm Giá Mới.
            </ContainerDescription>
          </ContainerTitle>
          <ContainerHeaderRight>
            <Link to="/admin/discount">
              <Button>Trở Lại</Button>
            </Link>
          </ContainerHeaderRight>
        </ContainerHeader>
        <ContainerBody>
          <form onSubmit={handleSubmit}>
            <InputItem
              label="Mã Giảm Giá"
              type="text"
              onChange={handleInputDiscount}
              name="idDiscount"
              value={discount.idDiscount}
              message={discount.message.idDiscount}
            />
            <InputItem
              label="Giá Trị Giảm Giá"
              type="text"
              onChange={handleInputDiscount}
              name="value"
              value={discount.value}
              message={discount.message.value}
            />

            <SelectInput
              label="Đơn Vị"
              value={discount.init}
              name="unit"
              onChange={handleInputDiscount}
              data={unit}
              //   message={`${discount.message.unit}` || ""}
            />

            <InputItem
              label="Số Lượng (Nhập 0 Nếu Không Giới Hạn)"
              type="text"
              onChange={handleInputDiscount}
              name="quatity"
              value={discount.quatity}
              message={discount.message.quatity}
            />

            <Form.Item
              name="range-time-picker"
              label="Thời Gian"
              className="time_picker_admin"
              labelCol={{ span: 24 }}
            >
              <RangePicker
                showTime
                format="DD-MM-YYYY HH:mm"
                style={{ width: "100%", marginTop: "-1rem", padding: "1rem" }}
                className="item_time_admin"
                onChange={onChangeTime}
              />
            </Form.Item>

            <Button submit>Thêm Mới</Button>
          </form>
        </ContainerBody>
      </Container>
    </div>
  );
};

export default AddUser;
