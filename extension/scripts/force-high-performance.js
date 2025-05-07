// DO NOT EDIT !!! AUTO-GENERATED-FILE !!!
(function () {
  'use strict';

  if (typeof GPU !== 'undefined') {
    console.log('webgpu-dev-extension: force-high-performance');
    GPU.prototype.requestAdapter = (function(origFn) {
      return async function(desc = {}) {
        const adapter = await origFn.call(this, {...desc, powerPreference: 'high-performance'});
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

})();
//# sourceMappingURL=force-high-performance.js.map
