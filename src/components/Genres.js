import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { getMovieGenres } from "../services/tmdbAPI";

const Genres = ({ onSelectGenre, onShowNowPlaying, onShowUpcoming }) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showGenres, setShowGenres] = useState(false); // État pour afficher/masquer les genres
  const [isSmallScreen, setIsSmallScreen] = useState(false); // État pour la taille d'écran

  // Fonction pour détecter la taille de l'écran
  const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= 430); // On cache le toggle si l'écran est petit (<= 430px)
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genresData = await getMovieGenres();
        setGenres(genresData || []);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des genres:", error);
        setGenres([]);
        setLoading(false);
      }
    };

    fetchGenres();

    // Initialiser la détection de la taille de l'écran
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (loading) {
    return <p>Loading genres...</p>;
  }

  const toggleGenres = () => {
    setShowGenres(!showGenres);
  };

  return (
    <Container className="mb-4">
      <div className="d-flex flex-wrap justify-content-center div-genre">
        <Button className="m-2" variant="success" onClick={onShowNowPlaying}>
          Films à l'affiche
        </Button>

        <Button className="m-2" variant="warning" onClick={onShowUpcoming}>
          Films à venir
        </Button>

        {/* Afficher/Masquer genres seulement pour petits écrans */}
        {isSmallScreen && (
          <Button className="m-2" variant="info" onClick={toggleGenres}>
            {showGenres ? "Masquer les genres" : "Afficher les genres"}
          </Button>
        )}

        {/* Affichage des genres basé sur l'état showGenres et la taille de l'écran */}
        {(showGenres || !isSmallScreen) && (
          <>
            {genres.map((genre) => (
              <Button
                key={genre.id}
                className="m-2 genre-btn"
                variant="outline-primary"
                onClick={() => onSelectGenre(genre.id)}
              >
                {genre.name}
              </Button>
            ))}
          </>
        )}
      </div>
    </Container>
  );
};

export default Genres;
