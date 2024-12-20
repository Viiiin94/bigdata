import { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutChartProps {
  donutDataKey: Array<string>;
  donutDataValue: Array<number>;
}

const DonutChart = ({ donutDataKey, donutDataValue }: DonutChartProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const adjustedValues = donutDataValue.map((value) =>
    value === 0 ? 0.001 : value
  );

  const totalValue = donutDataValue.reduce((a, b) => a + b, 0);
  const averageValue = donutDataValue.map((value) =>
    Math.round((value / totalValue) * 100)
  );

  const backgroundColors = [
    "rgba(123, 45, 67, 0.8)",
    "rgba(234, 123, 56, 0.8)",
    "rgba(34, 67, 189, 0.8)",
    "rgba(12, 255, 98, 0.8)",
    "rgba(76, 34, 156, 0.8)",
    "rgba(190, 45, 233, 0.8)",
    "rgba(78, 189, 201, 0.8)",
  ];

  const data = {
    labels: donutDataKey,
    datasets: [
      {
        label: ": 검색건수",
        data: adjustedValues,
        backgroundColor: backgroundColors.map((color, index) =>
          selectedIndex === null
            ? color
            : selectedIndex === index
            ? color
            : color.replace(/0.8/, "0.2")
        ),
        borderColor: backgroundColors.map((color, index) =>
          selectedIndex === null
            ? color
            : selectedIndex === index
            ? color
            : color.replace(/0.8/, "0.2")
        ),
        borderWidth: 1,
      },
    ],
  };

  const options: any = {
    responsive: true,
    plugins: {
      emptyDoughnut: {},
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem: any) {
            const index = tooltipItem.dataIndex;
            const label = donutDataKey[index];
            const value = adjustedValues[index];
            const percentage = averageValue[index];
            return `${label}: ${value}건 (${percentage}%)`;
          },
        },
      },
    },
    onClick: (_: any, elements: any) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        setSelectedIndex(index === selectedIndex ? null : index); // 같은 영역 클릭 시 해제
      } else {
        setSelectedIndex(null); // 외부 클릭 시 초기화
      }
    },
  };
  return (
    <div>
      <h1 className="text-3xl font-bold">카테고리</h1>
      <div
        style={{
          width: 350,
          height: 300,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default DonutChart;
