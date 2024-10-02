import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ScoreDistribution } from "../../../types/Responses/statistic";
import { getScoreDistribution } from "../../../services/statistic";

// Register components required for Bar Chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ScoreDistributionChart = () => {
  const [stat, setStat] = useState<ScoreDistribution>();
  useEffect(() => {
    const fetchStat = async () => {
      const res = await getScoreDistribution();
      setStat(res.data);
    };
    fetchStat();
  }, []);
  const data = {
    labels: stat?.scoreDistributionDetails.map(
      (q) => `${q.floorScore}-${q.floorScore + 1}`
    ),

    datasets: [
      {
        label: "Number of test takers ",
        data: stat?.scoreDistributionDetails.map((q) => q.number), // Sample accuracy data
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Bar color
        borderColor: "rgba(75, 192, 192, 1)", // Border color
        borderWidth: 1,
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Band score distribution",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10, // Step size for Y-axis
        },
      },
    },
  };

  return <Bar data={data} options={options} height={300} />;
};

export default ScoreDistributionChart;
