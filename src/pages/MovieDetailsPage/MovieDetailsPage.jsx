import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
  useLocation,
  Link,
  Routes,
  Route,
} from "react-router-dom";
import { getMovieDetails } from "../../api/tmdb";
import { getMovieCredits } from "../../api/tmdb";
import { getMovieReviews } from "../../api/tmdb";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  const backLink = location.state?.from || "/";

  return (
    <div>
      <button onClick={() => navigate(backLink)}>← Go Back</button>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        width="200"
      />
      <p>{movie.overview}</p>
      <p>User Score: {movie.vote_average}</p>

      <hr />
      <h3>Additional Information</h3>
      <ul>
        <li>
          <Link to="cast" state={{ from: backLink }}>
            Cast
          </Link>
        </li>
        <li>
          <Link to="reviews" state={{ from: backLink }}>
            Reviews
          </Link>
        </li>
      </ul>

      <Routes>
        <Route path="cast" element={<MovieCast id={movieId} />} />
        <Route path="reviews" element={<MovieReviews id={movieId} />} />
      </Routes>
    </div>
  );
}
