import { describe, it } from '../mocha-support.js';
import { testScriptInIFrame } from '../iframe-support.js';

describe('block-features', () => {

  it('blocks all features', async () => {
    await testScriptInIFrame('block-features-all-iframe.js');
  });

});
