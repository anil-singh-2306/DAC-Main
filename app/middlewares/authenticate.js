const jwt = require('jsonwebtoken');
const authService = require('../services/authService');

exports.verifyAccessToken = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    throw new Error('Access token missing from header');
  }
  const accessToken = authorizationHeader.split(' ')[1];
  jwt.verify(accessToken, authService.jwtSecret, (err, user) => {
    if (err) {
        throw new Error('Invalid access token');
    }
    req.user = user;
    next();
  });
};
