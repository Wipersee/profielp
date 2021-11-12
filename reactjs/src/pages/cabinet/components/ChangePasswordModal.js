import { useState } from "react";
import { Modal, Row, Col, Form, Input, message, Button } from "antd";
import axiosInstance from "../../../common/axios";

const ChangePasswordModal = ({ visible, setVisible }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    setConfirmLoading(true);
    axiosInstance.put('users/password', {
      password: values.password,
      old_password: values.old_password,
      repeat_password: values.repeat_password,
    }).then(res => {
      console.log(res)
      setVisible(false);
      setConfirmLoading(false);
      message.success("Password changed");
      form.resetFields();
    }).catch((err) => {
      setConfirmLoading(false);
      var keys = Object.keys(err.response.data);
      const errors = []
      keys.forEach(function (key) {
        errors.push(err.response.data[key])
      });
      message.error(errors.map(item => <span style={{ color: 'red' }}>{item[0]}<br /></span>))
    })
    // setTimeout(() => {
    //   setVisible(false);
    //   setConfirmLoading(false);
    //   console.log("Received values of form: ", values);
    //   message.success("Password changed");
    //   form.resetFields();
    // }, 2000);
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  return (
    <>
      <Modal
        title="Change password form"
        visible={visible}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <>
            <Button
              form="change_password_form"
              key="submit"
              htmlType="submit"
              type={"primary"}
              loading={confirmLoading}
            >
              Submit
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </>,
        ]}
      >
        <Row>
          <Col col={24} style={{ width: "100%" }}>
            <Form
              form={form}
              name="changePassword"
              onFinish={onFinish}
              scrollToFirstError
              style={{ width: "100%" }}
              id={"change_password_form"}
            >
              <Form.Item
                name="old_password"
                label="Old password"
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
                name="repeat_password"
                label="Repeat"
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
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default ChangePasswordModal;
