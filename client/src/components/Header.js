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
        <div className="row  row-1 logo">
          <div className="icon">
            <i className="fa fa-film"></i>
          </div>
          <div className="name">
            <h4>Movie DB</h4>
          </div>
        </div>
      </Link>
      <div className="header_right">
        <Link to={!userInfo ? "/login" : "/favorite"}>
          <div className="row  row-1">
            <div className="icon">
              <i className="fa fa-heart"></i>
            </div>
            <div>
              <span className="header_little">Favorite</span>
            </div>
          </div>
        </Link>

        {userInfo ? (
          <>
            <Link to={!userInfo ? "/login" : `/profile/${userInfo._id}`}>
              <div className="row  row-1">
                <div className="icon">
                  <i className="fa fa-user"></i>
                </div>
                <div>
                  <span className="header_little">Profile</span>
                </div>
              </div>
            </Link>
            <Link to="/login" onClick={signoutHandler}>
              <div className="row  row-1">
                <div className="icon">
                  <i className="fa fa-sign-out"></i>
                </div>
                <div>
                  <span className="header_little">Logout</span>
                </div>
              </div>
            </Link>
          </>
        ) : (
          <Link to={!userInfo && "/login"}>
            <div className="row  row-1">
              <div className="icon">
                <i className="fa fa-user"></i>
              </div>
              <div>
                <span className="header_little">Login</span>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
