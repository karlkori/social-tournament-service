import models from "../../models";
import { sequelize } from "../../models";
import config from "../../config/app";
import logger from "../../services/logger";
import AppService from "../../services/AppService";

// post /reset
const reset = async function(ctx) {
  await AppService.reset();

  ctx.body = null;
};

export default {
  reset
};
