const { authorizationErrorMessage } = require('../errors/messages');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { checkToken } = require('../utils/token');

module.exports = (req, res, next) => {
  if (!req.cookies) {
    next(new UnauthorizedError(authorizationErrorMessage));
    return;
  }

  const token = req.cookies.jwt;
  let payload;

  try {
    payload = checkToken(token);
  } catch (err) {
    next(new UnauthorizedError(authorizationErrorMessage));
  }

  req.user = payload;
  next();
};
