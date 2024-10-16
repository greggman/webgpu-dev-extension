{
  const settings = {};
  try {
    Object.assign(settings, JSON.parse(sessionStorage.getItem('webgpu-dev-extension-settings')));
  } catch {
  }

  const origRAF = window.requestAnimationFrame.bind(window);
  const rafSkipFrames = settings.rafSkipFrames ?? 0;
  const timeMult = settings.timeMult ?? 1;

  let frameCount = 0;
  let id = 0;
  let currentId = 0;
  let callbacks = new Map();
  let processingCallbacks = new Map();;

  function process(time) {
    --frameCount;
    if (frameCount >= 0) {
      origRAF(process);
      return;
    }

    frameCount = rafSkipFrames;
    processingCallbacks = callbacks;
    callbacks = new Map();

    const ids = [...processingCallbacks.keys()];
    for (const id of ids) {
      const cb = processingCallbacks.get(id);
      if (cb) {
        processingCallbacks.delete(id);
        try {
          cb(time * timeMult);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }

  performance.now = (function(origFn) {
    return function() {
      return origFn.call(this) * timeMult;
    };
  })(performance.now);

  Date.now = (function(origFn) {
    return function() {
      return origFn.call(this) * timeMult;
    };
  })(Date.now);

  window.setTimeout = (function(origFn) {
    return function(callback, duration) {
      return origFn.call(this, callback, (duration ?? 0) * timeMult);
    };
  })(window.setTimeout);

  window.setInterval = (function(origFn) {
    return function(callback, duration) {
      return origFn.call(this, callback, (duration ?? 0) * timeMult);
    };
  })(window.setInterval);

  window.requestAnimationFrame = (function(origFn) {
    return function(callback) {
      ++id;
      callbacks.set(id, callback);
      if (!currentId) {
        origFn.call(this, process);
      }
      return id;
    };
  })(window.requestAnimationFrame);

  window.cancelAnimationFrame = (function(origFn) {
    return function(id) {
      callbacks.delete(id);
      processingCallbacks.delete(id);
    };
  })(window.cancelAnimationFrame);
}

document.currentScript.remove();
