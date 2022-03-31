const jwt = require('jsonwebtoken');
const { checkError } = require('../errors/errors');

module.exports = (req, res, next) => {
  // Достаем авторизованый заголовок
  const { auth } = req.headers;
  // Проверяем его наличие или начало с Bearer
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  // В токен записываем JWT
  const token = auth.replace('Bearer ', '');
  let payload;
  // Проверяем токен из заголовка с выданным ранее
  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    return checkError(err, res);
  }
  // Записываем пейлоуд в запрос
  req.user = payload;

  return next();
};
