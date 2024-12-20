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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  lineDataKey: Array<string>;
  lineDataValue: Array<number>;
}

const LineChart = ({ lineDataKey, lineDataValue }: LineChartProps) => {
  const labels = lineDataKey;

  const data = {
    labels: labels,
    datasets: [
      {
        label: "검색건수",
        data: lineDataValue,
        backgroundColor: "#0CD3FF",
        borderColor: "#0CD3FF",
        borderWidth: 2,
        pointRadius: 3,
        pointStyle: "rect",
        pointHoverRadius: 7,
      },
    ],
  };

  const options: any = {
    scales: {
      x: {
        grid: {
          color: "transparent",
        },
      },
      y: {
        grid: {
          color: "transparent",
        },
        // ticks: {
        //   beginAtZero: true,
        //   stepSize: 10,
        // },
      },
    },
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">뉴스별 검색량</h1>
      <div style={{ width: 600, height: 300 }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
