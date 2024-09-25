import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import {
  getPopularMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
  searchMovies,
  getWatchProviders,
} from "../services/tmdbAPI";
import Paginate from "./Paginate";
import MovieCard from "./MovieCard"; // Import du nouveau composant MovieCard
import "./styles/movie-card-style.css";

const MovieList = ({
  searchQuery,
  isSearching,
  selectedGenre,
  showNowPlaying,
  showUpcoming,
}) => {
  const [movies, setMovies] = useState([]);
  const [watchProviders, setWatchProviders] = useState({});
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

  useEffect(() => {
    const fetchProvidersForMovies = async () => {
      const providersData = {};
      for (const movie of movies) {
        const providers = await getWatchProviders(movie.id);
        providersData[movie.id] = providers.results.FR || {};
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
            <MovieCard movie={movie} renderProviders={renderProviders} />
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

export default MovieList;
