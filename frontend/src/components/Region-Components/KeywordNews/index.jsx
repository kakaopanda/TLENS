import React, { useState, useEffect } from "react";
import newsData from "../KeywordNews/newsData.json";

const KeywordNews = ({ word, category }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const filteredNews = newsData.filter((item) => {
      if (category === "코로나바이러스") {
        return (
          item.title.includes(word) ||
          item.description.includes(word) ||
          item.content.includes(word)
        );
      } else {
        return item.category === category;
      }
    });

    setNews(filteredNews);
  }, [word, category]);

  return (
    <div>
      <h2>
        "{word}" 관련 {category} 뉴스 ({news.length})
      </h2>
      {news.map((item, index) => (
        <div key={index}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default KeywordNews;
