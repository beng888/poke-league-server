const errorHandler = (err, req, res, next) => {
  const validationError = `Validation error:`;
  const notNullError = `notNull Violation:`;
  const isValidationError = err.message.includes(validationError);
  const isNotNullError = err.message.includes(notNullError);

  const getStatusCode = () => {
    if (isValidationError || isNotNullError) return 500;
    return res.statusCode ? res.statusCode : 500;
  };

  const getErrorMessage = () => {
    if (isValidationError) return err.message.split(validationError)[1];
    if (isNotNullError) return err.message.split(notNullError)[1];
    return err.message;
  };

  res.status(500).json({
    message: getErrorMessage(),
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};
