import { React } from "react";
import { Form, Input, Button, Row, Col, Card, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./css/index.css";
import { Link, useHistory } from 'react-router-dom'
import axiosInstance from './../../common/axios'
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Login = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    axios.post('http://localhost:8000/api/token/', { //TODO: before prod change this link
      username: values.username,
      password: values.password
    }).then(response => {
      axiosInstance.defaults.headers['Authorization'] = "Bearer " + response.data.access;
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh)
      localStorage.setItem("isLogged", true)
      dispatch({ type: "SET_LOGIN", payload: true })
      history.push("/");
    }).catch(err => {
      message.error(err.response.data.detail)
    });


  };

  return (
    <Row className="login-row" justify={"center"}>
      <h3 className="login-logo">Profielp</h3>
      <Col className="login-col" col={24}>
        <Card title="Welcome back !" style={{ width: "40rem" }}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              <Link to="/registration">&nbsp;Or register now</Link>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
