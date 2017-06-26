module.exports = {
  up: async function(queryInterface, Sequelize) {
    return await queryInterface.createTable("TournamentsParticipants", {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      tournamentId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "Tournaments",
          key: "id"
        }
      },
      participantId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "Players",
          key: "id"
        }
      },
      participantType: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "ParticipantsTypes",
          key: "id"
        }
      },
      backerForPlayer: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: "Players",
          key: "id"
        }
      },
      deposit: {
        type: Sequelize.DECIMAL(1000, 2)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable("TournamentsParticipants");
  }
};
