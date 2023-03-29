import React from "react";
import ApexCharts from "react-apexcharts";

const BarCharts = () => {
  const state = {
    series: [
      {
        data: [1380, 1200, 1100, 690, 580, 540, 470, 448, 430, 400],
      },
    ],
    options: {
      chart: {
        type: "bar",
        toolbar: {
          show: false, // 메뉴 버튼 안보이게 설정
        },
      },
      plotOptions: {
        bar: {
          barHeight: "100%",
          distributed: true,
          horizontal: true,
          dataLabels: {
            position: "bottom",
          },
        },
      },
      colors: [
        "#33b2df",
        "#546E7A",
        "#d4526e",
        "#13d8aa",
        "#A5978B",
        "#2b908f",
        "#f9a3a4",
        "#90ee7e",
        "#f48024",
        "#69d2e7",
      ],
      dataLabels: {
        enabled: true,
        textAnchor: "start",
        style: {
          colors: ["#fff"],
        },
        formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
        },
        offsetX: 0,
        dropShadow: {
          enabled: true,
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      xaxis: {
        categories: [
          "싸피",
          "사피",
          "삼성",
          "삼성전자",
          "카카오",
          "네이버",
          "4피",
          "담배",
          "핸드폰",
          "싸P",
        ],
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      tooltip: {
        theme: "dark",
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: function () {
              return "";
            },
          },
        },
      },
    },
  };

  return (
    <div>
      <ApexCharts options={state.options} series={state.series} type="bar" />
    </div>
  );
};

export default BarCharts;
