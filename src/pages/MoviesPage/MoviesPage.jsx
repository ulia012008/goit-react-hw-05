import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies, fetchTrendingMovies } from "../../api/tmdb";
import MovieList from "../../components/MovieList/MovieList";
import CSS from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [params, setParams] = useSearchParams();
  const query = params.get("query") ?? "";
  const [inputValue, setInputValue] = useState(query);
  const [notFound, setNotFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (!query) return;

    setIsLoading(true);
    setErrorMessage("");
    setNotFound(false);

    searchMovies(query)
      .then((data) => {
        setMovies(data);
        if (data.length === 0) {
          setNotFound(true);
          fetchTrendingMovies()
            .then((trending) => {
              setRecommendations(shuffleArray(trending).slice(0, 5));
            })
            .catch(() => {
              setErrorMessage("Failed to load recommendations.");
            });
        } else {
          setRecommendations([]);
        }
      })
      .catch(() => {
        setErrorMessage("Something went wrong. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = inputValue.trim();
    if (!value) {
      setErrorMessage("Please enter a movie name");
      return;
    }
    setParams({ query: value });
    setErrorMessage("");
    setNotFound(false);
  };
  function shuffleArray(array) {
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="query"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (errorMessage) setErrorMessage("");
            if (notFound) setNotFound(false);
          }}
          placeholder="Search movies"
        />
        <button type="submit">Search</button>
      </form>

      {errorMessage && (
        <p
          className={CSS.message}
          style={{ color: "red", marginTop: "0.5rem" }}
        >
          {errorMessage}
        </p>
      )}

      {isLoading && <p className={CSS.message}>Loading...</p>}

      {!isLoading && notFound ? (
        <>
          <p className={CSS.message}>
            No movies found for "{query}". Here are some recommendations:
          </p>
          <MovieList movies={recommendations} />
        </>
      ) : (
        <MovieList movies={movies} />
      )}
    </div>
  );
}
