import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import { cityCoordinates } from '../utils/cityCoordinates';

const customIcon = new L.Icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  shadowSize: [41, 41]
});

const GeoDistributionMap = () => {
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/customers/geo-distribution`);
        setCustomerData(response.data);
      } catch (error) {
        console.error('Error fetching geographical distribution data:', error);
      }
    };

    fetchData();
  }, []);

  const markers = customerData.map((entry) => {
    const coordinates = cityCoordinates[entry._id];
    return {
      position: coordinates ? [coordinates.lat, coordinates.lng] : [0, 0],
      city: entry._id,
      count: entry.count
    };
  });

  const mapCenter = [37.0902, -95.7129];
  const zoomLevel = 4;

  return (
    <MapContainer 
      center={mapCenter} 
      zoom={zoomLevel} 
      scrollWheelZoom={true}  
      dragging={true}         
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position} icon={customIcon}>
          <Popup>
            {marker.city}<br />Number of Customers: {marker.count}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default GeoDistributionMap;
