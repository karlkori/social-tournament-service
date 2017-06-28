import * as _ from "lodash";
import models from "../models";
import { sequelize } from "../models";
import logger from "./logger";
import AppError from "./AppError";
import PlayerService from "./PlayersService";

/**
 * Return a partial deposit for every participant
 * @param deposit
 * @param participants
 */
const calculateParticipantDeposit = function(deposit, participants) {
  // round to bigger value
  return Math.ceil(deposit / participants.length);
};

/**
 * Return a partial prize for every participant
 *
 * this method is a complete duplicate of method "calculateParticipantDeposit",
 * live it as a separate method because in future we will want to divide the prize in different way
 *
 * @param prize
 * @param participants
 */
const calculateParticipantPrize = function(prize, participants) {
  // round to smaller value
  return Math.floor(prize / participants.length);
};

const setWinner = async function(tournament, winnerId, prize, transaction) {
  let winner = await models.Players.findOne({ where: { name: winnerId } });

  if (!winner) throw new AppError(400, "Winner not found!");

  // find a winner among tournament participants
  let participants = await models.TournamentsParticipants.findAll(
    { where: { tournamentId: tournament.id, backerForPlayer: winner.id } },
    { raw: true }
  );

  if (!participants || !participants.length) {
    throw new AppError(400, "Winner is not participated in this tournament!");
  }

  // calculate a prize for all participants
  let participantPrize = calculateParticipantPrize(prize, participants);

  if (participantPrize === 0) {
    throw new AppError(
      400,
      "Prize is too small to distribute between participants!"
    );
  }

  // set tournament winner with total prize
  await models.TournamentsWinners.create(
    { tournamentId: tournament.id, playerId: winner.id, prize: prize },
    { transaction: transaction }
  );

  // update balance of all participants
  await models.Players.increment(
    { balance: participantPrize },
    {
      where: { id: _.map(participants, "participantId") },
      transaction: transaction
    }
  );
};

/**
 * Announce/create new tournament with entry deposit
 * @param tournamentId
 * @param deposit
 */
const announce = async function(tournamentId: string, deposit: number) {
  let tournament = await models.Tournaments.findOne({
    where: { name: tournamentId }
  });

  if (tournament) {
    throw new AppError(400, "Tournament with this ID already exists!");
  }

  tournament = await models.Tournaments.create({
    name: tournamentId,
    deposit: deposit,
    finished: false
  });

  return tournament;
};

/**
 * Participants (player and backers) can join an exist and active tournament
 * @param tournamentId
 * @param playerId
 * @param backersIds
 */
const join = async function(tournamentId: string, playerId, backersIds: any[]) {
  let tournament = await models.Tournaments.findOne({
    where: { name: tournamentId }
  });

  if (!tournament) throw new AppError(404, "Tournament not found!");

  if (tournament.finished === true)
    throw new AppError(400, "Tournament is finished!");

  if (_.includes(backersIds, playerId))
    throw new AppError(400, "Player cannot be a backer for itself!");

  // find all participants
  let participantsIds = [playerId, ...backersIds];
  let participantsList = await models.Players.findAll({
    where: { name: participantsIds },
    raw: true
  });

  if (!participantsList || participantsList.length !== participantsIds.length)
    throw new AppError(400, "Do not find all participants!");

  // Check if player are not a participant of this tournament
  let isParticipant = await models.TournamentsParticipants.findOne({
    where: {
      tournamentId: tournament.id,
      participantId: _.map(participantsList, "id")
    }
  });

  if (isParticipant) {
    throw new AppError(
      400,
      "Some of players/backers are already participated at the tournament"
    );
  }

  let participantDeposit = calculateParticipantDeposit(
    tournament.deposit,
    participantsList
  );

  // validate all participants
  participantsList.forEach(participant => {
    if (participant.balance < participantDeposit) {
      throw new AppError(
        400,
        "A participant has not enough points to join the tournament!"
      );
    }
  });

  let player: any = _.find(participantsList, { name: playerId });

  let participants = [];
  participantsList.forEach(participant => {
    participants.push({
      participantId: participant.id,
      tournamentId: tournament.id,
      deposit: participantDeposit,
      participantType: participant.id === player.id
        ? ParticipantsType.PLAYER
        : ParticipantsType.BACKER,
      backerForPlayer: player.id
    });
  });

  await sequelize.transaction(async t => {
    try {
      // take points from participants
      let takePromises = [];
      participantsList.forEach(participant => {
        takePromises.push(
          models.Players.increment(
            { balance: -participantDeposit },
            { where: { name: participant.name }, transaction: t }
          )
        );
      });

      await Promise.all(takePromises);

      // add participants to the tournament
      await models.TournamentsParticipants.bulkCreate(participants, {
        transaction: t
      });
    } catch (err) {
      logger.warn("Error during transaction: ", err);
      t.rollback();
      throw new AppError(500, "Server error", err);
    }
  });
};

/**
 * Set the result of a tournament, define a winner and prize
 * @param tournamentId
 * @param winners
 */
const result = async function(tournamentId: string, winners: any[]) {
  let tournament = await models.Tournaments.findOne({
    where: { name: tournamentId }
  });

  if (!tournament) {
    throw new AppError(404, "Tournament not found!");
  }

  if (tournament.finished === true) {
    throw new AppError(400, "Tournament is finished!");
  }

  await sequelize.transaction(async t => {
    try {
      // finish the tournament
      await models.Tournaments.update(
        { finished: true },
        { where: { id: tournament.id }, transaction: t }
      );

      // set winners and divide the prize
      let winnersPromises = [];
      winners.forEach(winner => {
        winnersPromises.push(
          setWinner(tournament, winner.playerId, winner.prize, t)
        );
      });

      await Promise.all(winnersPromises);
    } catch (err) {
      logger.warn("Error during transaction: ", err);
      t.rollback();
      throw err;
    }
  });
};

const ParticipantsType = {
  PLAYER: 1,
  BACKER: 2
};

export default {
  announce,
  join,
  result,
  ParticipantsType
};
