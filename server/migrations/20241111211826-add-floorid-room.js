module.exports = {
    up: async (queryInterface, Sequelize) => {
      const tableDefinition = await queryInterface.describeTable('t_room');

      if (!tableDefinition['floor_id']) {
        await queryInterface.addColumn('t_room', 'floor_id', {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 't_floor',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        });
      }
    },
    down: async (queryInterface, Sequelize) => {
      const tableDefinition = await queryInterface.describeTable('t_room');

    if (tableDefinition['floor_id']) {
      await queryInterface.removeColumn('t_room', 'floor_id');
    }
    },
  };
  