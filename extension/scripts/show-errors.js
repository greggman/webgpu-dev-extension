if (typeof GPUDevice !== 'undefined') {
  const deviceToErrorScopeStack/*: WeakMap<GPUDevice, {filter: GPUErrorFilter, errors: GPUError[]}[]>*/ = new WeakMap();
  const origPushErrorScope = GPUDevice.prototype.pushErrorScope;
  const origPopErrorScope = GPUDevice.prototype.popErrorScope;

  function getFilterForGPUError(error/*: GPUError*/)/*: GPUErrorFilter*/ {
    if (error instanceof GPUValidationError) {
      return 'validation';
    }
    if (error instanceof GPUOutOfMemoryError) {
      return 'out-of-memory';
    }
    if (error instanceof GPUInternalError) {
      return 'internal';
    }
    throw new Error('unknown GPUError type');
  }

  function emitGPUError(device/*: GPUDevice*/, error/*: GPUError*/) {
    const filter = getFilterForGPUError(error);
    const errorScopeStack = deviceToErrorScopeStack.get(device);
    const currentErrorScope = errorScopeStack.findLast(scope => scope.filter === filter);
    if (currentErrorScope) {
      currentErrorScope.errors.push(error);
    } else {
      device.dispatchEvent(new GPUUncapturedErrorEvent('uncapturedError', { error }));
    }
  }

  function addErrorWrapper(api, fnName) {
    const origFn = api.prototype[fnName];
    api.prototype[fnName] = function(...args) {
      const stack = new Error();
      origPushErrorScope.call(this, 'validation');
      const result = origFn.call(this, ...args);
      origPopErrorScope.call(this)
        .then(error => {
          if (error) {
            console.error(fnName, args);
            console.error(error.message);
            console.error(stack.stack);
            emitGPUError(this, error);
          }
         });
      return result;
    }
  }

  function getAPIFunctionNames(api) {
    return Object.entries(Object.getOwnPropertyDescriptors(api.prototype))
       .filter(([, info]) => info.enumerable && typeof info.value === 'function')
       .map(([name]) => name)
  }

  const skip = new Set([
    'pushErrorScope',
    'popErrorScope',
    'destroy',
  ]);
  getAPIFunctionNames(GPUDevice)
    .filter(n => !skip.has(n))
    .forEach(n => addErrorWrapper(GPUDevice, n));

  GPUDevice.prototype.pushErrorScope = (function(origFn) {
    return function(/*this: GPUDevice,*/ filter/*: GPUErrorFilter*/) {
      origFn.call(this, filter);
      const errorScopeStack = deviceToErrorScopeStack.get(this);
      errorScopeStack.push({filter, errors: []});
    };
  })(GPUDevice.prototype.pushErrorScope)

  GPUDevice.prototype.popErrorScope = (function(origFn) {
    return async function(/*this: GPUDevice*/) {
      const errorScopeStack = deviceToErrorScopeStack.get(this);
      const errorScope = errorScopeStack.pop();
      if (errorScope === undefined) {
        throw new DOMException('popErrorScope called on empty error scope stack', 'OperationError');
      }
      const err = await origFn.call(this);
      return errorScope.errors.length > 0 ? errorScope.errors.pop() : err;
    };
  })(GPUDevice.prototype.popErrorScope)

  GPUAdapter.prototype.requestDevice = (function(origFn) {
    return async function(...args) {
      const device = await origFn.call(this, args);
      if (device) {
        device.addEventListener('uncapturederror', function(e) {
          console.error(e.error.message);
        });
        deviceToErrorScopeStack.set(device, []);
      }
      return device;
    }
  })(GPUAdapter.prototype.requestDevice);
}