const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { NotFoundError, checkError } = require('../errors/errors');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => checkError(err, res));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => checkError(err, res));
};

module.exports.getUserMe = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => checkError(err, res));
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => checkError(err, res));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => checkError(err, res));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {
      avatar,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => checkError(err, res));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'secret-key',
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          httpOnly: true,
          maxAge: '1h',
        })
        .end();
    })
    .catch((err) => checkError(err, res));
};
