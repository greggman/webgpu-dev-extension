// DO NOT EDIT !!! AUTO-GENERATED-FILE !!!
(function () {
  'use strict';

  if (typeof GPUAdapter !== 'undefined') {

    const settingsPromise = new Promise((resolve, reject) => {
      document.addEventListener('webgpu-dev-extension-settings', (event) => {
        resolve(event.detail);
      }, { once: true });
      document.dispatchEvent(new CustomEvent('webgpu-dev-extension-event', {
        detail: {
          cmd: 'getSettings',
        },
      }));
    });

    async function getIsBlocked() {
      const settings = await settingsPromise;
      const blockFeatureStrings = (settings.blockFeatures || '').split(/[,\s]+/).map(v => v.trim());
      const blockFeatureREs = blockFeatureStrings.map(v => new RegExp(`^${v.replaceAll('*', '.*')}$`));
      if (blockFeatureStrings.length > 0) {
        console.log('blocking WebGPU Features:', blockFeatureStrings.join(', '));
      }

      const isBlocked = (feature) => {
        for (const re of blockFeatureREs) {
          if (re.test(feature)) {
            return true;
          }
        }
        return false;
      };
      return isBlocked;
    }

    GPU.prototype.requestAdapter = (function (origFn) {
      return async function (desc) {
        const isBlocked = await getIsBlocked();
        const adapter = await origFn.call(this, desc);
        if (adapter) {
          Object.defineProperty(adapter, 'features', {
            value: new Set([...adapter.features].filter(feature => {
              const blocked = isBlocked(feature);
              if (blocked) {
                console.log('blocked WebGPU feature:', feature);
              }
              return !blocked;
            })),
          });
        }
        return adapter;
      };
    })(GPU.prototype.requestAdapter);

    GPUAdapter.prototype.requestDevice = (function (origFn) {
      return async function (desc) {
        const isBlocked = await getIsBlocked();
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

})();
//# sourceMappingURL=block-features.js.map
