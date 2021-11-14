import React from 'react'
import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';
import { Marker, Popup } from 'react-leaflet'
import { HomeOutlined } from "@ant-design/icons";

const CustomMeMarker = (props) => {
    const icon = L.divIcon({
        html: ReactDOMServer.renderToString(<HomeOutlined style={{ fontSize: '2rem' }} />),
        className: 'custom-icon',
    });
    return <Marker position={props.position} icon={icon}>
        <Popup >
            You are here
        </Popup>
    </Marker>
}

export default CustomMeMarker;