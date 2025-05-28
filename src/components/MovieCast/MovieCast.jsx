import { useEffect, useState } from "react";
import { getMovieCredits } from "../../api/tmdb";

export default function MovieCast({ id }) {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    getMovieCredits(id).then(setCast);
  }, [id]);

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
