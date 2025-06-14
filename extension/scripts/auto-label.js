// DO NOT EDIT !!! AUTO-GENERATED-FILE !!!
(function () {
  'use strict';

  if (typeof GPUDevice !== 'undefined') {
    console.log('webgpu-dev-extension: auto-label');

    function addLabelWrapper(API, fnName) {
      const prefix = fnName.replace(/^[a-z]+/, '').replace(/(.)/, (_, m) => m.toLowerCase());
      let count = 0;

      const origFn = API.prototype[fnName];
      API.prototype[fnName] = function (_desc) {
        const desc = {
          label: `${prefix}${++count}`,
          ..._desc || {},
        };
        return origFn.call(this, desc);
      };
    }

    addLabelWrapper(GPUCommandEncoder, 'beginRenderPass');
    addLabelWrapper(GPUCommandEncoder, 'beginComputePass');

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

    {
      const textureToViewCount = new WeakMap();
      GPUTexture.prototype.createView = (function (origFn) {
        return function (_desc) {
          const count = (textureToViewCount.get(this) || 0) + 1;
          textureToViewCount.set(this, count);
          const desc = {
            label: `view${count}-[${this.label}]`,
            ..._desc || {},
          };
          return origFn.call(this, desc);
        };
      })(GPUTexture.prototype.createView);
    }


    {
      let count = 0;
      GPUCanvasContext.prototype.getCurrentTexture = (function (origFn) {
        return function (...args) {
          const texture = origFn.call(this, ...args);
          if (texture.label === '') {
            texture.label = `canvasTexture${++count}[${this.canvas.id || ''}]`;
          }
          return texture;
        };
      })(GPUCanvasContext.prototype.getCurrentTexture);
    }
  }

  document.currentScript?.remove();

})();
//# sourceMappingURL=auto-label.js.map
