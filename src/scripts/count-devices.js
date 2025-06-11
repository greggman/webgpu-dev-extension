if (typeof GPUAdapter !== 'undefined') {
  let maxActiveDevices = 0;
  let allDevices = [];

  function updateDevices() {
    const countBefore = allDevices.length;
    // remove GCed devices
    allDevices = allDevices.filter(v => !!v.deref());
    const numGarbageCollectedDevices = countBefore - allDevices.length;
    if (numGarbageCollectedDevices > 0) {
      console.info('num garbage collected devices:', numGarbageCollectedDevices);
    }

    console.info('num active WebGPU devices', allDevices.length);
    if ( allDevices.length > maxActiveDevices) {
      maxActiveDevices = allDevices.length;
      console.info('maximum active WebGPU devices', maxActiveDevices);
    }
  }

  GPUAdapter.prototype.requestDevice = (function (origFn) {
    return async function (...args) {
      const device = await origFn.call(this, ...args);
      if (device) {
        allDevices.push(new WeakRef(device));
        updateDevices();
      }
      return device;
    };
  })(GPUAdapter.prototype.requestDevice);

  GPUDevice.prototype.destroy = (function (origFn) {
    return function (...args) {
      const ndx = allDevices.findIndex(v => v.deref() === this);
      if (ndx >= 0) {
        allDevices.splice(ndx, 1);
      }
      origFn.call(this, ...args);
      updateDevices();
    };
  })(GPUDevice.prototype.destroy);
}

document.currentScript?.remove();
