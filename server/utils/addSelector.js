const { slugify } = require('./slugify');

/**
 * @description Add a selector to a given object.
 * @param {object} item - Any object to add a selector to.
 * @param {string} prefix - A prefix to add to the selector.
 * @example
 * addSelector({
 *  name: 'my object'
 * });
 */
function addSelector(item, prefix = '') {
  if (item.selector) {
    item.selector = slugify(item.selector);
  } else if (item.name) {
    // Ensure prefix is a string
    const validPrefix = typeof prefix === 'string' ? prefix : '';
    item.selector = slugify(validPrefix + item.name);
  }
}

module.exports = {
  addSelector,
};
