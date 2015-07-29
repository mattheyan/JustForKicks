// From UMD: https://github.com/umdjs/umd/blob/master/returnExports.js
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.services = factory();
  }
}(this, function () {

    var serviceCache = {};

    return {
        locate: function (name) {
            if (!serviceCache.hasOwnProperty(name)) {
                throw new Error("Service '" + name +"' has not been registered.");
            }

            return serviceCache[name].implementation;
        },
        register: function (name, service) {
            if (serviceCache.hasOwnProperty(name)) {
                throw new Error("Service \"" + name + "\" is already registered.");
            }

            serviceCache[name] = { implementation: service };
        },
        override: function (name, service) {
            // Obtain the current service implementation (if it exists).
            var svcToOverride = serviceCache[name],
                // Register the service override.
                svc = serviceCache[name] = {
                    isOverride: true,
                    isRestored: false,
                    originalService: svcToOverride,
                    implementation: service
                };

            // If there is a current service, then assign a back-reference so that it
            // can restore even if the override is no longer the current service.
            if (svcToOverride) {
                svcToOverride.overridingService = svc;
            }

            // Return an object that can be used to restore the original service.
            return {
                getOriginalService: function () {
                    if (svc.isRestored) {
                        throw new Error("Cannot obtain the original service implementation because the override has already been restored.");
                    }

                    return svc.originalService ? svc.originalService.implementation : null;
                },
                restoreOriginalService: function () {
                    if (svc.isRestored) {
                        throw new Error("Service override cannot restore the original \"" + name + "\" service because it has already been restored.");
                    }

                    // If the override is itself overriden, then simply "splice" it.
                    if (svc.overridingService) {
                        svc.overridingService.originalService = svc.originalService;
                        svc.originalService.overridingService = svc.overridingService;
                    } else {
                        // The override is the current service, so simply restore it.
                        serviceCache[name] = svc.originalService;
                        svc.originalService.overridingService = null;
                    }

                    svc.isRestored = true;
                }
            };
        }
    };


}));
