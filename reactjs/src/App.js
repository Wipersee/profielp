import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const App = () => {
  return <MapContainer center={[50.450001, 30.523333]} zoom={13} scrollWheelZoom={true} style={{height:'100vh', zIndex:'1'}}>
  <TileLayer
    attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[50.450001, 30.523333]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
}

export default App;
