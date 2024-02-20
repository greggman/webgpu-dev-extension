//import {
//  makeShaderDataDefinitions,
//  makeBindGroupLayoutDescriptors,
//} from 'https://greggman.github.io/webgpu-utils/dist/1.x/webgpu-utils.module.js';
console.log('count-devices');
if (typeof GPUAdapter !== 'undefined') {
  let maxActiveDevices = 0;
  let allDevices = [];

  const {
    makeBindGroupLayoutDescriptors,
    makeShaderDataDefinitions,
  } = webgpuUtils;

  // 
  function updateDevices() {
    const countBefore = allDevices.length;
    // remove GCed devices
    allDevices = allDevices.filter(v => !!v.deref());
    const numGarbageCollectedDevices = countBefore - allDevices.length;
    if (numGarbageCollectedDevices > 0) {
      console.info('num garbage collected devices:', numGarbageCollectedDevices);
    }

    console.info('num active WebGPU devices', allDevices.length);
    if ( allDevices.length > maxActiveDevices) {
      maxActiveDevices = allDevices.length;
      console.info('maximum active WebGPU devices', maxActiveDevices);
    }
  }

  function wrapAPIFunction(api, fnName, fn) {
    const origFn = api.prototype[fnName];
    api.prototype[fnName] = function(...args) {
      const result = origFn.call(this, ...args);
      fn(this, result, args);
      return result;
    };
  }

  function wrapAPIFunctions(api, funcs) {
    for (const [fnName, fn] of Object.entries(funcs)) {
      wrapAPIFunction(api, fnName, fn);
    }
  }

  function wrapAsyncAPIFunction(api, fnName, fn) {
    const origFn = api.prototype[fnName];
    api.prototype[fnName] = async function(...args) {
      console.log(fnName);
      const result = await origFn.call(this, ...args);
      fn(this, result, args);
      return result;
    };
  }

  function wrapAsyncAPIFunctions(api, funcs) {
    for (const [fnName, fn] of Object.entries(funcs)) {
      wrapAsyncAPIFunction(api, fnName, fn);
    }
  }

  wrapAsyncAPIFunctions(GPUAdapter, {
    requestDevice(adapter, device) {
      if (device) {
        allDevices.push(new WeakRef(device));
        updateDevices();
      }
    },
  });

  GPUDevice.prototype.destroy = (function(origFn) {
    return function(...args) {
      const ndx = allDevices.findIndex(v => v.deref() === this);
      if (ndx >= 0) {
        allDevices.splice(ndx, 1);
      }
      origFn.call(this, ...args);
      updateDevices();
    }
  })(GPUDevice.prototype.destroy);

  const interpolateRE = /\binterpolate\b/;
  const flatRE = /\bflat\b/;
  const s_pipelineToRequiredGroupIndices = new WeakMap();
  const s_layoutToAutoLayoutPipeline = new WeakMap();
  const s_bindGroupToAutoLayoutPipeline = new WeakMap();
  const s_passToState = new WeakMap();
  const s_shaderModuleToDefs = new WeakMap();

  function trackAutoLayoutPipelines(device, pipeline, [desc]) {
      if (desc?.layout === 'auto') {
        const defs = [];
        for (const type of ['vertex', 'fragment', 'compute']) {
          if (desc[type]) {
            defs.push(s_shaderModuleToDefs.get(desc[type].module));
          }
        }
        const layoutsDescriptors = makeBindGroupLayoutDescriptors(defs, desc);
        const requiredGroupIndices = layoutsDescriptors.map((layout, ndx) => layout.entries.length > 0 ? ndx : -1).filter(v => v >= 0)
        s_pipelineToRequiredGroupIndices.set(pipeline, requiredGroupIndices);
      }
  }

  function trackAutoLayoutPipelineBindGroupLayouts(pipeline, layout) {
    if (s_pipelineToRequiredGroupIndices.has(pipeline)) {
      s_layoutToAutoLayoutPipeline.set(layout, pipeline);
    }
  }

  function addPassState(encoder, pass) {
    s_passToState.set(pass, {
      bindGroups: [],
      pipeline: undefined,
    });
  }

  function setPipeline(pass, _, [pipeline]) {
    s_passToState.get(pass).pipeline = pipeline;
  }

  function setBindGroup(pass, _, [ndx, bindGroup]) {
    s_passToState.get(pass).bindGroups[ndx] = bindGroup;
  }

  function validateBindGroups(pass) {
    const {pipeline, bindGroups} = s_passToState.get(pass);
    // get bind group indices needed for current pipeline
    const indices = s_pipelineToRequiredGroupIndices.get(pipeline) || [];
    for (const ndx of indices) {
      const bindGroup = bindGroups[ndx];
      if (bindGroup) {
        const neededPipeline = s_bindGroupToAutoLayoutPipeline.get(bindGroup);
        if (neededPipeline && neededPipeline !== pipeline) {
          console.log('pipeline mis-match');
        }
      }
    }
  }

  wrapAPIFunctions(GPUDevice, {
    createShaderModule(device, module, [desc]) {
      const code = desc.code || '';
      if (interpolateRE.test(code) && flatRE.test(code)) {
        console.log(`probably uses interpolation(flat):\n${code}`);
      }
      s_shaderModuleToDefs.set(module, makeShaderDataDefinitions(code));
    },
    createRenderPipeline: trackAutoLayoutPipelines,
    createComputePipeline: trackAutoLayoutPipelines,
    createBindGroup: function(device, bindGroup, [{layout}]) {
      const pipeline = s_layoutToAutoLayoutPipeline.get(layout);
      if (pipeline) {
        if (s_pipelineToRequiredGroupIndices.has(pipeline)) {
          s_bindGroupToAutoLayoutPipeline.set(bindGroup, pipeline);
        }
      }
    },
    createRenderBundleEncoder: addPassState,
  });

  wrapAsyncAPIFunctions(GPUDevice, {
    createRenderPipelineAsync: trackAutoLayoutPipelines,
    createComputePipelineAsync: trackAutoLayoutPipelines,
  });

  wrapAPIFunctions(GPURenderPipeline, {
    getBindGroupLayout: trackAutoLayoutPipelineBindGroupLayouts,
  });

  wrapAPIFunctions(GPUComputePipeline, {
    getBindGroupLayout: trackAutoLayoutPipelineBindGroupLayouts,
  });

  wrapAPIFunctions(GPUCommandEncoder, {
    beginRenderPass: addPassState,
    beginComputePass: addPassState,
  });

  wrapAPIFunctions(GPURenderPassEncoder, {
    setPipeline,
    setBindGroup,
    draw: validateBindGroups,
    drawIndexed: validateBindGroups,
    drawIndirect: validateBindGroups,
    drawIndexedIndirect: validateBindGroups,
    executeBundles(pass) {
      const state = s_passToState.get(pass);
      state.pipeline = undefined;
      state.bindGroups.length = 0;
    },
  });

  wrapAPIFunctions(GPURenderBundleEncoder, {
    setPipeline,
    setBindGroup,
    draw: validateBindGroups,
    drawIndexed: validateBindGroups,
    drawIndirect: validateBindGroups,
    drawIndexedIndirect: validateBindGroups,
  });

  wrapAPIFunctions(GPUComputePassEncoder, {
    setPipeline,
    setBindGroup,
    dispatchWorkgroups: validateBindGroups,
    dispatchWorkgroupsIndirect: validateBindGroups,
  });

  //document.currentScript.remove();

}
