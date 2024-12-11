const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');

/**
 * @public
 * @description Delete a room.
 * @param {string} houseSelector - The selector of the house.
 * @param {string} floorSelector - The selector of the floor to delete.
 * @example
 * gladys.floor.destroy('my-house', 'my-floor');
 */
async function destroy(houseSelector, floorSelector) {
  const house = await db.House.findOne({
    where: {
      selector: houseSelector,
    },
  });

  if (house === null) {
    throw new NotFoundError('House not found');
  }

  const floor = await db.Floor.findOne({
    where: {
      selector: floorSelector,
      house_id: house.id,
    },
  });

  if (floor === null) {
    throw new NotFoundError('Floor not found');
  }

  await floor.destroy();
}

module.exports = {
  destroy,
};
