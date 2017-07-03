import * as Koa from "koa";
import * as serve from "koa-static";
import * as compress from "koa-compress";
import * as koaLogger from "koa-logger";
import * as convert from "koa-convert";
import * as json from "koa-json";
import * as bodyParser from "koa-bodyparser";
import * as helmet from "koa-helmet";
import * as cors from "koa-cors";
import * as Bluebird from "bluebird";
import logger from "./services/logger";
import { sequelize } from "./models";
import catchError from "./api/middlewares/catchError";
import router from "./config/routes";
import config from "./config/app";

const shutdown = function(err?) {
  if (err) {
    logger.error(err);
  }

  logger.info("shutdown...");

  // gracefully stop service and exit with error code
  // here we can close connection to database in case we have more than one
  // Sequelize close connection on process exit event

  // if error is passed - exit with error code otherwise without error code
  process.exit(!!err ? 1 : 0);
};

const bootstrap = async function() {
  logger.info("bootstrapping...");

  try {
    logger.info(`connecting to database ${config.db.url}`);
    await sequelize.authenticate();
    logger.info(`connected to database`);
  } catch (err) {
    logger.error("unable to connect to the database: ", err);
  }
};

const middleware = function(): void {
  app.use(helmet());
  app.use(
    convert(
      cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        headers: "Content-Type, Authorization"
      })
    )
  );
  app.use(convert(bodyParser()));
  app.use(catchError());
  app.use(convert(json()));
  app.use(convert(router.routes()));
  app.use(convert(router.allowedMethods()));
  app.use(convert(compress()));
  app.use(convert(serve(__dirname + "/../public")));
};

const app = new Koa();

app.on("error", function(err) {
  shutdown(err);
});

middleware();

export default {
  server: app,
  bootstrap,
  shutdown
};
