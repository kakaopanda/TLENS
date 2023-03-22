import * as React from "react";

// MUI
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";

const ReporterCard2 = ({ V }) => {
  return (
    <div>
      <Card
        orientation="horizontal"
        variant="outlined"
        sx={{ width: 260, bgcolor: "background.body" }}
      >
        <CardOverflow>
          <AspectRatio ratio="1" sx={{ width: 90 }}>
            <img
              style={{ objectFit: "cover" }}
              src={V[4]}
              loading="lazy"
              alt=""
            />
          </AspectRatio>
        </CardOverflow>
        <CardContent sx={{ px: 2 }}>
          <Typography fontWeight="md" textColor="success.plainColor" mb={0.5}>
            {V[2]}
          </Typography>
          <Typography level="body2">{V[3]}</Typography>
        </CardContent>
        <Divider />
        <CardOverflow
          variant="soft"
          color="primary"
          sx={{
            px: 0.2,
            writingMode: "vertical-rl",
            textAlign: "center",
            fontSize: "xs2",
            fontWeight: "xl2",
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          {V[0]}
        </CardOverflow>
      </Card>
    </div>
  );
};

export default ReporterCard2;
