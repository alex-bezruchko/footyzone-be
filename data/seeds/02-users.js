// const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

exports.seed = function(knex, Promise) {
  return knex("users").insert([
    {
      username: "Merse",
      password: bcrypt.hashSync("mersepass", 10),
      role_id: 1,
      avatar:
        "https://res.cloudinary.com/htg1iqq1p/image/upload/v1563587602/cb8pdmlwpckftutit7mx.png",
    }, // 1
    {
      username: "Gazza",
      password: bcrypt.hashSync("gazzapass", 10),
      role_id: 3,
      avatar:
        "https://res.cloudinary.com/htg1iqq1p/image/upload/v1563588967/jax7ezhkba2lxybxpizp.png",
    }, // 2
    {
      username: "Joey",
      password: bcrypt.hashSync("joeypass", 10),
      role_id: 4,
      avatar:
        "https://res.cloudinary.com/htg1iqq1p/image/upload/v1563589016/vaeq5qshowwit6iubhxm.png",
    }, // 3
    { username: "Peregrin", password: "peregrinpass", role_id: 1 }, // 4
    { username: "Mithrandir", password: "mithrandirpass", role_id: 4 }, // 5
    { username: "Boromir", password: "boromirpass", role_id: 2 }, // 6
    { username: "Legolas", password: "legolaspass", role_id: 3 }, // 7
    { username: "Gimly", password: "gimlypass", role_id: 3 }, // 8
    { username: "Aragorn", password: "aragornpass", role_id: 4 }, // 9
  ]);
};
