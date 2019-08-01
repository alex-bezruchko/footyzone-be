const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const users = require("./../data/helpers/userDb");
const secret = require("./../config/secrets").jwtSecret;

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;
  if (user.avatar === undefined || user.avatar.length === 0) {
    user.avatar =
      "https://res.cloudinary.com/htg1iqq1p/image/upload/v1564598526/fwwckvx64nj7tjzxiyne.png";
  }
  users
    .insert(user)
    .then(saved => {
      console.log(saved);
      res.status(201).json(saved);
    })
    .catch(error => {
      if (error.code === "23505") {
        res.status(500).json({ error, message: "User already exists" });
      } else {
        res.status(500).json({
          error,
          message:
            "We had a problem processing your request. Please check all the fields",
        });
      }
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  users
    .findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          token,
          message: `Welcome ${user.username}!`,
          username: user.username,
          user_id: user.id,
          avatar: user.avatar,
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, secret, options);
}

module.exports = router;
