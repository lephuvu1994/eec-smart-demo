const asyncMiddleware = require('../middlewares/asyncMiddleware');

module.exports = function ScanServer() {
  /**
   * @api {get} /api/v1/eec/serverScan ping
   * @apiName ping
   * @apiGroup Ping
   */
  async function scanServer(req, res) {
    res.json({ status: 200 });
  }

  return Object.freeze({
    scanServer: asyncMiddleware(scanServer),
  });
};
