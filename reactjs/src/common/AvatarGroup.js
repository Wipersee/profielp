import { Avatar, Menu, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./css/avatargroup.css";
import {
  ExportOutlined,
  WalletOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { whichRole } from "./auth";

const menu = (
  <Menu className="avatar-group-dropdown-menu">
    <div className="avatar-group-dropdown-menu-avatar">
      <Avatar
        onClick={(e) => e.preventDefault()}
        size={64}
        icon={<UserOutlined />}
        src={
          "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F611182f736d1dc35c8cf31d3%2FRick-and-Morty%2F960x0.jpg%3Ffit%3Dscale"
        }
      />
    </div>
    <h4 className="avatar-group-h4">{whichRole()}</h4>
    <Menu.Item key="0" icon={<WalletOutlined />}>
      <Link to="/cabinet/my-data">Cabinet</Link>
    </Menu.Item>
    {/* <Menu.Item key="1" icon={<SettingOutlined />}>
      <a href="/">Settings</a>
    </Menu.Item> */}
    <Menu.Divider />
    <Menu.Item key="2" icon={<ExportOutlined />}>
      Logout
    </Menu.Item>
  </Menu>
);

const AvatarGroup = (props) => {
  return (
    <div
      className="main-avatar-div"
      style={{ marginTop: props.marginTop, marginRight: props.marginRight }}
    >
      <Dropdown overlay={menu} trigger={["click"]}>
        <Avatar
          onClick={(e) => e.preventDefault()}
          size={props.size}
          icon={<UserOutlined />}
          src={
            "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F611182f736d1dc35c8cf31d3%2FRick-and-Morty%2F960x0.jpg%3Ffit%3Dscale"
          }
        />
      </Dropdown>
    </div>
  );
};

export default AvatarGroup;
