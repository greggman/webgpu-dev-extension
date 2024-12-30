if (typeof GPUAdapter !== 'undefined') {
  const settings = {};
  try {
    Object.assign(settings, JSON.parse(sessionStorage.getItem('webgpu-dev-extension-settings')));
  } catch {
  }

  const blockFeatureStrings = (settings.blockFeatures || '').split(/[,\s]+/).map(v => v.trim());
  const blockFeatureREs = blockFeatureStrings.map(v => new RegExp(`^${v.replaceAll('*', '.*')}$`));
  if (blockFeatureStrings.length > 0) {
    console.log('blocking WebGPU Features:', blockFeatureStrings.join(', '));
  }

  function isBlocked(feature) {
    for (const re of blockFeatureREs) {
      if (re.test(feature)) {
        return true;
      }
    }
    return false;
  }

  GPU.prototype.requestAdapter = (function (origFn) {
    return async function (desc) {
      const adapter = await origFn.call(this, desc);
      if (adapter) {
        Object.defineProperty(adapter, 'features', {
          value: new Set([...adapter.features].filter(feature => {
            const blocked = !isBlocked(feature);
            console.log('blocked WebGPU feature:', feature);
            return blocked;
          })),
        });
      }
      return adapter;
    };
  })(GPU.prototype.requestAdapter);

  GPUAdapter.prototype.requestDevice = (function (origFn) {
    return async function (desc) {
      if (desc && desc.requiredFeatures) {
        for (const feature of desc.requiredFeatures) {
          if (isBlocked(feature)) {
            throw new Error(`${feature} unsupported (blocked by extension)`);
          }
        }
      }
      return await origFn.call(this, desc);
    };
  })(GPUAdapter.prototype.requestDevice);
}

document.currentScript?.remove();
