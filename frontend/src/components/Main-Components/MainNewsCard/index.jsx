import * as React from "react";
import "./MainNewsCard.scss";

// MUI
import AspectRatio from "@mui/joy/AspectRatio";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";
import Chip from "@mui/joy/Chip";
import { Divider } from "@mui/material";

// Data
import data1 from "./data.json";

const MainNewsCard = () => {
  const data = data1;

  return (
    <div className="news-container">
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
            <AspectRatio ratio="1" sx={{ width: "15%" }}>
              <img src={V[0]} loading="lazy" alt="" />
            </AspectRatio>
            <Divider orientation="vertical" flexItem />
            <div className="newscard-wrapper" style={{ width: "80%" }}>
              <div className="newscard-title">
                <h3 className="newscard-title-text">{V[1]}</h3>
                <Divider />
              </div>
              <div className="newscard-main">
                <Link
                  overlay
                  underline="none"
                  href="/여기에 url을 보내주자"
                  sx={{
                    color: "text.tertiary",
                  }}
                >
                  <h4 className="newscard-main-text">{V[2]}</h4>
                </Link>
              </div>
              <div className="newscard-reporter">
                <Chip
                  variant="outlined"
                  color="primary"
                  size="sm"
                  sx={{
                    pointerEvents: "none",
                  }}
                >
                  {V[3]}
                </Chip>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default MainNewsCard;
