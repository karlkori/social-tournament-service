module.exports = {
  up: async function(queryInterface, Sequelize) {
    return await queryInterface.createTable("ParticipantsTypes", {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(32),
        allowNull: false,
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
    return queryInterface.dropTable("ParticipantsTypes");
  }
};
