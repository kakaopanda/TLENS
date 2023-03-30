import React from "react";
import { useLocation } from "react-router-dom";
import MainNewsCard from "../../Main-Components/MainNewsCard";
import "./ReporterDetail.scss";

// Charts
import ReporterPieChart from "../../Charts-Components/ReporterPieChart";
import ReporterPieChart2 from "../../Charts-Components/ReporterPieChart2";
import ReporterColumnChart from "../../Charts-Components/ReporterColumnChart";
import WordCloud from "../../Charts-Components/WordCloud";

// MUI
import Divider from "@mui/material/Divider";
import { Button } from "@mui/material";

const ReporterDetail = () => {
  const { state } = useLocation();
  console.log(state);

  return (
    <div className="reporterdetail-wrapper">
      <div className="reporterdetail-left">
        <div className="reporterdetail-left-top">
          <div className="reporterdetail-left-top-1">
            <img
              style={{ margin: "10%" }}
              className="img1"
              src={state[4]}
              alt=""
            />
          </div>
          <Divider orientation="vertical" flexItem />
          <div className="reporterdetail-left-top-2">
            <img
              style={{ textAlign: "left" }}
              className="img2"
              src={`/${state[1]}`}
              alt=""
            />
            <h2 style={{ textAlign: "left" }}>{state[2]} 기자</h2>
            <h3 style={{ textAlign: "left" }}>{state[3]}부</h3>
            <Button
              className="reporter-button"
              sx={{ textAlign: "right" }}
              variant="contained"
            >
              구독하기
            </Button>
          </div>
        </div>
        <div className="reporterdetail-left-main">
          <h3 className="reporterdetail-left-main-h3">
            {state[2]} 기자의 취재 분야
          </h3>
          <div className="reporterdetail-left-chart">
            <ReporterPieChart />
          </div>
          <Divider />
          <h3 className="reporterdetail-left-main-h3">
            {state[2]} 기자의 구독 현황
          </h3>
          <div className="reporterdetail-left-main-chart1">
            <div className="reporterdetail-left-main-chart1-1">
              <h5 className="reporterdetail-left-main-h5">나이 통계</h5>
              <ReporterColumnChart />
            </div>
            <div className="reporterdetail-left-main-chart2">
              <h5 className="reporterdetail-left-main-h5">성별 통계</h5>
              <ReporterPieChart2 />
            </div>
          </div>
        </div>
      </div>
      <div className="reporterdetail-right">
        <h2 className="reporterdetail-right-h2">
          T:LENS 키워드 : {state[2]} 기자
        </h2>
        <div
          style={{
            border: "1px solid #D8D8D8",
            margin: "0 2% 2% 2%",
            marginTop: "-1%",
            borderRadius: "10px",
          }}
        >
          <WordCloud />
        </div>
        <Divider />
        <h2 className="reporterdetail-right-h2">
          T:LENS 키워드 뉴스 : {state[2]} 기자
        </h2>
        <div className="reporterdetail-right-news">
          <MainNewsCard />
        </div>
      </div>
    </div>
  );
};

export default ReporterDetail;
