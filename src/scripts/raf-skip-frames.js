{
  const log = (/*...args*/) => {
    // console.log(...args);
  };

  let settings;
  document.addEventListener('webgpu-dev-extension-settings', (event) => {
    // Handle data from event.detail
    log('got special event:', event);
    settings = event.detail;
  }, { once: true });
  log('sent message');
  document.dispatchEvent(new CustomEvent('webgpu-dev-extension-event', {
    detail: {
      cmd: 'getSettings',
    },
  }));

  function getRafSkipFrames() {
    return settings?.rafSkipFrames ?? 0;
  }

  function getTimeMult() {
    return settings?.timeMult ?? 1;
  }

  const origRAF = window.requestAnimationFrame.bind(window);

  let frameCount = 0;
  let id = 0;
  let currentId = 0;
  let callbacks = new Map();
  let processingCallbacks = new Map();

  function process(time) {
    currentId = 0;
    --frameCount;
    if (frameCount >= 0) {
      currentId = origRAF(process);
      return;
    }

    frameCount = getRafSkipFrames();
    processingCallbacks = callbacks;
    callbacks = new Map();

    const ids = [...processingCallbacks.keys()];
    for (const id of ids) {
      const cb = processingCallbacks.get(id);
      if (cb) {
        processingCallbacks.delete(id);
        try {
          cb(time *  getTimeMult());
        } catch (e) {
          console.error(e);
        }
      }
    }
  }

  performance.now = (function (origFn) {
    return function () {
      const now = origFn.call(this) *  getTimeMult();
      return now;
    };
  })(performance.now);

  // I'm not sure if this is a good idea or not. I've seen apps that user
  // Date.now for animation. One issue those is `Date.now()` will not match
  // `new Date().valueOf()`
  Date.now = (function (origFn) {
    return function () {
      const now = origFn.call(this) - (performance.now() | 0);
      //console.log('Date.now():', now);
      return now;
    };
  })(Date.now);

  window.setTimeout = (function (origFn) {
    return function (callback, duration, ...args) {
      const d = (duration ?? 0) *  getTimeMult();
      return origFn.call(this, callback, d, ...args);
    };
  })(window.setTimeout);

  window.setInterval = (function (origFn) {
    return function (callback, duration, ...args) {
      const d = (duration ?? 0) *  getTimeMult();
      return origFn.call(this, callback, d, ...args);
    };
  })(window.setInterval);

  window.requestAnimationFrame = (function (origFn) {
    return function (callback) {
      ++id;
      callbacks.set(id, callback);
      if (!currentId) {
        origFn(process);
      }
      return id;
    };
  })(window.requestAnimationFrame);

  window.cancelAnimationFrame = (function () {
    return function (id) {
      callbacks.delete(id);
      processingCallbacks.delete(id);
    };
  })(window.cancelAnimationFrame);
}

document.currentScript?.remove();
