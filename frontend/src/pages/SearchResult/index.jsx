import React from "react";
import { useParams } from "react-router-dom";
import MainNewsCard from "../../components/Main-Components/MainNewsCard";
import "./SearchResult.scss";

// Charts
import SearchResultChart1 from "../../components/Charts-Components/SearchResultChart1";
import SearchResultChart2 from "../../components/Charts-Components/SearchResultChart2";

// MUI
import Divider from "@mui/material/Divider";

const SearchResult = () => {
  const { keyword } = useParams();

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
          <SearchResultChart1 keyword={keyword} />
          <h4>"{keyword}" 연관 키워드</h4>
          <SearchResultChart2 keyword={keyword} />
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
