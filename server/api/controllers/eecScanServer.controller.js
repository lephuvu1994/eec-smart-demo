const asyncMiddleware = require('../middlewares/asyncMiddleware');

module.exports = function EECScanServer(gladys) {
  /**
   * @api {get} /api/v1/ping ping
   * @apiName ping
   * @apiGroup Ping
   */
  async function eecScanServer(req, res) {
    res.json({ status: 200, data: '123' });
  }

  return Object.freeze({
    eecScanServer: asyncMiddleware(eecScanServer),
  });
};
