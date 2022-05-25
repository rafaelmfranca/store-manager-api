const { StatusCodes } = require('http-status-codes');

function error(err, _req, res, _next) {
  if (err.isJoi) {
    return res
      .status(err.status || StatusCodes.BAD_REQUEST)
      .json({ message: err.details[0].message });
  }

  if (err.message) {
    return res.status(err.status).json({ message: err.message });
  }

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: 'Internal Server Error' });
}

module.exports = error;
