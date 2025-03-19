if (typeof GPUDevice !== 'undefined') {
  const log = (...args) => {
    //  console.log(...args);
  };

  const settingsPromise = new Promise((resolve, reject) => {
    document.addEventListener('webgpu-dev-extension-settings', (event) => {
      // Handle data from event.detail
      log('got special event:', event);
      addBreakpoints(event.detail);
      resolve(event.detail);
    }, { once: true });
    log('sent message');
    document.dispatchEvent(new CustomEvent('webgpu-dev-extension-event', {
      detail: {
        cmd: 'getSettings',
      },
    }));
  });

  function addBreakpoints(settings) {
    const breakpointStrings = (settings.breakpoints || '').split(/[,\s]+/).map(v => v.trim());
    const breakpointREs = breakpointStrings.map(v => new RegExp(`^${v.replaceAll('.', '\\.').replaceAll('*', '.*')}$`));
    log(breakpointREs);
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

  GPU.prototype.requestAdapter = (function (origFn) {
    return async function (desc) {
      log('waiting for settings');
      const settings = await settingsPromise;
      log('get settings');
      const adapter = await origFn.call(this, desc);
      return adapter;
    };
  })(GPU.prototype.requestAdapter);
}

document.currentScript?.remove();
