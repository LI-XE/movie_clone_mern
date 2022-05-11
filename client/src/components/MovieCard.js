import React from "react";
import { Link } from "react-router-dom";

function MovieCard(props) {
  return (
    <div className="card">
      <div key={props.movieId}>
        <Link to={`/movie/${props.movieId}`}>
          <img src={props.image} alt={props.title}></img>
        </Link>
      </div>
    </div>
  );
}

export default MovieCard;
