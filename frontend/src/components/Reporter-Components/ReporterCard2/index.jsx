import * as React from "react";
import { useNavigate } from "react-router-dom";

// MUI
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";

const ReporterCard2 = ({ V }) => {
  const navigate = useNavigate();

  const handlenavigate = (value) => {
    navigate(`/reporter/${value[2]}`, { state: value });
  };

  return (
    <div style={{ margin: "2%" }}>
      <Card
        onClick={() => {
          handlenavigate(V);
        }}
        variant="outlined"
        orientation="horizontal"
        sx={{
          display: "flex",
          width: 320,
          gap: 2,
          "&:hover": {
            boxShadow: "md",
            borderColor: "neutral.outlinedHoverBorder",
          },
        }}
      >
        <div>
          <img
            style={{ Width: "100%", height: "auto", borderRadius: "20px" }}
            src={V[4]}
            loading="lazy"
            alt=""
          />
        </div>
        <div>
          <img style={{ width: "30%" }} src={V[1]} alt="" />
          <Typography level="h2" fontSize="lg" id="card-description" mb={0.5}>
            {V[2]}
          </Typography>
          <Typography fontSize="sm" aria-describedby="card-description" mb={1}>
            <Link overlay underline="none" sx={{ color: "text.tertiary" }}>
              {V[0]} : {V[3]}
            </Link>
          </Typography>
          <Typography fontSize="sm" aria-describedby="card-description" mb={1}>
            클릭시 정보 확인
          </Typography>
        </div>
      </Card>
    </div>
  );
};

export default ReporterCard2;
