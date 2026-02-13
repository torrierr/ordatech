import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function Progress({ userId }) {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    fetchPoints();
  }, []);

  const fetchPoints = async () => {
    const { data } = await supabase
      .from("users")
      .select("eco_points")
      .eq("id", userId)
      .single();

    setPoints(data?.eco_points || 0);
  };

  const level =
    points < 100
      ? "Эко-Новичок"
      : points < 300
      ? "Эко-Герой"
      : "Эко-Супергерой";

  return (
    <div>
      <h3>Баланс: {points} 💚</h3>
      <h4>Уровень: {level}</h4>
      <progress value={points} max="300" />
    </div>
  );
}
