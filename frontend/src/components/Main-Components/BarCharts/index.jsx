import React from "react";
import ApexCharts from "react-apexcharts";

const BarCharts = () => {
  return (
    <div>
      <ApexCharts
        type="bar"
        series={[
          {
            name: "Price",
            data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
          },
        ]}
        options={{
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
          title: {
            text: "키워드 변화 TOP 10",
            align: "center",
            floating: true,
          },
          subtitle: {
            text: "Category Names as DataLabels inside bars",
            align: "center",
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
        }}
      />
    </div>
  );
};

export default BarCharts;
