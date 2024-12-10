const db = require('../../models');
const { Floor } = require('../../models');

async function getFloorsByHouse(houseId) {
  try {
    const floors = await db.Floor.findAll({
      where: {
        house_id: houseId,
      },
    });
    return floors;
  } catch (error) {
    throw new Error(`Error getting floors by house: ${error.message}`);
  }
}

module.exports = {
  getFloorsByHouse,
};
