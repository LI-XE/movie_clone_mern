import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../Config";
import { useParams } from "react-router-dom";
import MainImage from "../components/MainImage";
import Card from "../components/Card";

function MovieDetailPage(props) {
  const [movie, setMovie] = useState();
  const [crews, setCrews] = useState([]);
  const [actorToggle, setActorToggle] = useState(false);
  const { movieId } = useParams();
  console.log(movieId);

  useEffect(() => {
    // const movieId = props.match.params.movieId;
    axios
      .get(`${API_URL}${movieId}?api_key=${API_KEY}&language=en-US`)
      .then((res) => {
        console.log(res.data);
        setMovie(res.data);

        axios
          .get(`${API_URL}${movieId}/credits?api_key=${API_KEY}`)
          .then((res) => {
            setCrews(res.data.crew);
            console.log(res.data.cast);
          });
      });
  }, [movieId]);

  const handleClick = () => {
    setActorToggle(!actorToggle);
  };

  return (
    <div className="movie_detail">
      {movie && (
        <>
          <MainImage
            image={`${IMAGE_BASE_URL}w1280${
              movie.backdrop_path && movie.backdrop_path
            }`}
            title={movie.original_title}
            text={movie.overview}
          />
          <div className="movie_info">
            <div className="favorite">
              <button type="submit">Add to Favorite</button>
            </div>
            <h2>Movie Info</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <td colSpan="2">{movie.original_title}</td>
                  <th>Original Language</th>
                  <td colSpan="2">{movie.original_language}</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Release Date</th>
                  <td colSpan="2">{movie.release_date}</td>
                  <th>Runtime</th>
                  <td colSpan="2">{movie.runtime}</td>
                </tr>
                <tr>
                  <th>Vote Average</th>
                  <td colSpan="2">{movie.vote_average}</td>
                  <th>Vote Count</th>
                  <td colSpan="2">{movie.vote_count}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td colSpan="2">{movie.status}</td>
                  <th>Popularity</th>
                  <td colSpan="2">{movie.popularity}</td>
                </tr>
              </tbody>
            </table>
            <div className="toggle_actor">
              <button type="submit" onClick={handleClick}>
                Toggle Actor View
              </button>
            </div>
            {actorToggle && (
              <div className="main">
                {crews?.map((crew, key) => (
                  <>
                    {crew.profile_path && (
                      <Card
                        actor
                        image={`${IMAGE_BASE_URL}w500${crew.profile_path}`}
                      />
                    )}
                  </>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default MovieDetailPage;