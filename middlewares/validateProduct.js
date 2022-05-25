const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');

function validateProduct(req, _res, next) {
  const { error } = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().min(1).required(),
  }).validate(req.body);

  if (error) {
    const errorType = error.details[0].type;

    if (['string.min', 'number.min'].includes(errorType)) {
      error.status = StatusCodes.UNPROCESSABLE_ENTITY;
    }

    return next(error);
  }

  return next();
}

module.exports = validateProduct;
