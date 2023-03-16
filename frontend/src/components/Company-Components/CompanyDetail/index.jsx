import React from "react";
import { useParams, useLocation } from "react-router-dom";
import CompantRecharts from "../CompanyRecharts";

import Divider from "@mui/material/Divider";

const CompanyDetail = () => {
  const { name } = useParams();
  const { state } = useLocation();

  return (
    <div style={{ textAlign: "left" }}>
      <h1>T:LENS 기업 분석 : {name}</h1>
      <div style={{ backgroundColor: "#e2e2e2", borderRadius: "20px" }}>
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "50%",
              backgroundColor: "white",
              margin: "2% 0 2% 2%", // 위, 오른쪽, 아래, 왼쪽
              borderTopLeftRadius: "20px",
              borderBottomLeftRadius: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                textAlign: "left",
              }}
            >
              <div
                style={{ width: "40%", overflow: "hidden", margin: "0 auto" }}
              >
                <img
                  style={{
                    margin: "auto",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  src={`/img/${state.index}.jpg`}
                  alt=""
                />
              </div>
              <div style={{ width: "70%", marginLeft: "3%" }}>
                <h1 style={{ marginBottom: -10 }}>{name}</h1>
                <h3 style={{ color: "#a2a2a2" }}>{state.ename}</h3>
                <Divider />
                <div style={{ display: "flex" }}>
                  <div style={{ width: "20%" }}>
                    <h3>업종</h3>
                    <h4>설립일</h4>
                    <h4>대표</h4>
                  </div>
                  <div>
                    <h3>{state.category}</h3>
                    <h4>{state.birth}</h4>
                    <h4>{state.ceo}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Divider orientation="vertical" />
          <div
            style={{
              width: "50%",
              backgroundColor: "white",
              margin: "2% 2% 2% 0",
              borderTopRightRadius: "20px",
              borderBottomRightRadius: "20px",
            }}
          >
            <h2 style={{ marginLeft: "10px" }}>{name} 주가 그래프</h2>
            <CompantRecharts />
          </div>
        </div>
        <div>
          <h2 style={{ marginLeft: "2%" }}>연간 키워드 분석 : {name}</h2>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
