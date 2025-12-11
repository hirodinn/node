import logger from "../logger.js";

export default function responseLogger(req, res, next) {
  const oldSend = res.send;

  res.send = function (data) {
    logger.info("API Success", {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
    });

    return oldSend.apply(res, arguments);
  };

  next();
}
