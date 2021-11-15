import { Table, Tag, Space, Typography, message, Popconfirm } from "antd";
import { useState, useEffect } from "react";
import axiosInstance from "../../../common/axios";

const { Text, Link } = Typography;

const ListOfDeals = () => {
  const [statuses, setStatuses] = useState(null)
  const [data, setData] = useState()
  useEffect(() => {
    axiosInstance.get('orders/incoming').then(response => setData(response.data)).catch(err => console.log(err))
    axiosInstance.get('orders/statuses').then(response => setStatuses(response.data)).catch(err => console.log(err))
  }, [])

  const handleDelete = (key) => {
    const dataSource = [...data];
    setData(dataSource.filter((item) => item.order_id !== key));
  };
  const handleAccept = (id) => {
    const accepted = statuses.find(x => x.order_status === 'ACCPTD').order_status_id;
    axiosInstance.patch(`orders/${id}`, { order_status_id: accepted }).then(response => {
      handleDelete(id);
      message.success("Success, go to active deal");
    }).catch(err => console.log(err))
  };
  const handleDecline = (id) => {
    const declined = statuses.find(x => x.order_status === 'DECLINED').order_status_id;
    axiosInstance.patch(`orders/${id}`, { order_status_id: declined }).then(response => {
      handleDelete(id);
      message.success("Successfully declined");
    }).catch(err => console.log(err))

  };

  const columns = [
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Comment",
      dataIndex: "comment",
    },
    {
      title: "Priority",
      dataIndex: "is_high_priority",
      render: (is_high_priority) => (
        <Tag color={is_high_priority === false ? "green" : "volcano"} key={is_high_priority}>
          {is_high_priority === false ? "LOW" : "HIGH"}
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
            onClick={() => handleAccept(record.order_id)}
            className="list-of-deals-accept-text"
          >
            Accept
          </Text>
          {data.length >= 1 ? (
            <Popconfirm
              title="Sure to decline?"
              onConfirm={() => handleDecline(record.order_id)}
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
