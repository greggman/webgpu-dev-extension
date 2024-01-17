if (navigator.gpu) {
  navigator.gpu.requestAdapter = (function(origFn) {
    return async function(desc = {}) {
      const adapter = await origFn.call(this, {...desc, compatibilityMode: true});
      if (adapter) {
        try {
          const info = await adapter.requestAdapterInfo();
          console.log('adapter:', adapter);
          console.log('adapterInfo:', info);
        } catch (e) {
          console.log("ERR:", e);
        }
      }
      return adapter;
    };
  })(navigator.gpu.requestAdapter);
}

document.currentScript.remove();
