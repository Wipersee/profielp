import { Drawer, Descriptions, Divider, List, Tooltip } from "antd";
import "./../css/customdrawer.css";
import CustomComment from "../../../common/CustomComment";
import moment from "moment";

const data = [
  {
    author: "Han Solo",
    avatar: "https://joeschmoe.io/api/v1/random",
    content: (
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure), to help people create their
        product prototypes beautifully and efficiently.
      </p>
    ),
    datetime: (
      <Tooltip
        title={moment().subtract(1, "days").format("YYYY-MM-DD HH:mm:ss")}
      >
        <span>{moment().subtract(1, "days").fromNow()}</span>
      </Tooltip>
    ),
  },
  {
    author: "Han Solo",
    avatar: "https://joeschmoe.io/api/v1/random",
    content: (
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure), to help people create their
        product prototypes beautifully and efficiently.
      </p>
    ),
    datetime: (
      <Tooltip
        title={moment().subtract(2, "days").format("YYYY-MM-DD HH:mm:ss")}
      >
        <span>{moment().subtract(2, "days").fromNow()}</span>
      </Tooltip>
    ),
  },
];

const CustomDrawer = (props) => {
  const { performer } = props;
  return (
    <Drawer
      title={`Info about master ${performer.id}`}
      placement="right"
      visible={props.visible}
      onClose={() => props.setVisible(false)}
    >
      <Descriptions title="User Info" layout="vertical">
        <Descriptions.Item label="Name">{performer.name}</Descriptions.Item>
        <Descriptions.Item label="Surname">
          {performer.surname}
        </Descriptions.Item>
        <Descriptions.Item label="Description" span={2}>
          {performer.description}
        </Descriptions.Item>
      </Descriptions>
      {/* <Divider />
      <div className="drawer-comments-div">
        <h4>Comments:</h4>
        <List
          className="comment-list"
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <li>
              <CustomComment
                author={item.author}
                avatar={item.avatar}
                content={item.content}
                datetime={item.datetime}
              />
            </li>
          )}
        />
      </div> */}
    </Drawer>
  );
};

export default CustomDrawer;
