// yes this is crap. I need to add a build system but it's a PITA
// so for now this is hard coded to expect webgpu-memory is checked
// out and up to date, one level up.

import fs from 'node:fs';

const webgpuMemory = fs.readFileSync('../webgpu-memory/dist/1.x/webgpu-memory.module.js', {encoding: 'utf-8'})
  .replaceAll(/export \{.*?\};/g, '')
  .replace('# sourceMappingURL=', '');

const showMemoryTemplate = fs.readFileSync('build/show-memory-template.js', {encoding: 'utf-8'})
  .replace('//insert-webgpu-memory-here', webgpuMemory);

fs.writeFileSync('extension/scripts/show-memory.js', showMemoryTemplate);

