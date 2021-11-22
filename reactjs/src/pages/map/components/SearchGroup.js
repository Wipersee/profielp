import { useState } from "react";
import { Card, Input, Divider, Select, InputNumber, Form, Button, Slider } from "antd";
import "./../css/searchgroup.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../../../common/fetchData";

const { Search } = Input;
const { Option } = Select;

const SearchGroup = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.performersReducer)
  const onFinish = (values) => {
    let str = ''
    if (values.description !== undefined) {
      str = `?search=${values.description}&min_price=${values.price[0]}&max_price=${values.price[1]}`
    }
    else {
      str = `?min_price=${values.price[0]}&max_price=${values.price[1]}`
    }
    dispatch(
      fetchData(`/users/performers${str}`, "PERFORMERS")
    );
  }
  return (
    <Card className="main-card-search">
      <h2>Profielp</h2>
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          price: [1, 999]
        }}
        scrollToFirstError
      >
        <Form.Item
          name="description"
        >
          <Input />
        </Form.Item>
        <Divider />
        <Form.Item
          name="price"
          label="Price range"
        >
          <Slider range defaultValue={[1, 999]} min={0} max={1000} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Find
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SearchGroup;
