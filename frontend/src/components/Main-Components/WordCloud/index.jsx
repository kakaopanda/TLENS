import React, { useState, useEffect } from "react";
import WordCloud from "react-wordcloud";

const data = [
  { text: "React", value: 40 },
  { text: "JavaScript", value: 30 },
  { text: "CSS", value: 20 },
  { text: "HTML", value: 25 },
  { text: "Node.js", value: 35 },
  { text: "MongoDB", value: 25 },
  { text: "Express", value: 30 },
  { text: "Webpack", value: 20 },
  { text: "Babel", value: 25 },
  { text: "Redux", value: 30 },
  { text: "TypeScript", value: 20 },
  { text: "Styled Components", value: 25 },
  { text: "React", value: 40 },
  { text: "JavaScript", value: 30 },
  { text: "CSS", value: 20 },
  { text: "HTML", value: 25 },
  { text: "Node.js", value: 35 },
  { text: "MongoDB", value: 25 },
  { text: "Express", value: 30 },
  { text: "Webpack", value: 20 },
  { text: "Babel", value: 25 },
  { text: "Redux", value: 30 },
  { text: "TypeScript", value: 20 },
  { text: "Styled Components", value: 25 },
  { text: "HTML", value: 25 },
];

const WordCloudContainer = () => {
  const [check, setCheck] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCheck(true);
    }, 2000);
  }, []);

  const fontSizeMapper = (word) => Math.log2(word.value) * 10;
  const rotate = (word) => word.value % 360;

  const options = {
    fontSizes: [10, 60],
    rotations: 2,
    rotationAngles: [0, 90],
    padding: 3,
  };

  return (
    <div style={{ maxWidth: "400px" }}>
      {check ? (
        <WordCloud
          words={data}
          fontSizeMapper={fontSizeMapper}
          rotate={rotate}
          options={options}
        />
      ) : (
        <img src={"/images/loading.gif"} alt="loading" />
      )}
    </div>
  );
};

export default WordCloudContainer;
