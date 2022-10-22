const jwt = require("jsonwebtoken");
// const User = require("../models/user");

module.exports = {
  authenticate(req, res, next) {
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = authorization.slice(7, authorization.length);
      jwt.verify(token, "secret", (err, payload) => {
        if (err) {
          console.log(err);
          res.status(401).json({ isAuth: false, error: true });
        } else {
          req.token = token;
          req.user = payload;
          console.log("You are authenticated");
          next();
        }
      });
    } else {
      res.status(401).send({ message: "No Token." });
    }
  },
};
