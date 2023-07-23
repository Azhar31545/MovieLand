import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import SearchIcon from "/search.svg";
import './App.css'

const API_URL = "http://www.omdbapi.com?apikey=5bdc6b17";

function App() {
  const [movies,setmovies] = useState([]);
  const [searchTerm ,setsearchTerm] = useState('');

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setmovies(data.Search);
  };
  return (
    <>
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input placeholder="Search for movies" 
        value = {searchTerm}
        onChange ={(e)=>setsearchTerm(e.target.value)}
        />
        <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
      </div>

      {movies?.length > 0
        ? (
            <div className="container">
              {movies.map((movie)=> (
                <MovieCard movie={movie} key = ''/>
                ))}
            </div>
        ) :(
          <div className="empty">
            <h2>No movies Found</h2>
          </div>
        )}
    </div>
    </>
  )
}

export default App
