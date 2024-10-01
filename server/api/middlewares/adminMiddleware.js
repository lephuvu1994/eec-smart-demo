const { Error403 } = require('../../utils/httpErrors');
const { USER_ROLE } = require('../../utils/constants');

module.exports = function adminMiddleware(req, res, next) {
  if (req.user && [USER_ROLE.ADMIN, USER_ROLE.EECADMIN].includes(req.user.role)) {
    next();
  } else {
    throw new Error403('This route is only accessible to admin user.');
  }
};
