module.exports = {
  up: async function(queryInterface, Sequelize) {
    return await queryInterface.createTable("Tournaments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      name: {
        type: Sequelize.STRING(256),
        unique: true
      },
      deposit: {
        type: Sequelize.DECIMAL(1000, 2)
      },
      finished: {
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable("Tournaments");
  }
};
