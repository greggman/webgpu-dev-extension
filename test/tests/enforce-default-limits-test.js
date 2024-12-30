import { describe, it } from '../mocha-support.js';
import { testScriptInIFrame } from '../iframe-support.js';

describe('enforce-default-limits', () => {

  it('enforces default limits', async () => {
    await testScriptInIFrame('enforce-default-limits-iframe.js');
  });

});
