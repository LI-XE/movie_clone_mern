import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IMAGE_BASE_URL } from "../Config";
import MessageBox from "../components/MessageBox";

function MyFavoritedMovies(props) {
  const [favoritedMovies, setFavoritedMovies] = useState([]);
  const navigate = useNavigate();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const getFavoritedMovies = (variables) => {
    axios
      .post(`http://localhost:5000/api/favorite/getFavoritedMovie`, variables, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${userInfo.token}` },
      })
      .then((res) => {
        if (res.data.success) {
          console.log(res.data);
          setFavoritedMovies(res.data.favorites);
        } else {
          alert("Failed to get favorited videos!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeFromFavorite = (movieId, userFrom) => {
    axios
      .post(
        `http://localhost:5000/api/favorite/removeFromFavorite`,
        { movieId, userFrom },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      )
      .then((response) => {
        if (response.data.success) {
          getFavoritedMovies();
        } else {
          alert("Failed to Remove From Favorite");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    const variables = {
      userFrom: userInfo._id,
    };
    getFavoritedMovies(variables);
  }, [navigate, getFavoritedMovies, userInfo]);

  return (
    <div className="myFavorite">
      <h2>My Favorited Movies</h2>

      {favoritedMovies.length === 0 ? (
        <MessageBox>
          Add your favorites.{" "}
          <Link to="/">
            <span>Go Home</span>
          </Link>
        </MessageBox>
      ) : (
        <table className="favorited_table">
          <thead>
            <tr>
              <th>Movie Image</th>
              <th>Movie Title</th>
              <th>Movie Run Time</th>
              <th>Remove from Favorites</th>
            </tr>
          </thead>
          <tbody>
            {favoritedMovies?.map((favorite, index) => (
              <>
                <tr key={index}>
                  <td>
                    <Link to={`/movie/${favorite.movieId}`}>
                      {favorite.moviePost ? (
                        <img
                          src={`${IMAGE_BASE_URL}w92${
                            favorite.moviePost && favorite.moviePost
                          }`}
                          alt={favorite.title}
                        />
                      ) : (
                        "no image"
                      )}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/movie/${favorite.movieId}`}>
                      <h4 style={{ color: "black" }}>{favorite.movieTitle}</h4>
                    </Link>
                  </td>
                  <td>{favorite.movieRunTime}</td>
                  <td>
                    <button
                      onClick={() => {
                        removeFromFavorite(favorite.movieId, favorite.userFrom);
                      }}
                    >
                      Delete from Favorite
                    </button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyFavoritedMovies;
