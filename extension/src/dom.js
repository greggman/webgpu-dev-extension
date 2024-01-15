const eventRE = /on([A-Z])(\w+)/;

export function createElem(tag, attrs = {}) { 
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

export function el(tag, attrs = {}, children  = []) {
  const elem = createElem(tag, attrs);
  for (const child of children) {
    elem.appendChild(child);
  }
  return elem;
}