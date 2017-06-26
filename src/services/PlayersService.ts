import models from "../models";
import AppError from "./AppError";

/**
 * Find a player and update his balance or if it doesn't exist - create a new player
 * @param playerId
 * @param points
 */
const fund = async function(playerId: string, points: number) {
  // find or create a player
  let player = await models.Players.findOne({ where: { name: playerId } });
  if (!player) {
    player = await models.Players.create({ name: playerId, balance: points });
    return player;
  }

  /**
   * update/increment the player balance
   *
   * why do not just update?
   * in concurrent requests it's possible that between these two operations another call can change the player balance.
   */
  player = await models.Players.increment(
    { balance: points },
    { where: { name: playerId } }
  );

  if (!player) {
    throw new AppError(404, "Player not found!");
  }

  return player;
};

/**
 * Take points from player balance
 * @param playerId
 * @param points
 */
const take = async function(playerId: string, points: number) {
  let player = await models.Players.findOne({ where: { name: playerId } });
  if (!player) {
    throw new AppError(404, "Player not found!");
  }

  if (player.balance < points) {
    throw new AppError(400, "Player doesn't have enough points!");
  }

  /**
   * update/decrement the player balance
   *
   * why do not just update?
   * in concurrent requests it's possible that between these two operations another call can change the player balance.
   */
  player = await models.Players.increment(
    { balance: -points },
    { where: { name: playerId } }
  );

  if (!player) {
    throw new AppError(404, "Player not found!");
  }

  return player;
};

/**
 * Return user balance, if user exists
 * @param playerId
 */
const balance = async function(playerId: string) {
  let player = await models.Players.findOne({ where: { name: playerId } });

  if (!player) {
    throw new AppError(404, "Player not found!");
  }

  return player.balance;
};

export default {
  fund,
  take,
  balance
};
