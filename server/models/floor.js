const { addSelector } = require('../utils/addSelector');

module.exports = (sequelize, DataTypes) => {
  const floor = sequelize.define(
    't_floor',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      house_id: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 't_house',
          key: 'id',
        },
      },
      name: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
        validate: {
          len: [1, 40],
        },
      },
      selector: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
    },
    {},
  );

  floor.beforeValidate((instance) => {
    addSelector(instance, 'floor_');
  });

  floor.associate = (models) => {
    floor.belongsTo(models.House, {
      foreignKey: 'house_id',
      targetKey: 'id',
      as: 'house',
    });
    floor.hasMany(models.Room, {
      foreignKey: 'floor_id',
      sourceKey: 'id',
      as: 'rooms',
    });
  };

  return floor;
};