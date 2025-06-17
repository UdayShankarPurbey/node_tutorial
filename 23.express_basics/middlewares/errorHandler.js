class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = "APIError"; // set the error type to API error.
  }
}

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const globalErrorHandler = (err, req, res, next) => {
  console.error(err.stack); // log the error stack

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: "Error",
      message: err.message,
    });
  } else {
    return res.status(500).json({
      status: "error",
      message: "An Unexpected Error Occur",
    });
  }
};

module.exports = {
  ApiError,
  asyncHandler,
  globalErrorHandler,
};
