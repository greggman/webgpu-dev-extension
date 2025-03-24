if (typeof GPUDevice !== 'undefined') {
  function addShowWrapper(API, apiName, methodName, origFn) {
    const name = `${apiName}.${methodName}`;
    // Set disable (in devtools) to true to disable this specific method breakpoint
    API.prototype[methodName] = function(...args) {
      console.log(name);
      return origFn.call(this, ...args);
    };
  }

  const APIs = [
    GPU,
    GPUAdapter,
    GPUBuffer,
    GPUCanvasContext,
    GPUCommandEncoder,
    GPUComputePassEncoder,
    GPUDevice,
    GPUQueue,
    GPUQuerySet,
    GPURenderBundleEncoder,
    GPURenderPassEncoder,
    GPUTexture,
  ];

  for (const API of APIs) {
    const apiName = API.prototype.constructor.name;
    const prototype = API.prototype;
    const methodNames = Object.entries(Object.getOwnPropertyDescriptors(prototype))
        .filter(([k, v]) => v.writable && v.enumerable && v.configurable && typeof v.value === 'function')
        .map(([k]) => k);
    for (const name of methodNames) {
      addShowWrapper(API, apiName, name, API.prototype[name]);
    }
  }
}

document.currentScript?.remove();
