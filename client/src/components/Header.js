import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../actions/userActions";

function Header() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

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
      {userInfo ? (
        <Link to="/login" onClick={signoutHandler}>
          <div className="row  row-1">
            <div className="icon">
              <i className="fa fa-user"></i>
            </div>
            <div>
              <span>Logout</span>
            </div>
          </div>
        </Link>
      ) : (
        <Link to={!userInfo && "/login"}>
          <div className="row  row-1">
            <div className="icon">
              <i className="fa fa-user"></i>
            </div>
            <div>
              <span>Login</span>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}

export default Header;
