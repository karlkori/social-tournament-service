import "ms";
import * as _ from "lodash";
import logger from "../services/logger"

const config = {
  name: process.env.APP_NAME || "social-tournament-service",
  stage: process.env.STAGE || "development",
  port: process.env.PORT || 5000,
  db: {
    url: process.env.DATABASE_URL,
    options: {
      dialect: "postgres",
      native: false,
      pool: {
        max: 5,
        min: 1,
        idle: 100000
      }
    }
  }
};

export default config;
