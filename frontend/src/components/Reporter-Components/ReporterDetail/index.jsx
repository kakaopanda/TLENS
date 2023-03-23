import React from "react";
import { useLocation } from "react-router-dom";
import ReporterPieChart from "../ReporterPieChart";
import ReporterPieChart2 from "../ReporterPieChart2";
import ReporterColumnChart from "../ReporterColumnChart";
import ReporterWordCloud from "../ReporterWordCloud";
import MainNewsCard from "../../Main-Components/MainNewsCard";
import "./ReporterDetail.scss";

// MUI
import Divider from "@mui/material/Divider";
import { Button } from "@mui/material";

const ReporterDetail = () => {
  const { state } = useLocation();
  console.log(state[1]);

  return (
    <div
      style={{
        backgroundColor: "#0066CC",
        borderRadius: "20px",
        display: "flex",
        textAlign: "left",
      }}
    >
      <div
        style={{
          width: "40%",
          margin: "1.5% 0 1.5% 1.5%",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "20px",
            width: "96%",
            textAlign: "center",
          }}
        >
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <img src={state[4]} alt="" />
            <img
              style={{ width: "20%", height: "10%" }}
              src={`/${state[1]}`}
              alt=""
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h2>
              {state[0]} : {state[2]}
            </h2>
            <Button>구독하기</Button>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "20px",
            width: "96%",
          }}
        >
          <h3 style={{ marginLeft: "3%" }}>{state[2]} 기자의 취재 분야</h3>
          <div style={{ width: "90%" }}>
            <ReporterPieChart />
          </div>
          <Divider />
          <h3 style={{ marginLeft: "3%" }}>{state[2]} 기자의 구독 현황</h3>
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}>
              <h5 style={{ marginLeft: "3%" }}>나이 통계</h5>
              <ReporterColumnChart />
            </div>
            <div style={{ width: "50%", alignContent: "center" }}>
              <h5 style={{ marginLeft: "3%" }}>성별 통계</h5>
              <ReporterPieChart2 />
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "58%",
          margin: "1.5% 1.5% 1.5% 0",
          background: "white",
          borderRadius: "20px",
          textAlign: "left",
        }}
      >
        <h2 style={{ marginLeft: "3%" }}>T:LENS 키워드 : {state[2]} 기자</h2>
        <ReporterWordCloud />
        <Divider />
        <h2 style={{ marginLeft: "3%" }}>
          T:LENS 키워드 뉴스 : {state[2]} 기자
        </h2>
        <div
          className="reporter-news"
          style={{
            height: "68vh",
            overflowY: "auto",
          }}
        >
          <MainNewsCard />
        </div>
      </div>
    </div>
  );
};

export default ReporterDetail;
