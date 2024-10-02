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
import { useEffect, useState } from "react";
import { getQuestionAccuracies } from "../../../services/statistic";
import { Accuracy } from "../../../types/Responses/statistic";
import { convertQuestionTypeEnumToDescription } from "../../../helpers/convertQuestionType";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AccuracyBarChart = () => {
  const [stat, setStat] = useState<Accuracy>();
  useEffect(() => {
    const fetchStat = async () => {
      const res = await getQuestionAccuracies();
      setStat(res.data);
    };
    fetchStat();
  }, []);
  const data = {
    labels: stat?.questionAccuracies.map((q) =>
      convertQuestionTypeEnumToDescription(q.questionType)
    ),

    datasets: [
      {
        label: "Accuracy (%)",
        data: stat?.questionAccuracies.map((q) => q.accuracy * 100), // Sample accuracy data
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
        text: "Accuracy of Each Question Type",
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
  console.log(stat);

  return <Bar data={data} options={options} height={300} />;
};

export default AccuracyBarChart;
