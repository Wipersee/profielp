import { Marker, Popup } from "react-leaflet";
import { Card, Avatar } from "antd";
import { InfoCircleOutlined, SendOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Meta } = Card;

const CustomMarker = (props) => {
  return (
    <>
      <Marker position={props.pos}>
        <Popup>
          <Card
            actions={[
              <SendOutlined
                key="order"
                onClick={() => props.handleOrder(props.id)}
              />,
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
