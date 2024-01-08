import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import MovieCard from "../components/MovieCard";
import { getMovies } from "../services/api";
import { IMovie } from "../components/types";
import PaginationComponent from "../components/pagination";

const Home = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    getMoviesFromAPI();
  }, [search, selectedOption, page]);
  async function getMoviesFromAPI() {
    try {
      const response = await getMovies(page, search, selectedOption);
      setMovies(response.data.movies);
      setCount(response.data.totalMovies);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
  function sendPage(currentpage: number) {
    setPage(currentpage);
    console.log(currentpage);
  }

  return (
    <Layout title="MyIMDb">
      <div className="searchbar">
        <input
          className="nav-inp"
          type="text"
          placeholder="search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="filter"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="filter">filter</option>
          <option value="ASC">A-Z</option>
          <option value="DESC">Z-A</option>
        </select>
      </div>
      <div className="gridBox">
        {movies.map((m) => (
          <div className="movie-card-div" key={m.movie_id}>
            <MovieCard movie={m} />
          </div>
        ))}
      </div>
      <div>
        <PaginationComponent count={count} sendPage={sendPage} />
      </div>
    </Layout>
  );
};

export default Home;
