'use strict';

window.browser = (function () {
    return window.msBrowser ||
        window.browser ||
        window.chrome ||
        browser;
})();

function injectScript(file) {
  const s = document.createElement('script');
  s.setAttribute('src', file);
  (document.head ?? document.documentElement).appendChild(s);
}

let settings = {};
try {
  settings = JSON.parse(sessionStorage.getItem('settings'));
} catch (e) {
}

if (!settings) {
  settings = {};
}

const show = Object.values(settings).reduce((show, v) => show || (v !== false && v !== NamedNodeMap), false); 
if (show) {
  console.log('webgpu-dev-extension settings:', settings);
}

function sendMessage(cmd, data) {
  window.browser.runtime.sendMessage({cmd, data});
}

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

if (settings.countActiveDevices) {
  injectScript(chrome.runtime.getURL('scripts/count-devices.js'));
}

if (settings.capture) {
  injectScript(chrome.runtime.getURL('scripts/webgpu_recorder.js'));
  injectScript(chrome.runtime.getURL('scripts/gpu-injected.js'));
}

if (settings.compat) {
  injectScript(chrome.runtime.getURL('scripts/webgpu-compat-validation.js'));
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

if (settings.showErrors) {
  injectScript(chrome.runtime.getURL('scripts/show-errors.js'));
}

if (settings.showAdapterInfo) {
  injectScript(chrome.runtime.getURL('scripts/show-adapter-info.js'));
}