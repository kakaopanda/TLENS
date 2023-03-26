import "./App.scss";

import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./layout/Header";
import Home from "./pages/Home";
import Auth from "./pages/Auth"
import Main from "./pages/Main";
import SearchResult from "./pages/SearchResult";
import Company from "./pages/Company";
import Region from "./pages/Region";
import Reporter from "./pages/Reporter";
import CompanyDetail from "./components/Company-Components/CompanyDetail";
import Statistics from "./pages/Statistics";
import Mypage from "./pages/Mypage";
import ReporterDetail from "./components/Reporter-Components/ReporterDetail";


function App() {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";
  const showHeader = !isHomePage;

  return (
    <React.Fragment>
      {showHeader && <Header />}
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/main" element={<Main />} />
          <Route path="/search/:keyword" element={<SearchResult />} />
          <Route path="/company" element={<Company />} />
          <Route path="/region" element={<Region />} />
          <Route path="/reporter" element={<Reporter />} />
          <Route path="/company/:name" element={<CompanyDetail />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/reporter/:name" element={<ReporterDetail />} />
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default App;
