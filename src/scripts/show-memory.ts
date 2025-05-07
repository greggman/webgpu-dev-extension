/* eslint-disable no-inner-declarations */
import { getWebGPUMemoryUsage, resetMaxTotal } from 'webgpu-memory';

// eslint-disable-next-line valid-typeof
if (typeof GPUAdapter !== undefined) {
  console.log('webgpu-dev-extension: show-memory');

  const shortSize = (function () {
    const suffixes = ['b', 'k', 'mb', 'gb', 'tb', 'pb'];
    return function (size: number) {
      const suffixNdx = Math.log2(Math.abs(size)) / 10 | 0;
      const suffix = suffixes[Math.min(suffixNdx, suffixes.length - 1)];
      const base = 2 ** (suffixNdx * 10);
      return `${(size / base).toFixed(0)}${suffix}`;
    };
  })();

  let baseElem: HTMLElement;
  let summaryContentElem: HTMLElement;
  let infoElem: HTMLElement;
  const deviceRefs: WeakRef<GPUDevice>[] = [];
  let intervalId: number | undefined;

  function checkMemory() {
    const {memory, resources} = getWebGPUMemoryUsage();
    const size = shortSize(memory.total);
    const maxSize = shortSize(memory.maxTotal);
    summaryContentElem.textContent = `mem: ${size} max: ${maxSize}`;
    infoElem.textContent = `\
memory:
${Object.entries(memory).map(([k, v]) => `  ${k}: ${shortSize(v)}`).join('\n')}
resources:
${Object.entries(resources).map(([k, v]) => `  ${k}: ${(v)}`).join('\n')}
`;
    checkDeviceRefs();
  }

  function checkDeviceRefs() {
    if (intervalId) {
      if (deviceRefs.length === 0) {
        clearInterval(intervalId);
        // console.log('show-memory: pauses');
      }
    } else {
      if (deviceRefs.length > 0) {
        intervalId = setInterval(checkMemory, 1000);
        // console.log('show-memory: started');
        if (!baseElem) {
          baseElem = document.createElement('details');
          const summaryElem = document.createElement('summary');
          infoElem = document.createElement('pre');

          summaryContentElem = document.createElement('span');
          Object.assign(summaryContentElem.style, {
            cursor: 'pointer',
          });

          const resetElem = document.createElement('span');
          Object.assign(resetElem.style, {
            marginLeft: '0.5em',
            cursor: 'pointer',
            title: 'reset max memory',
          });
          resetElem.textContent = '🔄';
          resetElem.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            resetMaxTotal();
            return false;
          }, { passive: false });

          baseElem.append(summaryElem);
          baseElem.append(infoElem);
          summaryElem.append(summaryContentElem);
          summaryElem.append(resetElem);

          Object.assign(baseElem.style, {
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
          document.documentElement.append(baseElem);
        }
      }
    }
  }

  GPUAdapter.prototype.requestDevice = (function (origFn) {
    return async function (this: GPUAdapter, ...args) {
      const device = await origFn.call(this, ...args);
      if (device) {
        deviceRefs.push(new WeakRef(device));
        checkDeviceRefs();
      }
      return device;
    };
  })(GPUAdapter.prototype.requestDevice);

  GPUDevice.prototype.destroy = (function (origFn) {
    return function (this: GPUDevice, ...args) {
      origFn.call(this, ...args);
      const ndx = deviceRefs.findIndex(ref => ref.deref() === this);
      if (ndx >= 0) {
        deviceRefs.splice(ndx, 1);
        checkDeviceRefs();
      }
    };
  })(GPUDevice.prototype.destroy);

}
