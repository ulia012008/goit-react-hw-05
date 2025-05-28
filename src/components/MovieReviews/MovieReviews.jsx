import { useEffect, useState } from "react";
import { getMovieReviews } from "../../api/tmdb";

export default function MovieReviews({ id }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMovieReviews(id).then(setReviews);
  }, [id]);

  return (
    <ul>
      {reviews.length > 0 ? (
        reviews.map((r) => (
          <li key={r.id}>
            <h4>{r.author}</h4>
            <p>{r.content}</p>
          </li>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </ul>
  );
}
