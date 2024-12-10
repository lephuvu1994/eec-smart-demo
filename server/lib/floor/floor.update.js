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

  await existingFloor.update(floor);

  const updatedFloorPlain = existingFloor.get({ plain: true });

  return updatedFloorPlain;
}

module.exports = {
  update,
};
