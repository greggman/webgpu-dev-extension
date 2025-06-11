if (typeof GPU !== 'undefined') {
  console.log('webgpu-dev-extension: force-low-power');
  GPU.prototype.requestAdapter = (function (origFn) {
    return async function (desc = {}) {
      const adapter = await origFn.call(this, {...desc, powerPreference: 'low-power'});
      if (adapter) {
        try {
          const info = adapter.info ?? (await adapter.requestAdapterInfo());
          console.log('adapter:', adapter);
          console.log('adapterInfo:', info);
        } catch (e) {
          console.log("ERR:", e);
        }
      }
      return adapter;
    };
  })(GPU.prototype.requestAdapter);
}

document.currentScript?.remove();
