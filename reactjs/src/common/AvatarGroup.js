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
import axiosInstance from "./axios";
import { useDispatch, useSelector } from "react-redux";

const AvatarGroup = (props) => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.userReducer);


  const handleLogout = () => {
    axiosInstance.post('users/logout', {
      "refresh_token": localStorage.getItem("refresh_token")
    }).then(response => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      axiosInstance.defaults.headers['Authorization'] = null;
      localStorage.removeItem("isLogged");
      dispatch({ type: "SET_LOGIN", payload: false })
    }).catch(err => console.log(err));
  }

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
      <h4 className="avatar-group-h4">{whichRole(role)}</h4>
      <Menu.Item key="0" icon={<WalletOutlined />}>
        <Link to="/cabinet/my-data">Cabinet</Link>
      </Menu.Item>
      {/* <Menu.Item key="1" icon={<SettingOutlined />}>
        <a href="/">Settings</a>
      </Menu.Item> */}
      <Menu.Divider />
      <Menu.Item key="2" icon={<ExportOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

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
