<<<<<<< HEAD
import React, { useState } from "react";
import ApexCharts from "apexcharts";
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
=======
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const CompanyRecharts = () => {
  const data = [
    { name: "Jan", price: 100 },
    { name: "Feb", price: 120 },
    { name: "Mar", price: 150 },
    { name: "Apr", price: 180 },
    { name: "May", price: 200 },
    { name: "Jun", price: 220 },
    { name: "Jul", price: 250 },
    { name: "Aug", price: 280 },
    { name: "Sep", price: 300 },
    { name: "Oct", price: 330 },
    { name: "Nov", price: 360 },
    { name: "Dec", price: 390 },
  ];

  return (
    <LineChart width={550} height={250} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="price"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
};

export default CompanyRecharts;
>>>>>>> 9b98e249fc212f2b428e563dae5aed2aa33df4de
