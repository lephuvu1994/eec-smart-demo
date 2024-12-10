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
  console.log('floor', floor);
  const house = await db.House.findOne({
    where: {
      selector,
    },
  });

  if (house === null) {
    throw new NotFoundError('House not found');
  }

  floor.house_id = house.id;
  const floorCreated = await db.Floor.create(floor);
  const floorPlain = floorCreated.get({ plain: true });

  // add room to the brain
  this.brain.addNamedEntity('floor', floorPlain.id, floorPlain.name);

  return floorPlain;
}

module.exports = {
  create,
};
