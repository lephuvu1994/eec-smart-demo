const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');

/**
 * @description Revoke a session.
 * @param {string} userId - Id of the user.
 * @returns {Promise} Return the revoked session.
 * @example
 * revoke('375223b3-71c6-4b61-a346-0a9d5baf12b4', '0a5f7305-4faf-42b3-aeb2-fbc0217c4855');
 */
async function revokeUserAllSessions(userId) {
  const sessions = await db.Session.findAll({
    attributes: ['id'],
    where: {
          user_id: userId,
        },
  });

  if (sessions === null) {
    throw new NotFoundError('Session not found');
  }

  for (const session of sessions) {
    await session.update({ revoked: true });
    this.cache.set(`revoked_session:${session.id}`, true);
  }

  const listSessions = sessions.map((session) => {
    return {
      id: session.id,
      revoked: true,
      session: session.useragent,
    };
  });

  return {
      status: 'success',
      user_id: userId,
      listSessions: listSessions,
  };
}

module.exports = {
    revokeUserAllSessions,
};
