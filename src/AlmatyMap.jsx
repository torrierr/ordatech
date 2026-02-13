"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import { supabase } from "./lib/lib/supabase";

// Исправление иконки маркера (Leaflet иногда теряет пути к картинкам в Next.js)
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const center = [43.238949, 76.889709]; // Координаты Алматы

export default function AlmatyMap() {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    async function fetchPoints() {
      const { data, error } = await supabase.from("locations").select("*");
      if (!error && data) setPoints(data);
    }
    fetchPoints();
  }, []);

  return (
    <div style={{ height: "500px", width: "100%", borderRadius: "12px", overflow: "hidden" }}>
      <MapContainer center={center} zoom={12} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points.map((point) => (
          <Marker key={point.id} position={[point.lat, point.lng]} icon={icon}>
            <Popup>
              <strong>{point.name}</strong> <br />
              {point.description || "Эко-точка"}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}