

export function callbackWhenDevicesGoFrom0to1Or1To0(callback: (haveDevice: boolean) => void) {
  const s_deviceRefs: WeakRef<GPUDevice>[] = [];

  function removeGCed() {
    const refs = s_deviceRefs.filter(ref => !!ref.deref());
    s_deviceRefs.length = 0;
    s_deviceRefs.push(...refs);
  }

  function checkDevices() {
    removeGCed();
    update();
  }

  let intervalId: number | undefined;
  function update() {
    removeGCed();

    if (!intervalId) {
      if (s_deviceRefs.length > 0) {
        intervalId = setInterval(checkDevices, 1000);
        callback(true);
      }
    } else {
      if (s_deviceRefs.length === 0) {
        clearInterval(intervalId);
        intervalId = undefined;
        callback(false);
      }
    }
  }

  GPUAdapter.prototype.requestDevice = (function (origFn) {
    return async function (this: GPUAdapter, ...args) {
      const device = await origFn.call(this, ...args);
      if (device) {
        s_deviceRefs.push(new WeakRef(device));
        update();
      }
      return device;
    };
  })(GPUAdapter.prototype.requestDevice);

  GPUDevice.prototype.destroy = (function (origFn) {
    return function (this: GPUDevice) {
      origFn.call(this);
      const ndx = s_deviceRefs.findIndex(ref => ref.deref() === this);
      s_deviceRefs.splice(ndx, 0);
      update();
    };
  })(GPUDevice.prototype.destroy);
}