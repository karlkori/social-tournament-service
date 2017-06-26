import { Context } from "koa";
import * as _ from "lodash";
import * as Ajv from "ajv";
import models from "../../models";
import config from "../../config/app";
import logger from "../../services/logger";
import AppError from "../../services/AppError";
import TournamentsService from "../../services/TournamentsService";

const ajv = Ajv({ allErrors: true });

const winnersSchema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      playerId: {
        type: "string"
      },
      prize: {
        type: "integer",
        minimum: 0
      }
    },
    additionalProperties: false,
    required: ["playerId", "prize"]
  }
};

// post /announceTournament?tournamentId=1&deposit=1000
const announceTournament = async function(ctx: Context) {
  let tournamentId = ctx.request.query.tournamentId;
  let deposit = +ctx.request.query.deposit;

  if (!tournamentId)
    throw new AppError(400, "Query parameter 'tournamentId' is required!");
  if (!_.isInteger(deposit))
    throw new AppError(400, "Query paramater 'deposit' is incorrect!");
  if (deposit < 0)
    throw new AppError(
      400,
      "Query paramater 'deposit' must be greater than zero!"
    );

  await TournamentsService.announce(tournamentId, deposit);
  ctx.body = null;
};

// post /joinTournament?tournamentId=1&playerId=P1&backerId=P2&backerId=P3
const joinTournament = async function(ctx: Context) {
  let tournamentId = ctx.request.query.tournamentId;
  let playerId = ctx.request.query.playerId;
  let backerId = ctx.request.query.backerId;

  if (!tournamentId)
    throw new AppError(400, "Query parameter 'tournamentId' is required!");

  // do not allow join more than one player at one time
  if (_.isArray(playerId))
    throw new AppError(400, "Query parameter 'playerId' is incorrect!");

  if (!playerId)
    throw new AppError(400, "Query parameter 'playerId' is required!");

  let backers = [];
  if (backerId) {
    backerId = _.castArray(backerId);
    backers = _.uniq(backerId);
  }

  await TournamentsService.join(tournamentId, playerId, backers);

  ctx.body = null;
};

// post /resultTournament
const resultTournament = async function(ctx: Context) {
  let tournamentId = ctx.request.body.tournamentId;
  let winners = ctx.request.body.winners;

  if (!tournamentId)
    throw new AppError(400, "Query parameter 'tournamentId' is required!");

  let valid = ajv.validate(winnersSchema, winners);
  if (!valid) {
    throw new AppError(400, ajv.errorsText(), ajv.errors.toString());
  }

  await TournamentsService.result(tournamentId, winners);

  ctx.body = null;
};

export default {
  announceTournament,
  joinTournament,
  resultTournament
};
