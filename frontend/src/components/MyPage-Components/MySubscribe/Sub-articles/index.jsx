import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import { Button } from "@mui/material";
import data from "./articles.json";
import "./articleScrap.scss";

const ArticleScrap = ({name}) => {
  const [scrapData, setScrapData] = React.useState(data);
  
  const handleDelete = (index) => {
    setScrapData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  };

  return (
    <div>
      {scrapData.map((V, index) => {
        if (name === V.author) {
          return (
            <div className="scrap-card" key={index} >
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
                <AspectRatio ratio="1" sx={{ width: 90}}>
                  <img src={V.image} loading="lazy" alt="" />
                </AspectRatio>
                <div>
                  <Typography
                    level="h2"
                    fontSize="lg"
                    id="card-description"
                    mb={0.5}
                  >
                    {V.title}
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
                      {V.content}
                    </Link>
                  </Typography>
                  <Chip
                    variant="outlined"
                    color="primary"
                    size="sm"
                    sx={{ pointerEvents: "none" }}
                  >
                    {V.author}
                  </Chip>
                </div>
              </Card>

              <Button
                sx={{
                  bgcolor: "red",
                  color: "white",
                  height: "40px",
                  width: "40px",
                }}
                onClick={() => handleDelete(index)}
              >
                X
              </Button>
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default ArticleScrap;
