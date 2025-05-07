if (typeof GPUAdapter !== 'undefined') {
  const log = (...args) => {
    // console.log(...args);
  };

  let settingsPromise;

  document.addEventListener('webgpu-dev-extension-event', async (e) => {
    log('got message from main');
    settingsPromise = settingsPromise ?? new Promise(resolve => {
      chrome.runtime.sendMessage({cmd: 'getSettings'}, (response) => {
        resolve(response);
      });
    });
    const settings = await settingsPromise;
    document.dispatchEvent(new CustomEvent('webgpu-dev-extension-settings', {
      detail: settings,
    }));
  });
}
