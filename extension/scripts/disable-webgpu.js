// DO NOT EDIT !!! AUTO-GENERATED-FILE !!!
(function () {
  'use strict';

  if (navigator.gpu) {
    console.log('webgpu-dev-extension: disable WebGPU');
    navigator.gpu.requestAdapter = (function () {
      return async function () {
        return null;
      };
    })(navigator.gpu.requestAdapter);
  }

  document.currentScript?.remove();

})();
//# sourceMappingURL=disable-webgpu.js.map
