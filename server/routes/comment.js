const express = require("express");
const router = express.Router();
const { Comment } = require("../models/comment");
const { authenticate } = require("../middleware/auth.js");

router.post("/saveComment", (req, res) => {
  const comment = new Comment(req.body);

  comment.save((err, comment) => {
    // console.log(err);
    if (err) return res.json({ success: false, err });

    Comment.find({ _id: comment._id })
      .populate("writer")
      .exec((err, result) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true, result });
        console.log(writer);
      });
  });
});

router.post("/getComments", (req, res) => {
  Comment.find({ postId: req.body.movieId })
    .populate("writer")
    .exec((err, comments) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, comments });
    });
});

router.delete("/deleteComment/:id", (req, res) => {
  console.log(req.params.id);
  Comment.findByIdAndDelete(req.params.id).exec((err, deletedComment) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, deletedComment });
  });
});

module.exports = router;
