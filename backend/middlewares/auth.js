const { authorizationErrorMessage } = require('../errors/messages');
const { UnauthorizedError } = require('../errors/errorClasses');
const { checkToken } = require('../utils/token');

module.exports = (req, res, next) => {
  if(!req.cookies) {
    throw new UnauthorizedError(authorizationErrorMessage);
  }

  const token = req.cookies.jwt;
  let payload

  try {
    payload = checkToken(token)
  } catch(err) {
    return next(new UnauthorizedError(authorizationErrorMessage))
  }

  req.user = payload;
  return next();
};
