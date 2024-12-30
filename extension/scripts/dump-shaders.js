if (typeof GPUDevice !== 'undefined') {
  GPUDevice.prototype.createShaderModule = (function(origFn) {
    return function(desc = {}) {
      console.log(desc.code);
      return origFn.call(this, desc);
    };
  })(GPUDevice.prototype.createShaderModule);
}

document.currentScript?.remove();
