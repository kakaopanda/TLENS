import React, { useEffect, useState } from "react";
import "./Main.scss";
import { getKeywordNews } from "../../../apis/api/axiosinstance";

// Charts
import MainNewsCard from "../MainNewsCard";
import BarCharts from "../../Charts-Components/BarCharts";
import Wordcloud from "../../Charts-Components/WordCloud";
import KeywordChart from "../../Charts-Components/KeywordChart";
import SearchResultChart2 from "../../Charts-Components/SearchResultChart2";

// MUI
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

const MainChart = (props) => {
  const [keyword, setKeyword] = useState("전체");
  const [articleField, setArticleField] = useState("28,467");
  const [totalArticle, setTotalArticle] = useState("2,846,710,200");

  useEffect(() => {
    if (props?.value === "1") {
      setKeyword("전체(All)");
      setArticleField("28,467");
      setTotalArticle("2,846,710,200");
    } else if (props?.value === "2") {
      setKeyword("정치(Politics)");
      setArticleField("8,332");
      setTotalArticle("746,710,200");
    } else if (props?.value === "3") {
      setKeyword("경제(Economy)");
      setArticleField("2,301");
      setTotalArticle("259,630,750");
    } else if (props?.value === "4") {
      setKeyword("국제(International)");
      setArticleField("1,564");
      setTotalArticle("120,320,520");
    } else if (props?.value === "5") {
      setKeyword("사회(Society)");
      setArticleField("2,351");
      setTotalArticle("153,620,198");
    } else if (props?.value === "6") {
      setKeyword("문화(Culture)");
      setArticleField("467");
      setTotalArticle("998,253");
    } else if (props?.value === "7") {
      setKeyword("연예(Entertainments)");
      setArticleField("5,234");
      setTotalArticle("124,360,717");
    } else if (props?.value === "8") {
      setKeyword("스포츠(Sports)");
      setArticleField("4,250");
      setTotalArticle("393,523,628");
    } else if (props?.value === "9") {
      setKeyword("과학(Science)");
      setArticleField("956");
      setTotalArticle("453,620,520");
    } else if (props?.value === "10") {
      setKeyword("환경(Environment)");
      setArticleField("220");
      setTotalArticle("300,526,356");
    } else {
      setKeyword("IT");
      setArticleField("2,792");
      setTotalArticle("292,399,211");
    }
  }, [props.value]);

  useEffect(() => {
    try {
      const res = getKeywordNews("공기업");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div>
      <div className="main-wrapper">
        <Box
          sx={{
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            width: "45%",
            height: 120,
            backgroundColor: "primary.dark",
            "&:hover": {
              backgroundColor: "primary.main",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          <h3 className="main-top-h3">오늘 작성된 기사</h3>
          <h2 className="main-top-h2">{articleField} 건</h2>
        </Box>
        <hr className="main-top-hr" />
        <Box
          sx={{
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            width: "45%",
            height: 120,
            backgroundColor: "primary.dark",
            "&:hover": {
              backgroundColor: "primary.main",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          <h3 className="main-top-h3">모든 기사 데이터</h3>
          <h2 className="main-top-h2">{totalArticle}건</h2>
        </Box>
      </div>
      <br />
      <div className="main-mid">
        <h2>T:LENS 키워드 통계 : {keyword}</h2>
      </div>
      <Divider />
      <div className="main-mid-wrapper">
        <div className="main-mid-left">
          <h2>키워드 Top 10</h2>
          <BarCharts />
        </div>
        <Divider orientation="vertical" flexItem />
        <div className="main-mid-right">
          <h2>T:LENS 핫 키워드(Top 30)</h2>
          <Wordcloud />
        </div>
      </div>
      <Divider />
      <h2 className="main-bot-h2">T:LENS 키워드 뉴스 : {keyword}</h2>
      <Divider />
      <div className="main-bot-wrapper">
        <div className="main-bot-left">
          <MainNewsCard />
        </div>
        <Divider orientation="vertical" flexItem />
        <div className="main-bot-right">
          <div className="main-bot-right-wrapper">
            <h2 className="main-bot-right-h2">시간별 핫 키워드(Top 3)</h2>
            <br />
            <div className="main-bot-right-1">
              <KeywordChart />
            </div>
            <br />
            <h2 className="main-bot-right-h2">시간별 핫 키워드(Top 10)</h2>
            <br />
            <div className="main-bot-right-2">
              <SearchResultChart2 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainChart;
