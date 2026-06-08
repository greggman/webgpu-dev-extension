import { describe, it } from '../mocha-support.js';
import { testScriptInIFrame } from '../iframe-support.js';

describe('check-for-multiple-updates', () => {

  it('runs multiple update checks', async () => {
    await testScriptInIFrame('check-for-multiple-updates-iframe.js');
  });

});
