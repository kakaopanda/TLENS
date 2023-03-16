import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";

const MainNewsCard = () => {
  const data = [
    [
      "https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90",
      "뉴스 타이틀",
      "뉴스 본문",
      "기자명",
    ],
    [
      "https://www.adobe.com/content/dam/cc/us/en/creative-cloud/photography/discover/landscape-photography/CODERED_B1_landscape_P2d_714x348.jpg.img.jpg",
      "뉴스 타이틀2",
      "뉴스 본문2",
      "기자명2",
    ],
    [
      "https://cdn.pixabay.com/photo/2019/08/01/12/36/illustration-4377408_960_720.png",
      "뉴스 타이틀3",
      "뉴스 본문3",
      "기자명3",
    ],
    [
      "https://www.adobe.com/content/dam/cc/us/en/creative-cloud/photography/discover/landscape-photography/CODERED_B1_landscape_P2b_690x455.jpg.img.jpg",
      "뉴스 타이틀4",
      "뉴스 본문4",
      "기자명4",
    ],
    [
      "https://t1.daumcdn.net/cfile/tistory/9905E9455DE5D69813",
      "뉴스 타이틀5",
      "뉴스 본문5",
      "기자명5",
    ],
    [
      "https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90",
      "뉴스 타이틀",
      "뉴스 본문",
      "기자명",
    ],
    [
      "https://www.adobe.com/content/dam/cc/us/en/creative-cloud/photography/discover/landscape-photography/CODERED_B1_landscape_P2d_714x348.jpg.img.jpg",
      "뉴스 타이틀2",
      "뉴스 본문2",
      "기자명2",
    ],
    [
      "https://cdn.pixabay.com/photo/2019/08/01/12/36/illustration-4377408_960_720.png",
      "뉴스 타이틀3",
      "뉴스 본문3",
      "기자명3",
    ],
    [
      "https://www.adobe.com/content/dam/cc/us/en/creative-cloud/photography/discover/landscape-photography/CODERED_B1_landscape_P2b_690x455.jpg.img.jpg",
      "뉴스 타이틀4",
      "뉴스 본문4",
      "기자명4",
    ],
    [
      "https://t1.daumcdn.net/cfile/tistory/9905E9455DE5D69813",
      "뉴스 타이틀5",
      "뉴스 본문5",
      "기자명5",
    ],
    [
      "https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90",
      "뉴스 타이틀",
      "뉴스 본문",
      "기자명",
    ],
    [
      "https://www.adobe.com/content/dam/cc/us/en/creative-cloud/photography/discover/landscape-photography/CODERED_B1_landscape_P2d_714x348.jpg.img.jpg",
      "뉴스 타이틀2",
      "뉴스 본문2",
      "기자명2",
    ],
    [
      "https://cdn.pixabay.com/photo/2019/08/01/12/36/illustration-4377408_960_720.png",
      "뉴스 타이틀3",
      "뉴스 본문3",
      "기자명3",
    ],
    [
      "https://www.adobe.com/content/dam/cc/us/en/creative-cloud/photography/discover/landscape-photography/CODERED_B1_landscape_P2b_690x455.jpg.img.jpg",
      "뉴스 타이틀4",
      "뉴스 본문4",
      "기자명4",
    ],
    [
      "https://t1.daumcdn.net/cfile/tistory/9905E9455DE5D69813",
      "뉴스 타이틀5",
      "뉴스 본문5",
      "기자명5",
    ],
  ];

  return (
    <div>
      {data.map((V, index) => {
        return (
          <Card
            key={index}
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
              <img src={V[0]} loading="lazy" alt="" />
            </AspectRatio>
            <div>
              <Typography
                level="h2"
                fontSize="lg"
                id="card-description"
                mb={0.5}
              >
                {V[1]}
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
                  {V[2]}
                </Link>
              </Typography>
              <Chip
                variant="outlined"
                color="primary"
                size="sm"
                sx={{ pointerEvents: "none" }}
              >
                {V[3]}
              </Chip>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default MainNewsCard;
