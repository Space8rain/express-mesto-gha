const { celebrate, Joi } = require('celebrate');
const isURL = require('validator');

const validateURL = (value) => {
  if (!isURL(value, { require_protocol: true })) {
    throw new Error('Неправильный формат ссылки');
  }
  return value;
};

const avatarUpdateValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL, 'custom validation URL'),
  }),
});

const userValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const userUpdateValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const userIdValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  avatarUpdateValidator,
  userValidator,
  userUpdateValidator,
  userIdValidator,
};
