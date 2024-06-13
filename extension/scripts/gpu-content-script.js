/* eslint-env browser */
/* global browser */
/* global chrome */
(function() {

if (window.gpuContentScript) {
  return;
}
window.gpuContentScript = true;

window.browser = (function() {
    return window.msBrowser ||
        window.browser ||
        window.chrome ||
        browser;
})();

function injectScript(file) {
  const s = document.createElement('script');
  s.setAttribute('src', file);
  s.setAttribute('async', false);
  (document.head ?? document.documentElement).appendChild(s);
}

let settings = {};
try {
  settings = JSON.parse(sessionStorage.getItem('webgpu-dev-extension-settings'));
} catch (e) {
  /* */
}

if (!settings) {
  settings = {};
}

const show = Object.values(settings).reduce((show, v) => show || (v !== '' && v !== false && v !== 'none'), false);
if (show) {
  console.log('webgpu-dev-extension settings:', Object.fromEntries(Object.entries(settings).filter(([, v]) => !!v && v !== 'none')));
}

// function sendMessage(cmd, data) {
//   window.browser.runtime.sendMessage({cmd, data});
// }

const commands = {
  setSessionStorage(obj) {
    Object.entries(obj).forEach(([key, value]) => sessionStorage.setItem(key, JSON.stringify(value)));
  },
  getSessionStorage(keys) {
    return Object.fromEntries(keys.map(key => [key, JSON.parse(sessionStorage.getItem(key))]));
  },
};

window.browser.runtime.onMessage.addListener((m, sender, sendResponse) => {
  // console.log('onMessage', m);
  const fn = commands[m.cmd];
  if (!fn) {
    throw new Error(`unknown cmd: '${m.cmd}'`);
  } else {
    return sendResponse(fn(m.data));
  }
});

if (settings.removeWebGPU) {
  injectScript(chrome.runtime.getURL('scripts/remove-webgpu.js'));
}

if (settings.countActiveDevices) {
  injectScript(chrome.runtime.getURL('scripts/count-devices.js'));
}

if (settings.blockFeatures) {
  injectScript(chrome.runtime.getURL('scripts/block-features.js'));
}

if (settings.capture) {
  injectScript(chrome.runtime.getURL('scripts/webgpu_recorder.js'));
  injectScript(chrome.runtime.getURL('scripts/gpu-injected.js'));
}

if (settings.compat) {
  injectScript(chrome.runtime.getURL('scripts/webgpu-compat-validation.js'));
}

if (settings.customFormatters) {
  injectScript(chrome.runtime.getURL('scripts/custom-formatters.js'));
}

switch (settings.forceMode) {
  case 'low-power':
    injectScript(chrome.runtime.getURL('scripts/force-low-power.js'));
    break;
  case 'high-performance':
    injectScript(chrome.runtime.getURL('scripts/force-high-performance.js'));
    break;
  case 'compatibility-mode':
    injectScript(chrome.runtime.getURL('scripts/force-compatibility-mode.js'));
    break;
}

if (settings.dumpShaders) {
  injectScript(chrome.runtime.getURL('scripts/dump-shaders.js'));
}

if (settings.autoLabel) {
  injectScript(chrome.runtime.getURL('scripts/auto-label.js'));
}

if (settings.addDescriptors) {
  injectScript(chrome.runtime.getURL('scripts/add-descriptors.js'));
}

if (settings.trackPassState) {
  injectScript(chrome.runtime.getURL('scripts/track-pass-state.js'));
}

if (settings.webgpuDebugHelper) {
  injectScript(chrome.runtime.getURL('scripts/webgpu-debug-helper.js'));
} else if (settings.showErrors) {
  injectScript(chrome.runtime.getURL('scripts/show-errors.js'));
}

if (settings.showAdapterInfo) {
  injectScript(chrome.runtime.getURL('scripts/show-adapter-info.js'));
}

if (settings.breakpoints) {
  injectScript(chrome.runtime.getURL('scripts/breakpoints.js'));
}

if (settings.disableWebGPU) {
  injectScript(chrome.runtime.getURL('scripts/disable-webgpu.js'));
}

})();
