const asyncMiddleware = require('../middlewares/asyncMiddleware');

module.exports = function SessionController(gladys) {
  /**
   * @api {post} /api/v1/session/:session_id/revoke revoke
   * @apiName revoke
   * @apiGroup Session
   */
  async function revoke(req, res) {
    const session = await gladys.session.revoke(req.user.id, req.params.session_id);
    res.json(session);
  }

  /**
   * @api {delete} /api/v1/session/:session_id/user/:user_id/revoke revokeUserSessions
   * @apiName revokeUserSessions
   * @apiGroup Session
   */
  async function revokeUserSessions(req, res) {
    const status = await gladys.session.revokeUserSessions(req.params.user_id, req.params.session_id);
    res.json(status);
  }

  /**
   * @api {delete} /api/v1/session/user/:user_id/revoke revokeUserAllSessions
   * @apiName revokeUserAllSessions
   * @apiGroup Session
   */
  async function revokeUserAllSessions(req, res) {
    const status = await gladys.session.revokeUserAllSessions(req.params.user_id);
    res.json(status);
  }

  /**
   * @api {post} /api/v1/session/tablet_mode setTabletMode
   * @apiName setTabletMode
   * @apiGroup Session
   */
  async function setTabletMode(req, res) {
    const session = await gladys.session.setTabletMode(
      req.user.id,
      req.session_id,
      req.body.tablet_mode,
      req.body.house,
    );
    res.json(session);
  }

  /**
   * @api {get} /api/v1/session/tablet_mode getTabletMode
   * @apiName getTabletMode
   * @apiGroup Session
   */
  async function getTabletMode(req, res) {
    const session = await gladys.session.getTabletMode(req.user.id, req.session_id);
    res.json(session);
  }

  /**
   * @api {post} /api/v1/session/api_key createApiKey
   * @apiName createApiKey
   * @apiGroup Session
   */
  async function createApiKey(req, res) {
    const scope = req.body.scope || ['dashboard:write', 'dashboard:read'];
    const session = await gladys.session.createApiKey(req.user.id, scope);
    res.status(201).json(session);
  }

  /**
   * @api {get} /api/v1/session get
   * @apiName get
   * @apiGroup Session
   */
  async function get(req, res) {
    const sessions = await gladys.session.get(req.user.id, req.query);
    res.json(sessions);
  }

  /**
   * @api {get} /api/v1/session/user/:user_id getByUser
   * @apiName getByUser
   * @apiGroup Session
   */
  async function getByUser(req, res) {
    const sessions = await gladys.session.get(req.params.user_id, req.query);
    res.json(sessions);
  }

  return Object.freeze({
    revoke: asyncMiddleware(revoke),
    revokeUserSessions: asyncMiddleware(revokeUserSessions),
    revokeUserAllSessions: asyncMiddleware(revokeUserAllSessions),
    createApiKey: asyncMiddleware(createApiKey),
    get: asyncMiddleware(get),
    getByUser: asyncMiddleware(getByUser),
    setTabletMode: asyncMiddleware(setTabletMode),
    getTabletMode: asyncMiddleware(getTabletMode),
  });
};
