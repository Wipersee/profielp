import { Table, Empty } from "antd";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axiosInstance from "../../../common/axios";

const ActiveDeal = () => {
  const [data, setData] = useState([]);

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
            <Marker position={getCoordinates(data)}></Marker>
          </MapContainer>
        </>
      ) : (
        <Empty description="No active deals, go to list of deals and choose one" />
      )}
    </div>
  );
};

export default ActiveDeal;
