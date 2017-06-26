module.exports = {
  up: async function(queryInterface, Sequelize) {
    return await queryInterface.createTable("TournamentsWinners", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      tournamentId: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      playerId: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: "Players",
          key: "id"
        }
      },
      prize: {
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
    return queryInterface.dropTable("TournamentsWinners");
  }
};
