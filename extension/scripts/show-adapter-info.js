if (navigator.gpu) {
  navigator.gpu.requestAdapter = (function(origFn) {
    return async function(...args) {
      const adapter = await origFn.call(this, ...args);
      if (adapter) {
        try {
          const info = adapter.info ?? (await adapter.requestAdapterInfo());
          console.log('adapter:', adapter);
          console.log('adapterInfo:', info);
        } catch (e) {
          console.log('ERR:', e);
        }
      }
      return adapter;
    };
  })(navigator.gpu.requestAdapter);

  GPUAdapter.prototype.requestDevice = (function(origFn) {
    return async function(...args) {
      const device = await origFn.call(this, ...args);
      if (device) {
        console.log('device:', device);
      }
      return device;
    };
  })(GPUAdapter.prototype.requestDevice);
}

document.currentScript.remove();
