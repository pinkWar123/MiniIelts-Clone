import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const QuestionProportionPieChart = () => {
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
        label: "Question Type Distribution",
        data: [10, 15, 20, 5, 10, 10, 15, 15], // Adjust the values based on your data
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(201, 203, 207, 0.6)",
          "rgba(255, 99, 255, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(201, 203, 207, 1)",
          "rgba(255, 99, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    // responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
      title: {
        display: true,
        text: "Question Type Distribution",
      },
    },
  };

  return <Pie data={data} options={options} width={250} />;
};

export default QuestionProportionPieChart;
