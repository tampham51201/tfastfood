import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import InputItem from "../../components/admin/InputItem";
import { notification, Rate } from "antd";
import Button from "../../components/client/Button";
import { numberWithCommasTotal } from "../../utils/numberWithCommas";
import reviewApi from "../../api/reviewApi";

const ReviewItem = (props) => {
  const item = props.item;
  const [rateStar, setRateStar] = useState(4.5);
  const [content, setContent] = useState("");

  const reviewRef = React.createRef();

  const handleClickReview = () => {
    reviewRef.current.classList.toggle("toggle");
  };

  const hanldRateStar = (value) => {
    setRateStar(value);
  };

  const handleClickSubmit = () => {
    const data = {
      rate_star: rateStar,
      content: content,
      id_product: props.idProduct,
    };
    reviewApi.addReview(data).then((res) => {
      if (res.data.status === 200) {
        notification.success({
          message: `Thành Công`,
          description: res.data.message,
          duration: 2,
          placement: "topRight",
        });
        reviewRef.current.classList.toggle("toggle");
      }
    });
    console.log(data);
  };

  return (
    <>
      {/* <div className="history-order__content__item__bottom">
        {item.status === 2 ? (
          <button onClick={handleClickReview}>Đánh Giá</button>
        ) : (
          ""
        )}
      </div> */}
      {item.status === 2 ? (
        <div className="history-order__content__item__container">
          <button onClick={handleClickReview}>Đánh Giá</button>
          <div
            className="history-order__content__item__review toggle"
            ref={reviewRef}
          >
            <div className="history-order__content__item__review__info">
              <span>
                Cảm ơn bạn đã tin tưởng Cửa hàng, hãy tiếp tục ủng hộ Cửa hàng
                nhé ❤️
              </span>
              <Rate
                allowHalf
                defaultValue={rateStar}
                className="history-order__content__item__review__info__rate-star"
                onChange={hanldRateStar}
              />
            </div>

            <InputItem
              type="textarea"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
            <div className="history-order__content__item__review__btn">
              <Button backgroundColor="second" onClick={handleClickSubmit}>
                Gửi
              </Button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

ReviewItem.propTypes = {
  item: PropTypes.object,
  idProduct: PropTypes.number,
};

export default ReviewItem;
