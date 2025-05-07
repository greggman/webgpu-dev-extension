(function () {
  'use strict';

  (function() {
    function warn(obj, ...args) {
      console.log(`%cCompat:[${obj?.label || '*unlabeled*'}: ${obj?.__proto__?.constructor?.name || 'NULL'}]`, 'color: orange', ...args);
    }

    function isPlainObject(v) {
      return !!v && Object.getPrototypeOf(v).constructor === Object.prototype.constructor;
    }

    const isTypedArray = (arr) =>
      arr && typeof arr.length === 'number' && arr.buffer instanceof ArrayBuffer && typeof arr.byteLength === 'number';


    // Ugh. Seems like we really need a description of each object
    /**
     * Attempt to deep copy an object. I'm not sure how we can do this. What we
     * want is a snapshot of the useful data but we don't want to clone any GPU objects
     * Unfortunately I think if an object is complex this will fail. For example
     *
     * ```
     * class ColorState {
     *   get format() { return 'rgba8unorm'; }
     *   get blend() { return {}; }
     *   get writeMask() { return 0xF; }
     * }
     * 
     * deepishClone({
     *   fragment: {
     *     targets: [
     *       new ColorState(),
     *     ],
     *   }
     * });
     * ```
     * 
     * The code below will fail to copy ColorState and will instead just keep a reference
     * but we need a copy, otherwise it's possible ColorState will have changed. At the
     * same time, we don't want to copy native objects nor do we really want to copy
     * anything we don't care about. Therefore, it seems like we need a template of each
     * type of object and only copy things on the template.
     */
    function deepishClone(o) {
      if (Array.isArray(o)) {
        return o.map(v => deepishClone(v));
      } else if (isTypedArray(o)) {
        return o.slice();
      } else if (isPlainObject(o)) {
        return Object.fromEntries(Object.entries(o).map(([k, v]) => [k, deepishClone(v)]));
      } else {
        return o;
      }
    }

    function wrapFn(className, fnName, fn) {
      const origFn = className.prototype[fnName];
      className.prototype[fnName] = fn(origFn);
    }

    wrapFn(GPU, 'requestAdapter', function(origFn) {
      return async function(...args) {
        const adapter = await origFn.call(this, ...args);
        console.log('added compat validation to adapter');
        return adapter;
      };
    });

    function validateFn(className, fnName, fn) {
      wrapFn(className, fnName, function(origFn) {
        return function(...args) {
          const result = origFn.call(this, ...args);
          fn(this, args, result);
          return result;
        };
      });
    }

    function validateFns(obj, fns) {
      for (const [fnName, fn] of Object.entries(fns)) {
        validateFn(obj, fnName, fn);
      }
    }

    const formatInfo = {
      "r8unorm": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 1 },
      "r8snorm": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 1 },
      "r8uint": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 1 },
      "r8sint": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 1 },
      "rg8unorm": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 2 },
      "rg8snorm": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 2 },
      "rg8uint": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 2 },
      "rg8sint": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 2 },
      "rgba8unorm": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 4 },
      "rgba8unorm-srgb": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 4 },
      "rgba8snorm": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 4 },
      "rgba8uint": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 4 },
      "rgba8sint": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 4 },
      "bgra8unorm": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 4 },
      "bgra8unorm-srgb": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 4 },
      "r16uint": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 2 },
      "r16sint": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 2 },
      "r16float": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 2 },
      "rg16uint": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 4 },
      "rg16sint": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 4 },
      "rg16float": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 4 },
      "rgba16uint": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 8 },
      "rgba16sint": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 8 },
      "rgba16float": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 8 },
      "r32uint": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 4 },
      "r32sint": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 4 },
      "r32float": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 4 },
      "rg32uint": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 8 },
      "rg32sint": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 8 },
      "rg32float": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 8 },
      "rgba32uint": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 16 },
      "rgba32sint": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 16 },
      "rgba32float": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 16 },
      "rgb10a2unorm": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 4 },
      "rg11b10ufloat": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 4 },
      "rgb9e5ufloat": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 4 },
      "stencil8": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 1 },
      "depth16unorm": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 2 },
      "depth32float": { "blockWidth": 1, "blockHeight": 1, "bytesPerBlock": 4 },
      "depth24plus": { "blockWidth": 1, "blockHeight": 1 },
      "depth24plus-stencil8": { "blockWidth": 1, "blockHeight": 1 },
      "depth32float-stencil8": { "blockWidth": 1, "blockHeight": 1 },
      "bc1-rgba-unorm": { "blockWidth": 4, "blockHeight": 4, "bytesPerBlock": 8 },
      "bc1-rgba-unorm-srgb": { "blockWidth": 4, "blockHeight": 4, "bytesPerBlock": 8 },
      "bc2-rgba-unorm": { "blockWidth": 4, "blockHeight": 4, "bytesPerBlock": 16 },
      "bc2-rgba-unorm-srgb": { "blockWidth": 4, "blockHeight": 4, "bytesPerBlock": 16 },
      "bc3-rgba-unorm": { "blockWidth": 4, "blockHeight": 4, "bytesPerBlock": 16 },
      "bc3-rgba-unorm-srgb": { "blockWidth": 4, "blockHeight": 4, "bytesPerBlock": 16 },
      "bc4-r-unorm": { "blockWidth": 4, "blockHeight": 4, "bytesPerBlock": 8 },
      "bc4-r-snorm": { "blockWidth": 4, "blockHeight": 4, "bytesPerBlock": 8 },
      "bc5-rg-unorm": { "blockWidth": 4, "blockHeight": 4, "bytesPerBlock": 16 },
      "bc5-rg-snorm": { "blockWidth": 4, "blockHeight": 4, "bytesPerBlock": 16 },
      "bc6h-rgb-ufloat": { "blockWidth": 4, "blockHeight": 4, "bytesPerBlock": 16 },
      "bc6h-rgb-float": { "blockWidth": 4, "blockHeight": 4, "bytesPerBlock": 16 },
      "bc7-rgba-unorm": { "blockWidth": 4, "blockHeight": 4, "bytesPerBlock": 16 },
      "bc7-rgba-unorm-srgb": { "blockWidth": 4, "blockHeight": 4, "bytesPerBlock": 16 },
      "etc2-rgb8unorm": { "blockWidth": 4, "blockHeight": 4, "bytesPerBlock": 8 },
      "etc2-rgb8unorm-srgb": { "blockWidth": 4, "blockHeight": 4, "bytesPerBlock": 8 },
      "etc2-rgb8a1unorm": { "blockWidth": 4, "blockHeight": 4, "bytesPerBlock": 8 },
      "etc2-rgb8a1unorm-srgb": { "blockWidth": 4, "blockHeight": 4, "bytesPerBlock": 8 },
      "etc2-rgba8unorm": { "blockWidth": 4, "blockHeight": 4, "bytesPerBlock": 16 },
      "etc2-rgba8unorm-srgb": { "blockWidth": 4, "blockHeight": 4, "bytesPerBlock": 16 },
      "eac-r11unorm": { "blockWidth": 4, "blockHeight": 4, "bytesPerBlock": 8 },
      "eac-r11snorm": { "blockWidth": 4, "blockHeight": 4, "bytesPerBlock": 8 },
      "eac-rg11unorm": { "blockWidth": 4, "blockHeight": 4, "bytesPerBlock": 16 },
      "eac-rg11snorm": { "blockWidth": 4, "blockHeight": 4, "bytesPerBlock": 16 },
      "astc-4x4-unorm": { "blockWidth": 4, "blockHeight": 4, "bytesPerBlock": 16 },
      "astc-4x4-unorm-srgb": { "blockWidth": 4, "blockHeight": 4, "bytesPerBlock": 16 },
      "astc-5x4-unorm": { "blockWidth": 5, "blockHeight": 4, "bytesPerBlock": 16 },
      "astc-5x4-unorm-srgb": { "blockWidth": 5, "blockHeight": 4, "bytesPerBlock": 16 },
      "astc-5x5-unorm": { "blockWidth": 5, "blockHeight": 5, "bytesPerBlock": 16 },
      "astc-5x5-unorm-srgb": { "blockWidth": 5, "blockHeight": 5, "bytesPerBlock": 16 },
      "astc-6x5-unorm": { "blockWidth": 6, "blockHeight": 5, "bytesPerBlock": 16 },
      "astc-6x5-unorm-srgb": { "blockWidth": 6, "blockHeight": 5, "bytesPerBlock": 16 },
      "astc-6x6-unorm": { "blockWidth": 6, "blockHeight": 6, "bytesPerBlock": 16 },
      "astc-6x6-unorm-srgb": { "blockWidth": 6, "blockHeight": 6, "bytesPerBlock": 16 },
      "astc-8x5-unorm": { "blockWidth": 8, "blockHeight": 5, "bytesPerBlock": 16 },
      "astc-8x5-unorm-srgb": { "blockWidth": 8, "blockHeight": 5, "bytesPerBlock": 16 },
      "astc-8x6-unorm": { "blockWidth": 8, "blockHeight": 6, "bytesPerBlock": 16 },
      "astc-8x6-unorm-srgb": { "blockWidth": 8, "blockHeight": 6, "bytesPerBlock": 16 },
      "astc-8x8-unorm": { "blockWidth": 8, "blockHeight": 8, "bytesPerBlock": 16 },
      "astc-8x8-unorm-srgb": { "blockWidth": 8, "blockHeight": 8, "bytesPerBlock": 16 },
      "astc-10x5-unorm": { "blockWidth": 10, "blockHeight": 5, "bytesPerBlock": 16 },
      "astc-10x5-unorm-srgb": { "blockWidth": 10, "blockHeight": 5, "bytesPerBlock": 16 },
      "astc-10x6-unorm": { "blockWidth": 10, "blockHeight": 6, "bytesPerBlock": 16 },
      "astc-10x6-unorm-srgb": { "blockWidth": 10, "blockHeight": 6, "bytesPerBlock": 16 },
      "astc-10x8-unorm": { "blockWidth": 10, "blockHeight": 8, "bytesPerBlock": 16 },
      "astc-10x8-unorm-srgb": { "blockWidth": 10, "blockHeight": 8, "bytesPerBlock": 16 },
      "astc-10x10-unorm": { "blockWidth": 10, "blockHeight": 10, "bytesPerBlock": 16 },
      "astc-10x10-unorm-srgb": { "blockWidth": 10, "blockHeight": 10, "bytesPerBlock": 16 },
      "astc-12x10-unorm": { "blockWidth": 12, "blockHeight": 10, "bytesPerBlock": 16 },
      "astc-12x10-unorm-srgb": { "blockWidth": 12, "blockHeight": 10, "bytesPerBlock": 16 },
      "astc-12x12-unorm": { "blockWidth": 12, "blockHeight": 12, "bytesPerBlock": 16 },
      "astc-12x12-unorm-srgb": { "blockWidth": 12, "blockHeight": 12, "bytesPerBlock": 16 },
    };

    function isCompressedTextureFormat(format) {
      const info = formatInfo[format];
      // TODO: fix around about way to check
      return (info.blockWidth > 1 || info.blockHeight > 1);
    }

    function guessViewDimension(texture) {
      const dimension = texture.dimension || '2d';
      switch (dimension) {
        case '1d': return '1d';
        case '3d': return '3d';
        case '2d': {
          switch (texture.depthOrArrayLayers) {
            case 6:
              return 'cube';
            case 1:
              return '2d';
            default:
              return '2d-array';
          }
        }
        default:
          throw new Error('unsupported texture dimension');
      }
    }

    function normalizeViewDescriptor(texture, _desc) {
      const desc = {
        format: texture.format,
        dimension: texture.dimension,
        aspect: 'all',
        baseMipLevel: 0,
        mipLevelCount: texture.mipLevelCount,
        baseArrayLayer: 0,
        arrayLayerCount: texture.depthOrArrayLayers,
        texture,
        ..._desc,
      };
      return desc;
    }

    function getBlendComponent(blendComponent) {
      return {
        operation: blendComponent?.operation || 'add',
        srcFactor: blendComponent?.srcFactor || 'one',
        dstFactor: blendComponent?.dstFactor || 'zero',
      };
    }

    function getBlendState(colorTargetState) {
      return {
        color: getBlendComponent(colorTargetState.color),
        alpha: getBlendComponent(colorTargetState.alpha),
        writeMask: colorTargetState.writeMask === undefined ? 0xF : colorTargetState.writeMask,
      };
    }
    function validateSampleMask(programmableStage) {
      if (programmableStage) {
        if (programmableStage.module.__desc.code.includes('@builtin(sample_mask)')) {
          warn(programmableStage.module, 'might be using @builtin(sample_mask)');
        }
      }
    }

    function validateRenderPipeline(device, desc, pipeline) {
      const targets = desc.fragment?.targets;
      if (targets && targets.length > 1) {
        const first = JSON.stringify(getBlendState(targets[0]));
        for (let i = 1; i < targets.length; ++i) {
          const other = getBlendState(targets[i]);
          if (JSON.stringify(other) !== first) {
            warn(pipeline, 'mixed blend state');
            break;
          }
        }
      }
      validateSampleMask(pipeline.fragment);
      validateSampleMask(pipeline.vertex);
      validateSampleMask(pipeline.compute);
    }

    validateFns(GPUDevice, {
      createShaderModule(device, args, module) {
        console.log('create shader module');
        const [desc] = args;
        if (module) {
          module.__desc = deepishClone(desc);
        }
      },
      createTexture(device, args, texture) {
        const [desc] = args;
        if (texture.format === 'bgra8unorm-srgb') {
          warn(texture, 'use of bgra8unorm-srgb');
        }
        if (texture) {
          texture.__viewDimension = desc.viewDimension || guessViewDimension(texture);
        }
      },
      createRenderPipeline(device, args, pipeline) {
        const [desc] = args;
        validateRenderPipeline(device, desc, pipeline);
        pipeline.__desc = deepishClone(desc);
      },
      createRenderPipelineAsync(device, args, pipelinePromise) {
        const desc = deepishClone(args[0]);
        pipelinePromise.then(pipeline => {
          validateRenderPipeline(device, desc, pipeline);
          pipeline.__desc = desc;
        });
      },
      createBindGroup(device, args, bindGroup) {
        const desc = deepishClone(args[0]);
        bindGroup.__desc = desc;
      }
    });

    function viewsSame(_a, _b) {
      const a = _a.__desc;
      const b = _b.__desc;
      for (const [k, v] of Object.entries(a)) {
        if (b[k] !== v) {
          return false;
        }
      }
      return true;
    }

    function viewToString(v) {
      try {
        return JSON.stringify(v.__desc);
      } catch (e) {
        return '*???*';
      }
    }

    // range is inclusive
    function getViewLayerSubRange(view, texture) {
      const {dimension, baseArrayLayer, arrayLayerCount} = view.__desc;
      switch (dimension) {
        case '2d':
          return [baseArrayLayer, baseArrayLayer];
        default: {
          const end = Math.min(texture.depthOrArrayLayers, baseArrayLayer + arrayLayerCount);
          return [baseArrayLayer, end - 1];
        }
      }
    }

    function validateRenderState(encoder) {
      const textureToView = new Map();
      // TODO: need to know which bindGroups are actually used by current pipeline
      for (const bindGroup of encoder.__bindGroups || []) {
        for (const entry of bindGroup.__desc.entries) {
          if (entry.resource instanceof GPUTextureView) {
            const newView = entry.resource;
            const desc = newView.__desc;
            const texture = desc.texture;
            if (desc.dimension !== texture.__viewDimension) {
              warn(texture, `view dimension of texture (${desc.dimension}) different than texture.viewDimension (${texture.__viewDimension})`);
            }

            if (desc.baseArrayLayer > 0 || desc.arrayLayerCount !== texture.depthOrArrayLayers) {
              const subRange = getViewLayerSubRange(newView, texture);
              warn(texture, `view uses layer sub range [${subRange[0]}..${subRange[1]}] of layers [0..${texture.depthOrArrayLayers - 1}]`);
            }

            const existingView = textureToView.get(texture);
            if (existingView) {
              if (!viewsSame(existingView, newView)) {
                warn(texture, `mixed views ${viewToString(existingView)} vs ${viewToString(newView)}`);
                break;
              }
            } else {
              textureToView.set(texture, entry.resource);
            }
          }
        }
      }
    }

    const renderFns = {
      setIndexBuffer(encoder, args) {
        const [buffer, indexFormat, offset, size] = args;
        encoder.__indexBufferOffset = offset || 0;
      },
      draw: validateRenderState,
      drawIndexed: validateRenderState,
      drawIndirect: validateRenderState,
      drawIndexedIndirect(encoder) {
        validateRenderState(encoder);
        if (encoder.__indexBufferOffset > 0) {
          warn(encoder, 'drawIndexedIndirect: indexBufferOffset > 0');
        }
      },
    };

    const bindFns = {
      setBindGroup(encoder, args) {
        const [index, bindGroup] = args;
        const bindGroups = encoder.__bindGroups || [];
        encoder.__bindGroups = bindGroups;
        bindGroups[index] = bindGroup;
      },
    };

    validateFns(GPURenderPassEncoder, renderFns);
    validateFns(GPURenderBundleEncoder, renderFns);
    validateFns(GPURenderPassEncoder, {
      executeBundles(encoder) {
        encoder.__bindGroups = [];
      },
    });


    validateFns(GPUComputePassEncoder, bindFns);
    validateFns(GPURenderPassEncoder, bindFns);
    validateFns(GPURenderBundleEncoder, bindFns);

    validateFns(GPUComputePassEncoder, {
      dispatchWorkgroups() {},
      dispatchWorkgroupsIndirect() {},
    });

    function validateRenderPass(desc) {
      for (const {view} of desc.colorAttachments) {
        if (view.__desc.format.endsWith('16float')) {
          warn(view.__desc.texture, `trying to render to ${view.__desc.format} format texture`);
        }
      }
    }

    validateFns(GPUCommandEncoder, {
      beginRenderPass(encoder, args) {
        const [desc] = args;
        validateRenderPass(desc);
      },
      copyTextureToBuffer(encoder, args) {
        const [src] = args;
        if (isCompressedTextureFormat(src.texture.format)) {
          warn(src.texture, 'attempt to copy compressed texture to buffer');
        }
      },
      copyTextureToTexture(encoder, args) {
        const [src, dst] = args;
        if (isCompressedTextureFormat(src.texture.format)) {
          warn(src.texture, 'attempt to copy compressed texture to texture');
        }
        if (isCompressedTextureFormat(dst.texture.format)) {
          warn(dst.texture, 'attempt to copy compressed texture to texture');
        }
      },
    });

    validateFns(GPUTexture, {
      createView(texture, args, view) {
        const desc = normalizeViewDescriptor(texture, args[0]);
        view.__desc = deepishClone(desc);
        if (desc.dimension === 'cube-array') {
          warn(texture, 'attempt to make cube-array view');
        }
      },
    });

  })();

  document.currentScript?.remove();

})();
//# sourceMappingURL=webgpu-compat-validation.js.map
