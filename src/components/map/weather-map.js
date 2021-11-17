import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "./weather-map.css";

const WeatherMap = ({ props }) => {
  return (
    <div className="map-container">
      <Map className="map" center={[24.3956, 0]} zoom={2}>
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
