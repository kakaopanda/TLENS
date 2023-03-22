import "./App.scss";

import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./layout/Header";
import Main from "./pages/Main";
import SearchResult from "./pages/SearchResult";
import Company from "./pages/Company";
import Region from "./pages/Region";
import Reporter from "./pages/Reporter";
import CompanyDetail from "./components/Company-Components/CompanyDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Statistics from "./pages/Statistics";
import Mypage from "./pages/Mypage";
import ReporterDetail from "./components/Reporter-Components/ReporterDetail";

function App() {
  return (
    <React.Fragment>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/search/:keyword" element={<SearchResult />} />
          <Route path="/company" element={<Company />} />
          <Route path="/region" element={<Region />} />
          <Route path="/reporter" element={<Reporter />} />
          <Route path="/company/:name" element={<CompanyDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/reporter/:name" element={<ReporterDetail />} />
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default App;
