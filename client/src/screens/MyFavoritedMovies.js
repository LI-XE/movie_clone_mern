import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IMAGE_BASE_URL } from "../Config";

function MyFavoritedMovies() {
  const [favoritedMovies, setFavoritedMovies] = useState([]);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const variables = {
    userFrom: userInfo._id,
  };

  useEffect(() => {
    getFavoritedMovies();
  }, []);

  const getFavoritedMovies = () => {
    axios
      .post(`http://localhost:5000/api/favorite/getFavoritedMovie`, variables, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${userInfo.token}` },
      })
      .then((res) => {
        if (res.data.success) {
          console.log(favoritedMovies);
          setFavoritedMovies(res.data.favorites);
        } else {
          alert("Failed to get favorited videos!");
        }
      }).catch((err) => {
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
      }).catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="myFavorite">
      <h2>My Favorited Movies</h2>
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
                </td>
                <td>{favorite.movieTitle}</td>
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
    </div>
  );
}

export default MyFavoritedMovies;
