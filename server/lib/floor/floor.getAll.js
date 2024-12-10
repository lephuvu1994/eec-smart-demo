const db = require('../../models');

/**
 * @description Get all floors.
 * @returns {Promise<Array>} Resolve with list of floors.
 * @example
 * const floors = await floor.getAll();
 */
async function getAll() {
  const floors = await db.Floor.findAll();
  const floorsPlain = floors.map((floor) => floor.get({ plain: true }));
  return floorsPlain;
}

module.exports = {
  getAll,
};
