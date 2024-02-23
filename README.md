# WebGPU Dev Extension

This is an extension to help with WebGPU development

## Installation:

The latest *published* version is available here:

* [Chrome](https://chromewebstore.google.com/detail/webgpu-dev-extension/gkeaijopdhfempknmaggbjbedicopjgm)
* [Firefox (TBD)]
* [Safari (TBD)]

Otherwise you can install top of tree locally by downloading or cloning this repo and then adding it as a developer.
For example in Chrome

1. go to `about://extensions`
2. enable developer mode
3. pick "Load Unpacked"
4. Select the "extension" folder from this repo

## Options

### Show Errors

  This has 3 points

  1. A WebGPU app can suppress errors by capturing them with `pushErrorScope` and `popErrorScope`
     as well as adding an `uncapturederror` listener to the device. Turning on this feature
     still prints the errors to the JavaScript console, even when they are captured.

  2. WebGPU errors happen asynchronously and so often do not provide info where the
     error happened. This is an attempt to add that info for some (but not all) errors.

  3. The parameters of the function that caused the error are not always available.
     This is an attempt to include those parameters.

### Add Descriptors

  Adds the descriptors used to create many objects to those objects. For example:
  When you call `createView` on a texture you pass in a descriptor. That descriptor is
  not reflected in the view itself which can make it hard to see what's going on.
  This adds that data onto the view so you can inspect it in the debugger or in the
  error messages printed by "Show Errors". Similarly, bindGroups, bindGroupLayouts,
  pipelines, pipelineLayouts, pass encoders, query sets, samplers, shader modules,
  external textures, ...

### Force Mode

  Lets you choose one of `'none'`, `'low-power'`, `'high-performance'`, and `'compatibility-mode'`

### Dump Shaders

  Dumps the pages shaders

### Auto Label

  Adds labels to objects that don't have them. So for example buffers will
  get labels `'buffer1'`, `'buffer2'`, etc... which should help you tell
  them apart in the debugger

### Track Pass State

  Add a `state` property to a `GPURenderPassEncoder`, `GPUComputePassEncoder` and
  `GPURenderBundleEncoder` that tracks the current pipeline, bindGroups, vertexBuffers,
  indexBuffer, viewport, etc.... so you can inspect them in the debugger.
  
### Count Active Devices

  Prints to the console the number of active WebGPU devices

### Emulate Compat

  Experiment to show what places would fail in compatibility mode

### Capture

  Attempt to capture WebGPU calls to an HTML file using [webgpu_recorder](https://github.com/brendan-duncan/webgpu_recorder)

