const db = require('../../models');
const jwt = require('jsonwebtoken');
const { NotFoundError } = require('../../utils/coreErrors');

/**
 * @private
 * @description This function login a user.
 * @name gladys.user.login
 * @param {string} qrCode - The QR code.
 * @param {string} jwtSecret - The JWT secret.
 * @returns {Promise} Promise.
 * @example
 * await gladys.user.loginWithQR('1234567890', 'my-secret');
 */
async function loginWithQR(qrCode, jwtSecret) {
  /**
   * @type {object} decoded
   */
  const decoded = jwt.verify(qrCode, jwtSecret, {
    issuer: 'gladys',
    audience: 'user',
  });

  
  const user = await db.User.findOne({
    where: { id: decoded.user_id},
    attributes: [
      'id',
      'firstname',
      'lastname',
      'email',
      'password',
      'language',
      'birthdate',
      'role',
      'created_at',
      'updated_at',
      'picture',
      'current_house_id',
      'temperature_unit_preference',
      'distance_unit_preference'
    ],
  });
  if (user === null) {
    throw new NotFoundError(`User "${decoded.user_id}" not found`);
  }
  // convert to plain object
  const userPlain = user.get({ plain: true });
  // remove password
  delete userPlain.password;
  return userPlain;
}

module.exports = {
    loginWithQR,
};
