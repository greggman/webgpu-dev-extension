if (typeof GPUDevice !== 'undefined') {
  const log = (/*...args*/) => {
    //  console.log(...args);
  };

  const settingsPromise = new Promise((resolve) => {
    document.addEventListener('webgpu-dev-extension-settings', (event) => {
      // Handle data from event.detail
      log('got special event:', event);
      setBreakpoints(event.detail);
      resolve(event.detail);
    }, { once: true });
    log('sent message');
    document.dispatchEvent(new CustomEvent('webgpu-dev-extension-event', {
      detail: {
        cmd: 'getSettings',
      },
    }));
  });

  function forEachFunction(filter, fn) {
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
      const prototype = API.prototype;
      const methodNames = Object.entries(Object.getOwnPropertyDescriptors(prototype))
          .filter(([k, v]) => filter(k) && v.writable && v.enumerable && v.configurable && typeof v.value === 'function')
          .map(([k]) => k);
      for (const name of methodNames) {
        const id = `${API.prototype.constructor.name}.${name}`;
        fn(id, API, name, API.prototype[name]);
      }
    }
  }

  // The ids (API.methodName) that we want to break at.
  const s_breakpointIds = new Set();

  // This is called when the event with our settings arrives
  // which is after user code has started. But, we'll pause
  // when they ask for an adapter, wait for that event, then call this
  // before returning the adapter (see requestAdapter)
  function setBreakpoints(settings) {
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

    forEachFunction(needsWrap, (id) => {
      console.log(`added breakpoint to: ${id}`);
      s_breakpointIds.add(id);
    });
  }

  // We need to wrap all the functions immediately, otherwise the app might
  // pull out functions before we get a change to wrap them.
  function addBreakpointWrapper(id, API, methodName, origFn) {
    // eslint-disable-next-line prefer-const
    let disable = false;
    // Set disable (in devtools) to true to disable this specific method breakpoint
    API.prototype[methodName] = function (...args) {
      if (s_breakpointIds.has(id) && !disable) {
        // eslint-disable-next-line no-debugger
        debugger;
      }
      return origFn.call(this, ...args);
    };
  }
  forEachFunction(() => true, addBreakpointWrapper);

  GPU.prototype.requestAdapter = (function (origFn) {
    return async function (desc) {
      log('waiting for settings');
      await settingsPromise;
      log('got settings');
      const adapter = await origFn.call(this, desc);
      return adapter;
    };
  })(GPU.prototype.requestAdapter);
}

document.currentScript?.remove();
