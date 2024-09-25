// src/components/MovieCards.js
import React, { useEffect, useState } from "react";
import { Card, Col, Row, Container, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles/card.css";
import {
  getPopularMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
  searchMovies,
  getWatchProviders, // Import pour récupérer les providers
} from "../services/tmdbAPI";
import Paginate from "./Paginate";
import "./styles/movie-card-style.css";

const MovieCards = ({
  searchQuery,
  isSearching,
  selectedGenre,
  showNowPlaying,
  showUpcoming,
}) => {
  const [movies, setMovies] = useState([]);
  const [watchProviders, setWatchProviders] = useState({}); // État pour stocker les providers
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      let movieData;

      if (isSearching && searchQuery) {
        movieData = await searchMovies(searchQuery, currentPage);
      } else if (showNowPlaying) {
        movieData = await getNowPlayingMovies(currentPage);
      } else if (showUpcoming) {
        movieData = await getUpcomingMovies(currentPage);
      } else if (selectedGenre) {
        movieData = await getPopularMovies(currentPage, selectedGenre);
      } else {
        movieData = await getPopularMovies(currentPage);
      }

      if (movieData && Array.isArray(movieData.results)) {
        setMovies(movieData.results);
        setTotalPages(movieData.total_pages);
      }
    };

    fetchMovies();
  }, [
    currentPage,
    isSearching,
    searchQuery,
    selectedGenre,
    showNowPlaying,
    showUpcoming,
  ]);

  // Récupérer les providers pour chaque film
  useEffect(() => {
    const fetchProvidersForMovies = async () => {
      const providersData = {};
      for (const movie of movies) {
        const providers = await getWatchProviders(movie.id);
        providersData[movie.id] = providers.results.FR || {}; // Adapter pour le pays
      }
      setWatchProviders(providersData);
    };

    if (movies.length > 0) {
      fetchProvidersForMovies();
    }
  }, [movies]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Fonction pour afficher les providers sur la carte de chaque film
  const renderProviders = (movieId) => {
    if (!watchProviders[movieId]) return null;

    const allProviders = [...(watchProviders[movieId].flatrate || [])];

    return allProviders.map((provider, index) => (
      <img
        key={`${provider.provider_id}-${index}`}
        src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
        alt={provider.provider_name}
        title={provider.provider_name}
        className="provider-logo"
      />
    ));
  };

  return (
    <Container>
      <Row>
        {movies.map((movie) => (
          <Col xs={6} sm={6} md={4} lg={3} key={movie.id} className="mb-4">
            <Card className="movie-card">
              <Badge bg="warning" text="dark" className="movie-rating">
                {movie.vote_average.toFixed(1)}
              </Badge>
              <div className="image-container">
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-image"
                />
                <div className="overlay">
                  <div className="overlay-content">
                    <h5>{movie.title}</h5>
                    <p>Release Date: {movie.release_date}</p>

                    {/* Afficher les providers ici */}
                    <div className="providers-container">
                      {renderProviders(movie.id)}
                    </div>

                    <div className="d-flex justify-content-center mt-3">
                      <Link to={`/movie/${movie.id}`}>
                        <Button variant="primary">More Details</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <Paginate
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

export default MovieCards;
