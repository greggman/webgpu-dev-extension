if (typeof GPUDevice !== 'undefined') {
  let settings = {};
  try {
    settings = JSON.parse(sessionStorage.getItem('webgpu-dev-extension-settings'));
  } catch {
  }

  const breakpointStrings = (settings.breakpoints || '').split(/[,\s]+/).map(v => v.trim());
  const breakpointREs = breakpointStrings.map(v => new RegExp(`^${v.replaceAll('.', '\\.').replaceAll('*', '.*')}$`));
  console.log(breakpointREs);
  function needsWrap(methodName) {
    for (const re of breakpointREs) {
      if (re.test(methodName)) {
        return true;
      }
    }
    return false;
  }

  function addBreakpointWrapper(API, methodName, origFn) {
    console.log(`added breakpoint to: ${API.prototype.constructor.name}.${methodName}`);
    let disable = false;
    // Set disable (in devtools) to true to disable this specific method breakpoint
    API.prototype[methodName] = function(...args) {
      if (!disable) {
        debugger;
      }
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
        .filter(([k, v]) => needsWrap(`${apiName}.${k}`) && v.writable && v.enumerable && v.configurable && typeof v.value === 'function')
        .map(([k]) => k);
    for (const name of methodNames) {
      addBreakpointWrapper(API, name, API.prototype[name]);
    }
  }

}

document.currentScript?.remove();
