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
  } else {
    res.status(500).send({ message: '500 Ошибка по умолчанию', err });
  }
};

module.exports = { NotFoundError, checkError };
