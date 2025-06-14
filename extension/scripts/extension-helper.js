// DO NOT EDIT !!! AUTO-GENERATED-FILE !!!
(function () {
  'use strict';

  if (typeof GPUAdapter !== 'undefined') {

    let settingsPromise;

    document.addEventListener('webgpu-dev-extension-event', async () => {
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

})();
//# sourceMappingURL=extension-helper.js.map
