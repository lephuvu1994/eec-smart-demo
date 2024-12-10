'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Tạo bảng t_floor
    await queryInterface.createTable('t_floor', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      house_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 't_house',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      selector: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    //
  },

  down: async (queryInterface, Sequelize) => {
    // 1. Xóa bảng t_floor
    await queryInterface.dropTable('t_floor');
  },
};
