import { Marker, Popup } from "react-leaflet";
import { Card, Avatar, Popover, Input, Row, Col } from "antd";
import { InfoCircleOutlined, SendOutlined } from "@ant-design/icons";
import { useState } from "react";
import CommentInput from "./CommentInput";

const { Meta } = Card;
const { TextArea } = Input;

const CustomMarker = (props) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Marker position={props.pos}>
        <Popup>
          <Card
            actions={[
              <Popover
                placement="leftBottom"
                title={"Comment to order"}
                content={
                  <CommentInput handleOrder={props.handleOrder} id={props.id} />
                }
                trigger="click"
                visible={visible}
                onVisibleChange={setVisible}
              >
                <SendOutlined key="order" />
              </Popover>,
              <InfoCircleOutlined
                key="info"
                onClick={() => props.handleInfo(props.id)}
              />,
            ]}
          >
            <Meta
              title="Test"
              description={props.text.slice(0, 150) + "..."}
              avatar={
                <Avatar src="https://pbs.twimg.com/profile_images/897250392022540288/W1T-QjML_400x400.jpg" />
              }
            />
          </Card>
        </Popup>
      </Marker>
    </>
  );
};

export default CustomMarker;
