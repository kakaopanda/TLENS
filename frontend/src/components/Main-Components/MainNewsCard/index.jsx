import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";

// Data
import data1 from "./data.json";

const MainNewsCard = () => {
  const data = data1;

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
                  href="/여기에 url을 보내주자"
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
