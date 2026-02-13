import AlmatyMap from "./components/AlmatyMap";
import CityStats from "./components/CityStats";

export default function Page() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>EcoSmart Almaty</h1>
      <AlmatyMap />
      <CityStats />
    </div>
  );
}