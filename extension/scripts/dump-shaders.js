(function () {
  'use strict';

  if (typeof GPUDevice !== 'undefined') {
    console.log('webgpu-dev-extension: dump-shaders');
    GPUDevice.prototype.createShaderModule = (function(origFn) {
      return function(desc = {}) {
        console.log(desc.code);
        return origFn.call(this, desc);
      };
    })(GPUDevice.prototype.createShaderModule);
  }

  document.currentScript?.remove();

})();
//# sourceMappingURL=dump-shaders.js.map
