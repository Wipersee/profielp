import React, { Component } from 'react';
import { render } from "react-dom";
import { Calendar } from 'antd';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const App = () => {
    return <div style={{minHeight:'100vh', minWidth:'100vw', margin:'0 auto'}}>
     <MapContainer center={[24.88,55]} zoom={8} style={{minHeight:'100vh', minWidth:'100vw'}} animate={true}>
            <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution=''
            />
        </MapContainer>
    </div>
}

export default App;

const container = document.getElementById("app");
render(<App />, container);