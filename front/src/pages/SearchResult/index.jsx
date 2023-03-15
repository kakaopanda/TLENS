import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const SearchResult = () => {
  const location = useLocation();

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    setKeyword(location.state);
  }, []);

  return (
    <div>
      <h2>{keyword}</h2>
    </div>
  );
};

export default SearchResult;
