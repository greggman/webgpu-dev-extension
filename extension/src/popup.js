/* eslint-env webextensions, browser */
import {
  settings,
} from './settings.js';
import {
  loadSettings,
  saveSettings,
} from './utils.js';
import {GUI} from './gui.js';


window.browser = (function () {
    return window.msBrowser ||
        window.browser ||
        window.chrome ||
        browser;
})();


async function main() {
  await loadSettings();

  const controlsElem = document.querySelector('#controls');
  const gui = new GUI().onChange(saveSettings);
  controlsElem.appendChild(gui.elem);

  gui.add(settings, 'showAdapterInfo').name('Show Adapter Info');
  gui.add(settings, 'showErrors').name('Show Errors');
  gui.add(settings, 'addDescriptors').name('Add Descriptors');
  gui.add(settings, 'autoLabel').name('Auto Label');
  gui.add(settings, 'trackPassState').name('Track Pass State');
  gui.add(settings, 'countActiveDevices').name('Count Active Devices');
  gui.add(settings, 'dumpShaders').name('Dump Shaders');
  gui.add(settings, 'forceMode', ['none', 'low-power', 'high-performance', 'compatibility-mode']).name('Force Mode');
  //gui.addDivider();
  //gui.add(settings, 'capture').name('Capture');
  //gui.add(settings, 'compat').name('Emulate Compat');
}

main();
