const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const { authenticate, generateToken } = require("../middleware/auth");

router.get("/auth", authenticate, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image,
  });
});

router.post("/register", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then((newUser) => {
      console.log("successful registration");

      const token = jwt.sign(newUser._id.toHexString(), "secret");
      res.json({
        message: "Successfully registered",
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        token: token,
        success: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, err });
    });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user === null) {
        res.status(400).json({
          loginSuccess: false,
          message: "Auth failed, email not found",
        });
        console.log(err);
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((isPasswordValid) => {
            if (isPasswordValid === true) {
              console.log("password is valid");
              const token = jwt.sign(user._id.toHexString(), "secret");
              // res.cookie("usertokenExp", user.tokenExp);
              res
                .cookie("usertoken", jwt.sign(user._id.toHexString(), "secret"), {
                  httpOnly: true,
                  expires: new Date(Date.now() + 900000000),
                })
                .status(200)
                .json({
                  message: "Successfully logged in",
                  name: user.name,
                  email: user.email,
                  _id: user._id,
                  token: token,
                  loginSuccess: true,
                  isAuth: true,
                });
              console.log(`User!!!!: ${user}`);
            } else {
              res
                .status(400)
                .json({ message: "Email or Password is not correct!" });
            }
          })
          .catch((err) => {
            res.status(400).json({ message: "Invalid Login Attempt - 3" });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "Invalid Login Attempt - 4" });
    });
});

router.get("/logout", authenticate, (req, res) => {
  console.log("Logging out!");
  res.clearCookie("usertoken");
  res.json({ message: "You have successfully logged out of our system" });
});

module.exports = router;
