import { useEffect, useState } from "react";
import { getMovieCredits } from "../../api/tmdb";
import { useParams } from "react-router-dom";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    if (!movieId) return;
    getMovieCredits(movieId).then(setCast).catch(console.error);
  }, [movieId]);

  return (
    <ul>
      {cast.map((actor) => (
        <li key={actor.id}>
          {actor.profile_path && (
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
              width="80"
            />
          )}
          <p>{actor.name}</p>
        </li>
      ))}
    </ul>
  );
}
