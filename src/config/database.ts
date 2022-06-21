const mongoose = require("mongoose");
const Logger = require("./logger");

const connStr =
  process.env.NODE_ENV === "development"
    ? process.env.LOCAL_DATABASE
    : process.env.DATABASE;

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((db: any) => Logger.info(`db is connected to ${db.connection.name}`))
  .catch((err: any) => {
    Logger.error(err);
    Logger.error("database connection failed");
  });

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