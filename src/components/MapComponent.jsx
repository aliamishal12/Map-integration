// import React, { useState } from 'react';
// import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// // Create a custom marker icon
// const locationIcon = new L.Icon({
//   iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
//   iconSize: [32, 32],
//   iconAnchor: [16, 32],
// });

// const CustomMap = () => {
//   // State for map center, circle radius
//   const [center, setCenter] = useState([51.505, -0.09]);
//   const [circleRadius, setCircleRadius] = useState(150);
//   const [inputRadius, setInputRadius] = useState('');

//   // Handle input field for circle size
//   const handleInputChange = (e) => {
//     setInputRadius(e.target.value);
//   };

//   // Handle button click to set circle size
//   const handleSetCircleSize = () => {
//     if (!isNaN(inputRadius) && inputRadius > 0) {
//       setCircleRadius(Number(inputRadius));
//     } else {
//       alert('Please enter a valid number');
//     }
//   };

//   // Handle marker drag end event
//   const handleMarkerDragEnd = (event) => {
//     const { lat, lng } = event.target.getLatLng();
//     setCenter([lat, lng]);
//   };

//   return (
//     <div>
//       <h2>Interactive Map with Custom Marker and Dynamic Circle</h2>
//       <div style={{ marginBottom: '10px' }}>
//         <label>Enter Circle Radius (meters): </label>
//         <input
//           type="number"
//           value={inputRadius}
//           onChange={handleInputChange}
//           style={{ marginRight: '10px' }}
//         />
//         <button
//           onClick={handleSetCircleSize}
//           style={{ padding: '5px 10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' }}
//         >
//           Set Circle Size
//         </button>
//       </div>
//       <MapContainer center={center} zoom={13} style={{ height: '500px', width: '100%' }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <Circle center={center} radius={circleRadius} color="blue" />
//         <Marker
//           position={center}
//           icon={locationIcon}
//           draggable={true}
//           eventHandlers={{
//             dragend: handleMarkerDragEnd,
//           }}
//         />
//       </MapContainer>
//     </div>
//   );
// };

// export default CustomMap;


import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Create dynamic marker icons
const locationIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});
const anotherIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684910.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const MapComponent = () => {
  // State for map center, circle radii, markers
  const [center, setCenter] = useState([51.505, -0.09]);
  const [circleRadii, setCircleRadii] = useState([150]); // Array for multiple circles
  const [inputRadius, setInputRadius] = useState('');
  const [markers, setMarkers] = useState([
    { position: [51.51, -0.1], icon: locationIcon },
  ]);

  // Handle input field for circle size
  const handleInputChange = (e) => {
    setInputRadius(e.target.value);
  };

  // Handle button click to set circle size
  const handleAddCircle = () => {
    if (!isNaN(inputRadius) && inputRadius > 0) {
      setCircleRadii([...circleRadii, Number(inputRadius)]);
      setInputRadius('');
    } else {
      alert('Please enter a valid number');
    }
  };

  // Handle marker drag end event
  const handleMarkerDragEnd = (event) => {
    const { lat, lng } = event.target.getLatLng();
    setCenter([lat, lng]);
    setMarkers(
      markers.map((marker) => ({
        ...marker,
        position: [lat + Math.random() * 0.01, lng + Math.random() * 0.01],
      }))
    );
  };

  // Handle adding a new marker
  const handleAddMarker = () => {
    const newMarker = {
      position: [center[0] + Math.random() * 0.01, center[1] + Math.random() * 0.01],
      icon: Math.random() > 0.5 ? locationIcon : anotherIcon,
    };
    setMarkers([...markers, newMarker]);
  };

  return (
    <div>
      <h2>Interactive Map with Custom Markers and Multiple Circles</h2>
      <div style={{ marginBottom: '10px' }}>
        <label>Enter Circle Radius (meters): </label>
        <input
          type="number"
          value={inputRadius}
          onChange={handleInputChange}
          style={{ marginRight: '10px' }}
        />
        <button
          onClick={handleAddCircle}
          style={{ padding: '5px 10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Add Circle
        </button>
        <button
          onClick={handleAddMarker}
          style={{ padding: '5px 10px', backgroundColor: '#28A745', color: 'white', border: 'none', borderRadius: '5px', marginLeft: '10px' }}
        >
          Add Marker
        </button>
      </div>
      <MapContainer center={center} zoom={13} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          position={center}
          icon={locationIcon}
          draggable={true}
          eventHandlers={{
            dragend: handleMarkerDragEnd,
          }}
        />
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            icon={marker.icon}
          />
        ))}
        {circleRadii.map((radius, index) => (
          <Circle key={index} center={center} radius={radius} color="blue" />
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;

