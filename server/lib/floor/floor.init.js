/**
 * @description Init floor.
 * @example
 * floor.init();
 */
async function init() {
  const floors = await this.getAll();

  floors.forEach((floor) => {
    this.brain.addNamedEntity('floor', floor.id, floor.name);
  });
}

module.exports = {
  init,
};
