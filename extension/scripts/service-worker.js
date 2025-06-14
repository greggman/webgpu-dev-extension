// DO NOT EDIT !!! AUTO-GENERATED-FILE !!!
(function () {
  'use strict';

  function log(/*...args*/) {
    // console.log(...args);
  }

  function getContentScripts(settings) {
    settings = settings ?? {};
    const scripts = [];

    const injectScript = (url) => {
      scripts.push(url);
    };

    if (settings.showCallCounts) {
      injectScript('scripts/show-call-counts.js');
    }

    if (settings.showRedundantStateSetting) {
      injectScript('scripts/show-redundant-state-setting.js');
    }

    if (settings.enforceDefaultLimits) {
      injectScript('scripts/enforce-default-limits.js');
    }

    if (settings.removeWebGPU) {
      injectScript('scripts/remove-webgpu.js');
    }

    if (settings.countActiveDevices) {
      injectScript('scripts/count-devices.js');
    }

    if (settings.blockFeatures) {
      injectScript('scripts/block-features.js');
    }

    if (settings.capture) {
      injectScript('scripts/webgpu_recorder.js');
      injectScript('scripts/gpu-injected.js');
    }

    if (settings.compat) {
      injectScript('scripts/webgpu-compat-validation.js');
    }

    if (settings.customFormatters) {
      injectScript('scripts/custom-formatters.js');
    }

    switch (settings.forceMode) {
      case 'low-power':
        injectScript('scripts/force-low-power.js');
        break;
      case 'high-performance':
        injectScript('scripts/force-high-performance.js');
        break;
      case 'compatibility-mode':
        injectScript('scripts/force-compatibility-mode.js');
        break;
      case 'force-fallback-adapter':
        injectScript('scripts/force-fallback-adapter.js');
        break;
    }

    if (settings.dumpShaders) {
      injectScript('scripts/dump-shaders.js');
    }

    if (settings.autoLabel) {
      injectScript('scripts/auto-label.js');
    }

    if (settings.addDescriptors) {
      injectScript('scripts/add-descriptors.js');
    }

    if (settings.trackPassState) {
      injectScript('scripts/track-pass-state.js');
    }

    if (settings.webgpuDebugHelper) {
      injectScript('scripts/webgpu-debug-helper.js');
    } else if (settings.showErrors) {
      injectScript('scripts/show-errors.js');
    }

    if (settings.showShaderErrors) {
      injectScript('scripts/show-shader-errors.js');
    }

    if (settings.showAdapterInfo) {
      injectScript('scripts/show-adapter-info.js');
    }

    if (settings.showCalls) {
      injectScript('scripts/show-calls.js');
    }

    if (settings.breakpoints) {
      injectScript('scripts/breakpoints.js');
    }

    if (settings.disableWebGPU) {
      injectScript('scripts/disable-webgpu.js');
    }

    if (settings.showMemory) {
      injectScript('scripts/show-memory.js');
    }

    if (settings.rafSkipFrames || (settings.timeMult !== undefined && settings.timeMult !== 1)) {
      injectScript('scripts/raf-skip-frames.js');
    }

    return scripts;
  }

  const commands = {
    async registerScripts({tabId, settings}) {
      await chrome.scripting.unregisterContentScripts();
      const scripts = getContentScripts(settings);
      if (scripts.length) {
        log(scripts.map(s => `  ${s}`).join('\n'));
        chrome.scripting.registerContentScripts([
          {
            id: 'webgpu-dev-extension-content-helper',  // Unique identifier
            matches: ['<all_urls>'],                    // URL patterns to match
            js: ['scripts/extension-helper.js'],        // Script file(s) to inject
            runAt: 'document_start',                    // When to inject the script
            allFrames: true,                            // Inject only into the top frame
          },
          {
            id: 'webgpu-dev-extension-content-scripts', // Unique identifier
            matches: ['<all_urls>'],                    // URL patterns to match
            js: scripts,                                // Script file(s) to inject
            runAt: 'document_start',                    // When to inject the script
            allFrames: true,                            // Inject only into the top frame
            world: "MAIN",
          },
        ], () => {
          if (chrome.runtime.lastError) {
            console.error('Error registering content script:', chrome.runtime.lastError);
          }
        });
      }
    },
    async getSettings(data, sender, sendResponse) {
      const keys = await chrome.storage.session.get(['webgpu-dev-extension-settings']);
      const settings = (keys && keys['webgpu-dev-extension-settings']) ?? {};
      sendResponse(settings);
    },
  };

  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    const {cmd, data} = msg;
    const fn = commands[cmd];
    if (!fn) {
      console.error('unknown command from devTools:', cmd, msg);
      return;
    }
    fn(data, sender, sendResponse);
  });

})();
//# sourceMappingURL=service-worker.js.map
