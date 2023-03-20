import * as React from "react";
import { useNavigate } from "react-router-dom";

// MUI
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";

const CompanyCard = ({ name, ename, category, ceo, birth, index }) => {
  const navigate = useNavigate();
  const handleCompanyDetail = (name) => {
    navigate(`/company/${name}`, {
      state: {
        category: category,
        ceo: ceo,
        birth: birth,
        index: index,
        ename: ename,
      },
    });
  };
  return (
    <div>
      <Card variant="outlined" sx={{ width: 230, margin: 2 }}>
        <CardOverflow>
          <img
            style={{ width: "100%", height: 130, objectFit: "cover" }}
            src={`/img/${index}.jpg`}
            alt=""
          />
        </CardOverflow>
        <Typography level="h2" sx={{ fontSize: "md", mt: 1 }}>
          <Link
            sx={{ color: "black" }}
            onClick={() => {
              handleCompanyDetail(name, category, ceo, birth, ename);
            }}
            overlay
            underline="none"
          >
            {name}
          </Link>
        </Typography>
        <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
          <Link
            sx={{ color: "black" }}
            onClick={() => {
              handleCompanyDetail(name, category, ceo, birth, ename);
            }}
          >
            {category}
          </Link>
        </Typography>
        <Divider inset="context" />
        <CardOverflow
          variant="soft"
          sx={{
            display: "flex",
            gap: 1.5,
            py: 1.5,
            px: "var(--Card-padding)",
            bgcolor: "background.level1",
          }}
        >
          <Typography
            level="body3"
            sx={{ fontWeight: "md", color: "text.secondary" }}
          >
            대표 : {ceo}
          </Typography>
        </CardOverflow>
      </Card>
    </div>
  );
};

export default CompanyCard;
