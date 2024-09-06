import { FunctionComponent } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export interface Result {
  date: string;
  score: number;
}

interface PerformanceChartProps {
  histories: Result[];
}

const PerformanceChart: FunctionComponent<PerformanceChartProps> = ({
  histories,
}) => {
  console.log(histories.map((h) => h.score));
  const chartData = {
    labels: histories.map((h) => h.date),
    datasets: [
      {
        label: "Scores",
        data: histories.map((h) => h.score), // Your scores data
        fill: false,
        backgroundColor: "green",
        borderColor: "green",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 9,
        stepSize: 1,
        ticks: {
          stepSize: 1,
        },
        title: {
          display: true,
          text: "Scores",
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
    },
  };
  return <Line data={chartData} options={chartOptions} />;
};

export default PerformanceChart;
