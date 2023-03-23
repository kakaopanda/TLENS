import React, {useState} from "react";
import { Box, Divider} from "@mui/material";
import KoreaMap from "../../components/Region-Components/KoreaMap";
import WordCloud from "../../components/Region-Components/WordCloud"
import "./Region.scss";

const Region = () => {

  const [selectedRegion, setSelectedRegion] = useState(null);

  function handleRegionSelect(name) {
    setSelectedRegion(name);
  }


  return (
    <div>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          borderRadius: "20px",
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
          <h3>T:LENS 지역별 키워드 분석</h3>
          <h3 style={{ color: "white" }}>
            지역별 트렌드 정보 및 관련기사를 화인하실 수 있습니다.
          </h3>
        </div>
      </Box>

      <Divider />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "50%" }}>
        <KoreaMap onRegionSelect={handleRegionSelect} />

        </div>
        <Divider orientation="vertical" flexItem />
        <div style={{ width: "45%" }}>
        {selectedRegion && (
          <h3>"{selectedRegion}"와 관련된 T:LENS 뉴스</h3>
        )}
          <WordCloud />
          <Divider flexItem/>
          {selectedRegion && (
            <h5>전체 데이터 셋 : {selectedRegion}</h5>
          )}
        </div>
      </div>
    </div>

  );
};

export default Region;
