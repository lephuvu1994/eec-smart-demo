const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');

/**
 * @description Update a floor.
 * @param {string} selector - The selector of the floor.
 * @param {object} floor - The new floor.
 * @returns {Promise<object>} Resolve with updated floor.
 * @example
 * gladys.floor.update('first-floor', {
 *    name: 'New First Floor'
 * });
 */
async function update(selector, floor) {
  const existingFloor = await db.Floor.findOne({
    where: {
      selector,
    },
  });

  if (existingFloor === null) {
    throw new NotFoundError('Floor not found');
  }

  const oldName = existingFloor.name;

  await existingFloor.update(floor);

  const updatedFloorPlain = existingFloor.get({ plain: true });

  if (oldName !== updatedFloorPlain.name) {
    this.brain.removeNamedEntity('floor', updatedFloorPlain.id, oldName);
    this.brain.addNamedEntity('floor', updatedFloorPlain.id, updatedFloorPlain.name);
  }

  return updatedFloorPlain;
}

module.exports = {
  update,
};
