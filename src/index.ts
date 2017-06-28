import { install } from "source-map-support";
install();

import config from "./config/app";
import logger from "./services/logger";
import app from "./app";

(async function() {
  app.bootstrap();

  app.server.listen(config.port, () => {
      logger.info(`server started at ${config.port}`);
  });

  process.on("uncaughtException", err => {
    app.shutdown(err);
  });

  process.on("SIGINT", () => {
    app.shutdown();
  });
})();
