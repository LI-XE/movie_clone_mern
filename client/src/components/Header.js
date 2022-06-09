import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <Link to="/">
        <div className="row  row-1">
          <div className="icon">
            <i className="fa fa-film "></i>
          </div>
          <div className="name">
            <h4>Movie DB</h4>
          </div>
        </div>
      </Link>

      <Link to="/favorite">
        <div className="row  row-1">
          <div className="icon">
            <i className="fa fa-heart"></i>
          </div>
          <div>
            <span>Favorite</span>
          </div>
        </div>
      </Link>

      
        <Link to="/login">
          <div className="row  row-1">
            <div className="icon">
              <i className="fa fa-user"></i>
            </div>
            <div>
              <span>Login</span>
            </div>
          </div>
        </Link>
    </div>
  );
}

export default Header;
