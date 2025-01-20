const db = require('../../models');

/**
 * @description Create a new scene with room information.
 * @param {string} roomSelector - The room selector.
 * @param {object} scene - A scene object.
 * @returns {Promise} - Resolve with the created scene.
 * @example
 * scene.createByRoom('living-room', {
 *   name: 'my scene'
 * });
 */
async function createByRoom(roomSelector, scene) {
    const room = await db.Room.findOne({
        where: {
            selector: roomSelector,
        },
    });
    if (!room) {
        throw new Error('Room not found');
    }

    // Add room information to scene
    const sceneWithRoom = {
        ...scene,
        room_id: room.id
    };

    // create scene in DB
    const createdScene = await db.Scene.create(sceneWithRoom, {
        include: [
            {
                model: db.TagScene,
                as: 'tags',
                attributes: ['name'],
            },
        ],
    });

    const plainScene = createdScene.get({ plain: true });
    // add scene to live store
    this.addScene(plainScene);
    // return created scene
    return plainScene;
}

module.exports = {
    createByRoom,
};
