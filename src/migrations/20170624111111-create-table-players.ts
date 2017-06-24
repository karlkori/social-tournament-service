module.exports = {
    up: async function(queryInterface, Sequelize) {
        await queryInterface.createTable('Players', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            name: {
                type: Sequelize.STRING(256),
            },
            balance: {
                type: Sequelize.DECIMAL(1000,2),
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
        return queryInterface.dropTable('Players');
    }
};
