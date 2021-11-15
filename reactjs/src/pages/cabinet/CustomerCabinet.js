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
  SettingOutlined,
  FieldTimeOutlined
} from "@ant-design/icons";
import MyDataList from "./components/MyDataList";
import MyOrdersList from "./components/MyOrdersList";
import CustomerSettings from "./components/CustomerSettings";
import ActiveDeal from "./components/ActiveDeal";

const CustomerCabinet = ({ match }) => {
  const menuItems = (
    <>
      <Menu.Item key="1" icon={<FileTextOutlined />}>
        <Link to={`${match.url}/my-data`}>My data</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<SendOutlined />}>
        <Link to={`${match.url}/my-orders`}>My orders</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<FieldTimeOutlined />}>
        <Link to={`${match.url}/active-deal`}>Active deal</Link>
      </Menu.Item>
      {/* <Menu.Item key="3" icon={<LikeOutlined />}>
            <Link to={`${match.url}/my-likes`}>
                My likes
            </Link>
        </Menu.Item> */}
      <Menu.Item key="5" icon={<SettingOutlined />}>
        <Link to={`${match.url}/settings`}>Settings</Link>
      </Menu.Item>
      <Menu.Item key="6" icon={<RollbackOutlined />}>
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
      <Route path={`${match.url}/active-deal`}>
        <ActiveDeal />
      </Route>
      <Route path={`${match.url}/settings`}>
        <CustomerSettings />
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
