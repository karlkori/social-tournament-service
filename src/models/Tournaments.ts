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
    deposit: {
      type: DataTypes.DECIMAL(1000, 2)
    },
    finished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  };

  const indexes = [];

  const hooks = {};

  const instanceMethods = {};

  let tournaments = sequelize.define("Tournaments", fields, {
    indexes,
    hooks,
    instanceMethods,
    timestamps: true,
    freezeTableName: true,
    paranoid: false,
    classMethods: {}
  });

  return tournaments;
}
