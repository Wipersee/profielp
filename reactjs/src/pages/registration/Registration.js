import { React, useState } from "react";
import { Form, Input, Card, Select, Row, Col, Checkbox, Button, Radio, message } from "antd";
import "./css/registration.css";
import axiosInstance from "../../common/axios";
import { useHistory } from 'react-router-dom'
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

const Registration = () => {
  const [form] = Form.useForm();
  const history = useHistory()

  const onFinish = (values) => {
    if (values.role == "CUST") {
      axiosInstance.post('users/registration/customer', {
        username: values.username,
        password: values.password,
        phone_number: values.phone,
        email: values.email,
      }).then(res => {
        message.success("User created, please login")
        history.push('/login')
      }).catch(err => {
        var keys = Object.keys(err.response.data);
        const errors = []
        keys.forEach(function (key) {
          errors.push(err.response.data[key])
        });
        message.error(errors.map(item => <span style={{ color: 'red' }}>{item[0]}<br /></span>))
      })
    }
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
    <Row className="registration-row" justify={"center"}>
      <h3 className="registration-logo">Profielp</h3>
      <Col className="registration-col" col={24}>
        <Card title="Sign up" style={{ width: "45rem" }}>
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
              prefix: "38",
            }}
            scrollToFirstError
          >
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
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="username"
              label="Username"
              tooltip="What do you want others to call you?"
              rules={[
                {
                  required: true,
                  message: "Please input your nickname!",
                  whitespace: true,
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

            <Form.Item label="Role" name="role" rules={[
              {
                required: true,
                message: 'Please choose role!',
              },
            ]}>
              <Radio.Group optionType="button">
                <Radio.Button value="CUST">Customer</Radio.Button>
                <Radio.Button value="PERF">Performer</Radio.Button>
              </Radio.Group>

            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("Should accept agreement")),
                },
              ]}
              {...tailFormItemLayout}
            >

              <Checkbox>
                I have read the <a href="">agreement</a>
              </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Registration;
