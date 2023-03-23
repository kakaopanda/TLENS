import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainNewsCard from "../../components/Main-Components/MainNewsCard";
import SearchResultChart1 from "../../components/SearchResult-Components/SearchResultChart1/";
import SearchResultNetworkChart from "../../components/SearchResult-Components/SearchResultNetworkChart";

// MUI
import Divider from "@mui/material/Divider";

const SearchResult = () => {
  const { keyword } = useParams();

  return (
    <div>
      <div
        style={{
          textAlign: "left",
          display: "flex",
        }}
      >
        <div style={{ width: "65%" }}>
          <h2>"{keyword}" 뉴스 기사</h2>
        </div>
        <div style={{ width: "35%" }}>
          <h2>T:LENS 검색어 분석 : {keyword}</h2>
        </div>
      </div>
      <Divider />
      <div style={{ display: "flex" }}>
        <div style={{ width: "65%" }}>
          <MainNewsCard />
        </div>
        <Divider orientation="vertical" flexItem />
        <div style={{ width: "35%", textAlign: "left" }}>
          <h4 style={{ marginLeft: "3%" }}>"{keyword}" 연관 검색어 추천</h4>
          <SearchResultChart1 keyword={keyword} />
          <h4 style={{ marginLeft: "3%" }}>"{keyword}" 연관 키워드</h4>
          {/* <SearchResultNetworkChart /> */}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
