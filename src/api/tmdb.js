import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
};

export const fetchTrendingMovies = async () => {
  const res = await axios.get(`${BASE_URL}/trending/movie/day`, options);
  return res.data.results;
};

export const searchMovies = async (query) => {
  const res = await axios.get(
    `${BASE_URL}/search/movie?query=${query}`,
    options
  );
  return res.data.results;
};

export const getMovieDetails = async (id) => {
  const res = await axios.get(`${BASE_URL}/movie/${id}`, options);
  return res.data;
};

export const getMovieCredits = async (id) => {
  const res = await axios.get(`${BASE_URL}/movie/${id}/credits`, options);
  return res.data.cast;
};

export const getMovieReviews = async (id) => {
  const res = await axios.get(`${BASE_URL}/movie/${id}/reviews`, options);
  return res.data.results;
};
