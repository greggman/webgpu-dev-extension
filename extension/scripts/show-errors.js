/* show-errors@0.1.4, license MIT */
(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

    const s_objToDevice = new WeakMap();

    /* eslint-disable no-inner-declarations */
    if (typeof GPUDevice !== 'undefined') {
        const deviceToErrorScopeStack = new WeakMap();
        const origPushErrorScope = GPUDevice.prototype.pushErrorScope;
        const origPopErrorScope = GPUDevice.prototype.popErrorScope;
        function errorWrapper(device, fnName, origFn, ...args) {
            const stack = new Error();
            origPushErrorScope.call(device, 'validation');
            const result = origFn.call(this, ...args);
            const errorScopeStack = deviceToErrorScopeStack.get(device);
            const currentErrorScope = errorScopeStack.findLast(scope => scope.filter === 'validation');
            const promise = origPopErrorScope.call(device)
                .then(error => {
                // If there was a currentErrorScope when we added pushed then remove our promise
                if (currentErrorScope) {
                    const ndx = currentErrorScope.errors.indexOf(promise);
                    if (ndx) {
                        currentErrorScope.errors.splice(ndx, 1);
                    }
                }
                else {
                    // there was no currentErrorScope so emit the error
                    if (error) {
                        device.dispatchEvent(new GPUUncapturedErrorEvent('uncapturederror', { error }));
                    }
                }
                // show it
                if (error) {
                    console.error('WebGPU ERROR in:', fnName, args);
                    console.error(error.message);
                    console.error(stack.stack);
                }
                // return it (as a promise)
                return error;
            });
            if (currentErrorScope) {
                currentErrorScope.errors.push(promise);
            }
            return result;
        }
        function addErrorWrapper(api, fnName) {
            const origFn = api.prototype[fnName];
            api.prototype[fnName] = function (...args) {
                return errorWrapper.call(this, this, fnName.toString(), origFn, ...args);
            };
        }
        function addErrorWrapperWithDevice(api, fnName) {
            const origFn = api.prototype[fnName];
            api.prototype[fnName] = function (...args) {
                const device = s_objToDevice.get(this);
                return errorWrapper.call(this, device, fnName.toString(), origFn, ...args);
            };
        }
        /**
         * given a class returns all the method names.
         */
        function getAPIFunctionNames(api) {
            return Object.entries(Object.getOwnPropertyDescriptors(api.prototype))
                .filter(([, info]) => info.enumerable && typeof info.value === 'function')
                .map(([name]) => name);
        }
        const skip = new Set([
            'pushErrorScope',
            'popErrorScope',
            'destroy',
        ]);
        getAPIFunctionNames(GPUDevice)
            .filter(n => !skip.has(n))
            .forEach(n => addErrorWrapper(GPUDevice, n));
        getAPIFunctionNames(GPUQueue)
            .forEach(n => addErrorWrapperWithDevice(GPUQueue, n));
        GPUDevice.prototype.pushErrorScope = (function (origFn) {
            return function (filter) {
                origFn.call(this, filter);
                const errorScopeStack = deviceToErrorScopeStack.get(this);
                errorScopeStack.push({ filter, errors: [] });
            };
        })(GPUDevice.prototype.pushErrorScope);
        GPUDevice.prototype.popErrorScope = (function (origFn) {
            return async function () {
                const errorScopeStack = deviceToErrorScopeStack.get(this);
                const errorScope = errorScopeStack.pop();
                if (errorScope === undefined) {
                    throw new DOMException('popErrorScope called on empty error scope stack', 'OperationError');
                }
                const errPromise = origFn.call(this);
                return errorScope.errors.pop() ?? errPromise;
            };
        })(GPUDevice.prototype.popErrorScope);
        GPUAdapter.prototype.requestDevice = (function (origFn) {
            return async function (...args) {
                const device = await origFn.call(this, ...args);
                if (device) {
                    device.addEventListener('uncapturederror', function (e) {
                        console.error(e.error.message);
                    });
                    deviceToErrorScopeStack.set(device, []);
                    s_objToDevice.set(device.queue, device);
                }
                return device;
            };
        })(GPUAdapter.prototype.requestDevice);
    }

}));
