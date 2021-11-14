import { Drawer, Row, Col, Tooltip } from "antd";
import "./../css/customdrawer.css";
import CustomComment from "../../../common/CustomComment";
import moment from "moment";

const data = [ //for comments 
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

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    <b>{content || 'No info'}</b>
  </div>
);

const CustomDrawer = (props) => {
  const { performer } = props;
  console.log(props)
  return (
    <Drawer
      title={`Info about master ${performer.username}`}
      placement="right"
      visible={props.visible}
      onClose={() => props.setVisible(false)}
    >
      <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
        User Profile
      </p>
      <p className="site-description-item-profile-p">Personal</p>
      <Row>
        <Col span={12}>
          <DescriptionItem title="First name" content={performer.first_name} />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Last name" content={performer.last_name} />
        </Col>
      </Row>

      <p className="site-description-item-profile-p">Work</p>
      <Row>
        <Col span={12}>
          <DescriptionItem title="Price per hour" content={(performer.avg_price_per_hour || "No info") + '  ₴'} />
        </Col>
        <Col span={12}>
          <DescriptionItem title="On site" content={performer.on_site === 0 ? '1 days' : performer.on_site + 'days'} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem title="Specialization" content={performer.specialization.performer_specialization} />
        </Col>
      </Row>
      <p className="site-description-item-profile-p">Short description</p>
      <Row>
        <Col span={24}>
          <p>{performer.description}</p>
        </Col>
      </Row>
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
