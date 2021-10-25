import { useState } from "react";
import "./css/index.css";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import CabinetLayout from "./components/CabinetLayout";
import { Menu } from "antd";
import {
  LikeOutlined,
  SendOutlined,
  FileTextOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import MyDataList from "./components/MyDataList";
import MyOrdersList from "./components/MyOrdersList";

const CustomerCabinet = ({ match }) => {
  const menuItems = (
    <>
      <Menu.Item key="1" icon={<FileTextOutlined />}>
        <Link to={`${match.url}/my-data`}>My data</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<SendOutlined />}>
        <Link to={`${match.url}/my-orders`}>My orders</Link>
      </Menu.Item>
      {/* <Menu.Item key="3" icon={<LikeOutlined />}>
            <Link to={`${match.url}/my-likes`}>
                My likes
            </Link>
        </Menu.Item> */}
      <Menu.Item key="4" icon={<RollbackOutlined />}>
        <Link to="/">Back to map</Link>
      </Menu.Item>
    </>
  );

  const switchRoutes = (
    <>
      <Route path={`${match.url}/my-data`}>
        <MyDataList />
      </Route>
      <Route path={`${match.url}/my-orders`}>
        <MyOrdersList />
      </Route>
      <Route path={`${match.url}/my-likes`}>
        <h1>My likes</h1>
      </Route>
    </>
  );
  return (
    <CabinetLayout
      menuItems={menuItems}
      match={match}
      switchRoutes={switchRoutes}
    />
  );
};

export default CustomerCabinet;
