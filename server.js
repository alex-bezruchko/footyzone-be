const express = require("express");
const cors = require("cors");
const server = express();
const logger = require("morgan");
const path = require("path");

const helmet = require("helmet");

server.use(express.json(), logger("dev"), helmet());
server.use(cors());
server.use("/static", express.static(path.join(__dirname, "uploads")));

const newsRoutes = require("./news/newsRoutes");
const oldSchoolRoutes = require("./news/oldSchoolRoutes");

const postsRoutes = require("./posts/postsRoutes");
const userRoutes = require("./users/userRoutes");
const authRoutes = require("./auth/authRouter");

server.get("/", (req, res) => {
  res.status(200).json("Home Page up and running");
});

server.use("/api/news/", newsRoutes);
server.use("/api/old-school/", oldSchoolRoutes);
server.use("/api/blog/", postsRoutes);
server.use("/api/users/", userRoutes);
server.use("/auth/", authRoutes);

module.exports = server;
