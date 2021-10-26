import { Col, Row, Input, Button, Form } from "antd";
import { useState } from "react";

const { TextArea } = Input;

const CommentInput = ({ id, handleOrder }) => {

  const onFinish = (values) => {
    handleOrder(id, values.comment)

  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row>
      <Col>
        <Form
          name="comment"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          sttyle={{width:'100%'}}
        >
          <Form.Item name={"comment"}>
            <TextArea
              rows={2}
              showCount
              maxLength={100}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Order
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default CommentInput;
