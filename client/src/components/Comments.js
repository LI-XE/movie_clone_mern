import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CommentSingle from "./CommentSingle";

function Comment({ movieTitle, postId, refreshComment, commentLists }) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [comment, setComment] = useState("");

  const changeComments = (e) => {
    setComment(e.currentTarget.value);
  };

  const submitComment = (e) => {
    e.preventDefault();

    if (!userInfo) {
      alert("Please Log in first");
    }
    console.log(userInfo);
    const variables = {
      content: comment,
      writer: userInfo._id,
      postId: postId,
    };
    console.log(variables);
    console.log(commentLists);

    axios
      .post("http://localhost:5000/api/comment/saveComment", variables)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data);
          setComment("");
          refreshComment(res.data.result);
        } else {
          alert("Failed to save Comment");
        }
      });
  };
  return (
    <div className="comments-section">
      <h2>
        Comments - <span>"{movieTitle}"</span>
      </h2>

      {commentLists?.map((comment, index) => (
        // <div key={index}>
        //   {review.content}
        //   {review.writer}
        // </div>
        <CommentSingle comment={comment} postId={postId} refreshComment={refreshComment} />
      ))}

      <form onSubmit={submitComment}>
        <textarea
          name="comment"
          placeholder="Add a comment."
          onChange={changeComments}
          value={comment}
        >
          Add a comment
        </textarea>
        <button type="submit">send</button>
      </form>
    </div>
  );
}

export default Comment;
