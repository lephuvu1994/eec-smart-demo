const db = require('../../models');

const DEFAULT_OPTIONS = {
  expand: [],
  skip: 0,
  order_by: 'name',
  order_dir: 'asc',
};

const DEVICE_ATTRIBUTES = ['name', 'selector'];

const DEVICE_FEATURES_ATTRIBUTES = [
  'name',
  'selector',
  'category',
  'type',
  'read_only',
  'unit',
  'min',
  'max',
  'last_value',
  'last_value_changed',
];

const SERVICE_ATTRIBUTES = ['id', 'name'];

/**
 * @description Get all floors.
 * @returns {Promise<Array>} Resolve with list of floors.
 * @example
 * const floors = await floor.get();
 */
async function get() {
  const optionsWithDefault = { ...DEFAULT_OPTIONS };
  const include = [];
  const queryParams = {
    include,
    offset: optionsWithDefault.skip,
    order: [[optionsWithDefault.order_by, optionsWithDefault.order_dir]],
  };
  const floors = await db.Floor.findAll(queryParams);
  const floorsPlain = floors.map((floor) => floor.get({ plain: true }));
  return floorsPlain;
}

module.exports = {
  get,
};
