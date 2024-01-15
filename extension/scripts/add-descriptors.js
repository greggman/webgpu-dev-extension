if (typeof GPUDevice !== 'undefined') {
  function addDescriptorWrapper(API, fnName) {
    const origFn = API.prototype[fnName];
    API.prototype[fnName] = function (desc) {
      const result = origFn.call(this, desc);
      result.description = {...desc};
      return result;
    };
  }

  function addDescriptorWrapperAsync(API, fnName) {
    const origFn = API.prototype[fnName];
    API.prototype[fnName] = async function (desc) {
      const result = await origFn.call(this, desc);
      result.description = {...desc};
      return result;
    };
  }

  addDescriptorWrapper(GPUCommandEncoder, 'beginRenderPass')
  addDescriptorWrapper(GPUCommandEncoder, 'beginComputePass')

  addDescriptorWrapper(GPUDevice, 'createBindGroup');
  addDescriptorWrapper(GPUDevice, 'createBindGroupLayout');
  addDescriptorWrapper(GPUDevice, 'createComputePipeline');
  addDescriptorWrapperAsync(GPUDevice, 'createComputePipelineAsync');
  addDescriptorWrapper(GPUDevice, 'createPipelineLayout');
  addDescriptorWrapper(GPUDevice, 'createQuerySet');
  addDescriptorWrapper(GPUDevice, 'createRenderBundleEncoder');
  addDescriptorWrapper(GPUDevice, 'createRenderPipeline');
  addDescriptorWrapperAsync(GPUDevice, 'createRenderPipelineAsync');
  addDescriptorWrapper(GPUDevice, 'createSampler');
  addDescriptorWrapper(GPUDevice, 'createShaderModule');
  addDescriptorWrapper(GPUDevice, 'importExternalTexture');

  addDescriptorWrapper(GPUTexture, 'createView');
}