import '$$baseUrl/extension/scripts/enforce-default-limits.js';

function objLikeToObj(objLike) {
  const obj = {};
  for (const key in objLike) {
    obj[key] = objLike[key];
  }
  return obj;
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
    actual: defLimits,
  },
});

parent.postMessage({
  cmd: 'end',
});