import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: "MMM-DD HH:mm:ss" }),
        winston.format.printf((info) => {
          if (info.stack) {
            return `[${info.timestamp}] ${info.level} -> ${info.stack}`;
          }
          return `[${info.timestamp}] ${info.level} -> ${info.message}`;
        })
      ),
    }),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/info.log", level: "info" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

export default logger;
