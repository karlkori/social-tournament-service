import PlayersService from "../../services/PlayersService";
import config from "../../config/app";
import logger from "../../services/logger";
import AppError from "../../services/AppError";
import * as _ from "lodash";
import { Context } from "koa";

/**
 * post /fund?playerId=P1&points=300
 *
 * @param ctx
 */
const fund = async function(ctx: Context) {
  let playerId = ctx.request.query.playerId;
  let points = +ctx.request.query.points;

  if (!playerId) throw new AppError(400, "Parameter 'playerId' is required!");
  if (!_.isInteger(points))
    throw new AppError(400, "Paramater 'points' is incorrect!");
  if (points < 0)
    throw new AppError(400, "Paramater 'points' must be greater than zero!");

  await PlayersService.fund(playerId, points);
  ctx.body = null;
};

/**
 * post /take?playerId=P1&points=300
 *
 * @param ctx
 */
const take = async function(ctx: Context) {
  let playerId = ctx.request.query.playerId;
  let points = +ctx.request.query.points;

  if (!playerId) throw new AppError(400, "Parameter 'playerId' is required!");
  if (!_.isInteger(points))
    throw new AppError(400, "Paramater 'points' is incorrect!");
  if (points < 0)
    throw new AppError(400, "Paramater 'points' must be greater than zero!");

  await PlayersService.take(playerId, points);
  ctx.body = null;
};

/**
 * get /balance?playerId=P1
 *
 * @param ctx
 */
const balance = async function(ctx: Context) {
  let playerId = ctx.request.query.playerId;

  if (!playerId) throw new AppError(400, "Parameter 'playerId' is required!");

  let balance = await PlayersService.balance(playerId);

  ctx.body = {
      playerId,
      balance
  };
};

export default {
  take,
  fund,
  balance
};
