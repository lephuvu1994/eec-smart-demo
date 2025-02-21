module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableDefinition = await queryInterface.describeTable('t_device_feature');
    if (!tableDefinition['room_id']) {
      await queryInterface.addColumn('t_device_feature', 'room_id', {
        type: Sequelize.UUID,
        references: {
          model: 't_room',
          key: 'id',
        },
      });
    }
  },
  down: async (queryInterface, Sequelize) => {
    const tableDefinition = await queryInterface.describeTable('t_device_feature');

    if (tableDefinition['room_id']) {
      await queryInterface.removeColumn('t_device_feature', 'room_id');
    }
  },
};
