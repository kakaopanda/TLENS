import React from "react";
import WordCloud from "react-wordcloud";
import { useNavigate } from "react-router-dom";
import dummy from "./data.json";

const WordCloudContainer = ({ category }) => {
  const navigate = useNavigate();
  const data = dummy[category - 1];

  const options = {
    fontSizes: [10, 60],
    rotations: 2,
    rotationAngles: [0, 90],
    padding: 1,
    willReadFrequently: true,
  };

  const handleWordClick = (word) => {
    navigate(`/search/${word.text}`);
  };

  return (
    <div>
      <WordCloud
        words={data}
        options={options}
        callbacks={{
          onWordClick: handleWordClick,
        }}
      />
    </div>
  );
};

export default WordCloudContainer;
