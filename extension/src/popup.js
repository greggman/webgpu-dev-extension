/* eslint-env webextensions, browser */
import {
  settings,
} from './settings.js';
import {
  loadSettings,
  saveSettings,
} from './utils.js';
import {GUI} from './gui.js';

window.browser = (function() {
    return window.msBrowser ||
        window.browser ||
        window.chrome ||
        browser;
})();

const setError = (() => {
  const errorElem = document.querySelector('#error');
  return function(msg) {
    errorElem.textContent = msg || '';
    errorElem.style.display = msg ? '' : 'none';
  };
})();

const callAsyncFnWithErrorCheck = (() => {
  let sameErrorCount = 1;
  let lastErrorMsg = '';
  return async function(fn) {
    try {
      setError();
      await fn();
    } catch (e) {
      const err = e.toString();
      sameErrorCount = err === lastErrorMsg ? sameErrorCount + 1 : 1;
      lastErrorMsg = err;
      setError(`${sameErrorCount > 1 ? `(${sameErrorCount})` : ''}${err}:

Try reloading the page: Otherwise, this could mean the extension is blocked by your browser's policies`);
    }
  };
})();

async function main() {
  const mainElem = document.querySelector('#main');
  const [activeTab] = await window.browser.tabs.query({ active: true, currentWindow: true });
  const isChromeTab = activeTab.url?.startsWith('chrome:');

  if (isChromeTab) {
    setError('this extension does not work on settings pages nor a new tab page');
    mainElem.style.display = 'none';
  } else {
    try {
      await chrome.scripting.executeScript({
        target : {tabId : activeTab.id, allFrames : true},
        files : [ 'scripts/gpu-content-script.js' ],
      });
      await callAsyncFnWithErrorCheck(loadSettings);
    } catch (e) {
      setError(e.toString());
      mainElem.style.display = 'none';
    }
  }

  const manifest = chrome.runtime.getManifest();
  const versionElem = document.querySelector('#version');
  versionElem.textContent = `${manifest.version}${'update_url' in manifest ? '' : '-dev'}`;

  const save = () => callAsyncFnWithErrorCheck(saveSettings);

  const gui = new GUI().onChange(save);
  const controlsElem = document.querySelector('#controls');
  controlsElem.appendChild(gui.elem);

  gui.add(settings, 'showAdapterInfo').name('Show Adapter Info');
  gui.add(settings, 'webgpuDebugHelper').name('WebGPU Debug Helper');
  gui.add(settings, 'showErrors').name('Show Errors');
  gui.add(settings, 'showShaderErrors').name('Show Shader Errors');
  gui.add(settings, 'addDescriptors').name('Add Descriptors');
  gui.add(settings, 'autoLabel').name('Auto Label');
  gui.add(settings, 'customFormatters').name('DevTools Custom Formatters');
  gui.add(settings, 'trackPassState').name('Track Pass State');
  gui.add(settings, 'countActiveDevices').name('Count Active Devices');
  gui.add(settings, 'dumpShaders').name('Dump Shaders');
  gui.add(settings, 'disableWebGPU').name('Disable WebGPU');
  gui.add(settings, 'removeWebGPU').name('Remove WebGPU');
  gui.add(settings, 'enforceDefaultLimits').name('Enforce Default Limits');
  gui.add(settings, 'forceMode', ['none', 'low-power', 'high-performance', 'compatibility-mode', 'force-fallback-adapter']).name('Force Mode');
  gui.addNumber(settings, 'rafSkipFrames', { min: 0, max: 10 }).name('rAF Skip Frames');
  gui.addNumber(settings, 'timeMult', { min: 0, max: 4, step: 0.1 }).name('Time Mult');
  gui.addText(settings, 'blockFeatures').name('Block Features (* = all)');
  gui.addText(settings, 'breakpoints').name('API Breakpoints (* = all)');

  //gui.addDivider();
  //gui.add(settings, 'capture').name('Capture');
  //gui.add(settings, 'compat').name('Emulate Compat');
}

main();
