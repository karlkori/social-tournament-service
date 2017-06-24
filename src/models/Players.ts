import logger from "../services/logger";
import config from "../config/app";
import * as moment from "moment";
import * as _ from "lodash";
import models from "./index";
import * as Bluebird from "bluebird";

export default function(sequelize, DataTypes) {

  const fields = {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(256)
    },
    balance: {
      type: DataTypes.DECIMAL(1000, 2)
    }
  };

  const indexes = [];

  const hooks = {};

  const instanceMethods = {};

  const relations = {};

  const options = {
    indexes,
    hooks,
    instanceMethods,
    timestamps: true,
    freezeTableName: true,
    paranoid: false,
    classMethods: {
      relations
    }
  };

  return sequelize.define("Players", fields, options);
}
