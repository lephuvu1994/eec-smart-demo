module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('t_dashboard', 'visibility', {
      type: Sequelize.STRING,
      defaultValue: 'private',
      allowNull: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('t_dashboard', 'visibility');
  },
};
