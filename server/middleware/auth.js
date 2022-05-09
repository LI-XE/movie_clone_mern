const jwt = require("jsonwebtoken");

module.exports = {
  authenticate(req, res, next) {
    const token = req.cookies.usertoken;
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        console.log(err);
        res.status(401).json({ isAuth: false, error: true });
      } else {
        req.token = token;
        req.user = user;
        console.log("You are authenticated");
        next();
      }
    });
  },

  // generateToken: (user) => {
  //   return (user.token = jwt.sign(
  //     user._id.toHexString(),
  //     process.env.JWT_SECRET || "somethingsecret",
  //     { expiresIn: "30d" }
  //   ));
  // },

  // isAuth: (req, res, next) => {
  //   const authorization = req.headers.authorization;
  //   if (authorization) {
  //     const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
  //     jwt.verify(
  //       token,
  //       process.env.JWT_SECRET || "somethingsecre",
  //       (err, decode) => {
  //         if (err) {
  //           console.log(err);
  //           res.status(401).send({ message: "Invalid Token" });
  //         } else {
  //           console.log("authorization!!!");
  //           req.user = decode;
  //           next();
  //         }
  //       }
  //     );
  //   } else {
  //     res.status(401).send({ message: "No Token." });
  //   }
  // },
};

// const { User } = require('../models/User');

// let auth = (req, res, next) => {
//   let token = req.cookies.usertoken;

//   User.findByToken(token, (err, user) => {
//     if (err) throw err;
//     if (!user)
//       return res.json({
//         isAuth: false,
//         error: true
//       });

//     req.token = token;
//     req.user = user;
//     console.log("You are authenticated!")
//     next();
//   });
// };

// module.exports = { auth };
