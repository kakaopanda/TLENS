import * as React from "react";
import "./Company.scss";
import CompanyCard from "../../components/Company-Components/CompanyCard";

// MUI
import Box from "@mui/material/Box";

const Company = () => {
  const company = [
    ["LG전자", "통신 및 송 장비 제조업", "조주완, 배두용"],
    ["기아자동차", "자동차 제조업", "송호정, 최준영"],
    ["한국전력공사", "송전 및 배전업", "정승일"],
    ["한화", "화약 및 불꽃제품 제조업", "금춘수, 옥경석"],
    ["SK 하이닉스", "유사 반도체소자 제조업", "박정호, 곽노정"],
  ];

  return (
    <div className="company-main">
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
          <h2>T:LENS 기업별 키워드 분석</h2>
          <h3 style={{ color: "white" }}>
            기업별 트렌드 정보 및 관련기사를 화인하실 수 있습니다.
          </h3>
        </div>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {company.map((V, index) => {
          return (
            <CompanyCard
              key={index}
              name={V[0]}
              sectors={V[1]}
              ceo={V[2]}
              index={index}
            />
          );
        })}
      </Box>
    </div>
  );
};

export default Company;
