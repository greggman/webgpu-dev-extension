// DO NOT EDIT !!! AUTO-GENERATED-FILE !!!
(function () {
  'use strict';

  if (typeof GPU !== 'undefined') {
    console.log('webgpu-dev-extension: compat-only');
    GPU.prototype.requestAdapter = (function (origFn) {
      return async function (desc = {}) {
        const adapter = await origFn.call(this, {...desc, featureLevel: 'compatibility'});
        return adapter;
      };
    })(GPU.prototype.requestAdapter);
  }

  document.currentScript?.remove();

})();
//# sourceMappingURL=compat-only.js.map
