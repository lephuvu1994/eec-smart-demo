module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('t_scene', 'room_id', {
        type: Sequelize.UUID,
        references: {
            model: 't_room',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColum('t_scene', 'room_id');
    },
  };
  