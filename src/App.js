import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CharactersListPage from "./pages/CharactersListPage";
import CharacterDetailPage from "./pages/CharacterDetailPage";
import CharacterByLocationPage from "./pages/CharacterByLocationPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CharactersListPage />} />
        <Route path="/character/:id" element={<CharacterDetailPage />} />
        <Route path="/locations" element={<CharacterByLocationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
