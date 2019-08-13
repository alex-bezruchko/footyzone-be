const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("./../data/helpers/userDb");
const secret = require("./../config/secrets").jwtSecret;

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;
  if (user.avatar === undefined || user.avatar.length === 0) {
    user.avatar =
      "https://res.cloudinary.com/htg1iqq1p/image/upload/v1564598526/fwwckvx64nj7tjzxiyne.png";
  }
  Users
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

router.post("/login", async (req, res) => {
  let { username, password } = req.body;
  let lowerCased = username.toLowerCase();

  try {
    let foundUser = await Users.findBy(lowerCased);
    if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
      const token = generateToken(foundUser);
      res.status(200).json({
        token,
        message: `Welcome ${foundUser.username}!`,
        username: foundUser.username,
        user_id: foundUser.id,
        avatar: foundUser.avatar,
      });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (e) {
    console.log(error);
    res.status(500).json(error);
  }
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
