import React, { useState, useEffect } from "react";
import moment from "moment";
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
import Loading from "../../Loading";

import dateFormat from "dateformat";

const EditDiscount = (props) => {
  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();
  const timeInit = {
    time_start: "",
    time_end: "",
  };
  const [discount, setDiscount] = useState({
    message: [],
  });
  const [time, setTime] = useState(timeInit);
  const [loading, setLoading] = useState(true);

  const onChangeTime = (value, stringvalue) => {
    if (value !== null) {
      setTime({
        time_start: value[0].format("YYYY-MM-DD HH:mm"),
        time_end: value[1].format("YYYY-MM-DD HH:mm"),
      });
    }
  };

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

  useEffect(() => {
    const discount_id = props.match.params.id;
    discountApi.getId(discount_id).then((res) => {
      if (res.data.status === 200) {
        const newDiscount = res.data.discount;
        setDiscount({ ...discount, ...newDiscount });
        console.log(newDiscount);
        console.log(newDiscount.time_start);
        form.setFieldsValue({
          time: [
            newDiscount.time_start !== null
              ? moment(newDiscount.time_start, "YYYY-MM-DD hh:mm")
              : "",
            newDiscount.time_end !== null
              ? moment(newDiscount.time_end, "YYYY-MM-DD hh:mm")
              : "",
          ],
        });

        console.log(moment(newDiscount.time_start, "YYYY-MM-DD"));

        setTime({
          time_start: newDiscount.time_start,
          time_end: newDiscount.time_end,
        });

        setLoading(false);
      } else if (res.data.status === 404) {
        swal("Erorr", res.data.message, "error");
        // history.push("admin/discount");
      }
    });
  }, []);
  console.log(discount);

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
    const discount_id = props.match.params.id;

    discountApi.Update(discount_id, data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
      } else {
        // setDiscount({ ...discount, message: res.data.errors });
        // console.log(res.data.errors);
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
              value={`${discount.value}`}
              message={discount.message.value}
            />

            <SelectInput
              label="Đơn Vị"
              value={`${discount.unit}`}
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
              value={`${discount.quatity}`}
              message={discount.message.quatity}
            />
            <Form name="discount_time" className="category_add" form={form}>
              <Form.Item
                name="time"
                label={`Thời Gian`}
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
            </Form>

            <Button submit>Lưu</Button>
          </form>
        </ContainerBody>
      </Container>
    </div>
  );
};

export default EditDiscount;
