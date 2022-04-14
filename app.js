const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');
const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./errors/errorHandler');
const { userValidator } = require('./middlewares/userValidator');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const regex = /(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.))(:\d{2,5})?((\/.+)+)?\/?#?/;

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors({
  origin: 'https://mestofront12.students.nomoredomains.work',
  credentials: true,
}));

// Подключаем парсеры для куки и тел запросов
app.use(cookieParser());
app.use(bodyParser.json());

// Подключаем логер запросов
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', userValidator, login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regex),
  }),
}), createUser);

app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

// Подключаем логер ошибок
app.use(errorLogger);

// При неизветсном маршруте выбрасываем ошибку
app.use(auth, (req, res, next) => {
  next(new NotFoundError('404 Ресурс не найден'));
});
// Обработка ошибок celebrate
app.use(errors());
// При неизвестной ошибке выбрасываем 500
app.use(errorHandler);

// Подключение к БД
mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`);
});
