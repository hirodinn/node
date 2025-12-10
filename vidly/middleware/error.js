import logger from "../logger.js";

export default function errorHandler(err, req, res, next) {
  logger.error({
    message: err.message,
    stack: err.stack,
    route: req.originalUrl,
  });
  res.status(500).send(err.message);
}
