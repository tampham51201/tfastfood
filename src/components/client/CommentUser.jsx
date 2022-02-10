import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

import { Comment, Avatar, Form, Input, Button, notification } from "antd";
import dateFormat from "dateformat";
import commentApi from "../../api/commentApi";
const CommentUser = (props) => {
  const [form] = Form.useForm();
  const [formReply] = Form.useForm();
  const formRef = useRef(null);

  const { TextArea } = Input;
  const comments = props.comment;
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    commentApi.getAll().then((res) => {
      if (res.data.status === 200) {
        const newComments = res.data.comments;

        const newComment = newComments.filter(
          (item) => item.id_product === props.idProduct
        );
        setComment(newComment);
        setLoading(false);
      }
    });
  }, [loading]);

  const onFinishComment = (value) => {
    if (value["content"] !== "") {
      const data = {
        ...value,
        id_product: props.idProduct,
      };
      console.log(data);
      commentApi.addComment(data).then((res) => {
        if (res.data.status == 200) {
          form.resetFields();
          setLoading(true);
        } else {
          notification.success({
            message: `Thành Công`,
            description: res.data.message,
            duration: 2,
            placement: "topRight",
          });
        }
      });
    }
  };
  const onFinishCommentReply = (value) => {
    if (value["content"] !== "") {
      const data = {
        ...value,
      };
      console.log(data);
      commentApi.addRelyComment(data).then((res) => {
        if (res.data.status == 200) {
          console.log(formRef.current);
          formRef.current.setFieldsValue({
            content: null,
          });
          setLoading(true);
        } else {
          notification.success({
            message: `Thành Công`,
            description: res.data.message,
            duration: 2,
            placement: "topRight",
          });
        }
      });
    }
  };

  const handleRep = (e) => {
    e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.classList.toggle(
      "active"
    );
  };
  return (
    <>
      {comment.map((item, index) => (
        <Comment
          key={index}
          className="product__tab__content__comment__item "
          actions={[
            <span key="comment-nested-reply-to " onClick={(e) => handleRep(e)}>
              Trả Lời · Xem Thêm {item.reply_comments.length} Trả Lời ·{" "}
              {dateFormat(item.created_at, "dd/mm/yyyy h:MM TT")}
            </span>,
          ]}
          author={item.user.full_name}
          avatar={
            <Avatar
              src="https://joeschmoe.io/api/v1/random"
              alt={item.user.full_name}
            />
          }
          content={<p>{item.content}</p>}
        >
          {item.reply_comments.map((item1, index) => (
            <Comment
              key={index}
              author={item1.user.full_name}
              className="product__tab__content__comment__item__reply "
              actions={[
                <span key="comment-nested-reply-to ">
                  · {dateFormat(item1.created_at, "dd/mm/yyyy h:MM TT")}
                </span>,
              ]}
              avatar={
                <Avatar
                  src="https://joeschmoe.io/api/v1/random"
                  alt={item1.user.full_name}
                />
              }
              content={<p>{item1.content}</p>}
            />
          ))}
          <Comment
            className="product__tab__content__comment__item__reply__write"
            // author={<a>Han Solo</a>}
            avatar={
              <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
            }
            content={
              <Form
                name="addreply"
                onFinish={onFinishCommentReply}
                ref={formRef}
              >
                <Form.Item
                  name="id_comment"
                  initialValue={item.id}
                  style={{ display: "none" }}
                >
                  <TextArea rows={2} />
                </Form.Item>
                <Form.Item name="content">
                  <TextArea rows={2} />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                      borderColor: "#d32b25",
                      color: "white",
                      backgroundColor: "#d32b25",
                      fontWeight: "500",
                    }}
                  >
                    Gửi
                  </Button>
                </Form.Item>
              </Form>
            }
          ></Comment>
        </Comment>
      ))}
      <Comment
        // author={<a>Han Solo</a>}
        className="product__tab__content__comment__item__write"
        avatar={
          <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        }
        content={
          <Form onFinish={onFinishComment} name="add" form={form}>
            <Form.Item name="content">
              <TextArea rows={2} />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  borderColor: "#d32b25",
                  color: "white",
                  backgroundColor: "#d32b25",
                  fontWeight: "500",
                }}
              >
                Gửi
              </Button>
            </Form.Item>
          </Form>
        }
      ></Comment>
    </>
  );
};

CommentUser.propTypes = {
  comment: PropTypes.array,
  idProduct: PropTypes.number,
};

export default CommentUser;
