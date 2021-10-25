import { Table, Empty } from "antd";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const ActiveDeal = () => {
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
  ]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
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
  ];

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
            <Marker position={[50.450001, 30.523333]}></Marker>
          </MapContainer>
        </>
      ) : (
        <Empty description="No active deals, go to list of deals and choose one" />
      )}
    </div>
  );
};

export default ActiveDeal;
