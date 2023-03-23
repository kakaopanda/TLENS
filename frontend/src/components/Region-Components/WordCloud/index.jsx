import React, { useState } from "react";
import WordCloud from "react-wordcloud";
import KeywordNews from "../KeywordNews";


const WordCloudContainer = () => {
  const [selectedWord, setSelectedWord] = useState(null);

  const fontSizeMapper = (word) => Math.log2(word.value) * 10;
  const rotate = (word) => word.value % 360;

  const data = [
    { text: '코로나바이러스', value: 30 },
    { text: '정치', value: 20 },
    { text: '경제', value: 15 },
    { text: '국제', value: 10 },
    { text: '환경', value: 5 },
    { text: '사회', value: 18 },
    { text: '문화', value: 8 },
    { text: '스포츠', value: 12 },
    { text: '연예', value: 9 },
    { text: '범죄', value: 7 },
    { text: '교육', value: 6 },
    { text: '과학', value: 4 },
    { text: '기술', value: 3 },
    { text: '인권', value: 2 },
    { text: '선거', value: 1 },
    { text: '군사', value: 11 },
    { text: '의료', value: 13 },
    { text: '정부', value: 16 },
    { text: '산업', value: 14 },
    { text: '노동', value: 17 },
  ];

  
  const options = {
    fontSizes: [10, 60],
    rotations: 2,
    rotationAngles: [0, 90],
    padding: 3,
  };

  const handleWordClick = (word) => {
    setSelectedWord({ text: word.text, category: word.category });
  };
  
  return (
    <div>
      <WordCloud
        words={data}
        fontSizeMapper={fontSizeMapper}
        rotate={rotate}
        options={options}
        onWordClick={handleWordClick}
      />
      {selectedWord && (
        <KeywordNews word={selectedWord.text} category={selectedWord.category} />
      )}

    </div>
  );
};

export default WordCloudContainer;
