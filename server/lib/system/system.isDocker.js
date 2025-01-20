const fs = require('fs');

/**
 * @description Return true if process is running inside Docker.
 * @returns {Promise<boolean>} Resolve with true if inside Docker.
 * @example
 * isDocker();
 */
function isDocker() {
  return new Promise((resolve) => {
    fs.access('/.dockerenv', fs.constants.F_OK, (err) => {
      console.log("dockerenv", err)
      if (!err) {
        resolve(true);
        return;
      }

      // If /.dockerenv doesn't exist, check /proc/self/cgroup
      fs.readFile('/proc/self/cgroup', 'utf8', (err, content) => {
        console.log("cgroup", err, content)
        if (err) {
          resolve(false);
          return;
        }
        
        resolve(content.includes('docker'));
      });
    });
  });
}

module.exports = {
  isDocker,
};
