import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from "react-leaflet";
import CustomMarker from "./CustomMarker";
import CustomDrawer from "./CustomDrawer";
import { message } from "antd";
import axiosInstance from "../../../common/axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../../../common/fetchData";
import CustomMeMarker from './CustomMeMurker'


function LocationMarker() {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng)
      // map.flyTo(e.latlng, map.getZoom())
    },
  })
  useEffect(() => map.locate(), [])
  return position === null ? null : (
    <CustomMeMarker position={position} />
  )
}

const Map = () => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false);


  useEffect(() => {
    // axiosInstance.get("users/performers").then(response => {
    //   setPerformers(response.data)
    //   console.log(response.data)
    // }).catch(err => console.log(err))
    dispatch(
      fetchData("/users/performers", "PERFORMERS")
    );
  }, [])


  const handleInfo = (id) => {
    axiosInstance.get(`users/performers/${id}`).then(response => {
      setPerformer(response.data)
      setVisible(true)
    }).catch(err => console.log(err))
  };
  const handleOrder = (id, comment) => {
    //TODO: need to make logic of blocked requests, e.g. when it's already one order => no access to order new one
    message
      .loading("Action in progress..", 2.5)
      .then(() =>
        message.success(
          `Master ${id} received your apply, please wait for approve ${comment}`,
          2.5
        )
      );
  };
  const addMarker = (e) => {
    console.log(e)
  }
  return (
    <>
      <MapContainer
        center={[50.450001, 30.523333]}
        zoom={13}
        easeLinearity={0.35}
        scrollWheelZoom={true}
        style={{ height: "100vh", zIndex: "1" }}
        zoomControl={false}
        onclick={addMarker}
      >
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.length !== 0 ? data.map(({ id, username, latitude, longitude, avatar }) => (
          <CustomMarker
            key={id}
            id={id}
            username={username}
            pos={[latitude, longitude]}
            avatar={avatar}
            handleOrder={handleOrder}
            handleInfo={handleInfo}
          />
        )) : <></>
        }
        <LocationMarker />
      </MapContainer >
      <CustomDrawer
        visible={visible}
        setVisible={setVisible}
        performer={performer}
      />
    </>
  );
};

export default Map;
