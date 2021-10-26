import { Form, Input, Card, Select, Row, Col, Checkbox, Button } from "antd";

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
      <Row>
        <h1>Settings</h1>
      </Row>
      <Row justify={"center"}>
        <Col col={24}>
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{ ...initialValues, prefix: "38" }}
            scrollToFirstError
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
                  <Button type="link">Change password</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default CustomerSettings;
