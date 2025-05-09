import { getAndResetRedundantCallInfo } from 'webgpu-avoid-redundant-state-setting';
import { rafCallbackWhenDevicesExist } from '../lib/raf.js';
import { addElementToWebgpuDevExtension } from '../lib/html.js';

// eslint-disable-next-line valid-typeof
if (typeof GPUAdapter !== undefined) {
  console.log('webgpu-dev-extension: show-redundant-state-setting');

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

        baseElem.append(summaryElem);
        baseElem.append(infoElem);
        summaryElem.append(summaryContentElem);

        addElementToWebgpuDevExtension(baseElem);
      }

      return {
        infoElem,
        summaryContentElem,
      };
    };
  })();

  rafCallbackWhenDevicesExist(() => {
    const info = getAndResetRedundantCallInfo();
    let total = 0;
    const counts = Object.entries(info).map(([name, count]) => {
      total += count;
      return `${name}: ${count}`;
    });

    const { infoElem, summaryContentElem } = getElements();
    infoElem.textContent = counts.join('\n');
    summaryContentElem.textContent = `redundant state call count: ${total}`;

  });
}
