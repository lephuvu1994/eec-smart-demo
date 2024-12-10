const db = require('../../models');

async function getFloorsByHouse(houseId) {
  console.log('houseId', houseId);
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
