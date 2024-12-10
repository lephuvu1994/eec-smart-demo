const db = require('../../models');

async function getFloorsByHouse(houseSelector) {
  try {
    const house = await db.House.findOne({
      where: {
        selector: houseSelector,
      },
    });
    const floors = await db.Floor.findAll({
      where: {
        house_id: house.id,
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
