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
        <Popup style={{ width: '5rem' }}>
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
              title="Performer"
              description={<p>Username: {props.username} &nbsp;</p>}
              avatar={
                <Avatar src={props.avatar} />
              }
            />
          </Card>
        </Popup>
      </Marker>
    </>
  );
};

export default CustomMarker;
