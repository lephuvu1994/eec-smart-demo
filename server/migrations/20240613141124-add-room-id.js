module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('t_scene', 'room_id', {
        type: Sequelize.UUID,
        references: {
          model: 't_room', // Bảng mà room_id sẽ tham chiếu
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    },
    
    down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn('t_scene', 'room_id');
    },
  };