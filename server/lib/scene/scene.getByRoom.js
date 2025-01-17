const db = require('../../models');

const DEFAULT_OPTIONS = {
  fields: ['id', 'name', 'description', 'icon', 'selector', 'active', 'last_executed', 'updated_at'],
  skip: 0,
  order_dir: 'ASC',
  order_by: 'name',
};

/**
 * @description Get list of scenes by room.
 * @param {string} roomSelector - Selector of the room.
 * @returns {Promise<Array>} Resolve with list of scenes.
 * @example
 * const scenes = await gladys.scene.getByRoom(roomSelector);
 */
async function getByRoom(roomSelector) {
    const optionsWithDefault = { ...DEFAULT_OPTIONS };
    
    const queryParams = {
      attributes: optionsWithDefault.fields,
      offset: optionsWithDefault.skip,
      order: [[optionsWithDefault.order_by, optionsWithDefault.order_dir]],
      include: [
        {
          model: db.TagScene,
          as: 'tags',
          attributes: ['name'],
        },
        {
          model: db.Room,
          where: {
            selector: roomSelector
          },
          attributes: []
        }
      ],
    };

    const scenes = await db.Scene.findAll(queryParams);
    return scenes.map((scene) => scene.get({ plain: true }));
}

module.exports = {
    getByRoom,
};
