const errorHandler = (err, req, res, next) => {
  console.log('%c⧭', 'color: #ffa280', 'ERRORHANDLER-ERROR', err);
  const validationError = `Validation error:`;
  const notNullError = `notNull Violation:`;
  const isValidationError = err.message.includes(validationError);
  const isNotNullError = err.message.includes(notNullError);

  const getStatusCode = () => {
    if (isValidationError || isNotNullError) return 500;
    return res.statusCode ? res.statusCode : 500;
  };

  res.status(getStatusCode());

  const getErrorMessage = () => {
    if (isValidationError) return err.message.split(validationError)[1];
    if (isNotNullError) return err.message.split(notNullError)[1];
    return err.message;
  };

  res.json({
    message: getErrorMessage(),
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};
