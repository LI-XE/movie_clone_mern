import React from "react";
import { Link } from "react-router-dom";

function Card(props) {
  if (props.actor) {
    return (
      <div className="card">
        <div>
          <img src={props.image} alt={props.name}></img>
        </div>
      </div>
    );
  } else {
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
}

export default Card;
