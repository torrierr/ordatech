import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";

const center = {
  lat: 43.238949,
  lng: 76.889709,
};

const containerStyle = {
  width: "100%",
  height: "80vh",
};

const getIcon = (type) => {
  switch (type) {
    case "mini":
      return "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
    case "standard":
      return "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
    case "pro":
      return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
    default:
      return null;
  }
};

export default function AlmatyMap() {
  const [boxes, setBoxes] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchBoxes();

    const channel = supabase
      .channel("realtime eco_boxes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "eco_boxes" },
        () => fetchBoxes()
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const fetchBoxes = async () => {
    const { data } = await supabase.from("eco_boxes").select("*");
    setBoxes(data || []);
  };

  const filtered =
    filter === "all"
      ? boxes
      : boxes.filter((box) => box.type === filter);

  return (
    <div>
      <div style={{ textAlign: "center", padding: 10 }}>
        <button onClick={() => setFilter("all")}>Все</button>
        <button onClick={() => setFilter("mini")}>Mini</button>
        <button onClick={() => setFilter("standard")}>Standard</button>
        <button onClick={() => setFilter("pro")}>Pro</button>
      </div>

      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_KEY">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
        >
          {filtered.map((box) => (
            <Marker
              key={box.id}
              position={{ lat: box.lat, lng: box.lng }}
              icon={getIcon(box.type)}
              title={box.name}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}