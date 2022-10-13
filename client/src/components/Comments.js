import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CommentSingle from "./CommentSingle";
import CommentReply from "./CommentReply";

function Comments({
  movieTitle,
  postId,
  refreshComment,
  commentLists,
  setCommentLists,
  afterDeleteComment,
}) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [comment, setComment] = useState("");

  const changeComments = (e) => {
    setComment(e.currentTarget.value);
  };

  const submitComment = (e) => {
    e.preventDefault();

    const variables = {
      content: comment,
      writer: userInfo._id,
      postId: postId,
    };

    if (!userInfo) {
      alert("Please Log in first");
    }
    console.log(userInfo);

    console.log(variables);
    console.log(commentLists);

    axios
      .post("http://localhost:5000/api/comment/saveComment", variables, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${userInfo?.token}` },
      })
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
        {commentLists && commentLists.length} Comments -{" "}
        <span>"{movieTitle}"</span>
      </h2>

      {commentLists && commentLists.length === 0 && (
        <div style={{ margin: "1em" }}>
          <h4>Be the first one who shares your thought about this movie!</h4>
        </div>
      )}

      <form onSubmit={submitComment}>
        <textarea
          name="comment"
          placeholder="Add a comment."
          onChange={changeComments}
          value={comment}
          required
        />
        <button type="submit">send</button>
      </form>

      {commentLists?.map(
        (comment, index) =>
          !comment.responseTo && (
            <>
              <CommentSingle
                comment={comment}
                postId={postId}
                refreshComment={refreshComment}
                commentLists={commentLists}
                setCommentLists={setCommentLists}
                commentId={comment._id}
                afterDeleteComment={afterDeleteComment}
              />
              <CommentReply
                comment={comment}
                commentLists={commentLists}
                postId={postId}
                parentCommentId={comment._id}
                refreshComment={refreshComment}
                afterDeleteComment={afterDeleteComment}
              />
            </>
          )
      )}
    </div>
  );
}

export default Comments;
