import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid, CardActionArea, Button } from "@mui/material";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useSpring, animated } from "react-spring";
import "../GSTScreens.css";

// Hardcoded data
const barChartData = [
  { name: "Product A", stock: 400 },
  { name: "Product B", stock: 300 },
  { name: "Product C", stock: 200 },
  { name: "Product D", stock: 278 },
  { name: "Product E", stock: 189 },
];

const pieChartData = [
  { name: "Product A", value: 400 },
  { name: "Product B", value: 300 },
  { name: "Product C", value: 200 },
];

const mapData = [
  { id: 1, name: "Warehouse A", lat: 51.505, lon: -0.09 },
  { id: 2, name: "Warehouse B", lat: 51.515, lon: -0.1 },
  { id: 3, name: "Warehouse C", lat: 51.525, lon: -0.11 },
];

const Stock = () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Get current location using the browser's Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    }
  }, []);

  // Adding animation to cards
  const fade = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <div className="product-stock-container">
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Product Stock Overview
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {/* Bar Chart Card */}
        <Grid item xs={12} md={5}>
          <Card className="product-card" sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Product Stock Bar Chart
              </Typography>
              <BarChart width={500} height={300} data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="stock" fill="#FF6347" />
              </BarChart>
            </CardContent>
          </Card>
        </Grid>

        {/* Pie Chart Card */}
        <Grid item xs={12} md={5}>
          <Card className="product-card" sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Product Distribution Pie Chart
              </Typography>
              <PieChart width={400} height={400}>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  fill="#82ca9d"
                  label
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#8884d8" : "#FF6347"} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </CardContent>
          </Card>
        </Grid>

        {/* Map Card */}
        <Grid item xs={12}>
          <Card className="product-card" sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Product Warehouse Locations
              </Typography>
              <div style={{ height: "400px", width: "100%" }}>
                <MapContainer
                  center={[51.505, -0.09]} // Default location if user's location is not available
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {userLocation && (
                    <Marker position={[userLocation.lat, userLocation.lon]}>
                      <Popup>Your Location</Popup>
                    </Marker>
                  )}
                  {mapData.map((location) => (
                    <Marker
                      key={location.id}
                      position={[location.lat, location.lon]}
                      icon={new L.Icon({ iconUrl: "/path/to/marker-icon.png", iconSize: [25, 41], iconAnchor: [12, 41] })}
                    >
                      <Popup>{location.name}</Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Stock;
