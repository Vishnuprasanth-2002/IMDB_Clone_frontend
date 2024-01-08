import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addRating, deleteMovieApi, getMovie } from "../services/api";
import MyComponent from "../components/rating";

const SingleMovie = () => {
  const [moviedata, setMoviedata] = useState({
    movie_id: "",
    movie_name: "",
    image: "",
    movie_desc: "",
    addedBy: "",
    release_year: 0,
    overallRating: 0,
    ratings: [{ rating: 0, ratedBy: "" }],
  });
  let [message, setMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getMovieFromAPI(id);
  }, [id]);
  async function getMovieFromAPI(id: string | undefined) {
    try {
      const response = await getMovie(id || "");
      setMoviedata(response.data);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }
  function sendRating(rate: number) {
    addRatingFromAPI(id, rate);
  }
  async function addRatingFromAPI(id: string | undefined, rate: number) {
    try {
      const Payload = {
        rating: rate,
      };
      const response = await addRating(id || "", Payload);
      console.log(response);
    } catch (error: any) {
      console.log(error.response.data.message[0]);
      setMessage(error.response.data.message[0]);
    }
  }
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
  const handleDelete = () => {
    console.log("delete");
    deleteMovie(id);
  };
  const deleteMovie = async (id: string | undefined) => {
    try {
      if (id) {
        await deleteMovieApi(id);
        navigate("/");
      }
    } catch (error: any) {
      if (error) {
        console.log(error);
      }
      setMessage(error.response.data.message || error.message.data.message[0]);
    }
  };
  return (
    <>
      <nav className="titleBar">
        <Link to="/" className="logo">
          IMDB
        </Link>

        <ul className="navBar">
          <li className="back" role="button">
            <Link to="/">back</Link>
          </li>
        </ul>
      </nav>
      <div className="single-card">
        <div className="big-card">
          <button onClick={handleDelete} className="delete">
            ❌
          </button>
          <div className="image">
            <img src={moviedata.image} alt={moviedata.movie_name} />
          </div>
          <div className="content">
            <div className="left">
              <h3>{moviedata.movie_name}</h3>
              <p>Year: {moviedata.release_year}</p>
              <p>Rating: {renderStars(moviedata.overallRating)}</p>
              <p>description: {moviedata.movie_desc}</p>
              <p>Addedby: {moviedata.addedBy}</p>
            </div>
            <div className="right">
              <h4>Ratings</h4>
              {moviedata?.ratings.map((r, i) => (
                <div className="ratings" key={i}>
                  <p>
                    rating={renderStars(r.rating)}
                    <br />
                    ratedby:{r.ratedBy}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="rating">
            <MyComponent sendRating={sendRating} />
            {message && <p style={{ color: "red " }}>{message}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleMovie;
