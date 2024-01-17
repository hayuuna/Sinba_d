const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");
const logger = require("./config/logger");

let server;
const mongodb_url = `mongodb+srv://${config.mongodb.primary.username}:${config.mongodb.primary.password}@${config.mongodb.primary.url}/?retryWrites=true&w=majority`;
const express_url = `${config.express.primary.location}:${config.express.primary.port}`;

mongoose.connect(mongodb_url).then(() => {
  logger.info("Connected to MongoDB");
  server = app.listen(config.express.primary.port, () => {
    logger.info(`Listening to port ${config.express.primary.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
