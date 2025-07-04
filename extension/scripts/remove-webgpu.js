// DO NOT EDIT !!! AUTO-GENERATED-FILE !!!
(function () {
  'use strict';

  if (navigator.gpu) {
    console.log('webgpu-dev-extension: remove WebGPU');

    delete Navigator.prototype.gpu;

    [
      'GPUObjectBase',
      'GPUObjectDescriptorBase',
      'GPUSupportedLimits',
      'GPUSupportedFeatures',
      'GPUAdapterInfo',
      'GPU',
      'GPURequestAdapterOptions',
      'GPUTextureFormat',
      'GPUPowerPreference',
      'GPUAdapter',
      'GPUDeviceDescriptor',
      'GPUSize64>',
      'GPUQueueDescriptor',
      'GPUFeatureName',
      'GPUDevice',
      'GPUQueue',
      'GPUBuffer',
      'GPUTexture',
      'GPUSampler',
      'GPUSamplerDescriptor',
      'GPUExternalTexture',
      'GPUBindGroupLayout',
      'GPUPipelineLayout',
      'GPUBindGroup',
      'GPUShaderModule',
      'GPUComputePipeline',
      'GPURenderPipeline',
      'GPUCommandEncoder',
      'GPUCommandEncoderDescriptor',
      'GPURenderBundleEncoder',
      'GPUQuerySet',
      'GPUObjectBase;',
      'GPUSize64Out',
      'GPUFlagsConstant',
      'GPUBufferMapState',
      'GPUSize64',
      'GPUBufferDescriptor',
      'GPUBufferUsageFlags',
      'GPUBufferUsageFlags;',
      'GPUBufferUsage',
      'GPUMapModeFlags;',
      'GPUMapMode',
      'GPUTextureView',
      'GPUTextureViewDescriptor',
      'GPUIntegerCoordinateOut',
      'GPUSize32Out',
      'GPUTextureDimension',
      'GPUTextureDescriptor',
      'GPUExtent3D',
      'GPUIntegerCoordinate',
      'GPUSize32',
      'GPUTextureUsageFlags',
      'GPUTextureUsageFlags;',
      'GPUTextureUsage',
      'GPUTextureViewDimension',
      'GPUTextureAspect',
      'GPUExternalTextureDescriptor',
      'GPUAddressMode',
      'GPUFilterMode',
      'GPUMipmapFilterMode',
      'GPUCompareFunction',
      'GPUBindGroupLayoutDescriptor',
      'GPUBindGroupLayoutEntry',
      'GPUIndex32',
      'GPUShaderStageFlags',
      'GPUBufferBindingLayout',
      'GPUSamplerBindingLayout',
      'GPUTextureBindingLayout',
      'GPUStorageTextureBindingLayout',
      'GPUExternalTextureBindingLayout',
      'GPUShaderStageFlags;',
      'GPUShaderStage',
      'GPUBufferBindingType',
      'GPUSamplerBindingType',
      'GPUTextureSampleType',
      'GPUStorageTextureAccess',
      'GPUBindGroupDescriptor',
      'GPUBufferBinding',
      'GPUExternalTexture)',
      'GPUBindingResource;',
      'GPUBindGroupEntry',
      'GPUBindingResource',
      'GPUPipelineLayoutDescriptor',
      'GPUShaderModuleDescriptor',
      'GPUShaderModuleCompilationHint',
      'GPUAutoLayoutMode)',
      'GPUCompilationMessageType',
      'GPUCompilationMessage',
      'GPUCompilationInfo',
      'GPUPipelineError',
      'GPUPipelineErrorInit',
      'GPUPipelineErrorReason',
      'GPUAutoLayoutMode',
      'GPUPipelineDescriptorBase',
      'GPUPipelineBase',
      'GPUProgrammableStage',
      'GPUPipelineConstantValue>',
      'GPUPipelineConstantValue;',
      'GPUPipelineBase;',
      'GPUComputePipelineDescriptor',
      'GPURenderPipelineDescriptor',
      'GPUVertexState',
      'GPUPrimitiveState',
      'GPUDepthStencilState',
      'GPUMultisampleState',
      'GPUFragmentState',
      'GPUPrimitiveTopology',
      'GPUIndexFormat',
      'GPUFrontFace',
      'GPUCullMode',
      'GPUSampleMask',
      'GPUColorTargetState',
      'GPUBlendState',
      'GPUColorWriteFlags',
      'GPUColorWrite.ALL',
      'GPUBlendComponent',
      'GPUColorWriteFlags;',
      'GPUColorWrite',
      'GPUBlendOperation',
      'GPUBlendFactor',
      'GPUStencilFaceState',
      'GPUStencilValue',
      'GPUDepthBias',
      'GPUStencilOperation',
      'GPUVertexFormat',
      'GPUVertexStepMode',
      'GPUVertexBufferLayout',
      'GPUVertexAttribute',
      'GPUImageDataLayout',
      'GPUImageCopyBuffer',
      'GPUImageCopyTexture',
      'GPUOrigin3D',
      'GPUImageCopyTextureTagged',
      'GPUImageCopyExternalImageSource;',
      'GPUImageCopyExternalImage',
      'GPUImageCopyExternalImageSource',
      'GPUOrigin2D',
      'GPUCommandBuffer',
      'GPUCommandBufferDescriptor',
      'GPUCommandsMixin',
      'GPURenderPassEncoder',
      'GPUComputePassEncoder',
      'GPUComputePassDescriptor',
      'GPUCommandsMixin;',
      'GPUDebugCommandsMixin;',
      'GPUBindingCommandsMixin',
      'GPUBindGroup?',
      'GPUDebugCommandsMixin',
      'GPUBindingCommandsMixin;',
      'GPUComputePassTimestampWrites',
      'GPURenderCommandsMixin;',
      'GPURenderPassTimestampWrites',
      'GPURenderPassDescriptor',
      'GPURenderPassDepthStencilAttachment',
      'GPURenderPassColorAttachment',
      'GPUColor',
      'GPULoadOp',
      'GPUStoreOp',
      'GPURenderPassLayout',
      'GPURenderCommandsMixin',
      'GPUBuffer?',
      'GPUSignedOffset32',
      'GPURenderBundle',
      'GPURenderBundleDescriptor',
      'GPURenderBundleEncoderDescriptor',
      'GPUQueryType',
      'GPUQuerySetDescriptor',
      'GPUCanvasContext',
      'GPUCanvasAlphaMode',
      'GPUCanvasConfiguration',
      'GPUTextureUsage.RENDER_ATTACHMENT',
      'GPUDeviceLostReason',
      'GPUDeviceLostInfo',
      'GPUError',
      'GPUValidationError',
      'GPUOutOfMemoryError',
      'GPUInternalError',
      'GPUErrorFilter',
      'GPUUncapturedErrorEvent',
      'GPUUncapturedErrorEventInit',
      'GPUBufferDynamicOffset;',
      'GPUStencilValue;',
      'GPUSampleMask;',
      'GPUDepthBias;',
      'GPUSize64;',
      'GPUIntegerCoordinate;',
      'GPUIndex32;',
      'GPUSize32;',
      'GPUSignedOffset32;',
      'GPUSize64Out;',
      'GPUIntegerCoordinateOut;',
      'GPUSize32Out;',
      'GPUFlagsConstant;',
      'GPUColorDict',
      'GPUColorDict)',
      'GPUColor;',
      'GPUOrigin2DDict',
      'GPUOrigin2DDict)',
      'GPUOrigin2D;',
      'GPUOrigin3DDict',
      'GPUOrigin3DDict)',
      'GPUOrigin3D;',
      'GPUExtent3DDict',
      'GPUExtent3DDict)',
      'GPUExtent3D;',
    ].forEach(k => {
      delete globalThis[k];
    });
  }

  document.currentScript?.remove();

})();
//# sourceMappingURL=remove-webgpu.js.map
