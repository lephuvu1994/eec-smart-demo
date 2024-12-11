const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');

/**
 * @description Update a floor.
 * @param {string} houseSelector - The selector of the house.
 * @param {string} floorSelector - The selector of the floor.
 * @param {object} floor - The new floor.
 * @returns {Promise<object>} Resolve with updated floor.
 * @example
 * gladys.floor.update('my-house', 'my-floor', {
 *    name: 'New First Floor'
 * });
 */
async function update(houseSelector, floorSelector, floor) {
  const house = await db.House.findOne({
    where: {
      selector: houseSelector,
    },
  });

  if (house === null) {
    throw new NotFoundError('House not found');
  }

  const existingFloor = await db.Floor.findOne({
    where: {
      selector: floorSelector,
      house_id: house.id,
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
