import * as React from "react";
import "./Company.scss";
import CompanyCard from "../../components/Company-Components/CompanyCard";

// MUI
import Box from "@mui/material/Box";

const Company = () => {
  return (
    <div className="company-main">
      <Box
        sx={{
          width: "100%",
          borderRadius: "40px",
          height: 150,
          backgroundColor: "primary.dark",
          "&:hover": {
            backgroundColor: "primary.main",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <h2>T:LENS 기업별 키워드 분석</h2>
        <h3 style={{ color: "white" }}>
          기업별 트렌드 정보 및 관련기사를 화인하실 수 있습니다.
        </h3>
      </Box>
      <CompanyCard />
    </div>
  );
};

export default Company;
