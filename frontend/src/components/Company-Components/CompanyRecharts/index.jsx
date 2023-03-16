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
