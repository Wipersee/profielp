import { List, Typography, Divider, Row, Col } from "antd";

const data = {
  name: "Andy",
  surname: "Alexander",
  on_site: "1 year",
  photo: "URL",
  role: "customer",
};

const data_header = ["Name", "Surname", "Role", "On site"];

const MyDataList = () => {
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
          <List.Item>{data.name}</List.Item>
          <List.Item>{data.surname}</List.Item>
          <List.Item>{data.role}</List.Item>
          <List.Item>{data.on_site}</List.Item>
        </List>
      </Col>
    </Row>
  );
};

export default MyDataList;
