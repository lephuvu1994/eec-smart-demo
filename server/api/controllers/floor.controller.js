const asyncMiddleware = require('../middlewares/asyncMiddleware');
/**
 * @apiDefine FloorParam
 * @apiParam {String} name Name of the floor.
 * @apiParam {String} [selector] Selector of the floor
 */

module.exports = function FloorController(gladys) {
  /**
   * @api {post} /api/v1/house/:house_selector/floor create
   * @apiName create
   * @apiGroup Floor
   * @apiUse FloorParam
   * @apiSuccessExample {json} Success-Example
   * {
   *   "id": "ac7f1ab2-0468-4750-bcdd-7e43b34e136a",
   *   "name": "First Floor",
   *   "selector": "first-floor",
   *   "house_id": "7932e6b3-b944-49a9-8d63-b98b8ecb2509",
   *   "updated_at": "2019-05-09T04:01:48.983Z",
   *   "created_at": "2019-05-09T04:01:48.983Z"
   * }
   */
  async function create(req, res) {
    const newFloor = await gladys.floor.create(req.params.house_selector, req.body);
    res.status(201).json(newFloor);
  }

   /**
   * @api {patch} /api/v1/house/:house_selector/floor/:floor_selector update
   * @apiName update
   * @apiGroup Floor
   * @apiUse FloorParam
   * @apiSuccessExample {json} Success-Example
   * {
   *   "id": "ac7f1ab2-0468-4750-bcdd-7e43b34e136a",
   *   "name": "First Floor",
   *   "selector": "first-floor",
   *   "house_id": "7932e6b3-b944-49a9-8d63-b98b8ecb2509",
   *   "updated_at": "2019-05-09T04:01:48.983Z",
   *   "created_at": "2019-05-09T04:01:48.983Z"
   * }
   */
   async function update(req, res) {
    const newFloor = await gladys.floor.update(req.params.house_selector, req.params.floor_selector, req.body);
    res.json(newFloor);
  }

  /**
   * @api {delete} /api/v1/house/:house_selector/floor/:floor_selector delete
   * @apiName delete
   * @apiGroup Floor
   */
  async function destroy(req, res) {
    await gladys.floor.destroy(req.params.house_selector, req.params.floor_selector);
    res.json({
      success: true,
    });
  }

  /**
   * @api {get} /api/v1/floor get
   * @apiName get
   * @apiGroup Floor
   * @apiSuccessExample {json} Success-Response:
   * [
   *   {
   *   "id": "2398c689-8b47-43cc-ad32-e98d9be098b5",
   *   "house_id": "a741dfa6-24de-4b46-afc7-370772f068d5",
   *   "name": "Test room",
   *   "selector": "test-room",
   *   "created_at": "2019-02-12T07:49:07.556Z",
   *   "updated_at": "2019-02-12T07:49:07.556Z",
   *   "devices": [
   *     {
   *       "name": "Test device",
   *       "selector": "test-device",
   *       "features": [
   *         {
   *           "name": "Test device feature",
   *           "selector": "test-device-feature",
   *           "category": "light",
   *           "type": "binary",
   *           "read_only": false,
   *           "unit": null,
   *           "min": 0,
   *           "max": 1,
   *           "last_value": 0,
   *           "last_value_changed": "2019-02-12T07:49:07.556Z"
   *         }
   *       ]
   *     }
   *   ]
   * }
   * ]
   */
  async function get(req, res) {
    const options = req.query;
    const floors = await gladys.floor.get(options);
    res.json(floors);
  }

  /**
   * @api {get} /api/v1/house/:house_selector/floor getByHouse
   * @apiName getByHouse
   * @apiGroup Floor
   * @apiParam {String} house_selector Selector of the house
   * @apiSuccessExample {json} Success-Response:
   * [
   *   {
   *     "id": "2398c689-8b47-43cc-ad32-e98d9be098b5",
   *     "house_id": "a741dfa6-24de-4b46-afc7-370772f068d5",
   *     "name": "Test room",
   *     "selector": "test-room",
   *     "created_at": "2019-02-12T07:49:07.556Z",
   *     "updated_at": "2019-02-12T07:49:07.556Z"
   *   }
   * ]
   */
  async function getByHouse(req, res) {
    const floors = await gladys.floor.getFloorsByHouse(req.params.house_selector);
    res.json(floors);
  }

  return Object.freeze({
    create: asyncMiddleware(create),
    update: asyncMiddleware(update),
    destroy: asyncMiddleware(destroy),
    get: asyncMiddleware(get),
    getByHouse: asyncMiddleware(getByHouse),
  });
};
