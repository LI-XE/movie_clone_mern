import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LikeDislike from "./LikeDislike";
import { REACT_APP_PUBLIC_FOLDER } from "../Config";

function SingleComment({
  comment,
  postId,
  refreshComment,
  commentId,
  parentCommentId,
  afterDeleteComment,
  tagTo,
}) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [commentValue, setCommentValue] = useState("");
  const [OpenReply, setOpenReply] = useState(false);
  const PF = REACT_APP_PUBLIC_FOLDER;

  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const openReply = (e) => {
    e.preventDefault();
    setOpenReply(!OpenReply);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = tagTo
      ? {
          writer: userInfo._id,
          postId: postId,
          responseTo: parentCommentId,
          content: commentValue,
          tag: tagTo,
        }
      : {
          writer: userInfo._id,
          postId: postId,
          responseTo: comment._id,
          content: commentValue,
        };

    axios
      .post("http://localhost:5000/api/comment/saveComment", variables, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${userInfo?.token}` },
      })
      .then((response) => {
        if (response.data.success) {
          setCommentValue("");
          setOpenReply(!OpenReply);
          refreshComment(response.data.result);
        } else {
          alert("Failed to save Comment");
        }
      });
  };

  const deleteComment = (e, commentId) => {
    e.preventDefault();

    if (!userInfo) {
      alert("Please log in first!");
    }

    axios({
      method: "delete",
      url: `http://localhost:5000/api/comment/deleteComment/${commentId}`,
      commentId: commentId,

      withCredentials: true,
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    })
      .then((res) => {
        if (res.data.success) {
          // console.log(res.data.toDelComment);
          afterDeleteComment();
        } else {
          alert("Failed to Delete Comment.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="comment">
      <div className="comment-left">
        <Link to={`/profile/${comment.writer._id}`}>
          <img
            src={
              comment.writer.image
                ? PF + comment.writer.image
                : PF + "noAvatar.png"
            }
            alt={comment.writer.name}
          />
        </Link>
      </div>
      <div className="comment-right">
        <div>
          <Link to={`/profile/${comment.writer._id}`}>
            <p>{comment.writer.name}</p>
          </Link>
          <p className="content">
            {comment.tag && (
              <span>
                <Link to={`/profile/${comment.tag._id}`}>
                  @ {comment.tag.name}
                </Link>
              </span>
            )}
            {comment.content}
          </p>
          <small>{comment.createdAtFormmated}</small>
          <div className="likes">
            <LikeDislike
              comment={comment}
              commentId={commentId}
              userInfo={userInfo}
            />
            <Link to="#" onClick={openReply}>
              <p>REPLY</p>
            </Link>
            {comment.writer._id === userInfo._id ? (
              <Link to="#" onClick={(e) => deleteComment(e, commentId)}>
                delete
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>

        {OpenReply && (
          <form className="comment-reply-form" onSubmit={onSubmit}>
            <textarea
              required
              name="comment"
              placeholder="Add a comment."
              onChange={handleChange}
              value={commentValue}
            >
              Add a comment
            </textarea>
            <button type="submit" onClick={onSubmit}>
              send
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default SingleComment;
