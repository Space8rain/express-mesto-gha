const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');

const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const regex = /(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/;

const { PORT = 3000 } = process.env;

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regex),
  }),
}), createUser);

app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

app.use(errors());
app.use((req, res) => {
  res.status(404).send({ message: 'Ресурс не найден!' });
});

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`);
});
