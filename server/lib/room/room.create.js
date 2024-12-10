const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');

/**
 * @description Create a room in a house.
 * @param {string} houseSelector - The selector of a house.
 * @param {string} floorSelector - The selector of a floor.
 * @param {object} room - The room to create.
 * @returns {Promise<object>} Resolve with created room.
 * @example
 * gladys.room.create('my-house', 'my-floor', {
 *    name: 'Kitchen'
 * });
 */
async function create(houseSelector, floorSelector, room) {
  // eslint-disable-next-line no-console
  console.log('room', room);
  const house = await db.House.findOne({
    where: {
      selector: houseSelector,
    },
  });
  const floor = await db.Floor.findOne({
    where: {
      selector: floorSelector,
    },
  });

  if (house === null) {
    throw new NotFoundError('House not found');
  }

  room.house_id = house.id;
  room.floor_id = floor.id;
  const roomCreated = await db.Room.create(room);
  const roomPlain = roomCreated.get({ plain: true });

  // add room to the brain
  this.brain.addNamedEntity('room', roomPlain.id, roomPlain.name);

  return roomPlain;
}

module.exports = {
  create,
};
