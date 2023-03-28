import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import CompanyStock from "../CompanyStock";
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

  const [keyName, setKeyName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (name === "현대자동차") {
      setKeyName("현대차");
    } else if (name === "GS칼텍스") {
      setKeyName("GS");
    } else if (name === "POSCO홀딩스") {
      setKeyName("포스코케미칼");
    } else if (name === "LG전자") {
      setKeyName("LG");
    } else if (name === "기아자동차") {
      setKeyName("기아");
    } else if (name === "한국전력공사") {
      setKeyName("한국전력");
    } else {
      setKeyName(name);
    }
    setTimeout(() => {
      // 2초 뒤에 실행되는 코드
      setLoading(true);
    }, 3000);
  }, [name]);

  return (
    <div className="companydetail-wrapper">
      <h1>T:LENS 기업 분석 : {name}</h1>
      <div className="companydetail-container">
        <div className="companydetail-top">
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
            {loading ? (
              <CompanyStock keyName={keyName} />
            ) : (
              <div>
                <img src="/images/loading.gif" alt="" />
              </div>
            )}
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
          <Divider orientation="vertical" flexItem />
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
