import React, { useState, useEffect } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import { Button } from "@mui/material";
import data from "./articles.json";
import "./articleScrap.scss";

import { getSubscribeNews } from "../../../../apis/news";

const ArticleScrap = ({ name }) => {
  const [scrapData, setScrapData] = useState([]);

  useEffect(() => {
    const fetchScrapNews = async () => {
      try {
        const response = await getSubscribeNews();
        setScrapData(response.lst);
      } catch (error) {
        console.error(error);
      }
    };
    fetchScrapNews();
  }, []);

  const handleDelete = (index) => {
    setScrapData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  };

  return (
    <div>
      {scrapData &&
        scrapData.map((news, index) => {
          if (name === news.reporter) {
            return (
              <div className="scrap-card" key={index}>
                <Card
                  variant="outlined"
                  orientation="horizontal"
                  sx={{
                    margin: "auto",
                    marginTop: "15px",
                    width: "90%",
                    gap: 2,
                    "&:hover": {
                      boxShadow: "md",
                      borderColor: "neutral.outlinedHoverBorder",
                    },
                  }}
                >
                  <AspectRatio ratio="1" sx={{ width: 90 }}>
                    <img src={news.thumbnail} loading="lazy" alt="" />
                  </AspectRatio>
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
                      {/* <Link
                        overlay
                        underline="none"
                        href="#interactive-card"
                        sx={{ color: "text.tertiary" }}
                      >
                        {news.content}
                      </Link> */}
                    </Typography>
                    <Chip
                      variant="outlined"
                      color="primary"
                      size="sm"
                      sx={{ pointerEvents: "none" }}
                    >
                      {news.reporter}
                    </Chip>
                  </div>
                </Card>
              </div>
            );
          }
})}
    </div>
  );
};

export default ArticleScrap;
