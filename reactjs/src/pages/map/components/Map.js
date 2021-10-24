import { useEffect, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import CustomMarker from './CustomMarker'


const Map = () => {

    const data = [{id:1, pos:[50.450001, 30.523333], text:'With over years of experience in offering plumbing service, boiler installation and repair services in and across London, PhoneAPlumber is proud to offer professional and reliable plumbing service in London. At PhoneAPlumber, we cover domestic as well as commercial plumbing services, gas boiler repairs, central heating and boiler installation at a cost-effective price. All our services are competitively priced, without any hidden charges or fees. Thus, offering you great value for money. We are also gas safe registered. Each repair we do, comes with a warranty of a year (12 months), giving you complete assurance. Our team of skilled gas engineers and plumbers are qualified to carry out all engineering and plumbing services. No matter what type of problem you have we are happy to assist you. Call us now to arrange a visit or request a quote.'}];


    return  <MapContainer center={[50.450001, 30.523333]} zoom={13} scrollWheelZoom={true} style={{height:'100vh', zIndex:'1'}} zoomControl={false}>
    <TileLayer
      attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {data.map(({id, pos, text}) => <CustomMarker key={id} pos={pos} text={text} />)}
  </MapContainer>
}

export default Map;