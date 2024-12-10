const { create } = require('./floor.create');
const { get } = require('./floor.get');
const { getAll } = require('./floor.getAll');
const { init } = require('./floor.init');
const { update } = require('./floor.update');
const { destroy } = require('./floor.destroy');
const { getFloorsByHouse } = require('./floor.getByHouse');

const Floor = function Floor() {};

Floor.prototype.create = create;
Floor.prototype.get = get;
Floor.prototype.getAll = getAll;
Floor.prototype.getFloorsByHouse = getFloorsByHouse;
Floor.prototype.update = update;
Floor.prototype.destroy = destroy;

module.exports = Floor;
