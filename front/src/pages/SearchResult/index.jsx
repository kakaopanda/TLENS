import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SearchResult = () => {
  const { keyword } = useParams();

  return (
    <div>
      <h2>{keyword}를 검색한 결과 입니다.</h2>
    </div>
  );
};

export default SearchResult;
