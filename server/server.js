const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const multer = require("multer");
const path = require("path");

const mongoose = require("mongoose");
const connect = mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());

app.use("/images", express.static(path.join(__dirname, "public/images")));

//  middleware
// app.use(express.json());
// app.use(helmet());
// app.use(morgan("common"));

// upload images
// const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });
// console.log(upload);
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    console.log(req);
    return res.status(200).json("File uploaded successfully!");
  } catch (err) {
    console.log(err);
  }
});

app.use("/api/users", require("./routes/users"));
app.use("/api/favorite", require("./routes/favorite"));
app.use("/api/comment", require("./routes/comment"));
app.use("/api/like", require("./routes/like"));
app.use("/uploads", express.static("uploads"));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
