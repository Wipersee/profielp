import { useState } from "react";
import { Modal, Row, Col, Form, Input, message, Button } from "antd";

const ChangePasswordModal = ({ visible, setVisible }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      console.log("Received values of form: ", values);
      message.success("Password changed");
      form.resetFields();
    }, 2000);
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
