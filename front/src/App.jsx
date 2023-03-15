import "./App.scss";

import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./layout/Header";
import Main from "./pages/Main";
import SearchResult from "./pages/SearchResult";

function App() {
  return (
    <React.Fragment>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<SearchResult />} />
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default App;
