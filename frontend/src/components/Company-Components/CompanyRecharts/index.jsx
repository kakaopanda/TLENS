import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const StockChart = () => {
  const [seriesData, setSeriesData] = useState([
    {
      name: "삼성전자",
      data: [1000, 12000, 55000, 9000, 82900, 30000, 22000, 45000],
    },
  ]);

  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [
        "2022-01-01",
        "2022-02-01",
        "2022-03-01",
        "2022-04-01",
        "2022-05-01",
        "2022-06-01",
        "2022-07-01",
        "2022-08-01",
      ],
    },
  });

  return (
    <ReactApexChart
      options={chartOptions}
      series={seriesData}
      type="line"
      height={350}
    />
  );
};

export default StockChart;
