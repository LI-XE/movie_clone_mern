const express = require("express");
const router = express.Router();
const { Comment } = require("../models/comment");
const { authenticate } = require("../middleware/auth.js");

// Create comment
router.post("/saveComment", (req, res) => {
  const comment = new Comment(req.body);

  comment.save((err, comment) => {
    if (err) return res.json({ success: false, err });

    Comment.find({ _id: comment._id })
      .populate("writer")
      .exec((err, result) => {
        if (err) return res.json({ success: false, err });
        if (req.body.responseTo) {
          Comment.findByIdAndUpdate(
            { _id: req.body.responseTo },
            { $push: { commentResponses: comment._id.toString() } }
          ).exec((err, updated) => {
            if (err) return res.status(400).json({ success: false, err });
          });
        }
        res.status(200).json({ success: true, result });
      });
  });
});

//  Get all comments
router.post("/getComments", (req, res) => {
  Comment.find({ postId: req.body.movieId })
    .populate("writer")
    .exec((err, comments) => {
      if (err) return res.status(400).send(err);
      comments.reverse();
      res.status(200).json({ success: true, comments });
    });
});

// Delete comment
router.delete("/deleteComment/:id", authenticate, (req, res) => {
  Comment.findByIdAndDelete(req.params.id).exec((err, toDelComment) => {
    if (err) return res.status(403).json({ success: false, err });
    if (toDelComment) {
      if (req.user !== toDelComment.writer.toString()) {
        res
          .status(402)
          .json({ success: false, err: "You can delete only your comment!" });
      }
      if (toDelComment.commentResponses) {
        toDelComment.commentResponses.map((comment) => {
          Comment.findByIdAndDelete(comment).exec((err, comment) => {
            if (err) return res.status(403).json({ success: false, err });
            // console.log(`comment: ${comment}`);
          });
        });
      }
      res.status(200).json({ success: true, toDelComment });
    } else {
      res.status(400).json({ success: false, err: "The comment isn't exist" });
    }
  });
});

module.exports = router;
