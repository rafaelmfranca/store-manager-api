const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');

function validateSale(req, _res, next) {
  const { error } = Joi.array()
    .items(
      Joi.object({
        productId: Joi.number().min(1).required(),
        quantity: Joi.number().min(1).required(),
      }),
    )
    .validate(req.body);

  if (error) {
    const errorType = error.details[0].type;

    if (errorType === 'number.min') {
      error.status = StatusCodes.UNPROCESSABLE_ENTITY;
    }

    // Made with Alessandro Achtenberg & Lucas Barborsa dos Reis
    error.details[0].message = error.details[0].message.replace(/\[\d\]./, '');

    return next(error);
  }

  return next();
}

module.exports = validateSale;
