import { useState, useEffect } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import NewsCardModal from "../../../NewsCardModal"
import "./articleScrap.scss"
import { Button } from "@mui/material";


// API
import { scrapList, cancelScrap } from "../../../../apis/news"

const ArticleScrap = ({ userInfo }) => {

  const [scrapNews, setScrapNews] = useState([])
  
  const [newsModalOpen, setNewsModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);

  const handleCardClick = (news) => {
    // console.log(news)
    setSelectedNews(news);
    setNewsModalOpen(true);
  };

  const handleCloseModal = () => {
    setNewsModalOpen(false);
    setSelectedNews(null);
  };

  useEffect(() => {
    const fetchScrapList = async () => {
      try {
        const response = await scrapList();
        setScrapNews(response.lst);
      } catch (error) {
        console.error(error);
      }
    };
    fetchScrapList();
  }, []);

  const handleDelete = async (id) => {
    try {
      await cancelScrap(id);
      setScrapNews(prevScrapNews => prevScrapNews.filter(news => news.newsId !== id));
      // 삭제 성공 시 화면 갱신 등 추가 작업 수행
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>"{userInfo.nickname}"의 스크랩 기사 : (총 {scrapNews.length} 건)</h2>
      {scrapNews.map((news) => {
        return (
          <div className="scrap-card">
            <Card
              key={news.newsId}
              variant="outlined"
              orientation="horizontal"
              onClick={() => handleCardClick(news)}
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
                <img src={news.thumbnail} alt="" />
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
                  <Link
                    overlay
                    underline="none"
                    href="#interactive-card"
                    sx={{ color: "text.tertiary" }}
                  >
                    {/* {news.summary} */}
                  </Link>
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
            <Button
              sx={{
                fontSize: "15px",
                bgcolor: "red",
                color: "white",
                height: "60px",
                width: "20px",
              }}
              onClick={() => handleDelete(news.newsId)}>
              X
            </Button>
          </div>
        );
      })}
      {selectedNews && (
        <NewsCardModal
          onClose={handleCloseModal}
          news={selectedNews}
          open={newsModalOpen}
        />
      )}
    </div>
  );
};

export default ArticleScrap;
