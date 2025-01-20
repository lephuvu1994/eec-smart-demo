module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableDefinition = await queryInterface.describeTable('t_room');
    if (!tableDefinition['camera_url']) {
      await queryInterface.addColumn('t_room', 'camera_url', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      });
    }
  },
  down: async (queryInterface, Sequelize) => {
    const tableDefinition = await queryInterface.describeTable('t_room');

    if (tableDefinition['camera_url']) {
      await queryInterface.removeColumn('t_room', 'camera_url');
    }
  },
};
