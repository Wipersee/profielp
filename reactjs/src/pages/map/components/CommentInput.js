import { Col, Row, Input, Button, Form, Checkbox } from "antd";
import { useState } from "react";

const { TextArea } = Input;

const CommentInput = ({ id, handleOrder }) => {

  const onFinish = (values) => {
    handleOrder(id, values.comment, values.address, values.is_high_priority)

  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row>
      <Col>
        <p>Your coordinates will automatically accepted</p>
        <Form
          name="comment"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          sttyle={{ width: '100%' }}
        >
          <Form.Item name={"comment"} label="Comment">
            <TextArea
              rows={2}
              showCount
              maxLength={100}
            />
          </Form.Item>
          <Form.Item name={"address"} rules={[
            {
              required: true,
              message: "Please input your address!",
            },
          ]} label="Address">
            <Input />
          </Form.Item>
          <Form.Item
            name="is_high_priority"
            valuePropName="checked"
          >
            <Checkbox>High priority</Checkbox>
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
