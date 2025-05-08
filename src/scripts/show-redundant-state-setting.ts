import { getAndResetRedundantCallInfo } from 'webgpu-avoid-redundant-state-setting';
import { rafCallbackWhenDevicesExist } from '../lib/raf.js';
import { addElementToWebgpuDevExtension } from '../lib/html.js';

// eslint-disable-next-line valid-typeof
if (typeof GPUAdapter !== undefined) {
  console.log('webgpu-dev-extension: show-redundant-state-setting');

  const baseElem = document.createElement('details');
  const summaryElem = document.createElement('summary');
  const infoElem = document.createElement('pre');

  const summaryContentElem = document.createElement('span');
  Object.assign(summaryContentElem.style, {
    cursor: 'pointer',
  });

  baseElem.append(summaryElem);
  baseElem.append(infoElem);
  summaryElem.append(summaryContentElem);

  addElementToWebgpuDevExtension(baseElem);

  rafCallbackWhenDevicesExist(() => {
    const info = getAndResetRedundantCallInfo();
    let total = 0;
    const counts = Object.entries(info).map(([name, count]) => {
      total += count;
      return `${name}: ${count}`;
    });

    infoElem.textContent = counts.join('\n');
    summaryContentElem.textContent = `redundant state call count: ${total}`;

  });
}
