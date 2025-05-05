// yes this is crap. I need to add a build system but it's a PITA
// so for now this is hard coded to expect webgpu-memory is checked
// out and up to date, one level up.

import fs from 'node:fs';

const js = fs.readFileSync('../webgpu-memory/dist/1.x/webgpu-memory.module.js', {encoding: 'utf-8'});
fs.writeFileSync('extension/scripts/show-memory.js', `
{
  console.log('webgpu-dev-extension: show-memory');
${js.replaceAll(/export \{.*?\};/g, '').replace('# sourceMappingURL=', '')}

const shortSize = (function() {
  const suffixes = ['b', 'k', 'mb', 'gb', 'tb', 'pb'];
  return function(size) {
    const suffixNdx = Math.log2(Math.abs(size)) / 10 | 0;
    const suffix = suffixes[Math.min(suffixNdx, suffixes.length - 1)];
    const base = 2 ** (suffixNdx * 10);
    return \`\${(size / base).toFixed(0)}\${suffix}\`;
  };
})();

  let oldTotal = 0;
  setInterval(() => {
    const usage = getWebGPUMemoryUsage();
    if (usage.memory.maxTotal > oldTotal) {
      oldTotal = usage.memory.maxTotal;
      console.log('memory usage:', shortSize(oldTotal));
    }
  }, 1000);
};
`);

