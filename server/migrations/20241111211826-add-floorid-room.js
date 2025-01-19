module.exports = {
    up: async (queryInterface, Sequelize) => {
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
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn('t_room', 'floor_id');
    },
  };
  