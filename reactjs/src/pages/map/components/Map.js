import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from "react-leaflet";
import CustomMarker from "./CustomMarker";
import CustomDrawer from "./CustomDrawer";
import { message } from "antd";
import axiosInstance from "../../../common/axios";
import { useSelector, useDispatch } from "react-redux";

// function LocationMarker() {
//   const [position, setPosition] = useState(null)
//   const map = useMapEvents({
//     click() {
//       map.locate()
//     },
//     locationfound(e) {
//       setPosition(e.latlng)
//       map.flyTo(e.latlng, map.getZoom())
//     },
//   })

//   return position === null ? null : (
//     <Marker position={position}>
//       <Popup>You are here</Popup>
//     </Marker>
//   )
// }
const data = [
  {
    id: 1,
    pos: [50.450001, 30.523333],
    text: "With over years of experience in offering plumbing service, boiler installation and repair services in and across London, PhoneAPlumber is proud to offer professional and reliable plumbing service in London. At PhoneAPlumber, we cover domestic as well as commercial plumbing services, gas boiler repairs, central heating and boiler installation at a cost-effective price. All our services are competitively priced, without any hidden charges or fees. Thus, offering you great value for money. We are also gas safe registered. Each repair we do, comes with a warranty of a year (12 months), giving you complete assurance. Our team of skilled gas engineers and plumbers are qualified to carry out all engineering and plumbing services. No matter what type of problem you have we are happy to assist you. Call us now to arrange a visit or request a quote.",
  },
];

const Map = () => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false);
  const [performer, setPerformer] = useState({ id: '' })
  const [performers, setPerformers] = useState([])

  useEffect(() => {
    axiosInstance.get("users/performers").then(response => {
      setPerformers(response.data)
      dispatch({ action: 'SET_PERFORMERS', payload: response.data })
      console.log(response.data)
    }).catch(err => console.log(err))
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

  return (
    <>
      {" "}
      <MapContainer
        center={[50.450001, 30.523333]}
        zoom={13}
        easeLinearity={0.35}
        scrollWheelZoom={true}
        style={{ height: "100vh", zIndex: "1" }}
        zoomControl={false}
      // onclick={addMarker}
      >
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {console.log(performers.length)}
        {performers.length !== 0 ? performers.map(({ id, username, latitude, longitude }) => (
          <CustomMarker
            key={id}
            id={id}
            username={username}
            pos={[latitude, longitude]}
            handleOrder={handleOrder}
            handleInfo={handleInfo}
          />
        )) : <></>}
      </MapContainer>
      <CustomDrawer
        visible={visible}
        setVisible={setVisible}
        performer={performer}
      />
    </>
  );
};

export default Map;
