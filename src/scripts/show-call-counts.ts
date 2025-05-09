import { addElementToWebgpuDevExtension } from '../lib/html.js';
import { rafCallbackWhenDevicesExist } from '../lib/raf.js';

/* eslint-disable no-inner-declarations */
if (typeof GPUDevice !== 'undefined') {
  const s_counts = new Map<string, number>();

  function addCount(name: string) {
    s_counts.set(name, (s_counts.get(name) ?? 0) + 1);
  }

  // @ts-expect-error this code is difficult to type
  function addCountWrapper(API, apiName, methodName, origFn) {
    const name = `${apiName}.${methodName}`;
    // @ts-expect-error this code is difficult to type
    API.prototype[methodName] = function (...args) {
      addCount(name);
      return origFn.call(this, ...args);
    };
  }

  const APIs = [
    GPU,
    GPUAdapter,
    GPUBuffer,
    GPUCanvasContext,
    GPUCommandEncoder,
    GPUComputePassEncoder,
    GPUDevice,
    GPUQueue,
    GPUQuerySet,
    GPURenderBundleEncoder,
    GPURenderPassEncoder,
    GPUTexture,
  ];

  for (const API of APIs) {
    const apiName = API.prototype.constructor.name;
    const prototype = API.prototype;
    const methodNames = Object.entries(Object.getOwnPropertyDescriptors(prototype))
        .filter(([, v]) => v.writable && v.enumerable && v.configurable && typeof v.value === 'function')
        .map(([k]) => k);
    for (const name of methodNames) {
      // @ts-expect-error this code is difficult to type
      addCountWrapper(API, apiName, name, API.prototype[name]);
    }
  }

  const getElements = (() => {
    let baseElem: HTMLElement;
    let summaryElem: HTMLElement;
    let infoElem: HTMLElement;
    let summaryContentElem: HTMLElement;

    return function () {
      if (!baseElem) {
        baseElem = document.createElement('details');
        summaryElem = document.createElement('summary');
        infoElem = document.createElement('pre');
        summaryContentElem = document.createElement('span');
        Object.assign(summaryContentElem.style, {
          cursor: 'pointer',
        });

        const resetElem = document.createElement('span');
        Object.assign(resetElem.style, {
          marginLeft: '0.5em',
          cursor: 'pointer',
          title: 'remove zero count',
        });
        resetElem.textContent = '🔄';
        resetElem.addEventListener('click', e => {
          e.preventDefault();
          e.stopPropagation();
          s_counts.clear();
          return false;
        }, { passive: false });

        baseElem.append(summaryElem);
        baseElem.append(infoElem);
        summaryElem.append(summaryContentElem);
        summaryElem.append(resetElem);

        addElementToWebgpuDevExtension(baseElem);
      }

      return {
        infoElem,
        summaryContentElem,
      };
    };
  })();

  function updateAndResetCount() {
    let total = 0;
    const calls: string[] = [];
    s_counts.forEach((v, k) => {
      total += v;
      calls.push(`${k}: ${v}`);
      s_counts.set(k, 0);
    });
    calls.sort();
    const { infoElem, summaryContentElem } = getElements();
    infoElem.textContent = calls.join('\n');
    summaryContentElem.textContent = `cpf: ${total}`;
  }

  rafCallbackWhenDevicesExist(updateAndResetCount);
}

document.currentScript?.remove();
