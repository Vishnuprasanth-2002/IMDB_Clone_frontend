import { useEffect, useState } from "react";
import { IMovie } from "../components/types";
import Layout from "../components/Layout";
import { getMovie, updateMovieApi } from "../services/api";
import { useParams } from "react-router-dom";

const UpdateMovieForm = () => {
  const [moviedata, setMoviedata] = useState<IMovie>({
    movie_name: "",
    image: "",
    movie_desc: "",
    release_year: 0,
  });
  const { id } = useParams();
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
  const [error, setError] = useState<string>("");
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setMoviedata({ ...moviedata, [name]: value });
  }
  function handletextArea(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setMoviedata({ ...moviedata, [name]: value });
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleUpdateMovie(id || "", moviedata);
  }
  async function handleUpdateMovie(id: string, movie: IMovie) {
    try {
      const MoviePayload = {
        movie_name: movie.movie_name,
        image: movie.image,
        movie_desc: movie.movie_desc,
        release_year: movie.release_year,
      };
      console.log(MoviePayload);
      const response = await updateMovieApi(id, MoviePayload);
      console.log(response);
      setError("");
    } catch (error: any) {
      console.log(error.response.data);
      setError(error.response.data.message);
    }
  }
  return (
    <>
      <Layout title="movieForm">
        <h1>MovieForm</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="movie_name">MovieName</label>

          <input
            type="text"
            id="movie_name"
            name="movie_name"
            placeholder="movieName"
            value={moviedata.movie_name}
            onChange={handleChange}
            required
          />

          <label htmlFor="release_year">year</label>

          <input
            type="number"
            id="release_year"
            name="release_year"
            placeholder="year"
            value={moviedata.release_year}
            onChange={handleChange}
          />
          <label htmlFor="movie_desc">Movie_desc</label>

          <textarea
            id="movie_desc"
            name="movie_desc"
            placeholder="Movie_desc"
            value={moviedata.movie_desc}
            onChange={handletextArea}
            required
          />

          <label htmlFor="url">ImageUrl</label>

          <input
            type="text"
            id="url"
            name="image"
            placeholder="ImageUrl"
            value={moviedata.image}
            onChange={handleChange}
            required
          />
          <h3 style={{ color: "red", textAlign: "center" }}>{error}</h3>
          <button type="submit">Submit</button>
        </form>
      </Layout>
    </>
  );
};
export default UpdateMovieForm;
