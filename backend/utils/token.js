const JWT = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

function generateToken(payload) {
  return JWT.sign(payload, NODE_ENV !== 'production' ? 'secret' : JWT_SECRET, { expiresIn: '7d' });
}

function checkToken(token) {
  if (!token) {
    return false;
  }

  try {
    return JWT.verify(token, NODE_ENV !== 'production' ? 'secret' : JWT_SECRET);
  } catch (err) {
    return false;
  }
}

module.exports = { JWT_SECRET, generateToken, checkToken };