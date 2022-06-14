const express = require("express");
const router = express.Router();

const { Favorite } = require("../models/Favorite");

const { authenticate } = require("../middleware/auth.js");

//=================================
//             Subscribe
//=================================

router.post("/favoriteNumber", (req, res) => {
  Favorite.find({ movieId: req.body.movieId }).exec((err, favorite) => {
    if (err) return res.status(400).send(err);

    res.status(200).json({ success: true, favoriteNumber: favorite.length });
  });
});

router.post("/favorited", authenticate, (req, res) => {
  Favorite.find({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, favorite) => {
    if (err) return res.status(400).send(err);

    let result = false;
    if (favorite.length !== 0) {
      result = true;
    }

    res.status(200).json({ success: true, favorited: result });
  });
});

router.post("/addToFavorite", authenticate, (req, res) => {
  // console.log(`req.body!!!: ${req.body}`);

  const favorite = new Favorite(req.body);

  favorite.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/removeFromFavorite", authenticate, (req, res) => {
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, doc });
  });
});

router.post("/getFavoredMovie", authenticate, (req, res) => {
  //Need to find all of the Users that I am subscribing to From Subscriber Collection
  Favorite.find({ userFrom: req.body.userFrom }).exec((err, favorites) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, favorites });
  });
});

module.exports = router;
