import * as Koa from "koa";
import * as serve from "koa-static";
import * as compress from "koa-compress";
import * as koaLogger from "koa-logger";
import * as convert from "koa-convert";
import * as json from "koa-json";
import * as bodyParser from "koa-bodyparser";
import * as helmet from "koa-helmet";
import * as cors from "koa-cors";
import logger from "./services/logger";
import { sequelize } from "./models";
import catchError from "./api/middlewares/catchError";
import router from "./config/routes";
import config from "./config/app";

class App {
  public koa: any;

  constructor() {
    this.koa = new Koa();

    this.koa.on("error", function(err) {
      this.shutdown(err);
    });
  }

  public async init() {

    await this.bootstrap();
    this.middleware();
    this.koa.listen(config.port, () =>
      logger.info(`server started at ${config.port}`)
    );
  }

  public shutdown(err?) {
    if (err) {
      logger.error(err);
    }

    logger.info("shutdown...");

    // gracefully stop service and exit with error code
    // here we can close connection to database in case we have more than one
    // Sequelize close connection on process exit event

    // if error is passed - exit with error code otherwise without error code
    process.exit(!!err ? 1 : 0);
  }

  private async bootstrap() {
    logger.info("bootstrapping...");

    try {
      await sequelize.authenticate();
      logger.info(`connected to database ${config.db.url}`);
    } catch (err) {
      logger.error("unable to connect to the database: ", err);
    }
  }

  private middleware(): void {
    this.koa.use(helmet());
    this.koa.use(
      convert(
        cors({
          origin: "*",
          methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
          headers: "Content-Type, Authorization"
        })
      )
    );
    this.koa.use(catchError());
    this.koa.use(convert(bodyParser()));
    this.koa.use(convert(json()));
    this.koa.use(convert(koaLogger()));
    this.koa.use(convert(router.routes()));
    this.koa.use(convert(router.allowedMethods()));
    this.koa.use(convert(compress()));
    this.koa.use(convert(serve(__dirname + "/../public")));
  }
}

export default App;
