import React from "react";
import WordCloud from "react-wordcloud";
import { useNavigate } from "react-router-dom";

const WordCloudContainer = () => {
  const navigate = useNavigate();

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
    { text: "Next.js", value: 35 },
    { text: "Gatsby", value: 25 },
    { text: "Vue.js", value: 30 },
    { text: "Angular", value: 20 },
    { text: "jQuery", value: 25 },
    { text: "Bootstrap", value: 30 },
    { text: "Material UI", value: 20 },
    { text: "GraphQL", value: 25 },
    { text: "RESTful API", value: 30 },
    { text: "OAuth", value: 20 },
    { text: "JSON", value: 25 },
    { text: "XML", value: 30 },
    { text: "SQL", value: 20 },
    { text: "NoSQL", value: 25 },
    { text: "Firebase", value: 30 },
    { text: "AWS", value: 20 },
    { text: "Heroku", value: 25 },
  ];

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
