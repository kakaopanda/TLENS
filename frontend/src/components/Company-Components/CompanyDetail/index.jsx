import React from "react";
import { useParams, useLocation } from "react-router-dom";
import CompanyRecharts from "../CompanyRecharts";
import CompanyForceDirected from "../CompanyForceDirected";

import Divider from "@mui/material/Divider";

const CompanyDetail = () => {
  const { name } = useParams();
  const { state } = useLocation();

  const data = {
    nodes: [
      { id: "Node 1", color: "red", value: 10 },
      { id: "Node 2", color: "blue", value: 20 },
      { id: "Node 3", color: "green", value: 30 },
      { id: "Node 4", color: "purple", value: 40 },
      { id: "Node 5", color: "orange", value: 50 },
      { id: "Node 6", color: "cyan", value: 60 },
      { id: "Node 7", color: "magenta", value: 75 },
      { id: "Node 8", color: "yellow", value: 20 },
      { id: "Node 9", color: "brown", value: 30 },
      { id: "Node 10", color: "pink", value: 40 },
      { id: "Node 11", color: "pink", value: 10 },
    ],
    links: [
      { source: "Node 1", target: "Node 3" },
      { source: "Node 1", target: "Node 4" },
      { source: "Node 1", target: "Node 5" },
      { source: "Node 2", target: "Node 6" },
      { source: "Node 2", target: "Node 7" },
      { source: "Node 2", target: "Node 8" },
      { source: "Node 2", target: "Node 9" },
      { source: "Node 3", target: "Node 10" },
      { source: "Node 3", target: "Node 11" },
    ],
  };

  const config = {
    node: {
      color: "red",
      size: 100, // 노드 크기 변경
      fontColor: "white",
      fontSize: 16,
      labelProperty: "id", // 노드 내부에 id 보이도록 변경
    },
    link: {
      strokeWidth: 5,
    },
    width: window.innerWidth,
    height: window.innerHeight,
    directed: true,
  };

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
            <CompanyRecharts data={data} />
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ width: "50%" }}>
            <h2 style={{ marginLeft: "2%" }}>연간 키워드 분석 : {name}</h2>
            <CompanyForceDirected data={data} config={config} />
          </div>
          <div style={{ width: "50%" }}></div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
