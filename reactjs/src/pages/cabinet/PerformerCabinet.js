import { useState } from "react";
import "./css/index.css";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import CabinetLayout from "./components/CabinetLayout";
import { Menu } from "antd";
import {
  LikeOutlined,
  DollarCircleOutlined,
  FileTextOutlined,
  RollbackOutlined,
  FieldTimeOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import MyDataList from "./components/MyDataList";
import MyOrdersList from "./components/MyOrdersList";
import ListOfDeals from "./components/ListOfDeals";
import ActiveDeal from "./components/ActiveDeal";

const PerformerCabinet = ({ match }) => {
  const menuItems = (
    <>
      <Menu.Item key="1" icon={<FileTextOutlined />}>
        <Link to={`${match.url}/my-data`}>My data</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<DollarCircleOutlined />}>
        <Link to={`${match.url}/history-orders`}>History orders</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<FieldTimeOutlined />}>
        <Link to={`${match.url}/active-deal`}>Active deal</Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<OrderedListOutlined />}>
        <Link to={`${match.url}/list-of-deals`}>List of deals</Link>
      </Menu.Item>
      {/* <Menu.Item key="5" icon={<LikeOutlined />}>
        <Link to={`${match.url}/my-likes`}>My likes</Link>
      </Menu.Item> */}
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
      <Route path={`${match.url}/history-orders`}>
        <MyOrdersList />
      </Route>
      <Route path={`${match.url}/my-likes`}>
        <h1>My likes</h1>
      </Route>
      <Route path={`${match.url}/active-deal`}>
        <ActiveDeal />
      </Route>
      <Route path={`${match.url}/list-of-deals`}>
        <ListOfDeals />
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

export default PerformerCabinet;
