
if (typeof GPU !== 'undefined') {
  console.log('webgpu-dev-extension: force-compatibility-mode');
  GPU.prototype.requestAdapter = (function (origFn) {
    return async function (desc = {}) {
      const adapter = await origFn.call(this, {...desc, featureLevel: 'compatibility'});
      return adapter;
    };
  })(GPU.prototype.requestAdapter);
}

document.currentScript?.remove();
