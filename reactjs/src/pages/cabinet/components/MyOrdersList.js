import React from "react";
import { List, Avatar, Space } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";

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
      dataSource={listData}
      renderItem={(item) => (
        <List.Item
          key={item.title}
          extra={<img width={272} alt="logo" src={item.image} />}
        >
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={<a href={item.href}>{item.title}</a>}
            description={item.description}
          />
          {item.content}
        </List.Item>
      )}
    />
  );
};
export default MyOrdersList;
