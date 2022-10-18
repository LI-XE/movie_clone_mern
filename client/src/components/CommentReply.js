import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentSingle from "./CommentSingle";
import CommentReply from "./CommentReply";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const navigate = useNavigate();

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

  // const afterDeleteChildComment = (deletedCm) => {
  //   // const commentNum = ChildCommentNumber;
  //   commentLists.map((comment) => {
  //     const commentNum = ChildCommentNumber;

  //     if (comment.responseTo === parentCommentId && commentNum > 0) {
  //       if (comment._id === deletedCm._id) {
  //         commentNum--;
  //       } else if (comment.responseTo === deletedCm) {
  //         commentNum--;
  //       }
  //       setChildCommentNumber(commentNum);
  //     } else if (commentNum === 0) {
  //       setOpenReplyComments(false);
  //     }
  //   });
  // };

  // const afterDeleteChildComment = (deletedCommentId) => {
  //   console.log(deletedCommentId);
  //   const commentNum = ChildCommentNumber;
  //   commentLists.map((comment) => {
  //     if (
  //       comment._id === deletedCommentId &&
  //       comment.responseTo === parentCommentId
  //     ) {
  //       // setChildCommentNumber(ChildCommentNumber--);
  //       commentNum--;
  //     } else if (
  //       comment.responseTo === deletedCommentId &&
  //       deletedCommentId === parentCommentId
  //     ) {
  //       deletedCommentId = comment._id;
  //       // setChildCommentNumber(ChildCommentNumber--);
  //       commentNum--;
  //     }
  //     setChildCommentNumber(commentNum);
  //     navigate(`/movie/${postId}`);
  //   });

  // console.log(ChildCommentNumber);
  // if (ChildCommentNumber > 0 && comment.responseTo === parentCommentId) {
  //   setChildCommentNumber(ChildCommentNumber--);
  //   navigate(`/movie/${postId}`);
  //   console.log("hi");
  // } else if (ChildCommentNumber === 0) {
  //   setOpenReplyComments(false);
  // }
  // };

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
              // afterDeleteChildComment={afterDeleteChildComment}
              // setChildCommentNumber={setChildCommentNumber}
              // ChildCommentNumber={ChildCommentNumber}
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

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import CommentSingle from "./CommentSingle";
// import CommentReply from "./CommentReply";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// function ReplyComment({
//   comment,
//   commentLists,
//   postId,
//   parentCommentId,
//   refreshComment,
//   setCommentLists,
//   removeComments,
//   // deleteComment,
//   // afterDeleteComment,
// }) {
//   const [childReply, setChildReply] = useState([]);
//   const [ChildCommentNumber, setChildCommentNumber] = useState(0);
//   const [OpenReplyComments, setOpenReplyComments] = useState(false);
//   const userSignin = useSelector((state) => state.userSignin);
//   const { userInfo } = userSignin;

//   const navigate = useNavigate();

//   useEffect(() => {
//     let commentNumber = 0;
//     commentLists.map((comment) => {
//       if (comment.responseTo === parentCommentId) {
//         commentNumber++;
//       }
//       // childReply.length();
//     });
//     setChildCommentNumber(commentNumber);
//   }, [commentLists, parentCommentId]);

//   // const addToChild = (replyToChild) => {
//   //   if (replyToChild.responseTo === comment._id) {
//   //     setChildReply(childReply.appeand(replyToChild));
//   //     setChildCommentNumber(childReply.length());
//   //     console.log(replyToChild);
//   //     console.log(childReply);
//   //   } else if (replyToChild.responseTo === parentCommentId) {
//   //     setChildReply(childReply.appeand(replyToChild));
//   //     setChildCommentNumber(childReply.length());
//   //     console.log(replyToChild);
//   //     console.log(childReply);
//   //   }
//   // };

//   // console.log(replyToChild);
//   // console.log(childReply);

//   // const deleteComment = (parentCommentId){
//   //   if (ChildCommentNumber >= 1){
//   //     var i = 0;
//   //   while (i < commentLists.length) {
//   //     if (commentLists[i].responseTo === parentCommentId) {
//   //       // if (ChildCommentNumber > 0) {
//   //       deleteComment(commentLists[i]._id);
//   //       commentLists.splice(i, 1);
//   //       console.log(i);
//   //       console.log("LOVE");
//   //       // }
//   //     } else {
//   //       ++i;
//   //     }
//   //   }
//   //   setCommentLists(commentLists.filter((x) => x._id !== parentCommentId));
//   //   console.log(commentLists);
//   // };
//   //   }
//   // }

//   // const deleteComment = (parentCommentId) => {
//   //   if (!userInfo) {
//   //     alert("Please log in first!");
//   //   }

//   //   axios
//   //     .delete(
//   //       `http://localhost:5000/api/comment/deleteComment/${parentCommentId}`,
//   //       {
//   //         commentId: parentCommentId,
//   //       }
//   //     )
//   //     .then((res) => {
//   //       if (res.data.success) {
//   //         console.log(parentCommentId);
//   //         // console.log(comment);
//   //         console.log(res.data.deletedComment);
//   //         navigate(`/movie/${postId}`);
//   //       } else {
//   //         alert("Failed to Delete Comment.");
//   //       }
//   //     })
//   //     .catch((err) => {
//   //       console.log(err);
//   //     });
//   // };

//   const afterDeleteChildComment = (commentId) => {
//     // e.preventDefault();
//     console.log(commentId);

//     if (parentCommentId === commentId) {
//       setChildCommentNumber(ChildCommentNumber--);
//       setCommentLists(commentLists.filter((x) => x._id !== parentCommentId));
//       console.log(ChildCommentNumber);
//       console.log(commentLists);
//     }

//     //   commentLists.map((comment) => {
//     //     if (comment.responseTo === parentCommentId) {
//     //       // deleteComment(comment._id);
//     //       setChildCommentNumber(ChildCommentNumber--);
//     //       commentLists.splice(comment._id, 1);
//     //       setCommentLists(commentLists.filter((x) => x._id !== comment._id));
//     //     }
//     //   });
//     // };
//     //   var i = 0;
//     //   while (i < commentLists.length) {
//     //     if (commentLists[i].responseTo === parentCommentId) {
//     //       // if (ChildCommentNumber > 0) {
//     //       // deleteComment(commentLists[i]._id);
//     //       commentLists.splice(i, 1);
//     //       console.log(i);
//     //       console.log("LOVE");
//     //       // }
//     //     } else {
//     //       ++i;
//     //     }
//     //   }
//     //   setCommentLists(commentLists.filter((x) => x._id !== parentCommentId));
//     //   console.log(commentLists);
//   };

//   let renderReplyComment = (parentCommentId) =>
//     commentLists.map((comment, index) => (
//       <>
//         {comment.responseTo === parentCommentId && (
//           <div>
//             <CommentSingle
//               comment={comment}
//               postId={postId}
//               refreshComment={refreshComment}
//               commentId={comment._id}
//               commentLists={commentLists}
//               setCommentLists={setCommentLists}
//               afterDeleteComment={afterDeleteChildComment}
//               parentCommentId={parentCommentId}
//               toResponseTo={comment.writer.name}
//               // addToChild={addToChild}
//             />
//             <CommentReply
//               commentLists={commentLists}
//               parentCommentId={comment._id}
//               postId={postId}
//               refreshComment={refreshComment}
//               commentId={comment._id}
//               afterDeleteComment={afterDeleteChildComment}
//             />
//           </div>
//         )}
//       </>
//     ));

//   const handleChange = () => {
//     setOpenReplyComments(!OpenReplyComments);
//   };

//   return (
//     <div className="commentsReply">
//       {ChildCommentNumber > 0 && (
//         <div className="viewNumber" onClick={handleChange}>
//           {OpenReplyComments ? (
//             <>
//               <i class="fa fa-solid fa-sort-up"></i>
//               <p>
//                 Hide {ChildCommentNumber} {ChildCommentNumber === 1 && "Reply"}{" "}
//                 {ChildCommentNumber > 1 && "Replies"}
//               </p>
//             </>
//           ) : (
//             <>
//               <i class="fa fa-solid fa-sort-down"></i>
//               <p>
//                 View {ChildCommentNumber} {ChildCommentNumber === 1 && "Reply"}{" "}
//                 {ChildCommentNumber > 1 && "Replies"}
//               </p>
//             </>
//           )}
//         </div>
//       )}

//       {OpenReplyComments && renderReplyComment(parentCommentId)}
//     </div>
//   );
// }

// export default ReplyComment;

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import CommentSingle from "./CommentSingle";
// // import CommentReply from "./CommentReply";
// // import { useSelector } from "react-redux";
// // import { useNavigate } from "react-router-dom";

// // function ReplyComment({
// //   comment,
// //   commentLists,
// //   postId,
// //   parentCommentId,
// //   refreshComment,
// //   setCommentLists,
// //   removeComments,
// //   // deleteComment,
// //   // afterDeleteComment,
// // }) {
// //   const [childReply, setChildReply] = useState([]);
// //   const [ChildCommentNumber, setChildCommentNumber] = useState(0);
// //   const [OpenReplyComments, setOpenReplyComments] = useState(false);
// //   const userSignin = useSelector((state) => state.userSignin);
// //   const { userInfo } = userSignin;

// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     let commentNumber = 0;
// //     commentLists.map((comment) => {
// //       if (comment.responseTo === parentCommentId) {
// //         commentNumber++;
// //       }
// //       // childReply.length();
// //     });
// //     setChildCommentNumber(commentNumber);
// //   }, [commentLists, parentCommentId]);

// //   const addToChild = (replyToChild) => {
// //     if (replyToChild.responseTo === comment._id) {
// //       setChildReply(childReply.appeand(replyToChild));
// //       setChildCommentNumber(childReply.length());
// //       console.log(replyToChild);
// //       console.log(childReply);
// //     } else if (replyToChild.responseTo === parentCommentId) {
// //       setChildReply(childReply.appeand(replyToChild));
// //       setChildCommentNumber(childReply.length());
// //       console.log(replyToChild);
// //       console.log(childReply);
// //     }
// //   };

// //   // console.log(replyToChild);
// //   // console.log(childReply);

// //   // const deleteComment = (parentCommentId){
// //   //   if (ChildCommentNumber >= 1){
// //   //     var i = 0;
// //   //   while (i < commentLists.length) {
// //   //     if (commentLists[i].responseTo === parentCommentId) {
// //   //       // if (ChildCommentNumber > 0) {
// //   //       deleteComment(commentLists[i]._id);
// //   //       commentLists.splice(i, 1);
// //   //       console.log(i);
// //   //       console.log("LOVE");
// //   //       // }
// //   //     } else {
// //   //       ++i;
// //   //     }
// //   //   }
// //   //   setCommentLists(commentLists.filter((x) => x._id !== parentCommentId));
// //   //   console.log(commentLists);
// //   // };
// //   //   }
// //   // }

// //   // const deleteComment = (parentCommentId) => {
// //   //   if (!userInfo) {
// //   //     alert("Please log in first!");
// //   //   }

// //   //   axios
// //   //     .delete(
// //   //       `http://localhost:5000/api/comment/deleteComment/${parentCommentId}`,
// //   //       {
// //   //         commentId: parentCommentId,
// //   //       }
// //   //     )
// //   //     .then((res) => {
// //   //       if (res.data.success) {
// //   //         console.log(parentCommentId);
// //   //         // console.log(comment);
// //   //         console.log(res.data.deletedComment);
// //   //         navigate(`/movie/${postId}`);
// //   //       } else {
// //   //         alert("Failed to Delete Comment.");
// //   //       }
// //   //     })
// //   //     .catch((err) => {
// //   //       console.log(err);
// //   //     });
// //   // };

// //   const afterDeleteChildComment = (commentId) => {
// //     // e.preventDefault();
// //     console.log(commentId);

// //     if (parentCommentId === commentId) {
// //       setChildCommentNumber(ChildCommentNumber--);
// //       setCommentLists(commentLists.filter((x) => x._id !== parentCommentId));
// //       console.log(ChildCommentNumber);
// //       console.log(commentLists);
// //     }

// //     //   commentLists.map((comment) => {
// //     //     if (comment.responseTo === parentCommentId) {
// //     //       // deleteComment(comment._id);
// //     //       setChildCommentNumber(ChildCommentNumber--);
// //     //       commentLists.splice(comment._id, 1);
// //     //       setCommentLists(commentLists.filter((x) => x._id !== comment._id));
// //     //     }
// //     //   });
// //     // };
// //     //   var i = 0;
// //     //   while (i < commentLists.length) {
// //     //     if (commentLists[i].responseTo === parentCommentId) {
// //     //       // if (ChildCommentNumber > 0) {
// //     //       // deleteComment(commentLists[i]._id);
// //     //       commentLists.splice(i, 1);
// //     //       console.log(i);
// //     //       console.log("LOVE");
// //     //       // }
// //     //     } else {
// //     //       ++i;
// //     //     }
// //     //   }
// //     //   setCommentLists(commentLists.filter((x) => x._id !== parentCommentId));
// //     //   console.log(commentLists);
// //   };

// //   let renderReplyComment = (parentCommentId) =>
// //     commentLists.map((comment, index) => (
// //       <>
// //         {comment.responseTo === parentCommentId && (
// //           <div>
// //             <CommentSingle
// //               comment={comment}
// //               postId={postId}
// //               refreshComment={refreshComment}
// //               commentId={comment._id}
// //               commentLists={commentLists}
// //               setCommentLists={setCommentLists}
// //               afterDeleteComment={afterDeleteChildComment}
// //               parentCommentId={parentCommentId}
// //               toResponseTo={comment.writer.name}
// //               addToChild={addToChild}
// //             />
// //             <CommentReply
// //               commentLists={commentLists}
// //               parentCommentId={comment._id}
// //               postId={postId}
// //               refreshComment={refreshComment}
// //               commentId={comment._id}
// //               afterDeleteComment={afterDeleteChildComment}
// //             />
// //           </div>
// //         )}
// //       </>
// //     ));

// //   const handleChange = () => {
// //     setOpenReplyComments(!OpenReplyComments);
// //   };

// //   return (
// //     <div className="commentsReply">
// //       {ChildCommentNumber > 0 && (
// //         <div className="viewNumber" onClick={handleChange}>
// //           {OpenReplyComments ? (
// //             <>
// //               <i class="fa fa-solid fa-sort-up"></i>
// //               <p>
// //                 Hide {ChildCommentNumber} {ChildCommentNumber === 1 && "Reply"}{" "}
// //                 {ChildCommentNumber > 1 && "Replies"}
// //               </p>
// //             </>
// //           ) : (
// //             <>
// //               <i class="fa fa-solid fa-sort-down"></i>
// //               <p>
// //                 View {ChildCommentNumber} {ChildCommentNumber === 1 && "Reply"}{" "}
// //                 {ChildCommentNumber > 1 && "Replies"}
// //               </p>
// //             </>
// //           )}
// //         </div>
// //       )}

// //       {OpenReplyComments && renderReplyComment(parentCommentId)}
// //     </div>
// //   );
// // }

// // export default ReplyComment;
