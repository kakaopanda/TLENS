import React from "react";
import { useParams, useLocation } from "react-router-dom";
import CompanyRecharts from "../CompanyRecharts";
import SearchResultChart2 from "../../SearchResult-Components/SearchResultChart2";
import CompanyKeyword from "../CompanyKeyword";
import MainNewsCard from "../../Main-Components/MainNewsCard";
import WordCloud from "../../Main-Components/WordCloud";
import HotKeywordChart from "../../Main-Components/HotKeywordChart";
import "./CompanyDetail.scss";

import Divider from "@mui/material/Divider";

const CompanyDetail = () => {
  const { name } = useParams();
  const { state } = useLocation();

  const data = {
    nodes: [
      { id: "Node 1", color: "red", value: 10 },
      { id: "Node 2", color: "blue", value: 20 },
      { id: "Node 3", color: "green", value: 30 },
      { id: "Node 4", color: "purple", value: 40 },
      { id: "Node 5", color: "orange", value: 50 },
      { id: "Node 6", color: "cyan", value: 60 },
      { id: "Node 7", color: "magenta", value: 75 },
      { id: "Node 8", color: "yellow", value: 20 },
      { id: "Node 9", color: "brown", value: 30 },
      { id: "Node 10", color: "pink", value: 40 },
      { id: "Node 11", color: "pink", value: 10 },
    ],
    links: [
      { source: "Node 1", target: "Node 3" },
      { source: "Node 1", target: "Node 4" },
      { source: "Node 1", target: "Node 5" },
      { source: "Node 2", target: "Node 6" },
      { source: "Node 2", target: "Node 7" },
      { source: "Node 2", target: "Node 8" },
      { source: "Node 2", target: "Node 9" },
      { source: "Node 3", target: "Node 10" },
      { source: "Node 3", target: "Node 11" },
    ],
  };

  return (
    <div className="companydetail-wrapper">
      <h1>T:LENS 기업 분석 : {name}</h1>
      <div className="companydetail-container">
        <div className="companydetail-top" style={{ display: "flex" }}>
          <div className="companydetail-top-left">
            <div className="companydetail-top-left-1">
              <div className="companydetail-top-left-2">
                <img
                  className="companydetail-top-left-img"
                  src={`/img/${state.index}.jpg`}
                  alt=""
                />
              </div>
              <div className="companydetail-top-left-3">
                <h1>{name}</h1>
                <h3>{state.ename}</h3>
                <Divider />
                <div className="companydetail-top-left-4">
                  <div style={{ width: "20%" }}>
                    <h4>업종 : </h4>
                    <h4>설립일 : </h4>
                    <h4>대표 : </h4>
                  </div>
                  <div style={{ width: "80%" }}>
                    <h4>{state.category}</h4>
                    <h4>{state.birth}</h4>
                    <h4>{state.ceo}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Divider orientation="vertical" />
          <div className="companydetail-top-right">
            <h2 style={{ marginLeft: "10px" }}>{name} 주가 그래프</h2>
            <CompanyRecharts data={data} />
          </div>
        </div>
        <div className="companydetail-mid">
          <div className="companydetail-mid-left">
            <h2 style={{ marginLeft: "2%" }}>연간 키워드 분석 : {name}</h2>
            <div className="companydetail-mid-left-1">
              <SearchResultChart2 />
            </div>
          </div>
          <div className="companydetail-mid-right">
            <h2 style={{ marginLeft: "2%" }}>키워드 통계 : {name} </h2>
            <div className="companydetail-mid-right-1">
              <CompanyKeyword />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2>T:LENS 키워드 분석 : {name}</h2>
        <Divider />
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "65%",
              justifyContent: "center",
              height: "90vh",
              overflowY: "auto",
            }}
          >
            <MainNewsCard />
          </div>
          <div style={{ width: "35%" }}>
            <br />
            <br />
            <br />
            <HotKeywordChart />

            <br />
            <br />
            <h3>{name} HOT Keyword</h3>
            <WordCloud />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
