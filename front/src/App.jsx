import "./App.scss";

import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./layout/Header";
import Main from "./pages/Main";
import SearchResult from "./pages/SearchResult";
import Company from "./pages/Company";
import Region from "./pages/Region";
import Repoter from "./pages/Reporter";

function App() {
  return (
    <React.Fragment>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/company" element={<Company />} />
          <Route path="/region" element={<Region />} />
          <Route path="/repoter" element={<Repoter />} />
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default App;
