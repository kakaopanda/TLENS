import React from "react";
import ReactApexChart from "react-apexcharts";

const SearchResultChart1 = ({ keyword }) => {
  const state = {
    series: [
      {
        data: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: false, // 메뉴 버튼 안보이게 설정
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [
          "South Korea",
          "Canada",
          "United Kingdom",
          "Netherlands",
          "Italy",
          "France",
          "Japan",
          "United States",
          "China",
          "Germany",
        ],
      },
    },
  };
  return (
    <div>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bar"
        height={300}
      />
    </div>
  );
};

export default SearchResultChart1;
