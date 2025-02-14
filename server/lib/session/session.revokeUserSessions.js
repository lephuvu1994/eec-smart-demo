const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');

/**
 * @description Revoke a session.
 * @param {string} userId - Id of the user.
 * @param {string} sessionId - Id of the session.
 * @returns {Promise} Return the revoked session.
 * @example
 * revoke('375223b3-71c6-4b61-a346-0a9d5baf12b4', '0a5f7305-4faf-42b3-aeb2-fbc0217c4855');
 */
async function revokeUserSessions(userId, sessionId) {
  const session = await db.Session.findOne({
    attributes: ['id'],
    where: {
      id: sessionId,
      user_id: userId,
    },
  });

  if (session === null) {
    throw new NotFoundError('Session not found');
  }

  // revoke session in DB
  await session.update({ revoked: true });
  // revoke access token in RAM cache
  this.cache.set(`revoked_session:${sessionId}`, true);

  return {
    status: 'success',
    id: sessionId,
    user_id: userId,
    session: session.useragent,
  };
}

module.exports = {
    revokeUserSessions,
};
