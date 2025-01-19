module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('t_room', 'camera_url', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      });
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn('t_room', 'camera_url');
    },
  };
  