// DO NOT EDIT !!! AUTO-GENERATED-FILE !!!
(function () {
  'use strict';

  if (typeof GPU !== 'undefined') {
    console.log('webgpu-dev-extension: enforce-default-limits');
    function objLikeToObj(objLike) {
      const obj = {};
      for (const key in objLike) {
        obj[key] = objLike[key];
      }
      return obj;
    }

    const s_adapterToLimits = new WeakMap();
    const gpuAdapterPrototypeDescriptors = Object.getOwnPropertyDescriptors(GPUAdapter.prototype);

    // We can't just set `limits` on the adapter because it's actually a getter.
    // So, override the getter.
    Object.defineProperty(GPUAdapter.prototype, 'limits', {
      get() {
        const limits = s_adapterToLimits.get(this) ?? gpuAdapterPrototypeDescriptors.limits.get.call(this);
        return limits;
      },
    });

    function enforceDefaultLimits(adapter/*: GPUAdapter*/, desc/*: GPUDeviceDescriptor | undefined*/) {
      if (desc?.requiredLimits) {
        const limits = s_adapterToLimits.get(adapter);
        for (const [key, value] of Object.entries(desc.requiredLimits)) {
          const limit = limits[key];
          if (limit !== undefined && value !== undefined) {
            const [beyondLimit, condition] = key.startsWith('max')
              ? [value > limit, 'greater']
              : [value < limit, 'less'];
            if (beyondLimit) {
              throw new DOMException(
                `requestedLimit ${value} for ${key} is ${condition} than adapter limit ${limit}`,
                'OperationError'
              );
            }
          }
        }
      }
    }

    const origRequestAdapter = GPU.prototype.requestAdapter;
    const origRequestDevice = GPUAdapter.prototype.requestDevice;

    async function getDefaultLimits(desc) {
      let defaultLimits;
      try {
        const tempAdapter = await origRequestAdapter.call(navigator.gpu, desc);
        const tempDevice = await origRequestDevice.call(tempAdapter);
        defaultLimits = objLikeToObj(tempDevice.limits);
        tempDevice.destroy();
      } catch {
        //
      }
      return defaultLimits;
    }

    GPU.prototype.requestAdapter = async function (desc = {}) {
      const limits = await getDefaultLimits(desc);
      const adapter = await origRequestAdapter.call(this, desc);
      if (adapter && limits) {
        s_adapterToLimits.set(adapter, limits);
      }
      return adapter;
    };

    GPUAdapter.prototype.requestDevice = async function (desc = {}) {
      enforceDefaultLimits(this, desc);
      return await origRequestDevice.call(this, desc);
    };
  }

  document.currentScript?.remove();

})();
//# sourceMappingURL=enforce-default-limits.js.map
