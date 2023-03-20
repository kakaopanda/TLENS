import React from "react";
import "./Repoter.scss";
import ReporterCarousel from "../../components/Reporter-Components/ReporterCarousel";

// MUI
import Box from "@mui/material/Box";

const Repoter = () => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          borderRadius: "40px",
          height: 150,
          backgroundColor: "primary.dark",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            backgroundColor: "primary.main",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <div>
          <h2>T:LENS 언론사별 키워드 분석</h2>
          <h3 style={{ color: "white" }}>
            언론사별 트렌드 정보 및 관련기사를 확인하실 수 있습니다
          </h3>
        </div>
      </Box>
      <div className="app1">
        <ReporterCarousel />
      </div>
    </div>
  );
};

export default Repoter;
