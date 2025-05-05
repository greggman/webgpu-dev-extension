if (typeof GPUAdapter !== undefined) {
  console.log('webgpu-dev-extension: show-memory');

//insert-webgpu-memory-here

  const shortSize = (function() {
    const suffixes = ['b', 'k', 'mb', 'gb', 'tb', 'pb'];
    return function(size) {
      const suffixNdx = Math.log2(Math.abs(size)) / 10 | 0;
      const suffix = suffixes[Math.min(suffixNdx, suffixes.length - 1)];
      const base = 2 ** (suffixNdx * 10);
      return `${(size / base).toFixed(0)}${suffix}`;
    };
  })();

  const deviceRefs = [];
  let intervalId;

  let oldTotal = 0;
  function checkMemory() {
    const usage = getWebGPUMemoryUsage();
    if (usage.memory.maxTotal > oldTotal) {
      oldTotal = usage.memory.maxTotal;
      console.log('memory usage:', shortSize(oldTotal));
    }
    checkDeviceRefs();
  };

  function checkDeviceRefs() {
    if (intervalId) {
      if (deviceRefs.length === 0) {
        clearInterval(intervalId);
        // console.log('show-memory: pauses');
      }
    } else {
      if (deviceRefs.length > 0) {
        intervalId = setInterval(checkMemory, 1000);
        // console.log('show-memory: started');
      }
    }
  }

  GPUAdapter.prototype.requestDevice = (function(origFn) {
    return async function(...args) {
      const device = await origFn.call(this, args);
      if (device) {
        deviceRefs.push(new WeakRef(device));
        checkDeviceRefs();
      }
      return device;
    };
  })(GPUAdapter.prototype.requestDevice);

  GPUDevice.prototype.destroy = (function(origFn) {
    return async function(...args) {
      origFn.call(this, ...args);
      const ndx = deviceRefs.findIndex(ref => ref.deref() === this);
      if (ndx >= 0) {
        deviceRefs.splice(ndx, 1);
        checkDeviceRefs();
      }
    };
  })(GPUDevice.prototype.destroy);

};
