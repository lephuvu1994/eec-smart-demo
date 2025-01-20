const { addSelector } = require('../utils/addSelector');

module.exports = (sequelize, DataTypes) => {
  const room = sequelize.define(
    't_room',
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
      floor_id: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 't_floor',
          key: 'id',
        },
      },
      image_url: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: '',
      },
      camera_url: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: '',
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

  room.beforeValidate((instance) => {
    addSelector(instance, instance.floor_id + '_');
  });

  room.associate = (models) => {
    room.belongsTo(models.House, {
      foreignKey: 'house_id',
      targetKey: 'id',
      as: 'house',
    });
    room.belongsTo(models.Floor, {
      foreignKey: 'floor_id',
      targetKey: 'id',
      as: 'floor',
    });
    room.hasMany(models.Device, {
      foreignKey: 'room_id',
      sourceKey: 'id',
      as: 'devices',
    });
    room.hasMany(models.Scene, {
      foreignKey: 'room_id',
      sourceKey: 'id',
      as: 'scenes',
    });
  };

  return room;
};
