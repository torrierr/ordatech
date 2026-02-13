import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement);

export default function Stats() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchStats();

    const channel = supabase
      .channel("realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "recycling_logs" },
        () => fetchStats()
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const fetchStats = async () => {
    const { data } = await supabase
      .from("recycling_logs")
      .select("waste_type, weight");

    const grouped = {};
    data?.forEach((item) => {
      if (!grouped[item.waste_type]) grouped[item.waste_type] = 0;
      grouped[item.waste_type] += item.weight;
    });

    setStats(grouped);
  };

  const chartData = {
    labels: Object.keys(stats),
    datasets: [
      { label: "Кг утилизации", data: Object.values(stats) },
    ],
  };

  return <Bar data={chartData} />;
}