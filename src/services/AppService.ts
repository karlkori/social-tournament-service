import models from "../models";
import { sequelize } from "../models";
import logger from "./logger";
import AppError from "./AppError";

/**
 * Reset database state
 */
const reset = async function() {
  await sequelize.transaction(async t => {
    try {
      await models.TournamentsParticipants.destroy({
        where: {}
      });
      await models.Tournaments.destroy({ where: {} });
      await models.Players.destroy({ where: {} });
    } catch (err) {
      logger.error(err);
      t.rollback();
      throw new AppError(500, "Server error", err);
    }
  });
};

export default {
  reset
};
