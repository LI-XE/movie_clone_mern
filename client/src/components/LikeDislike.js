import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function LikeDislike({ comment, commentId, userInfo }) {
  // const userSignin = useSelector((state) => state.userSignin);
  // const { userInfo } = userSignin;

  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DislikeAction, setDislikeAction] = useState(null);

  const variable = { commentId: commentId, userId: userInfo._id };

  useEffect(() => {
    axios
      .post("http://localhost:5000/api/like/getLikes", variable)
      .then((response) => {
        // console.log("getLikes", response.data);

        if (response.data.success) {
          //How many likes does this video or comment have
          setLikes(response.data.likes.length);

          //if I already click this like button or not
          response.data.likes.map((like) => {
            if (like.userId === userInfo._id) {
              setLikeAction("liked");
            }
          });
        } else {
          alert("Failed to get likes");
        }
      });

    axios
      .post("http://localhost:5000/api/like/getDislikes", variable)
      .then((response) => {
        // console.log("getDislike", response.data);
        if (response.data.success) {
          //How many likes does this video or comment have
          setDislikes(response.data.dislikes.length);

          //if I already click this like button or not
          response.data.dislikes.map((dislike) => {
            if (dislike.userId === userInfo._id) {
              setDislikeAction("disliked");
            }
          });
        } else {
          alert("Failed to get dislikes");
        }
      });
  }, []);

  const onLike = () => {
    if (!userInfo) {
      alert("Please Log in first");
    }

    if (LikeAction === null) {
      axios
        .post("http://localhost:5000/api/like/upLike", variable)
        .then((response) => {
          if (response.data.success) {
            setLikes(Likes + 1);
            setLikeAction("liked");

            //If dislike button is already clicked

            if (DislikeAction !== null) {
              setDislikeAction(null);
              setDislikes(Dislikes - 1);
            }
          } else {
            alert("Failed to increase the like");
          }
        });
    } else {
      axios
        .post("http://localhost:5000/api/like/unLike", variable)
        .then((response) => {
          if (response.data.success) {
            setLikes(Likes - 1);
            setLikeAction(null);
          } else {
            alert("Failed to decrease the like");
          }
        });
    }
  };

  const onDisLike = () => {
    if (!userInfo) {
      alert("Please Log in first");
    }

    if (DislikeAction !== null) {
      axios
        .post("http://localhost:5000/api/like/unDisLike", variable)
        .then((response) => {
          if (response.data.success) {
            setDislikes(Dislikes - 1);
            setDislikeAction(null);
          } else {
            alert("Failed to decrease dislike");
          }
        });
    } else {
      axios
        .post("http://localhost:5000/api/like/upDisLike", variable)
        .then((response) => {
          if (response.data.success) {
            setDislikes(Dislikes + 1);
            setDislikeAction("disliked");

            //If dislike button is already clicked
            if (LikeAction !== null) {
              setLikeAction(null);
              setLikes(Likes - 1);
            }
          } else {
            alert("Failed to increase dislike");
          }
        });
    }
  };

  return (
    <div className="row">
      <Link to="#" onClick={onLike}>
        <div className="likes">
          {LikeAction === "liked" ? (
            <i class="fa fa-solid fa-thumbs-up"></i>
          ) : (
            <i className="fa">&#xf087;</i>
          )}
          <p>{Likes}</p>
        </div>
      </Link>
      <Link to="#" onClick={onDisLike}>
        <div className="likes">
          {DislikeAction === "disliked" ? (
            <i class="fa fa-solid fa-thumbs-down"></i>
          ) : (
            <i className="fa">&#xf088;</i>
          )}
          <p>{Dislikes}</p>
        </div>
      </Link>
    </div>
  );
}

export default LikeDislike;
