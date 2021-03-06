import models from "./index";

export default function(sequelize, DataTypes) {

  const fields = {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(256),
      unique: true
    },
    balance: {
      type: DataTypes.DECIMAL(1000, 2)
    }
  };

  const indexes = [];

  const hooks = {};

  const instanceMethods = {};

  const relations = {};

  let players = sequelize.define("Players", fields, {
    indexes,
    hooks,
    instanceMethods,
    timestamps: true,
    freezeTableName: true,
    paranoid: false,
    classMethods: {
      relations
    }
  });

  return players;
}
