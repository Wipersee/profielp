import { Form, Input, Image, Select, Row, Col, Button } from "antd";
import ImageUpload from "./../../../common/ImageUpload";
import { useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const initialValues = {
  firstname: "Martin",
  lastname: "Spancer",
  username: "testuser",
  email: "test@test.ua",
  phone: "0678945128",
  address: "Kyiv, Chreshatick 31",
};

const CustomerSettings = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="38">+38</Option>
      </Select>
    </Form.Item>
  );

  return (
    <>
      <ChangePasswordModal visible={visible} setVisible={setVisible} />
      <Row>
        <h1>Settings</h1>
      </Row>
      <Row justify={"space-around"}>
        <Col col={18}>
          <Form
            {...formItemLayout}
            form={form}
            name="settings"
            onFinish={onFinish}
            initialValues={{ ...initialValues, prefix: "38" }}
            scrollToFirstError
            style={{ width: "100%" }}
          >
            <Form.Item
              name="firstname"
              label="First name"
              rules={[
                {
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="lastname"
              label="Last name"
              rules={[
                {
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                  message: "Please input your nickname!",
                  whitespace: true,
                },
              ]}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
            >
              <Input
                addonBefore={prefixSelector}
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>

            <Form.Item
              name="address"
              label="Address"
              rules={[
                {
                  required: true,
                  message: "Please input your address!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Row justify={"center"}>
              <Col col={12}>
                <Form.Item {...tailFormItemLayout}>
                  <Button type="text" htmlType="submit">
                    Save
                  </Button>
                </Form.Item>
              </Col>
              <Col col={12}>
                <Form.Item {...tailFormItemLayout}>
                  <Button type="link" onClick={() => setVisible(true)}>
                    Change password
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col col={6}>
          <h2>Avatar:</h2>
          <Image
            width={300}
            src="https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F611182f736d1dc35c8cf31d3%2FRick-and-Morty%2F960x0.jpg%3Ffit%3Dscale"
          />
          <div>
            <ImageUpload />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default CustomerSettings;
