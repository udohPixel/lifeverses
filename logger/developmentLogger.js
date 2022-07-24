// import required libraries
const { createLogger, format, transports } = require("winston");
const { combine, colorize, timestamp, errors, printf } = format;

// define custom error formatter functions
const loggerFormat = printf(({ level, stack, message, timestamp }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

// create logger function
const developmentLogger = () => {
  const logger = createLogger({
    level: "debug",
    format: combine(
      colorize(),
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      errors({ stack: true }),
      loggerFormat
    ),
    transports: [
      //
      // - Write all logs with importance level of `info` or less to Console
      //
      new transports.Console(),
    ],
  });

  return logger;
};

// export developmentLogger
module.exports = developmentLogger;
