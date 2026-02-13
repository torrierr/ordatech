import AlmatyMap from "../AlmatyMap";
import CityStats from "../CityStats";

export default function Page() {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>EcoSmart Almaty</h1>
      <AlmatyMap />
      <CityStats />
    </div>
  );
}