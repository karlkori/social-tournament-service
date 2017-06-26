module.exports = {
  up: async function(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("ParticipantsTypes", [
      { id: 1, name: "player", createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: "backer", createdAt: new Date(), updatedAt: new Date() }
    ]);
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("ParticipantsTypes", { id: [1, 2] });
  }
};
