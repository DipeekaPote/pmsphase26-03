const jwt = require('jsonwebtoken');
const User = require('../../models/Common/userModel');

const secretKey = process.env.TOKEN_KEY;

function validateToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
      return res.status(401).json({ message: 'Token is missing' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
          return res.status(400).json({ message: 'Invalid token' });
      }
       //const token = token;
      req.user = decoded; // Attach decoded user information to the request object
      next();
  });
}
module.exports = { validateToken };