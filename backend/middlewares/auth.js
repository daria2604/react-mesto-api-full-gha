const { authorizationErrorMessage } = require('../errors/messages');
const { UnauthorizedError } = require('../errors/errorClasses');
const { checkToken } = require('../utils/token');

module.exports = (req, res, next) => {
  if(!req.headers.cookie) {
    throw new UnauthorizedError(authorizationErrorMessage);
  }

  const token = req.headers.cookie.jwt;
  let payload

  try {
    payload = checkToken(token)
  } catch(err) {
    return new UnauthorizedError(authorizationErrorMessage)
  }

  req.user = payload;
  next();
};
