import { describe, it } from '../mocha-support.js';
import { assertEqual, assertTruthy } from '../assert.js';

describe('enforce-default-limits', () => {

  it('enforces default limits', async () => {
    const src = `
      import 'http://localhost:8080/extension/scripts/enforce-default-limits.js';

      function objLikeToObj(objLike) {
        const obj = {};
        for (const key in objLike) {
          obj[key] = objLike[key];
        }
        return objLike;
      }

      function sortToArray(o) {
        return [...Object.entries(o)].sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0);
      }

      const maxAdapter = await navigator.gpu.requestAdapter();
      const maxDevice = await maxAdapter.requestDevice({
        requiredLimits: objLikeToObj(maxAdapter.limits),
      });
      const maxLimits = JSON.stringify(sortToArray(objLikeToObj(maxDevice.limits)), null, 2);

      const defAdapter = await navigator.gpu.requestAdapter();
      const defDevice = await defAdapter.requestDevice();
      const defLimits = JSON.stringify(sortToArray(objLikeToObj(defDevice.limits)), null, 2);

      parent.postMessage({
        cmd: 'result',
        data: {
          expected: maxLimits,
          actual: maxLimits,
        },
      });

      parent.postMessage({
        cmd: 'end',
      });
    `;

    const html = `
    <gScript type="module">
    ${src}
    </gScript>
    `.replaceAll('gScript', 'script');

    function makeExposedPromise() {
      const p = {};
      p.promise = new Promise((resolve, reject) => {
        Object.assign(p, { resolve, reject });
      });
      return p;
    }


    const exposedPromise = makeExposedPromise();

    const cmds = {
      result({actual, expected}) {
        assertEqual(actual, expected);
      },
      end() {
        exposedPromise.resolve();
      },
    };

    function receiveCmds(e) {
      const { cmd, data } = e.data;
      const fn = cmds[cmd];
      assertTruthy(fn, `cmd: ${cmd} unknown`);
      fn(data);
    }

    const blob = new Blob([html], {type: 'text/html'});
    const url = URL.createObjectURL(blob);
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.width = 1;
    iframe.height = 1;
    iframe.style = 'border: none';
    onmessage = receiveCmds;
    document.body.appendChild(iframe)

    await exposedPromise.promise;

    iframe.remove();
  });

});
