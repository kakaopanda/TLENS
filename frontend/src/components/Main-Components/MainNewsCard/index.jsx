import * as React from "react";
import "./MainNewsCard.scss";

// MUI
import Card from "@mui/joy/Card";
import { Divider, Typography } from "@mui/material";


const MainNewsCard = ({ newsData }) => {
  if (!newsData) return null; // add conditional check

  return (
    <div>
    {newsData.map((news) => (
      <div key={news.id}>
        <Card
          className="main-news-card"
          variant="outlined"
          sx={{
            margin: "auto",
            marginTop: "15px",
            width: "90%",
            height: "150px", // 카드 높이를 220px로 지정
            display: "flex",
            flexDirection: "row", // 좌우로 배치
            gap: 2,
            boxShadow: "md",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "lg",
              borderColor: "neutral.outlinedHoverBorder",
            },
            cursor: "pointer",
          }}
          onClick={() => window.open(news.link)}
        >
          <div
            style={{
              width: "40%",
              height: "100%",
              overflow: "hidden",
              borderRadius: "4px",
            }}
          >
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "60%",
              padding: "0 10px",
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: "10px" , textAlign: "start"}}>
              {news.title}
            </Typography>
            <Typography variant="h6" sx={{ marginBottom: "10px", textAlign: "end" }}>
              {news.reporter}
            </Typography>
          </div>
        </Card>
      </div>
    ))}
  </div>
  
  );
};

export default MainNewsCard;
