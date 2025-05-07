
export function addElementToWebgpuDevExtension(elem: HTMLElement) {
  const webgpuDevExtensionElemId = 'webgpu-dev-extension';
  let webgpuDevExtensionElem = document.getElementById(webgpuDevExtensionElemId);
  if (!webgpuDevExtensionElem) {
    webgpuDevExtensionElem = document.createElement('div');
    webgpuDevExtensionElem.id = webgpuDevExtensionElemId;

    Object.assign(webgpuDevExtensionElem.style, {
      margin: '0',
      padding: '0.25em',
      fontSize: '8px',
      fontFamily: 'monospace',
      color: '#fff',
      backgroundColor: 'rgba(0,0,0,0.8)',
      position: 'fixed',
      left: '0',
      bottom: '0',
      zIndex: 1000000,
    });


    document.documentElement.append(webgpuDevExtensionElem);
  }
  webgpuDevExtensionElem.append(elem);
}

type EventHandler = (...args: any) => any;
type JsonMLAttributeValue = string | number | boolean | null | JsonMLAttributes | EventHandler | undefined;
interface JsonMLAttributes {
    [key: string]: JsonMLAttributeValue;
}
type JsonMLTagName = string;
type JsonMLTextNode = string;
type JsonMLChild = JsonMLElement | JsonMLTextNode | Node;

type JsonMLElement =
    | [JsonMLTagName] // Matches structure 1
    | [JsonMLTagName, JsonMLAttributes] // Matches structure 2
    | [JsonMLTagName, JsonMLAttributes, ...JsonMLChild[]] // Matches structure 3
    | [JsonMLTagName, ...JsonMLChild[]] // Matches structure 4
    | [Node]
    ;

//type JsonML = JsonMLElement | JsonMLTextNode | JsonMLChild[];

/**
 * Implements JsonML *like* element creation (http://www.jsonml.org/)
 *
 * The major difference is this takes event handlers for `on` functions
 * and supports nested attributes? Also allows elements.
 */
export function makeElem(elemSpec: JsonMLElement) {
  const tag = elemSpec[0];
  if (tag instanceof Node) {
    return tag;
  }
  const elem = document.createElement(tag);

  let firstChildNdx = 1;
  const firstChild = elemSpec[1];
  // Check if it's attributes
  if (!(firstChild instanceof Node) && typeof firstChild !== 'string' && !Array.isArray(firstChild)) {
    firstChildNdx = 2;
    const attributes = firstChild as JsonMLAttributes;
    for (const [key, value] of Object.entries(attributes)) {
      if (typeof value === 'function' && key.startsWith('on')) {
        const eventName = key.substring(2).toLowerCase();
        elem.addEventListener(eventName, value, {passive: false});
      } else if (typeof value === 'object') {
        for (const [k, v] of Object.entries(value as JsonMLAttributes)) {
          // @ts-expect-error just do it!
          elem[key][k] = v;
        }
      // @ts-expect-error just do it!
      } else if (elem[key] === undefined) {
        elem.setAttribute(key, value as string);
      } else {
        // @ts-expect-error just do it!
        elem[key] = value;
      }
    }
  }

  for (let ndx = firstChildNdx; ndx < elemSpec.length; ++ndx) {
    const v = elemSpec[ndx];
    if (typeof v === 'string') {
      elem.appendChild(document.createTextNode(v));
    } else if (v instanceof Node) {
      elem.appendChild(v);
    } else {
      elem.appendChild(makeElem(v as JsonMLElement));
    }
  }
  return elem;
}