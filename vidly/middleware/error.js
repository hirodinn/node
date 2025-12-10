import logger from "../logger.js";

export default function errorHandler(err, req, res, next) {
  const status = err.statusCode || 500;

  logger.error({
    message: err.message,
    stack: err.stack,
    route: req.originalUrl,
  });
  res.status(status).send(err.message);
}
