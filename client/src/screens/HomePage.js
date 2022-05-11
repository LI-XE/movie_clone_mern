import axios from "axios";
import React, { useState, useEffect } from "react";
import MainImage from "../components/MainImage";
import MovieCard from "../components/MovieCard";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../Config";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const endpoint = `${API_URL}popular?api_key=${API_KEY}&language=en-US&page=1`;
    getMovies(endpoint);
  }, []);

  const getMovies = (path) => {
    axios
      .get(path)
      .then((res) => {
        console.log(res.data);
        setMovies([...movies, ...res.data.results]);
        setCurrentPage(res.data.page);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = () => {
    const endpoint = `${API_URL}popular?api_key=${API_KEY}&language=en-US&page=${
      currentPage + 1
    }`;
    getMovies(endpoint);
  };

  return (
    <div className="home">
      {movies[0] && (
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${
            movies[0].backdrop_path && movies[0].backdrop_path
          }`}
          title={movies[0].original_title}
          text={movies[0].overview}
        />
      )}
      <h2>Latest Movies</h2>
      <div className="main">
        {movies?.map((movie, key) => (
          <MovieCard
            image={
              movie.poster_path &&
              `${IMAGE_BASE_URL}w500${movie.poster_path && movie.poster_path}`
            }
            title={movie.original_title}
            movieId={movie.id}
          />
        ))}
      </div>

      <div className="loadmore">
        <button onClick={handleClick}>Load More</button>
      </div>
    </div>
  );
}

export default HomePage;
