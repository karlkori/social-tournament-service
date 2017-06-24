import models from '../../models';
import config from '../../config/app';
import logger from '../../services/logger';
import AppError from '../../services/AppError';
import * as Ajv from 'ajv';
import * as _ from 'lodash';

const ajv = Ajv({ allErrors: true });

// post /reset
const reset = async function (ctx) {

    ctx.body = {};
};

export default {
    reset
};
