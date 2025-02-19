const { NotFoundError } = require('../../utils/coreErrors');

/**
 * @description Get list of device.
 * @param {string} [roomId] - Room ID to filter devices by.
 * @returns {Promise<Array>} Resolve with list of devices.
 * @example
 * const devices = await gladys.device.getByRoomId('room-id');
 */
async function getByRoomId(roomId) {
  const devices = await this.deviceManager.get({ roomId });

  if (devices === null) {
    throw new NotFoundError('Device not found');
  }

  return devices;
}

module.exports = {
  getByRoomId,
};
