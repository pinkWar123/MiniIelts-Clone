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
  ChartData,
} from "chart.js";

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
  const [data, setData] = useState<ChartData<"bar", number[], string>>({
    labels: [],
    datasets: [],
  });

  // Function to generate random fake IELTS scores
  const generateRandomIeltsScores = (numTestTakers: number) => {
    const scoreSteps = [
      0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9,
    ];
    return Array.from({ length: numTestTakers }, () => {
      const randomIndex = Math.floor(Math.random() * scoreSteps.length);
      return scoreSteps[randomIndex];
    });
  };

  // Function to group scores into bins
  const groupScores = (scores: number[]) => {
    const bins = {
      "0-0.5": 0,
      "1-1.5": 0,
      "2-2.5": 0,
      "3-3.5": 0,
      "4-4.5": 0,
      "5-5.5": 0,
      "6-6.5": 0,
      "7-7.5": 0,
      "8-8.5": 0,
      "9": 0,
    };

    scores.forEach((score) => {
      if (score >= 0 && score <= 0.5) bins["0-0.5"]++;
      else if (score > 0.5 && score <= 1.5) bins["1-1.5"]++;
      else if (score > 1.5 && score <= 2.5) bins["2-2.5"]++;
      else if (score > 2.5 && score <= 3.5) bins["3-3.5"]++;
      else if (score > 3.5 && score <= 4.5) bins["4-4.5"]++;
      else if (score > 4.5 && score <= 5.5) bins["5-5.5"]++;
      else if (score > 5.5 && score <= 6.5) bins["6-6.5"]++;
      else if (score > 6.5 && score <= 7.5) bins["7-7.5"]++;
      else if (score > 7.5 && score <= 8.5) bins["8-8.5"]++;
      else if (score === 9) bins["9"]++;
    });

    return bins;
  };

  // Prepare chart data when the component is first mounted
  useEffect(() => {
    // Generate random IELTS scores for 500 test takers between 0 and 9
    const randomScores = generateRandomIeltsScores(500);

    // Group scores into bins based on IELTS bands
    const groupedScores = groupScores(randomScores);

    // Prepare data for the chart
    setData({
      labels: Object.keys(groupedScores), // e.g., '0-0.5', '1-1.5'
      datasets: [
        {
          label: "Number of Test Takers",
          data: Object.values(groupedScores), // Frequency of scores in each bin
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "IELTS Score Distribution of Test Takers",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Test Takers",
        },
      },
      x: {
        title: {
          display: true,
          text: "IELTS Score Ranges",
        },
      },
    },
  };

  return <Bar data={data} options={options} height={300} />;
};

export default ScoreDistributionChart;
