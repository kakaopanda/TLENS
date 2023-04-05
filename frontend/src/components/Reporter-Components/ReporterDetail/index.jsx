import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import MainNewsCard from "../../Main-Components/MainNewsCard";
import "./ReporterDetail.scss";

// Charts
import ReporterPieChart from "../../Charts-Components/ReporterPieChart";
import ReporterPieChart2 from "../../Charts-Components/ReporterPieChart2";
import ReporterColumnChart from "../../Charts-Components/ReporterColumnChart";
import WordCloud from "../../Charts-Components/WordCloud";
import {
  getReporterNews,
  getReporterCategory,
} from "../../../apis/api/axiosinstance";

// MUI
import Divider from "@mui/material/Divider";
import { Button } from "@mui/material";

// API
import { subReporter, subStatus, cancelSub } from "../../../apis/news";

const ReporterDetail = () => {
  const { state } = useLocation();
  const [newsData, setNewsData] = useState([]);
  const [categoryCount, setCategoryCount] = useState([]);

  const page = 0;
  const pageSize = 10;
  const mainBotLeftRef = useRef(null);

  const getReporterNewsData = async () => {
    const res1 = await getReporterCategory(state.data.name);
    setCategoryCount(res1);

    const res2 = await getReporterNews(state.data.name, page, pageSize);
    setNewsData(res2);
  };

  // 로그인 중이고
  const isLoggedIn = localStorage.getItem("Authorization");
  // 구독 중이면
  const [subscribe, setSubscribe] = useState(null);

  useEffect(() => {
    getReporterNewsData(state.data.name, page, pageSize);

    async function checkSubscriptionStatus() {
      const data = await subStatus(state.data.reporterId);
      setSubscribe(data.content);
    }
    checkSubscriptionStatus();
  }, []);

  const handleSub = () => {
    subReporter(state.data.reporterId);
    console.log(typeof state.data.reporterId);
    setSubscribe(true);
  };

  const handleCancel = () => {
    cancelSub(state.data.reporterId);
    console.log("제거");
    setSubscribe(false);
  };

  const handleScroll = async () => {
    const el = mainBotLeftRef.current;
    if (el.scrollTop + el.clientHeight + 1 >= el.scrollHeight) {
      const res3 = await getReporterNews(
        state.data.name,
        Math.ceil(newsData.length / pageSize),
        pageSize
      );
      setNewsData((prevData) => [...prevData, ...res3]);
    }
  };

  useEffect(() => {
    const el = mainBotLeftRef.current;
    el.addEventListener("scroll", handleScroll);
    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, [newsData.length]);

  return (
    <div className="reporterdetail-wrapper">
      <div className="reporterdetail-left">
        <div className="reporterdetail-left-top">
          <div className="reporterdetail-left-top-1">
            <img
              style={{ margin: "10%", width: "80%" }}
              className="img1"
              src={
                state.data.thumbnail
                  ? state.data.thumbnail
                  : `/images/thumbnail.png`
              }
              alt=""
            />
          </div>
          <Divider orientation="vertical" flexItem />
          <div className="reporterdetail-left-top-2">
            <img
              style={{ textAlign: "left" }}
              className="img2"
              src={state.thumbnail}
              alt=""
            />
            <h2 style={{ textAlign: "left" }}>{state.data.name}</h2>
            {isLoggedIn && (
              <Button
                onClick={subscribe ? handleCancel : handleSub}
                variant="contained"
              >
                {subscribe ? "구독 취소" : "구독하기"}
              </Button>
            )}
          </div>
        </div>
        <div className="reporterdetail-left-main">
          <h3 className="reporterdetail-left-main-h3">
            {state.data.name}의 취재 분야
          </h3>
          <div className="reporterdetail-left-chart">
            {categoryCount.text?.length > 0 ? (
              <ReporterPieChart categoryCount={categoryCount} />
            ) : (
              <div style={{ height: "280px" }}>
                <h2>기사가 없습니다!</h2>
              </div>
            )}
          </div>
          <Divider />
          <h3 className="reporterdetail-left-main-h3">
            {state.data.name}의 구독 현황
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
        <div className="reporterdetail-right-news" ref={mainBotLeftRef}>
          {newsData.length > 0 ? (
            <MainNewsCard newsData={newsData} />
          ) : (
            <h2>기사가 없습니다!</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReporterDetail;
