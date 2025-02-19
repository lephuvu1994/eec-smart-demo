const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');

/**
 * @description Revoke all sessions of a user.
 * @param {string} userId - Id of the user.
 * @returns {Promise} Return the number of revoked sessions.
 * @example
 * revokeUserAllSessions('375223b3-71c6-4b61-a346-0a9d5baf12b4');
 */
async function revokeUserAllSessions(userId) {
  // Find all sessions of the user
  const sessions = await db.Session.findAll({
    attributes: ['id'],
    where: {
      user_id: userId,
      revoked: false, // Only get non-revoked sessions
    },
  });

  if (sessions.length === 0) {
    throw new NotFoundError('No active sessions found for this user');
  }

  // Revoke all sessions in DB
  await db.Session.update(
    { revoked: true },
    {
      where: {
        user_id: userId,
        revoked: false,
      },
    }
  );

  // Revoke all sessions in RAM cache
  sessions.forEach((session) => {
    this.cache.set(`revoked_session:${session.id}`, true);
  });

  return {
    revokedCount: sessions.length,
    message: `Successfully revoked ${sessions.length} sessions`,
  };
}

module.exports = {
  revokeUserAllSessions,
};