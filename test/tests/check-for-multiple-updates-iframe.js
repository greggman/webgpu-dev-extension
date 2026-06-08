const errors = [];
const origConsoleError = console.error;
console.error = (...args) => {
  errors.push(args.join(' '));
  origConsoleError.apply(console, args);
};

function getAndClearErrors() {
  const currentErrors = [...errors];
  errors.length = 0;
  return currentErrors;
}

await import('$$baseUrl/extension/scripts/check-for-multiple-updates.js');

const adapter = await navigator.gpu.requestAdapter();
if (!adapter) {
  parent.postMessage({
    cmd: 'result',
    data: {
      actual: {},
      expected: {},
    },
  });
  parent.postMessage({
    cmd: 'end',
  });
} else {
  const device = await adapter.requestDevice();

  const results = {};

  // Test 1: Updating a buffer twice generates an error message
  {
    const buffer = device.createBuffer({ size: 100, usage: GPUBufferUsage.COPY_DST, label: 'b1' });
    device.queue.writeBuffer(buffer, 0, new Float32Array([1, 2, 3]));
    getAndClearErrors();
    device.queue.writeBuffer(buffer, 0, new Float32Array([4, 5, 6]));
    results.test1 = getAndClearErrors();
  }

  // Test 2: Updating a texture twice generates an error message
  {
    const texture = device.createTexture({
      label: 't2',
      size: [4, 4, 1],
      format: 'rgba8unorm',
      usage: GPUTextureUsage.COPY_DST,
    });
    device.queue.writeTexture({ texture }, new Uint8Array(64), {}, [4, 4, 1]);
    getAndClearErrors();
    device.queue.writeTexture({ texture }, new Uint8Array(64), {}, [4, 4, 1]);
    results.test2 = getAndClearErrors();
  }

  // Test 3: Updating a buffer twice but where ranges do not overlap does not generate an error message
  {
    const buffer = device.createBuffer({ size: 100, usage: GPUBufferUsage.COPY_DST, label: 'b3' });
    device.queue.writeBuffer(buffer, 0, new Float32Array([1, 2, 3]));
    getAndClearErrors();
    device.queue.writeBuffer(buffer, 16, new Float32Array([4, 5, 6]));
    results.test3 = getAndClearErrors();
  }

  // Test 4: Updating a texture twice but where ranges do not overlap does not generate an error message
  {
    // 4a: non-overlapping rectangles on the same layer
    const textureA = device.createTexture({
      label: 't4a',
      size: [8, 8, 1],
      format: 'rgba8unorm',
      usage: GPUTextureUsage.COPY_DST,
    });
    device.queue.writeTexture({ texture: textureA, origin: [0, 0, 0] }, new Uint8Array(16), {}, [2, 2, 1]);
    getAndClearErrors();
    device.queue.writeTexture({ texture: textureA, origin: [4, 4, 0] }, new Uint8Array(16), {}, [2, 2, 1]);
    results.test4a = getAndClearErrors();

    // 4b: overlapping rectangles but on different layers
    const textureB = device.createTexture({
      label: 't4b',
      size: [4, 4, 2],
      format: 'rgba8unorm',
      usage: GPUTextureUsage.COPY_DST,
    });
    device.queue.writeTexture({ texture: textureB, origin: [0, 0, 0] }, new Uint8Array(64), {}, [4, 4, 1]);
    getAndClearErrors();
    device.queue.writeTexture({ texture: textureB, origin: [0, 0, 1] }, new Uint8Array(64), {}, [4, 4, 1]);
    results.test4b = getAndClearErrors();

    // 4c: overlapping rectangles but on different mip levels
    const textureC = device.createTexture({
      label: 't4c',
      size: [4, 4, 1],
      mipLevelCount: 2,
      format: 'rgba8unorm',
      usage: GPUTextureUsage.COPY_DST,
    });
    device.queue.writeTexture({ texture: textureC, mipLevel: 0 }, new Uint8Array(64), {}, [4, 4, 1]);
    getAndClearErrors();
    device.queue.writeTexture({ texture: textureC, mipLevel: 1 }, new Uint8Array(16), {}, [2, 2, 1]);
    results.test4c = getAndClearErrors();
  }

  // Test 5: Submit clears the checks
  {
    const buffer = device.createBuffer({ size: 100, usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC, label: 'b5a' });
    device.queue.writeBuffer(buffer, 0, new Float32Array([1, 2, 3]));
    getAndClearErrors();

    const tempBuffer = device.createBuffer({ size: 100, usage: GPUBufferUsage.COPY_DST, label: 't5b' });
    const encoder = device.createCommandEncoder();
    encoder.copyBufferToBuffer(buffer, 0, tempBuffer, 0, 12);
    const cb = encoder.finish();
    device.queue.submit([cb]);

    device.queue.writeBuffer(buffer, 0, new Float32Array([4, 5, 6]));
    results.test5 = getAndClearErrors();
  }

  // Test 6: Check copyBufferToBuffer, copyBufferToTexture, copyTextureToBuffer, and copyTextureToTexture.
  // they should still add to the update list so calls to writeBuffer / writeTexture after the fact generate an error.
  {
    // 6a: copyBufferToBuffer
    const bufferSrc = device.createBuffer({ size: 100, usage: GPUBufferUsage.COPY_SRC, label: 'b6a' });
    const bufferDst = device.createBuffer({ size: 100, usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC, label: 'b6b' });

    const encoder1 = device.createCommandEncoder();
    encoder1.copyBufferToBuffer(bufferSrc, 0, bufferDst, 0, 100);
    const cb1 = encoder1.finish();
    device.queue.submit([cb1]);
    // At this point bufferDst has been submitted, so its update list is clear.

    const encoder2 = device.createCommandEncoder();
    encoder2.copyBufferToBuffer(bufferSrc, 0, bufferDst, 0, 100);
    // This copy operation is not an error itself
    getAndClearErrors();

    // Call writeBuffer after the copy: should generate an error!
    device.queue.writeBuffer(bufferDst, 0, new Float32Array([1, 2, 3]));
    results.test6a = getAndClearErrors();

    // 6b: copyBufferToTexture
    const textureDst = device.createTexture({
      label: 't6b',
      size: [4, 4, 1],
      format: 'rgba8unorm',
      usage: GPUTextureUsage.COPY_DST | GPUTextureUsage.COPY_SRC,
    });

    const encoder3 = device.createCommandEncoder();
    encoder3.copyBufferToTexture({ buffer: bufferSrc }, { texture: textureDst }, [4, 4, 1]);
    // Should not be an error itself
    getAndClearErrors();

    // Call writeTexture after copy: should generate an error!
    device.queue.writeTexture({ texture: textureDst }, new Uint8Array(64), {}, [4, 4, 1]);
    results.test6b = getAndClearErrors();

    // 6c: copyTextureToBuffer
    const textureSrc = device.createTexture({
      label: 't6c',
      size: [4, 4, 1],
      format: 'rgba8unorm',
      usage: GPUTextureUsage.COPY_SRC,
    });
    const bufferDst2 = device.createBuffer({ size: 100, usage: GPUBufferUsage.COPY_DST, label: 'b6c' });

    const encoder4 = device.createCommandEncoder();
    encoder4.copyTextureToBuffer({ texture: textureSrc }, { buffer: bufferDst2, bytesPerRow: 16, rowsPerImage: 4 }, [4, 4, 1]);
    // Should not be an error itself
    getAndClearErrors();

    // Call writeBuffer after copy: should generate an error!
    device.queue.writeBuffer(bufferDst2, 0, new Float32Array([1, 2, 3]));
    results.test6c = getAndClearErrors();

    // 6d: copyTextureToTexture
    const textureDst2 = device.createTexture({
      label: 't6d',
      size: [4, 4, 1],
      format: 'rgba8unorm',
      usage: GPUTextureUsage.COPY_DST | GPUTextureUsage.COPY_SRC,
    });

    const encoder5 = device.createCommandEncoder();
    encoder5.copyTextureToTexture({ texture: textureSrc }, { texture: textureDst2 }, [4, 4, 1]);
    // Should not be an error itself
    getAndClearErrors();

    // Call writeTexture after copy: should generate an error!
    device.queue.writeTexture({ texture: textureDst2 }, new Uint8Array(64), {}, [4, 4, 1]);
    results.test6d = getAndClearErrors();
  }

  parent.postMessage({
    cmd: 'result',
    data: {
      actual: results,
      expected: {
        test1: ['webgpu-dev-extension: multiple updates to the same buffer(b1) sub region'],
        test2: ['webgpu-dev-extension: multiple updates to the same texture(t2) sub region'],
        test3: [],
        test4a: [],
        test4b: [],
        test4c: [],
        test5: [],
        test6a: ['webgpu-dev-extension: multiple updates to the same buffer(b6b) sub region'],
        test6b: ['webgpu-dev-extension: multiple updates to the same texture(t6b) sub region'],
        test6c: ['webgpu-dev-extension: multiple updates to the same buffer(b6c) sub region'],
        test6d: ['webgpu-dev-extension: multiple updates to the same texture(t6d) sub region'],
      },
    },
  });

  parent.postMessage({
    cmd: 'end',
  });
}
