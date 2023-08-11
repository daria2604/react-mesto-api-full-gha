const { celebrate, Joi } = require('celebrate');
const { default: mongoose } = require('mongoose');
const regex = require('../../utils/regex');

const cardIdValidation = (value, helper) => (mongoose.isValidObjectId(value)
  ? value
  : helper.message('Передан некорректный id карточки.'));

const getCardId = { cardId: Joi.string().custom(cardIdValidation) };

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(regex),
  }),
});

const deleteCardValidation = celebrate({
  params: Joi.object().keys(getCardId),
});

const likeCardValidation = celebrate({
  params: Joi.object().keys(getCardId),
});

const unlikeCardValidation = celebrate({
  params: Joi.object().keys(getCardId),
});

module.exports = {
  createCardValidation,
  deleteCardValidation,
  likeCardValidation,
  unlikeCardValidation,
};
