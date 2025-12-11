import logger from "../logger.js";

export default function responseLogger(req, res, next) {
  res.on("finish", () => {
    if (res.statusCode < 400) {
      logger.info("API Success", {
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
      });
    }
  });
  next();
}
