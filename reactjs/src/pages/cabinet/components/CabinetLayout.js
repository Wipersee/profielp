import { useState } from "react";
import AvatarGroup from "../../../common/AvatarGroup";
import "./../css/index.css";
import { Layout, Menu, Row, Col } from "antd";
import { Switch, Route, Link, Redirect } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const CustomerCabinet = ({ match, menuItems, switchRoutes }) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        theme="light"
        collapsed={collapsed}
        onCollapse={setCollapsed}
        className="site-layout-background"
        selectable={false}
      >
        <div className="logo">
          {" "}
          <h2>Profielp</h2>{" "}
        </div>
        <Menu defaultSelectedKeys={["1"]} mode="inline">
          {menuItems}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="cabinet-header" style={{ padding: 0 }}>
          <Row>
            <Col col={12}></Col>
            <Col col={12}>
              <AvatarGroup marginRight="0.5rem" size={45} />
            </Col>
          </Row>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Switch>{switchRoutes}</Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Profielp 2021</Footer>
      </Layout>
    </Layout>
  );
};

export default CustomerCabinet;
