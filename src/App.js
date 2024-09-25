// src/App.js
import React, { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieCard from "./components/MovieCard";
import Genres from "./components/Genres";
import MovieDetails from "./components/MovieDetails"; // Import de la page de détails du film
import Footer from "./components/Footer";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [showNowPlaying, setShowNowPlaying] = useState(false);
  const [showUpcoming, setShowUpcoming] = useState(false);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(true);
    setShowNowPlaying(false);
    setShowUpcoming(false);
  };

  const handleGenreSelect = (genreId) => {
    setSelectedGenre(genreId);
    setIsSearching(false);
    setShowNowPlaying(false);
    setShowUpcoming(false);
  };

  const handleShowNowPlaying = () => {
    setShowNowPlaying(true);
    setShowUpcoming(false);
    setIsSearching(false);
    setSelectedGenre(null);
  };

  const handleShowUpcoming = () => {
    setShowUpcoming(true);
    setShowNowPlaying(false);
    setIsSearching(false);
    setSelectedGenre(null);
  };

  return (
    <Router>
      <Header onSearch={handleSearch} />
      <Routes>
        {/* Route principale affichant la liste des films */}
        <Route
          path="/"
          element={
            <>
              <Genres
                onSelectGenre={handleGenreSelect}
                onShowNowPlaying={handleShowNowPlaying}
                onShowUpcoming={handleShowUpcoming}
              />
              <MovieCard
                searchQuery={searchQuery}
                isSearching={isSearching}
                selectedGenre={selectedGenre}
                showNowPlaying={showNowPlaying}
                showUpcoming={showUpcoming}
              />
            </>
          }
        />

        {/* Route pour afficher les détails d'un film */}
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
