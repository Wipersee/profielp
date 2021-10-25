import { Table, Tag, Space, Typography, message, Popconfirm } from "antd";
import { useState } from "react";

const { Text, Link } = Typography;

const ListOfDeals = () => {
  const [data, setData] = useState([
    {
      key: "1",
      name: "John Brown",
      price: 1000,
      address: "New York No. 1 Lake Park",
      phone: "0969024721",
      comment: "Need a plumber",
      priority: 0,
    },
    {
      key: "2",
      name: "Jim Green",
      price: 500,
      address: "London No. 1 Lake Park",
      phone: "0969024721",
      comment: "",
      priority: 1,
    },
    {
      key: "3",
      name: "Joe Black",
      price: 2900,
      address: "Sidney No. 1 Lake Park",
      phone: "0969028221",
      comment: "...",
      priority: 0,
    },
    {
      key: "4",
      name: "John Brown",
      price: 4500,
      address: "Kyiv, Chreshatik 1",
      phone: "0969024721",
      comment: "$$$",
      priority: 1,
    },
  ]);
  const handleDelete = (key) => {
    const dataSource = [...data];
    setData(dataSource.filter((item) => item.key !== key));
  };
  const handleAccept = (id) => {
    //TODO: need to make redirect to active orders
    message.success("Success, please phone to customer");
  };
  const handleDecline = (id) => {
    handleDelete(id);
    message.success("Successfully deleted");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Price",
      dataIndex: "price",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Comment",
      dataIndex: "comment",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      render: (priority) => (
        <Tag color={priority === 0 ? "green" : "volcano"} key={priority}>
          {priority === 0 ? "LOW" : "HIGH"}
        </Tag>
      ),
      filters: [
        {
          text: "HIGH",
          value: 1,
        },
        {
          text: "LOW",
          value: 0,
        },
      ],
      onFilter: (value, record) => record.priority === value,
    },
    {
      title: "Action",
      key: "action",
      render: (
        text,
        record //TODO: write onClick actions, API REQUEST to server
      ) => (
        <Space size="middle">
          <Text
            type="success"
            onClick={() => handleAccept(record.key)}
            className="list-of-deals-accept-text"
          >
            Accept
          </Text>
          {data.length >= 1 ? (
            <Popconfirm
              title="Sure to decline?"
              onConfirm={() => handleDecline(record.key)}
            >
              <Text type="danger" className="list-of-deals-decline-text">
                Decline
              </Text>
            </Popconfirm>
          ) : null}
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default ListOfDeals;
