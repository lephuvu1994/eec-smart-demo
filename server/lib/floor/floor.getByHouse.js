const { Floor } = require('../../models');

async function getFloorsByHouse(houseId) {
    try {
        const floors = await Floor.find({ 
            houseId: houseId,
            isDeleted: false 
        }).sort({ floorNumber: 1 });
        
        return floors;
    } catch (error) {
        throw new Error(`Error getting floors by house: ${error.message}`);
    }
}

module.exports = {
    getFloorsByHouse,
};
