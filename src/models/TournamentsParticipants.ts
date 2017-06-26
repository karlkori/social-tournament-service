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
    participantId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    deposit: {
      type: DataTypes.DECIMAL(1000, 2)
    },
    participantType: {
      type: DataTypes.INTEGER
    },
    backerForPlayer: {
      type: DataTypes.INTEGER
    }
  };

  const indexes = [];

  const hooks = {};

  const instanceMethods = {};

  let tournamentsParticipants = sequelize.define("TournamentsParticipants", fields, {
    indexes,
    hooks,
    instanceMethods,
    timestamps: true,
    freezeTableName: true,
    paranoid: false,
    classMethods: {}
  });

  return tournamentsParticipants;
}
