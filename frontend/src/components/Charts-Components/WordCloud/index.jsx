import React, { useEffect, useState } from "react";
import WordCloud from "react-wordcloud";
import { useNavigate } from "react-router-dom";
import dummy from "./data.json";

const WordCloudContainer = ({ category, dummy2 }) => {
  const navigate = useNavigate();
  const [dummyData, setDummyData] = useState([]);
  useEffect(() => {
    if (category) {
      console.log("123124124");
      setDummyData(dummy[category - 1]);
    } else {
      setDummyData(dummy2);
    }
  });

  const data = dummyData;

  const options = {
    fontSizes: [10, 60],
    rotations: 2,
    rotationAngles: [0, 90],
    padding: 1,
    willReadFrequently: true,
  };
  console.log(data);
  console.log(dummy2);

  const handleWordClick = (word) => {
    navigate(`/search/${word.text}`);
  };

  return (
    <div>
      <WordCloud
        style={{ "fontFamily": 'Jua, sans-serif'}}
        words={data}
        options={{
          ...options,
          fontFamily: 'Do Hyeon, sans-serif' 
        }}
        callbacks={{
          onWordClick: handleWordClick,
        }}
      />
    </div>
  );
};

export default WordCloudContainer;
