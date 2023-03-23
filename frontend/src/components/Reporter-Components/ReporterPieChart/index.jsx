import React from "react";
import ApexCharts from "react-apexcharts";

const ReporterPieChart = () => {
  const state = {
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: ["정치", "문화", "스포츠", "경제", "담배"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <div>
      <ApexCharts options={state.options} series={state.series} type="pie" />
    </div>
  );
};

export default ReporterPieChart;
