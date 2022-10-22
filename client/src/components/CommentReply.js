import React, { useEffect, useState } from "react";
import CommentSingle from "./CommentSingle";

function ReplyComment({
  comment,
  commentLists,
  postId,
  parentCommentId,
  refreshComment,
  setCommentLists,
  afterDeleteComment,
}) {
  const [ChildCommentNumber, setChildCommentNumber] = useState(0);
  const [OpenReplyComments, setOpenReplyComments] = useState(false);

  useEffect(() => {
    let index = 0;
    let commentNumber = 0;
    // eslint-disable-next-line array-callback-return
    commentLists.map((comment, key) => {
      key = index++;
      if (comment.responseTo === parentCommentId) {
        commentNumber++;
      }
    });

    setChildCommentNumber(commentNumber);

    if (ChildCommentNumber === 0) {
      setOpenReplyComments(false);
    }
  }, [
    commentLists,
    parentCommentId,
    setChildCommentNumber,
    ChildCommentNumber,
    setOpenReplyComments,
    comment.responseTo,
  ]);

  let renderReplyComment = (parentCommentId) =>
    commentLists.map((comment, index) => (
      <>
        {comment.responseTo === parentCommentId && (
          <div>
            <CommentSingle
              comment={comment}
              postId={postId}
              refreshComment={refreshComment}
              commentId={comment._id}
              commentLists={commentLists}
              setCommentLists={setCommentLists}
              afterDeleteComment={afterDeleteComment}
              parentCommentId={parentCommentId}
              tagTo={comment.writer}
            />
          </div>
        )}
      </>
    ));

  const handleChange = () => {
    setOpenReplyComments(!OpenReplyComments);
  };

  return (
    <div className="commentsReply">
      {ChildCommentNumber === 0
        ? !OpenReplyComments
        : ChildCommentNumber > 0 && (
            <div className="viewNumber" onClick={handleChange}>
              {OpenReplyComments ? (
                <>
                  <i class="fa fa-solid fa-sort-up"></i>
                  <p>
                    Hide {ChildCommentNumber}{" "}
                    {ChildCommentNumber === 1 && "Reply"}{" "}
                    {ChildCommentNumber > 1 && "Replies"}
                  </p>
                </>
              ) : (
                <>
                  <i class="fa fa-solid fa-sort-down"></i>
                  <p>
                    View {ChildCommentNumber}{" "}
                    {ChildCommentNumber === 1 && "Reply"}{" "}
                    {ChildCommentNumber > 1 && "Replies"}
                  </p>
                </>
              )}
            </div>
          )}

      {OpenReplyComments && renderReplyComment(parentCommentId)}
    </div>
  );
}

export default ReplyComment;

