import models from "./index";

export default function(sequelize, DataTypes) {
  const fields = {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    tournamentId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    playerId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    prize: {
      type: DataTypes.DECIMAL(1000, 2)
    }
  };

  const indexes = [];

  const hooks = {};

  const instanceMethods = {};

  let tournamentsWinners = sequelize.define("TournamentsWinners", fields, {
    indexes,
    hooks,
    instanceMethods,
    timestamps: true,
    freezeTableName: true,
    paranoid: false,
    classMethods: {}
  });

  return tournamentsWinners;
}
