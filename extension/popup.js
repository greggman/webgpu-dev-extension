// DO NOT EDIT !!! AUTO-GENERATED-FILE !!!
const defaultSettings = {
  addDescriptors: false,
  autoLabel: false,
  blockFeatures: '',
  capture: false,
  compat: false,
  countActiveDevices: false,
  customFormatters: false,
  disableWebGPU: false,
  forceMode: 'none',
  dumpShaders: false,
  removeWebGPU: false,
  showAdapterInfo: false,
  showErrors: false,
  showCalls: false,
  showCallCounts: false,
  showMemory: false,
  showShaderErrors: false,
  showRedundantStateSetting: false,
  enforceDefaultLimits: false,
  webgpuDebugHelper: false,
  trackPassState: false,
  breakpoints: '',
  rafSkipFrames: 0,
  timeMult: 1,
};

const settings = {...defaultSettings};

/* eslint-env webextensions */

async function getExtensionLocalStorage(keys) {
  return await chrome.storage.session.get(keys);
}

async function setExtensionLocalStorage(obj) {
  return await chrome.storage.session.set(obj);
}

function updateSettings(newSettings) {
  for (const [k, v] of Object.entries(newSettings)) {
    if (typeof v === typeof settings[k]) {
      settings[k] = v;
    }
  }
}

async function loadSettings() {
  const keys = await getExtensionLocalStorage(['webgpu-dev-extension-settings']);
  if (keys && keys['webgpu-dev-extension-settings']) {
    updateSettings(keys['webgpu-dev-extension-settings']);
  }
}

async function saveSettings() {
  return await setExtensionLocalStorage({'webgpu-dev-extension-settings': settings});
}

const eventRE = /on([A-Z])(\w+)/;

function createElem(tag, attrs = {}) {
  const elem = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (typeof value === 'object') {
      for (const [k, v] of Object.entries(value)) {
        elem[key][k] = v;
      }
    } else if (typeof value === 'function') {
      const m = eventRE.exec(key);
      if (!m) {
        throw new Error('bad event: ${key}');
      }
      const eventType = `${m[1].toLowerCase()}${m[2]}`;
      elem.addEventListener(eventType, value);
    } else if (key.startsWith('data')) {
      const k = `${key[4].toLowerCase()}${key.substr(5)}`;
      elem.dataset[k] = value;
    } else if (elem[key] === undefined) {
      elem.setAttribute(key, value);
    } else {
      elem[key] = value;
    }
  }
  return elem;
}

function el(tag, attrs = {}, children  = []) {
  const elem = createElem(tag, attrs);
  for (const child of children) {
    elem.appendChild(child);
  }
  return elem;
}

let nextId = 0;
function getId() {
  return `elem${nextId++}`;
}

class Control extends EventTarget {
  constructor(obj, prop) {
    super();
    this.obj = obj;
    this.prop = prop;
    this.elem = el('div', {className: 'control'});
    this.changeFn = () => {};
  }
  get() {
    return obj[prop];
  }
  set(v) {
    obj[prop] = v;
    return this;
  }
  name(v) {
    this.labelElem.textContent = v;
    return this;
  }
  onChange(fn) {
    this.changeFn = fn;
    return this;
  }
  changed() {
    this.changeFn(this);
    this.dispatchEvent(new CustomEvent('change', {control: this}));
  }
}

class Slider extends Control {
  constructor(obj, prop, min, max, step) {
    super(obj, prop);
    const id = getId();
    this.inputElem = el('input', {
      id,
      min,
      max,
      step: step || '1',
      type: 'range',
      value: obj[prop],
      onInput: () => {
        obj[prop] = parseFloat(this.value);
        this.valueElem.textContent = this.value;
        this.changed();
      },
    });
    this.labelElem = el('label', {for: id, textContent: prop});
    this.valueElem = el('div', {textContent: obj[prop]});
    this.elem.classList.add('slider');
    this.elem.appendChild(this.inputElem);
    this.elem.appendChild(this.labelElem);
    this.elem.appendChild(this.valueElem);
  }
  set(v) {
    super.set(v);
    const value = this.get();
    this.inputElem.value = value;
    this.valueElem.textContent = value;
  }
}

class Checkbox extends Control {
  constructor(obj, prop) {
    super(obj, prop);
    const id = getId();
    this.inputElem = el('input', {
      id,
      type: 'checkbox',
      checked: obj[prop],
      onChange: () => {
        obj[prop] = this.inputElem.checked;
        this.changed();
      },
    });
    this.labelElem = el('label', {for: id, textContent: prop});
    this.elem.classList.add('checkbox');
    this.elem.appendChild(this.inputElem);
    this.elem.appendChild(this.labelElem);
  }
  set(v) {
    super.set(v);
    this.inputElem.checked = this.get();
  }
}

class Radio extends Control {
  constructor(obj, prop, options) {
    super(obj, prop);

    options = new Map(Array.isArray(options)
        ? options.map((a, i) => [a, i])
        : Object.entries(options));
    this._valueToInputMap = new Map();
    //const sharedName = getId();
    const div = el('div', {className: 'radio'}, [...options].map((/*[name, value]*/) => {

      throw new Error('on change need fix');
      /*
      const id = getId();
      const input = el('input', {
        name: sharedName,
        id,
        type: 'radio',
        ...(obj[prop] === value && {checked: true}),
        onChange: () => {
          obj[prop] = value;
          this.changed();
        },
      });
      this._valueToInputMap.set(value, input);
      return el('div', {}, [
        input,
        el('label', {for: id, textContent: name}),
      ]);
      */
    }));
    this.elem.appendChild(div);
  }
  set(v) {
    super.set(v);
    this._valueToInputMap((input, value) => {
      input.checked = v === value;
    });
  }
}

class Text extends Control {
  constructor(obj, prop/*, options*/) {
    super(obj, prop);

    this.inputElem = el('input', {
      type: 'text',
      value: obj[prop],
      onInput: () => {
        obj[prop] = this.inputElem.value;
        this.changed();
      },
    });
    const div = el('fieldset', {className: 'text'}, [
      el('legend', {textContent: prop}),
      this.inputElem,
    ]);
    this.elem.appendChild(div);
  }
  name(v) {
    this.elem.querySelector('legend').textContent = v;
    return this;
  }
  set(v) {
    super.set(v);
    this.inputElem.value = this.get();
  }
}

class TextNumber extends Control {
  constructor(obj, prop, options) {
    super(obj, prop);

    const id = getId();
    this.inputElem = el('input', {
      id,
      type: 'number',
      value: obj[prop],
      ...options,
      onInput: () => {
        obj[prop] = parseFloat(this.inputElem.value);
        this.changed();
      },
    });
    this.labelElem = el('label', {for: id, textContent: prop});
    this.elem.appendChild(this.inputElem);
    this.elem.appendChild(this.labelElem);
  }
  name(v) {
    this.labelElem.textContent = v;
    return this;
  }
  set(v) {
    super.set(v);
    this.inputElem.value = this.get();
  }
}

class TextArea extends Control {
  constructor(obj, prop/*, options*/) {
    super(obj, prop);

    this.textarea = el('textarea', {
      className: 'full-width',
      placeholder: ' ',
      value: obj[prop],
      onInput: () => {
        obj[prop] = this.textarea.value;
        this.changed();
      },
    });
    this.textarea.value = obj[prop];
    const div = el('fieldset', {className: 'text'}, [
      el('legend', {textContent: prop}),
      this.textarea,
    ]);
    this.elem.appendChild(div);
  }
  name(v) {
    this.elem.querySelector('legend').textContent = v;
    return this;
  }
  set(v) {
    super.set(v);
    this.textarea.value = this.get();
  }
}


class MultiSelect extends Control {
  constructor(obj, prop, options) {
    super(obj, prop);
    const settings = Object.fromEntries(options.map(k => [k, obj[prop].includes(k)]));
    const update = () => {
      obj[prop].length = 0;
      for (const [k, v] of settings) {
        if (v) {
          obj[prop].push(k);
        }
      }
    };

    const div = el('fieldset', {className: 'text'}, [
      el('legend', {textContent: prop}),
      ...Object.keys(settings).map(k => new Checkbox(settings, k).onChange(update).elem),
    ]);

    this.elem.appendChild(div);
  }
  set(v) {
    super.set(v);
    input.value = v;
  }
}

class Select extends Control {
  constructor(obj, prop, options) {
    super(obj, prop);
    const id = getId();
    this.options = options.slice();
    this.selectElem = el('select', {
      id,
      onInput: () => {
        const v = options[this.selectElem.selectedIndex];
        obj[prop] = Array.isArray(v) ? v[0] : v;
        this.changed();
      },
    }, options.map((v, i) => {
      const [value, label] = Array.isArray(v) ? v : [v, v];
      return el('option', {selected: value === obj[prop], value: i, textContent: label});
    }));

    this.labelElem = el('label', {/*for: id,*/ textContent: prop});
    this.elem.classList.add('select');
    this.elem.appendChild(this.selectElem);
    this.elem.appendChild(this.labelElem);
  }
  set(v) {
    super.set(v);
    const ndx = Math.max(0, this.options.findIndex(v => v === Array.isArray(v) ? v[0] : v));
    this.selectElem.selectedIndex = ndx;
  }
}

function createControl(obj, prop, a1, a2, a3) {
  const v = obj[prop];
  if (Array.isArray(v)) {
    return new MultiSelect(obj, prop, a1);
  } else if (typeof v === 'boolean') {
    return new Checkbox(obj, prop);
  } else if (typeof v === 'number') {
    if (Array.isArray(a1) || typeof a1 === 'object') {
      return new Radio(obj, prop, a1);
    } else if (a1 === undefined) ; else if (typeof a1 === 'number') {
      // slider
      let max = a1;
      let min = 0;
      let step = 0;
      if (typeof a2 === 'number') {
        min = max;
        max = a2;
      }
      if (typeof a3 === 'number') {
        step = a3;
      }
      return new Slider(obj, prop, min, max, step);
    }
  } else if (typeof v === 'string') {
    if (Array.isArray(a1)) {
      return new Select(obj, prop, a1);
    } else {
      return new Text(obj, prop);
    }
  }
  throw new Error('unhandled type');
}

class GUI {
  constructor() {
    this.elem = el('div', {className: 'controls'});
    this.changeFn = () => {};
  }
  onChange(fn) {
    this.changeFn = fn;
    return this;
  }
  changed() {
    this.changeFn(this);
  }
  addDivider() {
    this.elem.appendChild(el('hr'));
  }
  add(obj, prop, ...args) {
    return this.addControl(createControl(obj, prop, ...args));
  }
  addText(obj, prop, ...args) {
    return this.addControl(new TextArea(obj, prop, ...args));
  }
  addNumber(obj, prop, ...args) {
    return this.addControl(new TextNumber(obj, prop, ...args));
  }
  addControl(control) {
    control.addEventListener('change', () => this.changed());
    this.elem.appendChild(control.elem);
    return control;
  }
}

/* eslint-env webextensions, browser */

function log(/*...args*/) {
  // console.log(...args);
}

window.browser = (function () {
    return window.msBrowser ||
        window.browser ||
        window.chrome ||
        browser;
})();

const setError = (() => {
  const errorElem = document.querySelector('#error');
  return function (msg) {
    errorElem.textContent = msg || '';
    errorElem.style.display = msg ? '' : 'none';
  };
})();

const callAsyncFnWithErrorCheck = (() => {
  let sameErrorCount = 1;
  let lastErrorMsg = '';
  return async function (fn) {
    try {
      setError();
      await fn();
    } catch (e) {
      log('error:', e.toString(), ' calling:', fn.toString());
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
    return;
  }

  const applySettings = () => {
    try {
      chrome.runtime.sendMessage({ cmd: 'registerScripts', data: { tabId: activeTab.id, settings }}, (response) => {
        log('Response from service worker:', response);
      });
    } catch (e) {
    }
  };

  await loadSettings();
  applySettings();

  const manifest = chrome.runtime.getManifest();
  const versionElem = document.querySelector('#version');
  versionElem.textContent = `${manifest.version}${'update_url' in manifest ? '' : '-dev'}`;

  const save = () => {
    applySettings();
    callAsyncFnWithErrorCheck(saveSettings);
  };

  const gui = new GUI().onChange(save);
  const controlsElem = document.querySelector('#controls');
  controlsElem.appendChild(gui.elem);

  gui.add(settings, 'showAdapterInfo').name('Show Adapter Info');
  gui.add(settings, 'showErrors').name('Show Errors (with stack)');
  gui.add(settings, 'showShaderErrors').name('Show Shader Errors');
  gui.add(settings, 'dumpShaders').name('Dump Shaders');
  gui.add(settings, 'webgpuDebugHelper').name('WebGPU Debug Helper');
  gui.add(settings, 'showMemory').name('Show Memory');
  gui.add(settings, 'showCallCounts').name('Show Calls Per Frame');
  gui.add(settings, 'showRedundantStateSetting').name('Show Redundant State Setting');
  gui.add(settings, 'showCalls').name('Show Calls');
  gui.add(settings, 'addDescriptors').name('Add Descriptors');
  gui.add(settings, 'autoLabel').name('Auto Label');
  gui.add(settings, 'customFormatters').name('DevTools Custom Formatters');
  gui.add(settings, 'trackPassState').name('Track Pass State');
  gui.add(settings, 'countActiveDevices').name('Count Active Devices');
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
//# sourceMappingURL=popup.js.map
