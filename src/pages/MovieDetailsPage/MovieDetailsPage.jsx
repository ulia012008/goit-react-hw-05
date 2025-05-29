import { useEffect, useRef, useState } from "react";
import {
  useParams,
  useNavigate,
  useLocation,
  Link,
  Outlet,
} from "react-router-dom";
import { getMovieDetails } from "../../api/tmdb";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const backLinkRef = useRef(location.state?.from || "/");

  useEffect(() => {
    getMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  const backLink = location.state?.from || "/";

  return (
    <div>
      <button onClick={() => navigate(backLinkRef.current)}>← Go Back</button>
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
          <Link
            to={`/movies/${movieId}/cast`}
            state={{ from: backLinkRef.current }}
          >
            Cast
          </Link>
        </li>
        <li>
          <Link
            to={`/movies/${movieId}/reviews`}
            state={{ from: backLinkRef.current }}
          >
            Reviews
          </Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}
