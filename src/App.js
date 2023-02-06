import { useEffect, useState } from "react";
import "./App.css";

import SearchIcon from "./search.svg";

import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com?apikey=6e060cef";

function App() {
  // app component

  //Use state always returns an array with the current state
  //and the function that allows you to update the current state
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // async function that awaits a fetch api request
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    // When the request completes, the promise is resolved with the Response object.
    // If the request fails due to some network problems, the promise is rejected.
    const data = await response.json(); // Extracting json from response

    setMovies(data.Search); // The function coming with useState that updates the current state (search)
  };

  return (
    <div className="app">
      <h1>Movieworld</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
