import mongoose from "mongoose";
import Logger from "./logger";

const connStr =
  process.env.NODE_ENV === "development"
    ? process.env.LOCAL_DATABASE
    : process.env.DATABASE;

if (connStr) {
  try {
    mongoose.connect(connStr, () => Logger.info(`db is connected`));
  } catch (error) {
    Logger.error(error);
    Logger.error("db connection failed");
  }
}

function cleanup() {
  mongoose.connection.close(function () {
    Logger.info("\nMongoose default connection disconnected through app termination");
    Logger.info("\nGoodbye!");
    process.exit(0);
  });
}

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
process.on("SIGHUP", cleanup);