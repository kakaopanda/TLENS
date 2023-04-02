import React, { useState } from "react";
import { Box, Divider } from "@mui/material";
import KoreaMap from "../../components/Region-Components/KoreaMap";
import WordCloud from "../../components/Region-Components/WordCloud";
import KeywordNews from "../../components/Region-Components/KeywordNews";

import "./Region.scss";

const Region = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);

  function handleRegionSelect(name) {
    setSelectedRegion(name);
  }

  function handleWordSelect(word) {
    setSelectedWord(word);
  }

  return (
    <div style={{ "font-family": 'Jua, sans-serif' }}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          borderRadius: "20px",
          height: "130px",
          marginBottom: "20px",
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
          <h2>T:LENS 지역별 키워드 분석</h2>
          <h2 style={{ color: "white" }}>
            지역별 트렌드 정보 및 관련기사를 확인하실 수 있습니다.
          </h2>
        </div>
      </Box>

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
          <div className="wordcloud" style={{ width: "45%" }}>
          {selectedRegion ? (
            <>
              {selectedRegion && <h2>"{selectedRegion}"와 관련된 T:LENS 뉴스</h2>}
              <WordCloud onWordSelect={handleWordSelect} region={selectedRegion}/>
              <Divider flexItem />
              <div className="region-result">
                {selectedRegion && (
                  <h3>전체 데이터 셋 : {selectedRegion}</h3>
                )}

                {selectedWord && (
                  <h3>선택한 트렌드: {selectedWord.text} ( {selectedWord.value} )건</h3>
                )}
                {selectedWord && (
                  <KeywordNews keyword = {selectedWord.text} region = {selectedRegion}/>
                )}
              </div>
            </>
          ) : (
            <h1 className="wordcloud-message">지역을 선택해주세요</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Region;
