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
  // Data for accuracy of each question type
  const data = {
    labels: [
      "Matching Headings",
      "Matching Information",
      "Multiple Choice",
      "Labelling",
      "Sentence Completion",
      "Summary Completion",
      "TFNG",
      "YNNG",
    ],
    datasets: [
      {
        label: "Accuracy (%)",
        data: [85, 78, 92, 60, 70, 65, 88, 76], // Sample accuracy data
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

  return <Bar data={data} options={options} height={300} />;
};

export default AccuracyBarChart;
