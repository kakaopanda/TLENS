import React, { useEffect, useState } from "react";
import "./Main.scss";

// Charts
import MainNewsCard from "../MainNewsCard";
import BarCharts from "../../Charts-Components/BarCharts";
import Wordcloud from "../../Charts-Components/WordCloud";
import KeywordChart from "../../Charts-Components/KeywordChart";
import SearchResultChart2 from "../../Charts-Components/SearchResultChart2";

// MUI
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

// Api
import { defaultInstance } from "../../../apis/news";

const MainChart = (props) => {
  const [keyword, setKeyword] = useState("");
  const [todayNewsCount, setTodayNewsCount] = useState("");
  const [allNewsCount, setAllNewsCount] = useState("");
  const [page, setPage] = useState(-1);
  const [pageSize, setPageSize] = useState(10);
  const [keywordNews, setKeywordNews] = useState([]);
  const [category, setCategory] = useState("");

  // getCategoryNews에서 기사데이터 개수를 받아 3자리마다 콤마를 붙히는 함수
  const addCommas = (num) => {
    const str = num.toString();
    const len = str.length;
    if (len <= 3) {
      return str;
    } else {
      return addCommas(str.slice(0, len - 3)) + "," + str.slice(len - 3);
    }
  };

  // 카테고리별 기사데이터와 개수를 받는 함수
  const getCategoryNews = async (category, page, pageSize) => {
    setPage(page + 1);
    try {
      const response = await defaultInstance.get("/category/news", {
        params: {
          category: category,
          pageNo: page,
          pageSize: pageSize,
        },
      });
      const response2 = await defaultInstance.get("/category/count", {
        params: { category: category },
      });

      setTodayNewsCount(addCommas(response2.data.content.countRecentNews));
      setAllNewsCount(addCommas(response2.data.content.countAllNews));
      setKeywordNews(response.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  // 메인화면의 탭이 바뀔때마다 카테고리 상태를 관리
  useEffect(() => {
    if (props?.value === "1") {
      setKeyword("전체(All)");
      setCategory("전체");
    } else if (props?.value === "2") {
      setKeyword("IT");
      setCategory("IT");
    } else if (props?.value === "3") {
      setKeyword("경제(Economy)");
      setCategory("경제");
    } else if (props?.value === "4") {
      setKeyword("사회(Society)");
      setCategory("사회");
    } else if (props?.value === "5") {
      setKeyword("정치(Politics)");
      setCategory("정치");
    } else if (props?.value === "6") {
      setKeyword("세계(World)");
      setCategory("세계");
    } else if (props?.value === "7") {
      setKeyword("생활(Life)");
      setCategory("생활");
    } else if (props?.value === "8") {
      setKeyword("스포츠(Sports)");
      setCategory("스포츠");
    } else if (props?.value === "9") {
      setKeyword("연예(Entertainments)");
      setCategory("연예");
    } else {
      setKeyword("오피니언(Opinion)");
      setCategory("오피니언");
    }
  }, [props.value]);

  // 컴포넌트가 마운트되면 첫 페이지 데이터 불러오기
  useEffect(() => {
    setPage(-1);
    getCategoryNews(category, page, pageSize);
  }, [keyword]);

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
          <h2 className="main-top-h2">{todayNewsCount} 건</h2>
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
          <h2 className="main-top-h2">{allNewsCount} 건</h2>
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
          <MainNewsCard newsData={keywordNews} />
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
