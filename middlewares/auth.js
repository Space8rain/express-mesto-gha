const jwt = require('jsonwebtoken');
const { AuthError } = require('../errors/AuthError');

module.exports = (req, res, next) => {
  // В токен записываем JWT из cookie
  const token = req.cookies.jwt;
  let payload;
  // Проверяем токен из cookie с выданным ранее
  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    throw new AuthError('Необходима авторизацияя');
  }
  // Записываем пейлоуд в запрос
  req.user = payload;

  return next();
};
