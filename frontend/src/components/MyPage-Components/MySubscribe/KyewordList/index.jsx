import React, { useState } from 'react';
import data from './data.json';
import { Link } from 'react-router-dom';

function Keyword({ word, onClick, onClickDelete, selected }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '10px',
        margin: '5px',
        backgroundColor: selected ? '#ff9933' : '#0066cc',
        height: '30px',
        fontSize: '15px',
        color: '#ffffff',
        borderRadius: '5px',
      }}

    >
      <span
        style={{
          marginRight: '10px',
          cursor: 'pointer',
        }}
        onClick={() => onClick(word)}
      >
        {word}
      </span>
      {selected || isHovered ? (
        <button
          style={{
            border: 'none',
            backgroundColor: 'transparent',
            color: 'red',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '20px',
            height: '20px',
            marginLeft: '5px',
          }}
          onClick={() => onClickDelete(word)}
        >
          X
        </button>
      ) : null}
    </div>
  );
}

function KeywordDetail({ selectedKeyword }) {
  const keyword = data[selectedKeyword];
  if (!keyword) {
    return null;
  }

  return (
    <div>
      <h2>T:LENS 키워드 : {selectedKeyword}</h2>
      <p>{keyword.description}</p>
    </div>
  );
}

function App() {
  const [selectedKeyword, setSelectedKeyword] = useState('');
  const [keywordData, setKeywordData] = useState(data);

  function handleKeywordClick(word) {
    setSelectedKeyword(word);
  }

  function handleKeywordDelete(word) {
    const newData = { ...keywordData };
    delete newData[word];
    setSelectedKeyword('');
    setKeywordData(newData);
  }

  return (
    <div>
      <div>
        {Object.keys(keywordData).map((word) => (
          <Keyword
            key={word}
            word={word}
            onClick={handleKeywordClick}
            onClickDelete={handleKeywordDelete}
            selected={selectedKeyword === word}
          />
        ))}
      </div>
      <KeywordDetail selectedKeyword={selectedKeyword} />
      {selectedKeyword && (
        <Link to={`/search/${selectedKeyword}`} className="keyword-search">
          {selectedKeyword}에 대한 키워드 검색 >>
        </Link>
      )}
    </div>
  );
}

export default App;
