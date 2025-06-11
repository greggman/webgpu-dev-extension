
import { callbackWhenDevicesGoFrom0to1Or1To0 } from '../lib/device.js';

export function rafCallbackWhenDevicesExist(callback: () => void) {
  let running: boolean;
  let rafId: number | undefined;

  function updateAndResetCount() {
    rafId = undefined;

    callback();

    if (running) {
      startRaf();
    }
  }

  function startRaf() {
    if (!rafId) {
      rafId = requestAnimationFrame(updateAndResetCount);
    }
  }

  function stopRaf() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = undefined;
    }
  }

  callbackWhenDevicesGoFrom0to1Or1To0((haveDevices) => {
    if (haveDevices) {
      running = true;
      startRaf();
    } else {
      stopRaf();
    }
  });

}