import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

const WeatherMap = ({ props }) => {
  return (
    <div>
      <Map center={[123, -47]} zoom={5}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    </div>
  );
};

export default WeatherMap;
