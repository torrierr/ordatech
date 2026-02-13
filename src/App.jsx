import Map from "./components/Map";
import Stats from "./components/Stats";
import Progress from "./components/Progress";
import Leaderboard from "./components/Leaderboard";
import Chat from "./components/Chat";
import Partners from "./components/Partners";

function App() {
  const userId = "USER_ID_FROM_SUPABASE";

  return (
    <div>
      <h1>EcoSmart Almaty</h1>
      <Map />
      <Progress userId={userId} />
      <Stats />
      <Leaderboard />
      <Partners />
      <Chat />
    </div>
  );
}

export default App;