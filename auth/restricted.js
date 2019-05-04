const jwt = require('jsonwebtoken');
const secret = require('./../config/secrets').jwtSecret;

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'User was not verified' });
      }
      else {
        req.decodedJwt = decodedToken;
        next();
      }
    })
  }
  else {
    res.status(401).json({ message: 'User was not verified' });
  }
  
};
