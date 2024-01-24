if (navigator.gpu) {
  navigator.gpu.requestAdapter = (function(origFn) {
    return async function(desc = {}) {
      return await origFn.call(this, {...desc, powerPreference: 'high-performance'});
    };
  })(navigator.gpu.requestAdapter);
}

document.currentScript.remove();
