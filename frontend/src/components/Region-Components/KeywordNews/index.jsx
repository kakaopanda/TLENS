import React from "react";
import { Box, Card, Typography } from "@mui/material";
import newsData from "./newsData.json";

const KeywordNews = ({ keyword, region }) => {
  const relatedNews = newsData.filter((news) => {
    if (news.keyword && keyword && news.region === region) {
      // keyword와 newsData의 keyword 배열이 존재하고 region도 일치할 때
      return news.keyword.includes(keyword);
    } else {
      return false;
    }
  });

  return (
    <Box>
      <h3>관련 기사</h3>
      {relatedNews.map((news) => {
        return (
          <div className="region-news-card">
            <Card
              key={news.id}
              variant="outlined"
              sx={{
                margin: "auto",
                marginTop: "15px",
                width: "90%",
                height: "120px", // 카드 높이를 120px로 지정
                display: "flex",
                alignItems: "center",
                gap: 2,
                "&:hover": {
                  boxShadow: "md",
                  borderColor: "neutral.outlinedHoverBorder",
                },
              }}
            >
              <div style={{ width: "90px", height: "100%", overflow: "hidden" }}>
                <img
                  src={news.thumbnail}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div>
                <Typography
                  level="h2"
                  fontSize="lg"
                  id="card-description"
                  mb={0.5}
                >
                  {news.title}
                </Typography>
                <Typography
                  fontSize="sm"
                  aria-describedby="card-description"
                  mb={1}
                >
                  {news.date}
                </Typography>
              </div>
            </Card>
          </div>
        );
      })}
    </Box>
  );
};

export default KeywordNews;
