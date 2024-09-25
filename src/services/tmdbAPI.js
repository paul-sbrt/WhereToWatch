import axios from "axios";

const apiKey = process.env.REACT_APP_ACCESS_TOKEN;
const baseUrl = "https://api.themoviedb.org/3";
const headers = {
  accept: "application/json",
  Authorization: `Bearer ${apiKey}`,
};

// Fonction pour récupérer les films populaires, avec option de filtrer par genre
export const getPopularMovies = async (page = 1, genreId = null) => {
  const params = {
    include_adult: "false",
    include_video: "false",
    language: "fr-FR",
    page,
    sort_by: "popularity.desc",
  };

  if (genreId) {
    params.with_genres = genreId; // Ajoute le filtre par genre
  }

  const response = await axios.get(`${baseUrl}/discover/movie`, {
    params,
    headers, // Ajoute les headers ici pour le Bearer Token
  });
  return response.data;
};

// Fonction pour récupérer la liste des genres de films
export const getMovieGenres = async () => {
  const response = await axios.get(`${baseUrl}/genre/movie/list`, {
    params: { language: "fr-FR" },
    headers: headers,
  });
  return response.data.genres;
};

// Fonction pour récupérer les détails d'un film
export const getMovieDetails = async (movieId) => {
  const response = await axios.get(`${baseUrl}/movie/${movieId}`, {
    params: { language: "fr-FR" },
    headers: headers,
  });
  return response.data;
};

// Fonction pour récupérer les fournisseurs de diffusion (Watch Providers)
export const getWatchProviders = async (movieId) => {
  const response = await axios.get(
    `${baseUrl}/movie/${movieId}/watch/providers`,
    {
      headers: headers,
    }
  );
  return response.data;
};

// Fonction pour rechercher un film par nom
export const searchMovies = async (query) => {
  const response = await axios.get(`${baseUrl}/search/movie`, {
    params: {
      query: query,
      include_adult: "false",
      language: "fr-FR",
      page: "1",
    },
    headers: headers,
  });
  return response.data;
};

// Fonction pour obtenir les films à venir
export const getUpcomingMovies = async () => {
  const response = await axios.get(`${baseUrl}/movie/upcoming`, {
    params: { language: "fr-FR", page: "1" },
    headers: headers,
  });
  return response.data;
};

// Fonction pour obtenir les films actuellement à l'affiche
export const getNowPlayingMovies = async () => {
  const response = await axios.get(`${baseUrl}/movie/now_playing`, {
    params: { language: "fr-FR", page: "1" },
    headers: headers,
  });
  return response.data;
};

// Fonction pour obtenir les crédits (acteurs) d'un film
export const getMovieCredits = async (movieId) => {
  const response = await axios.get(`${baseUrl}/movie/${movieId}/credits`, {
    params: { language: "fr-FR" },
    headers: headers,
  });
  return response.data;
};
