import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getMovieDetails,
  getMovieCredits,
  getWatchProviders,
} from "../services/tmdbAPI";
import { Container, Row, Col, Button, Image } from "react-bootstrap";

const MovieDetails = () => {
  const { id } = useParams(); // Récupère l'ID du film depuis l'URL
  const navigate = useNavigate(); // Utilise useNavigate pour revenir en arrière
  const [movieDetails, setMovieDetails] = useState({});
  const [movieCredits, setMovieCredits] = useState({ cast: [], crew: [] });
  const [watchProviders, setWatchProviders] = useState({});

  useEffect(() => {
    const fetchMovieData = async () => {
      const details = await getMovieDetails(id);
      const credits = await getMovieCredits(id);
      const providers = await getWatchProviders(id);

      setMovieDetails(details);
      setMovieCredits(credits);
      setWatchProviders(providers.results.FR || {}); // Adapter pour le pays
    };

    fetchMovieData();
  }, [id]);

  const getDirector = () => {
    const director = movieCredits.crew.find(
      (crewMember) => crewMember.job === "Director"
    );
    return director ? director.name : "Unknown Director";
  };

  const renderProviders = () => {
    const allProviders = [
      ...(watchProviders.flatrate || []),
      ...(watchProviders.buy || []),
      ...(watchProviders.rent || []),
    ];

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

  const renderActors = () => {
    return movieCredits.cast.slice(0, 5).map((actor) => (
      <Col key={actor.id} xs={6} md={4} lg={3} className="mb-4 text-center">
        <Image
          src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
          alt={actor.name}
          rounded
          fluid
        />
        <p>{actor.name}</p>
      </Col>
    ));
  };

  return (
    <Container>
      <Button variant="secondary" className="mb-4" onClick={() => navigate(-1)}>
        ← Back to Movies
      </Button>
      <Row>
        <Col md={4}>
          <Image
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={movieDetails.title}
            fluid
          />
        </Col>
        <Col md={8}>
          <h2>{movieDetails.title}</h2>
          <p>
            <strong>Release Date:</strong> {movieDetails.release_date}
          </p>
          <p>
            <strong>Director:</strong> {getDirector()}
          </p>
          <p>
            <strong>Synopsis:</strong> {movieDetails.overview}
          </p>
          <div className="providers-container">
            <strong>Available On:</strong> {renderProviders()}
          </div>
        </Col>
      </Row>

      <div className="mt-4">
        <h5>Top Cast</h5>
        <Row>{renderActors()}</Row>
      </div>
    </Container>
  );
};

export default MovieDetails;
