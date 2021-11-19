import React from "react";
import { List, Avatar, Tag } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import axiosInstance from "../../../common/axios";
import { useState, useEffect } from "react";
import moment from "moment";

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    image: `https://picsum.photos/250`,
    href: "https://ant.design",
    title: `Order number ${i}`,
    avatar: "https://joeschmoe.io/api/v1/random",
    description: "Order for plumber",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  });
}

const MyOrdersList = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    axiosInstance.get('orders/list').then(response => setData(response.data)).catch(err => console.log(err))
  }, [])

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 2,
      }}
      dataSource={data}
      renderItem={(item, idx) => (
        <List.Item
          key={idx}
          extra={
            <img
              width={272}
              alt="logo"
              src={"https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"}
            />
          }
        >
          <List.Item.Meta
            description={item.user.username}
            title={moment(item.date).format('MMMM Do YYYY, h:mm')}
          />
          <b>Comment </b>: {item.comment} <br /><br />

          <b>Address </b> : &nbsp;&nbsp; {item.address}&nbsp;&nbsp;&nbsp;
          <b>Priority </b>:&nbsp;&nbsp;&nbsp;<Tag color={item.is_high_priority === false ? "green" : "volcano"} key={item.is_high_priority}>
            {item.is_high_priority === false ? "LOW" : "HIGH"}
          </Tag>
        </List.Item>
      )}
    />
  );
};
export default MyOrdersList;
