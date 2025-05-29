import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../api/tmdb";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!movieId) return;
    getMovieReviews(movieId)
      .then(setReviews)
      .catch((error) => console.error("Failed to load reviews:", error));
  }, [movieId]);

  return (
    <ul>
      {reviews.length > 0 ? (
        reviews.map(({ id, author, content }) => (
          <li key={id}>
            <h4>{author}</h4>
            <p>{content}</p>
          </li>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </ul>
  );
}
