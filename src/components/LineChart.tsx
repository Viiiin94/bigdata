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
    maintainAspectRatio: false, // 부모 컨테이너 크기를 기준으로 그래프 크기 조정
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
      },
    },
  };

  return (
    <div className="w-full h-full">
      <div
        style={{
          width: "96%",
          height: "99%",
          margin: "auto",
        }}
      >
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
