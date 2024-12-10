const db = require('../../models');

async function getFloorsByHouse(houseId) {
    try {
        const floors = await db.Floor.findAll({
            where: {
                house_id: houseId,
            },
        });
        const floors2 = await db.Floor.findAll();
        console.log('floors', floors);
        console.log('floors2', floors2);
    return floors;
  } catch (error) {
    throw new Error(`Error getting floors by house: ${error.message}`);
  }
}

module.exports = {
  getFloorsByHouse,
};
