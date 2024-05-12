if (navigator.gpu) {
  console.log('disable WebGPU');
  navigator.gpu.requestAdapter = (function() {
    return async function() {
      return null;
    };
  })(navigator.gpu.requestAdapter);
}

document.currentScript.remove();
