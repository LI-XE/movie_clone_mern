import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function FavoriteBtn(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [favoriteNumber, setFavoriteNumber] = useState(0);
  const [favorited, setFavorited] = useState(false);

  const navigate = useNavigate();

  const variables = {
    userFrom: props.userFrom,
    movieId: props.movieId,
    movieTitle: props.movieInfo.original_title,
    moviePost: props.movieInfo.poster_path,
    movieRunTime: props.movieInfo.runtime,
  };


  const onClickFavorite = () => {
    if (!userInfo) {
      // alert("Please log in first!");
      navigate("/login");
    }

    if (favorited) {
      axios
        .post(
          `http://localhost:5000/api/favorite/removeFromFavorite`,
          variables,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${userInfo?.token}` },
          }
        )
        .then((res) => {
          if (res.data.success) {
            setFavoriteNumber(favoriteNumber - 1);
            setFavorited(!favorited);
          } else {
            alert("Failed to remove from Favorite.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(`http://localhost:5000/api/favorite/addToFavorite`, variables, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${userInfo.token}` },
        })
        .then((res) => {
          if (res.data.success) {
            setFavoriteNumber(favoriteNumber + 1);
            setFavorited(!favorited);
          } else {
            alert("Failed to add to Favorite.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    axios
      .post(`http://localhost:5000/api/favorite/favoriteNumber`, variables)
      .then((res) => {
        if (res.data.success) {
          // console.log(res.data);
          setFavoriteNumber(res.data.favoriteNumber);
        } else {
          alert("Failed to get favoriteNumber.");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post(`http://localhost:5000/api/favorite/favorited`, variables, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${userInfo?.token}` },
      })
      .then((res) => {
        if (res.data.success) {
          // console.log(res.data);
          setFavorited(res.data.favorited);
        } else {
          alert("Failed to get Favorite Info");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userInfo?.token, variables, favoriteNumber, favorited]);

  return (
    <div>
      <button type="submit" onClick={onClickFavorite}>
        {favorited ? " Remove From Favorite" : " Add To Favorite "}
        {favoriteNumber}
      </button>
    </div>
  );
}

export default FavoriteBtn;
