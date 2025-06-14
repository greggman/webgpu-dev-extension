// DO NOT EDIT !!! AUTO-GENERATED-FILE !!!
(function () {
  'use strict';

  (function () {
    if (typeof GPU === 'undefined') {
      return;
    }

    console.log('webgpu-dev-extension running');

    /*
    class WrappedWorker extends Worker {
      constructor(...args) {
        console.log('worker:', ...args);
        super(...args);
      }
    }

    window.Worker = WrappedWorker;
    */

  /*
   Worker.prototype.constructor = (function(origFn) {
    return function(...args) {
      console.log('worker:', ...args);
      debugger;
      return origFn.call(this, ...args);
    }
   })(Worker.prototype.constructor);
   */

    /*
    const oldClass = Worker;
    const oldProto = Worker.prototype;
    Worker = function(...args) {
      console.log('worker-------:', ...args);
      return new oldClass(...args);
    };
    Worker.prototype = oldProto;
    Worker.prototype.constructor = Worker;

    new WebGPURecorder({
        "frames": 25,
        "export": "WebGPURecording",
        "width": 300,
        "height": 150
    });

    function wrapFn(className, fnName, fn) {
      const origFn = className.prototype[fnName];
      className.prototype[fnName] = fn(origFn);
    }

    wrapFn(GPU, 'requestAdapter', function(origFn) {
      return async function(...args) {
        const adapter = await origFn.call(this, ...args);
        console.log('got adapter:', adapter);
        return adapter;
      };
    });
    */

  })();

})();
//# sourceMappingURL=gpu-injected.js.map
