const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/token');
const User = require('../models/user');
const { OK, CREATED } = require('../utils/statusCodes');
const {
  userBadRequestErrorMessage,
  userNotFoundErrorMessage,
  userCreateValidationErrorMessage,
  userUpdateValidationErrorMessage,
  avatarUpdateValidationErrorMessage,
  conflictErrorMessage,
  authorizationErrorMessage,
} = require('../errors/messages');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const options = {
  new: true, // обработчик then получит на вход обновлённую запись
  runValidators: true, // данные будут валидированы перед изменением
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(OK).send(users))
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(userNotFoundErrorMessage);
      }
      res.status(OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(userBadRequestErrorMessage));
      } else {
        next(err);
      }
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(authorizationErrorMessage);
      }
      res.status(OK).send({ user });
    })

    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(userBadRequestErrorMessage));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    })
      .then((user) => {
        res.status(CREATED).send({
          email: user.email,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
        });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new BadRequestError(userCreateValidationErrorMessage));
          return;
        }
        if (err.code === 11000) {
          next(new ConflictError(conflictErrorMessage));
          return;
        }
        next(err);
      });
  });
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, options)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(userNotFoundErrorMessage);
      }
      res.status(OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(userUpdateValidationErrorMessage));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, options)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(userNotFoundErrorMessage);
      }
      res.status(OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(avatarUpdateValidationErrorMessage));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = generateToken({ _id: user._id });

      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ _id: user._id });
    })
    .catch(next);
};

const logout = (req, res, next) => {
  res.clearCookie('jwt');
  if (res.status(OK)) {
    res.send({ message: 'Вы вышли из аккаунта.' });
  } else {
    next();
  }
};

module.exports = {
  getUsers,
  getUser,
  getCurrentUser,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  logout,
};
