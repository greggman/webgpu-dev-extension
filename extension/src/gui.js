import {el} from './dom.js';

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
    this.labelElem = el('label', {for: id, textContent: prop}),
    this.valueElem = el('div',{textContent: obj[prop]}),
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
    this.labelElem = el('label', {for: id, textContent: prop}),
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
    const sharedName = getId();
    const div = el('div', {className: 'radio'}, [...options].map(([name, value]) => {

      throw new Error('on change need fix');
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
  constructor(obj, prop, options) {
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
    this.labelElem = el('label', {for: id, textContent: prop}),
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
  constructor(obj, prop, options) {
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
    }

    const div = el('fieldset', {className: 'text'}, [
      el('legend', {textContent: prop}),
      ...Object.keys(settings).map(k =>
        new Checkbox(settings, k).onChange(update).elem)
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
    })),

    this.labelElem = el('label', {/*for: id,*/ textContent: prop});
    this.elem.classList.add('select');
    this.elem.appendChild(this.selectElem);
    this.elem.appendChild(this.labelElem);
  }
  set(v) {
    super.set(v);
    const ndx = Math.max(0, this.options.findIndex(vv => v === Array.isArray(v) ? v[0] : v));
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
    } else if (a1 === undefined) {
      // number field
    } else if (typeof a1 === 'number') {
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
      return new Slider(obj, prop, min, max, step)
    }
  } else if (typeof v === 'string') {
    if (Array.isArray(a1)) {
      return new Select(obj, prop, a1);
    } else {
      return new Text(obj, prop);
    }
  } else {
    throw new Error('unhandled type');
  }
}

export class GUI {
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