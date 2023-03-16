import React from "react";
import { useParams, useLocation } from "react-router-dom";

import Divider from "@mui/material/Divider";

const CompanyDetail = () => {
  const { name } = useParams();
  const { state } = useLocation();
  console.log(name);
  console.log(state);

  return (
    <div>
      <h2>T:LENS 기업 분석 : {name}</h2>
      <div style={{ backgroundColor: "#E2E2E2", borderRadius: "20px" }}>
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
            <img
              style={{ width: 230, height: 130 }}
              src={`/img/${state}.jpg`}
              alt=""
            />
            <h2>{name}</h2>
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
            <h2>주가정보, 그래프</h2>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default CompanyDetail;
