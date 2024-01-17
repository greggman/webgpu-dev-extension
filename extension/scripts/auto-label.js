if (typeof GPUDevice !== 'undefined') {
  function addLabelWrapper(API, fnName) {
    const prefix = fnName.replace(/^[a-z]+/, '').replace(/(.)/, (_, m) => m.toLowerCase());
    let count = 0;

    const origFn = API.prototype[fnName];
    API.prototype[fnName] = function (_desc) {
      const desc = {
        label: `${prefix}${++count}`,
        ..._desc || {}
      };
      return origFn.call(this, desc);
    };
  }

  addLabelWrapper(GPUCommandEncoder, 'beginRenderPass')
  addLabelWrapper(GPUCommandEncoder, 'beginComputePass')

  addLabelWrapper(GPUDevice, 'createBindGroup');
  addLabelWrapper(GPUDevice, 'createBindGroupLayout');
  addLabelWrapper(GPUDevice, 'createBuffer');
  addLabelWrapper(GPUDevice, 'createComputePipeline');
  addLabelWrapper(GPUDevice, 'createComputePipelineAsync');
  addLabelWrapper(GPUDevice, 'createPipelineLayout');
  addLabelWrapper(GPUDevice, 'createQuerySet');
  addLabelWrapper(GPUDevice, 'createRenderBundleEncoder');
  addLabelWrapper(GPUDevice, 'createRenderPipeline');
  addLabelWrapper(GPUDevice, 'createRenderPipelineAsync');
  addLabelWrapper(GPUDevice, 'createSampler');
  addLabelWrapper(GPUDevice, 'createShaderModule');
  addLabelWrapper(GPUDevice, 'createTexture');
  addLabelWrapper(GPUDevice, 'importExternalTexture');

  addLabelWrapper(GPUTexture, 'createView');
}

document.currentScript.remove();
