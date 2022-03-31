class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

const checkError = (err, res) => {
  if (err.name === 'NotFoundError') {
    res.status(404).send({ message: `404 ${err.message}` });
  } else if (err.name === 'ValidationError' || err.path === '_id') {
    res.status(400).send({ message: '400 Переданы некорректные данные' });
  } else if (err.name === 'UnauthorizedError') {
    res.status(401).send({ message: err.message });
  } else if (err.code === 11000) {
    res.status(409).send({ message: 'Пользователь с таким email уже существует' });
  } else {
    res.status(500).send({ message: '500 Ошибка по умолчанию', err });
  }
};

module.exports = { NotFoundError, checkError };
