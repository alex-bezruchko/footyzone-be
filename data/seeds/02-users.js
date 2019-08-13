// const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

exports.seed = function (knex, Promise) {
  return knex("users").insert([
    {
      id: 1,
      username: "merse",
      password: bcrypt.hashSync("mersepass", 10),
      role_id: 1,
      avatar:
        "https://res.cloudinary.com/htg1iqq1p/image/upload/v1563587602/cb8pdmlwpckftutit7mx.png",
    }, // 1
    {
      id: 2,
      username: "gazza",
      password: bcrypt.hashSync("gazzapass", 10),
      role_id: 3,
      avatar:
        "https://res.cloudinary.com/htg1iqq1p/image/upload/v1563588967/jax7ezhkba2lxybxpizp.png",
    }, // 2
    {
      id: 3,
      username: "joey",
      password: bcrypt.hashSync("joeypass", 10),
      role_id: 2,
      avatar:
        "https://res.cloudinary.com/htg1iqq1p/image/upload/v1563589016/vaeq5qshowwit6iubhxm.png",
    }, // 3
    {
      id: 4,
      username: "spock",
      password: bcrypt.hashSync("spockpass", 10),
      role_id: 1,
      avatar:
        "https://res.cloudinary.com/htg1iqq1p/image/upload/v1565725262/bye9b0qbhmv0ir4tzhwd.jpg",
    }
  ]);
};
