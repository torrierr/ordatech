import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data } = await supabase
      .from("users")
      .select("email, eco_points")
      .order("eco_points", { ascending: false })
      .limit(5);

    setUsers(data);
  };

  return (
    <div>
      <h3>Топ Эко-Героев</h3>
      {users.map((u, i) => (
        <p key={i}>
          {i + 1}. {u.email} — {u.eco_points} 💚
        </p>
      ))}
    </div>
  );
}