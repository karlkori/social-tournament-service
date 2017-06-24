import models from '../../models';
import config from '../../config/app';
import logger from '../../services/logger';
import AppError from '../../services/AppError';
import * as Ajv from 'ajv';
import * as _ from 'lodash';

const ajv = Ajv({ allErrors: true });

// post /take
const take = async function (ctx) {

    ctx.body = {};
};

// post /fund
const fund = async function (ctx) {

    ctx.body = {};
};

// get /balance
const balance = async function (ctx) {

    ctx.body = {};
};

export default {
    take,
    fund,
    balance
};
