<<<<<<< HEAD
import { Form, Input, Image, Select, Row, Col, Button, message } from "antd";
=======
import { Form, Input, Image, Select, Row, Col, Button, message, InputNumber } from "antd";
>>>>>>> dev
import ImageUpload from "./../../../common/ImageUpload";
import { useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../common/axios";
import { url } from "../../../common/url";
<<<<<<< HEAD
=======
import { useEffect } from "react";
>>>>>>> dev
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


const PerformerSettings = () => {
  const data = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()
<<<<<<< HEAD

=======
  const [specs, setSpecs] = useState([])

  useEffect(() => {
    axiosInstance.get('users/performerSpecializations').then(response => setSpecs(response.data)).catch(err => console.log(err))
  }, [])

>>>>>>> dev
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const onFinish = (values) => {
    axiosInstance.patch('/users/me', {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      phone_number: values.phone_number,
<<<<<<< HEAD
      address: values.address
=======
      description: values.description,
      avg_price_per_hour: values.avg_price_per_hour,
      performer_specialization_id: values.performer_specialization_id
>>>>>>> dev
    })
      .then(response => {
        dispatch({ type: "SET_USER", payload: { ...response.data, role: data.role, username: data.username, on_site: data.on_site } });
        localStorage.setItem('user', JSON.stringify({ ...response.data, role: data.role, username: data.username, on_site: data.on_site }));
        message.success("Data is update")
      })
<<<<<<< HEAD
      .catch(error => {
        message.error(error)
      });
=======
      .catch(err => {
        var keys = Object.keys(err.response.data);
        const errors = []
        keys.forEach(function (key) {
          errors.push(err.response.data[key])
        });
        message.error(errors.map(item => <span style={{ color: 'red' }}>{item[0]}<br /></span>))
      });

>>>>>>> dev
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
<<<<<<< HEAD
            initialValues={{ ...data, prefix: "38" }}
=======
            initialValues={{ ...data, prefix: "38", performer_specialization_id: data.specialization.performer_specialization_id }}
>>>>>>> dev
            scrollToFirstError
            style={{ width: "100%" }}
          >
            <Form.Item
              name="first_name"
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
              name="last_name"
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
              name="phone_number"
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

            <Form.Item name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Please input your description!",
                },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item name="avg_price_per_hour"
              label="Price per hour"
              rules={[
                {
                  required: true,
                  message: "Please input your price!",
                },
              ]}
            >
              <InputNumber
                defaultValue={0}
                formatter={value => `₴ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                // parser={value => value.replace(/\$\s?|(,*)/g, '')}
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
            <Form.Item
              name="performer_specialization_id"
              label="Spezialization"
              rules={[
                {
                  required: true,
                  message: 'Please select specialization!',
                },
              ]}
            >
              <Select placeholder="select your specialization">
                {specs.map(item => <Option value={item.performer_specialization_id}>{item.performer_specialization}</Option>)}
              </Select>
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
            src={url + data.avatar}
          />
          <div>
            <ImageUpload />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default PerformerSettings;
