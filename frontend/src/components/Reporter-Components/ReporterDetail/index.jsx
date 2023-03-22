import React from "react";
import { useLocation } from "react-router-dom";
import ReporterPieChart from "../ReporterPieChart";

const ReporterDetail = () => {
  const { state } = useLocation();
  console.log(state);

  return (
    <div
      style={{
        backgroundColor: "#e2e2e2",
        borderRadius: "20px",
        display: "flex",
      }}
    >
      <div
        style={{
          width: "30%",
          margin: "1.5%",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "20px",
            width: "96%",
          }}
        >
          <img src={state[4]} alt="" />
          <h2>
            {state[0]} : {state[2]}
          </h2>
        </div>
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "20px",
            width: "96%",
          }}
        >
          <h2>{state[2]} 기자의 취재 분야</h2>
          <ReporterPieChart />
        </div>
      </div>
      <div
        style={{
          width: "66%",
          margin: "1.5%",
          background: "white",
          borderRadius: "20px",
        }}
      >
        <h2>hihihi</h2>
      </div>
    </div>
  );
};

export default ReporterDetail;
