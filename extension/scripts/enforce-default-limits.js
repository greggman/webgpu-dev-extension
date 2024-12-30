
if (typeof GPU !== 'undefined') {
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

  const origRequestAdapter = GPU.prototype.requestAdapter;
  const origRequestDevice = GPUAdapter.prototype.requestDevice;

  async function getDefaultLimits(desc) {
    let defaultLimits;
    try {
      const tempAdapter = await origRequestAdapter.call(navigator.gpu, desc);
      const tempDevice = await origRequestDevice.call(tempAdapter);
      defaultLimits = objLikeToObj(tempDevice.limits);
      tempDevice.destroy();
    } catch (e) {
      //
    }
    return defaultLimits;
  }

  GPU.prototype.requestAdapter = async function(desc = {}) {
    const limits = await getDefaultLimits();
    const adapter = await origRequestAdapter.call(this, desc);
    if (adapter && limits) {
      s_adapterToLimits.set(adapter, limits);
    }
    return adapter;
  }

  GPUAdapter.prototype.requestDevice = async function(desc = {}) {
    const newDesc = {
      ...desc,
      requiredLimits: {
        ...desc?.requiredLimits,
        ...objLikeToObj(this.limits),
      },
    };
    return await origRequestDevice.call(this, newDesc);
  };
}

document.currentScript?.remove();
