const { authorizationErrorMessage } = require('../errors/messages');
const { UnauthorizedError } = require('../errors/errorClasses');
const { checkToken } = require('../utils/token');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if(!token) {
    throw new UnauthorizedError(authorizationErrorMessage);
  }

  const payload = checkToken(token)

  if(!payload) {
    throw new UnauthorizedError(authorizationErrorMessage);
  }

  req.user = payload;
  next();
};
