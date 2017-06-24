import models from '../../models';
import config from '../../config/app';
import logger from '../../services/logger';
import AppError from '../../services/AppError';
import * as Ajv from 'ajv';
import * as _ from 'lodash';

const ajv = Ajv({ allErrors: true });

// post /announceTournament?tournamentId=1&deposit=1000
const announceTournament = async function (ctx) {

    ctx.body = {};
};

// post /joinTournament?tournamentId=1&playerId=P1&backerId=P2&backerId=P3
const joinTournament = async function (ctx) {

    ctx.body = {};
};

// get /resultTournament
const resultTournament = async function (ctx) {

    ctx.body = {};
};

export default {
    announceTournament,
    joinTournament,
    resultTournament
};
