const logger = require('../../utils/logger');
const { SERVICE_STATUS } = require('../../utils/constants');
const db = require('../../models');

/**
 * @public
 * @description Load all services.
 * @param {object} gladys - Gladys object.
 * @returns {Promise} Resolve when init is finished.
 * @example
 * service.load(gladys);
 */
async function load(gladys) {
  const SERVICES_TO_LOAD = Object.keys(this.servicesFromFiles);
  console.log("SERVICES_TO_LOAD", SERVICES_TO_LOAD);
  await Promise.all(
    SERVICES_TO_LOAD.map(async (service) => {
      console.log("SERVICES_TO_LOAD_SERVICE", service);
      const serviceToInsertOrUpdate = {
        name: service,
        selector: service,
        version: gladys.version,
        has_message_feature: false,
      };
      // check if service already exist
      let serviceInDb = await db.Service.findOne({
        where: {
          pod_id: null,
          name: service,
        },
      });
      // if not, we create it
      if (!serviceInDb) {
        serviceInDb = await db.Service.create(serviceToInsertOrUpdate);
        serviceToInsertOrUpdate.status = SERVICE_STATUS.ENABLED;
      }
      // we try to start the service
      try {
        // calling constructor of service
        const newServiceObject = this.servicesFromFiles[service](gladys, serviceInDb.id);
        // saving service in stateManager
        this.stateManager.setState('service', service, newServiceObject);
        this.stateManager.setState('serviceById', serviceInDb.id, newServiceObject);
        if (newServiceObject.message && newServiceObject.message.send) {
          serviceToInsertOrUpdate.has_message_feature = true;
        }
      } catch (e) {
        logger.debug(e);
        console.log("SERVICE_LOAD_ERROR", e);
        serviceToInsertOrUpdate.status = SERVICE_STATUS.DISABLED;
      }
      // we update if needed the service with success/failed enabled
      // and features
      serviceInDb.set(serviceToInsertOrUpdate);
      return serviceInDb.save();
    }),
  );
  return null;
}

module.exports = {
  load,
};
