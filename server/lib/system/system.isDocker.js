const fs = require('fs');

/**
 * @description Return true if process is running inside Docker.
 * @returns {Promise<boolean>} Resolve with true if inside Docker.
 * @example
 * isDocker();
 */
function isDocker() {
  const checkPaths = ['/.dockerenv', '/proc/self/cgroup'];
  
  const checks = checkPaths.map(path => {
    return new Promise(resolve => {
      fs.access(path, fs.constants.F_OK, (err) => {
        if (err) {
          resolve(false);
        } else {
          // For /proc/self/cgroup, we should also check content
          if (path === '/proc/self/cgroup') {
            fs.readFile(path, 'utf8', (err, content) => {
              resolve(!err && content.includes('docker'));
            });
          } else {
            resolve(true);
          }
        }
      });
    });
  });

  return Promise.all(checks).then(results => results.some(Boolean));
}

module.exports = {
  isDocker,
};
