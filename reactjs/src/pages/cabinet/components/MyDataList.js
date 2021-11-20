import { List, Typography, Divider, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { whichRole } from "../../../common/auth";


const data_header = ["Username", "First name", "Last name", "Email", "Phone", "Address", "Role", "On site"];

const MyDataList = () => {
  const data = useSelector((state) => state.userReducer)
  return (
    <Row gutter={[24, 16]} justify={"center"}>
      <Col col={12}>
        <List
          dataSource={data_header}
          size="large"
          renderItem={(item) => (
            <List.Item>
              <b>{item}</b>
            </List.Item>
          )}
        />
      </Col>

      <Col col={12}>
        <List size="large">
          <List.Item>{data.username}</List.Item>
          <List.Item>{data.first_name || <b>Empty</b>}</List.Item>
          <List.Item>{data.last_name || <b>Empty</b>}</List.Item>
          <List.Item>{data.email || <b>Empty</b>}</List.Item>
          <List.Item>{data.phone_number || <b>Empty</b>}</List.Item>
          <List.Item>{data.address || <b>Empty</b>}</List.Item>
          <List.Item>{whichRole(data.role)}</List.Item>
          <List.Item>{data.on_site || 1} days</List.Item>
        </List>
      </Col>
    </Row>
  );
};

export default MyDataList;
