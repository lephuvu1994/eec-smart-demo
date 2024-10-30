module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('t_room', 'image_url', {
        type: Sequelize.STRING,
        defaultValue: '',
        allowNull: false,
      });
    },
    down: () => {},
  };
  