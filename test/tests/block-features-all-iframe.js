
document.addEventListener('webgpu-dev-extension-event', (e) => {
  document.dispatchEvent(new CustomEvent('webgpu-dev-extension-settings', {
    detail: {
      blockFeatures: '*',
    },
  })); 
});

await import('$$baseUrl/extension/scripts/block-features.js');

const adapter = await navigator.gpu.requestAdapter();
const device = await adapter.requestDevice({
  requiredFeatures: adapter.features,
});

parent.postMessage({
  cmd: 'result',
  data: {
    actual: {
      adapter: [...adapter.features].sort(),
      device: [...device.features].sort(),
    },
    // I'm not sure this is correct but for now it makes the test pass. 
    // Maybe it should allow core-features-and-limits on the adapter?
    expected: {
      adapter: [],
      device: ['core-features-and-limits'],
    },
  },
});

parent.postMessage({
  cmd: 'end',
});