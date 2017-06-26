import models from "./index";

export default function(sequelize, DataTypes) {
  const fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: false
    }
  };

  const indexes = [];

  const hooks = {};

  const instanceMethods = {};

  let participantsTypes = sequelize.define("ParticipantsTypes", fields, {
    indexes,
    hooks,
    instanceMethods,
    timestamps: true,
    freezeTableName: true,
    paranoid: false,
    classMethods: {}
  });

  return participantsTypes;
}
