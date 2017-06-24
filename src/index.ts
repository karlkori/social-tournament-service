import { install } from "source-map-support";
install();

import App from "./app";

(async function() {
  const app = new App();
  app.init();

  process.on("uncaughtException", err => {
    app.shutdown(err);
  });

  process.on("SIGINT", () => {
    app.shutdown();
  });
})();
