// DO NOT EDIT !!! AUTO-GENERATED-FILE !!!
(function () {
  'use strict';

  if (typeof GPUDevice !== 'undefined') {
    function addStateWrapper(API, fnName, fn) {
      const origFn = API.prototype[fnName];
      API.prototype[fnName] = function (...args) {
        fn(this.state, ...args);
        return origFn.call(this, ...args);
      };
    }

    GPUCommandEncoder.prototype.beginComputePass = (function(origFn) {
      return function(desc = {}) {
        const result = origFn.call(this, desc);
        result.state = {
          bindGroups: [],
        };
        return result;
      };
    })(GPUCommandEncoder.prototype.beginComputePass);

    GPUCommandEncoder.prototype.beginRenderPass = (function(origFn) {
      return function(desc = {}) {
        const result = origFn.call(this, desc);
        result.state = {
          bindGroups: [],
          vertexBuffers: [],
        };
        return result;
      };
    })(GPUCommandEncoder.prototype.beginRenderPass);

    GPUDevice.prototype.createRenderBundle = (function(origFn) {
      return function(desc = {}) {
        const result = origFn.call(this, desc);
        result.state = {
          bindGroups: [],
          vertexBuffers: [],
        };
        return result;
      };
    })(GPUDevice.prototype.createRenderBundle);

    addStateWrapper(GPUComputePassEncoder, 'setBindGroup', (state, group, bindGroup) => {
      state.bindGroups[group] = bindGroup;
    });

    addStateWrapper(GPUComputePassEncoder, 'setPipeline', (state, pipeline) => {
      state.pipeline = pipeline;
    });

    addStateWrapper(GPURenderPassEncoder, 'executeBundles', (state) => {
      state.bindGroups.length = 0;
      state.vertexBuffers.length = 0;
      delete state.pipeline;
      delete state.indexBuffer;
    });

    for (const api of [GPURenderPassEncoder, GPURenderBundleEncoder]) {
      addStateWrapper(GPURenderPassEncoder, 'setPipeline', (state, pipeline) => {
        state.pipeline = pipeline;
      });

      addStateWrapper(GPURenderPassEncoder, 'setBindGroup', (state, group, bindGroup, ...args) => {
        if (args.length === 0) {
          state.bindGroups[group] = { bindGroup };
        } else if (args.length === 1) {
          state.bindGroups[group] = { bindGroup, dynamicOffsets: args[0] };
        } else {
          state.bindGroups[group] = {
            bindGroup, 
            dynamicOffsetsData: args[0],
            dynamicOffsetsDataStart: args[1],
            dynamicOffsetsDataLength: args[2],      
           };
        }
      });

      addStateWrapper(GPURenderPassEncoder, 'setVertexBuffer', (state, slot, vertexBuffer, offset = 0, size) => {
        state.vertexBuffers[slot] = { vertexBuffer, offset, size: size === undefined ? vertexBuffer.size : size };
      });

      addStateWrapper(GPURenderPassEncoder, 'setIndexBuffer', (state, indexBuffer, indexFormat, offset = 0, size) => {
        state.indexBuffer = { indexBuffer, indexFormat, offset, size: size === undefined ? indexBuffer.size : size };
      });
    }

    addStateWrapper(GPURenderPassEncoder, 'setViewport', (state, ...args) => {
      state.viewport = args;
    });

    addStateWrapper(GPURenderPassEncoder, 'setScissorRect', (state, ...args) => {
      state.scissorRect = args;
    });

    addStateWrapper(GPURenderPassEncoder, 'setBlendConstant', (state, ...args) => {
      state.blendConstant = args[0];
    });

    addStateWrapper(GPURenderPassEncoder, 'setStencilReference', (state, ...args) => {
      state.stencilReference = args[0];
    });

    addStateWrapper(GPURenderPassEncoder, 'beginOcclusionQuery', (state, ...args) => {
      state.queryIndex = args[0];
    });
   
    addStateWrapper(GPURenderPassEncoder, 'endOcclusionQuery', (state, ...args) => {
      delete state.queryIndex;
    });
   
  }

  document.currentScript?.remove();

})();
//# sourceMappingURL=track-pass-state.js.map
