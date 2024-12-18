module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('t_device_feature_state_aggregate', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      device_feature_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 't_device_feature',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      value: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addColumn('t_device_feature', 'last_monthly_aggregate', {
      type: Sequelize.DATE,
      defaultValue: null,
    });
    await queryInterface.addColumn('t_device_feature', 'last_daily_aggregate', {
      type: Sequelize.DATE,
      defaultValue: null,
    });
    await queryInterface.addColumn('t_device_feature', 'last_hourly_aggregate', {
      type: Sequelize.DATE,
      defaultValue: null,
    });

    try {
      await queryInterface.addIndex('t_device_feature_state_aggregate', ['type']);
    } catch (error) {
      if (error.original && error.original.code !== 'SQLITE_ERROR') {
        throw error;
      }
    }

    await queryInterface.addIndex('t_device_feature_state_aggregate', ['device_feature_id']);
    await queryInterface.addIndex('t_device_feature_state_aggregate', ['created_at']);
    await queryInterface.addIndex('t_device_feature_state', ['created_at']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('t_device_feature', 'last_monthly_aggregate');
    await queryInterface.removeColumn('t_device_feature', 'last_daily_aggregate');
    await queryInterface.removeColumn('t_device_feature', 'last_hourly_aggregate');
    await queryInterface.dropTable('t_device_feature_state_aggregate');
  },
};
