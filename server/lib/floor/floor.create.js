const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');

/**
 * @description Create a room in a house.
 * @param {string} selector - The selector of a house.
 * @param {object} floor - The room to create.
 * @returns {Promise<object>} Resolve with created room.
 * @example
 * gladys.room.create('my-house', {
 *    name: 'Kitchen'
 * });
 */
async function create(selector, floor) {
  // eslint-disable-next-line no-console
  const house = await db.House.findOne({
    where: {
      selector,
    },
  });
  console.log('house', house.id);

  if (house === null) {
    throw new NotFoundError('House not found');
  }

  floor.house_id = house.id;
  console.log('floor', floor);
  const floorCreated = await db.Floor.create(floor);

  console.log('floorCreated', floorCreated);
  const floorPlain = floorCreated.get({ plain: true });
  console.log('floorPlain', floorPlain);
  return floorPlain;
}

module.exports = {
  create,
};
