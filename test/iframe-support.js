import { assertEqual, assertTruthy } from './assert.js';

function makeExposedPromise() {
  const p = {};
  p.promise = new Promise((resolve, reject) => {
    Object.assign(p, { resolve, reject });
  });
  return p;
}

const baseUrl = window.location.origin;

export async function testScriptInIFrame(scriptFilename) {
  const res = await fetch(`${baseUrl}/test/tests/${scriptFilename}`);
  const scriptSrc = await res.text();

  const html = `
  <gScript type="module">
  ${scriptSrc.replaceAll('$$baseUrl', baseUrl)}
  </gScript>
  `.replaceAll('gScript', 'script');

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
  
  window.addEventListener('message', receiveCmds);
  document.body.appendChild(iframe)

  await exposedPromise.promise;

  window.removeEventListener('message', receiveCmds);
  iframe.remove();
}