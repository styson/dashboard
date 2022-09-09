import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";

import Home from './pages/home';
import Milestone from './pages/milestone';

export default function Website() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/milestone" element={<Milestone />} />
      </Routes>
    </Router>
  );
}
