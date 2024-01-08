import { IMovie } from "./types";
import { Link } from "react-router-dom";

interface IMovieCard {
  movie: IMovie;
}

const MovieCard: React.FC<IMovieCard> = ({ movie }) => {
  const renderStars = (rating: number) => {
    const roundedRating = Math.round(rating);

    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starClassName = i <= roundedRating ? "filled" : "empty";
      stars.push(
        <span key={i} className={`star ${starClassName}`}>
          &#9733;
        </span>
      );
    }

    return stars;
  };
  return (
    <>
      <div className="movie-card">
        <div className="image-block">
          <img src={movie.image} alt={movie.movie_name} />
        </div>
        <h3>{movie.movie_name}</h3>
        <p>Year: {movie.release_year}</p>
        <p>Rating: {renderStars(movie.rating || 0)}</p>
        <Link to={`/movies/${movie.movie_id}`}>
          <button>view</button>
        </Link>
        <Link to={`/updatemovie/${movie.movie_id}`}>
          <button>Edit</button>
        </Link>
      </div>
    </>
  );
};

export default MovieCard;
