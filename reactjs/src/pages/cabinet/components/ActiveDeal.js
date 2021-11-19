import { Table, Empty, Typography, Drawer, Form, Input, Button } from "antd";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axiosInstance from "../../../common/axios";
import { useSelector } from "react-redux";

const ActiveDeal = () => {
  const [data, setData] = useState([]);
  const [visible, setVisibe] = useState(false)
  const { id } = useSelector((state) => state.userReducer);

  const getCoordinates = (data) => {
    if (data.length > 0) {
      return [data[0].latitude, data[0].longitude]
    }
    return [0, 0]
  }

  useEffect(() => {
    axiosInstance.get('orders/current').then(response => setData(response.data)).catch(err => console.log(err))
  }, [])

  const columns = [
    {
      title: "Username",
      dataIndex: ["user", 'username'],
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Phone",
      dataIndex: ["user", 'phone_number'],
    },
    {
      title: "Email",
      dataIndex: ["user", 'email'],
    },
    {
      title: "Comment",
      dataIndex: "comment",
    },
    {
      title: "Complaint",
      key: "complaint",
      render: (
        text,
        record //TODO: write onClick actions, API REQUEST to server
      ) => (
        <Typography.Text type="danger" onClick={() => setVisibe(true)} >
          Complaint
        </Typography.Text>
      ),
    },
  ];
  const onFinish = (val) => {
    axiosInstance.post('orders/complaint', {
      comment: val.comment,
      requester_id: id,
      order_id: data[0].order_id,
    }).then(response => console.log(response)).catch(err => console.log(err))
  }

  return (
    <div>
      {data.length > 0 ? (
        <>
          <Table columns={columns} dataSource={data} />
          <MapContainer
            center={[50.450001, 30.523333]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "20rem" }}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={getCoordinates(data)}></Marker>
          </MapContainer>
        </>
      ) : (
        <Empty description="No active deals, go to list of deals and choose one" />
      )}
      <Drawer
        title="Compaint on this user"
        width={320}
        onClose={() => setVisibe(false)}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form layout="vertical" hideRequiredMark onFinish={onFinish}>
          <Form.Item
            name="comment"
            label="Comment"
            rules={[{ required: true, message: 'Please enter short comment' }]}
          >
            <Input.TextArea showCount maxLength={400} placeholder="Please enter short comment" />
          </Form.Item>
          <Form.Item >
            <Button htmlType="submit">
              Complaint
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default ActiveDeal;
