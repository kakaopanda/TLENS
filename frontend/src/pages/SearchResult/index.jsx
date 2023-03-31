/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainNewsCard from "../../components/Main-Components/MainNewsCard";
import "./SearchResult.scss";
import { getKeywordNews } from "../../apis/api/axiosinstance";

// Charts
import SearchResultChart1 from "../../components/Charts-Components/SearchResultChart1";
import SearchResultChart2 from "../../components/Charts-Components/SearchResultChart2";

// MUI
import Divider from "@mui/material/Divider";

const SearchResult = () => {
  const { keyword } = useParams();

  const [newsData, setNewsData] = useState([]);

  const getNews = async () => {
    try {
      const res = await getKeywordNews(keyword);
      setNewsData(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(async () => {
    getNews();
  }, []);
  console.log(newsData);

  return (
    <div className="searchresult-wrapper">
      <div className="searchresult-container">
        <div className="searchresult-text">
          <h2>"{keyword}" 뉴스 기사</h2>
        </div>
        <div className="searchresult-text2">
          <h2>T:LENS 검색어 분석 : {keyword}</h2>
        </div>
      </div>
      <Divider />
      <div className="searchresult-main">
        <div className="searchresult-news">
          <MainNewsCard />
        </div>
        <Divider orientation="vertical" flexItem />
        <div className="searchresult-chart">
          <h4>"{keyword}" 연관 검색어 추천</h4>
          <div style={{ border: "1px solid #D8D8D8" }}>
            <SearchResultChart1 keyword={keyword} />
          </div>
          <h4>"{keyword}" 연관 키워드</h4>
          <div style={{ border: "1px solid #D8D8D8" }}>
            <SearchResultChart2 keyword={keyword} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
