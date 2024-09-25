// src/components/MovieCard.js
import React from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles/movie-card-style.css";

const MovieCard = ({ movie, renderProviders }) => {
  return (
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
  );
};

export default MovieCard;
