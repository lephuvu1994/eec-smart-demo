const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');

/**
 * @public
 * @description Delete a room.
 * @param {string} selector - The selector of the room to delete.
 * @example
 * gladys.room.destroy('kitchen');
 */
async function destroy(selector) {
  const floor = await db.Floor.findOne({
    where: {
      selector,
    },
  });

  if (floor === null) {
    throw new NotFoundError('Floor not found');
  }

  this.brain.removeNamedEntity('floor', floor.id, floor.name);

  await floor.destroy();
}

module.exports = {
  destroy,
};
