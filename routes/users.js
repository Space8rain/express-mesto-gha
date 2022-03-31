const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getAllUsers,
  getUser,
  getUserMe,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/users/me', getUserMe);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().min(10).max(300),
  }),
}), updateAvatar);

module.exports = router;
