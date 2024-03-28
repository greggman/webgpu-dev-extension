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

  <img src="https://greggman.github.io/webgpu-dev-extension/screenshots/with-extension.png" width="600">

  <img src="https://greggman.github.io/webgpu-dev-extension/screenshots/without-extension.png" width="600">

### Add Descriptors

  Adds the descriptors used to create many objects to those objects. For example:
  When you call `createView` on a texture you pass in a descriptor. That descriptor is
  not reflected in the view itself which can make it hard to see what's going on.
  This adds that data onto the view so you can inspect it in the debugger or in the
  error messages printed by "Show Errors". Similarly, bindGroups, bindGroupLayouts,
  pipelines, pipelineLayouts, pass encoders, query sets, samplers, shader modules,
  external textures, ...

  <img src="https://greggman.github.io/webgpu-dev-extension/screenshots/view.png" width="600">

### Force Mode

  Lets you choose one of `'none'`, `'low-power'`, `'high-performance'`, and `'compatibility-mode'`

### Dump Shaders

  Dumps the pages shaders

  <img src="https://greggman.github.io/webgpu-dev-extension/screenshots/dump-shaders.png" width="600">

### Auto Label

  Adds labels to objects that don't have them. So for example buffers will
  get labels `'buffer1'`, `'buffer2'`, etc... which should help you tell
  them apart in the debugger. Canvas textures, textures from `getCurrentTexture`,
  are labelled `"canvasTexture<num>[<id-of-html-element>]"`.

### Show Adapter Info

  Shows the adapter info anytime `requestAdapter` is called. This is useful to see which GPU was
  selected on a dual GPU computer.

  <img src="https://greggman.github.io/webgpu-dev-extension/screenshots/show-adapter-info.png" width="600">

### Track Pass State

  Add a `state` property to a `GPURenderPassEncoder`, `GPUComputePassEncoder` and
  `GPURenderBundleEncoder` that tracks the current pipeline, bindGroups, vertexBuffers,
  indexBuffer, viewport, etc.... so you can inspect them in the debugger.

  <img src="https://greggman.github.io/webgpu-dev-extension/screenshots/pass-state.png" width="600">

### DevTools Custom Formatters

Shows `GPUBuffer.usage` and `GPUTexture.usage` with named bits

* without this checked: `GPUTexture { ... usage: 6, ... }`
* with this checked: `GPUTexture { ... usage: 6 (COPY_DST|TEXTURE_BINDING), ... }`

note: You must turn on custom formatters in the DevTools (Settings->Preferences->Console->Custom formatters).

### Count Active Devices

  Prints to the console the number of active WebGPU devices

### Block Features

  Lets you block webgpu features. For example, type in `shader-f16` and the shader-f16 feature will be blocked.
  You can use this to test that your code, that is supposed to run without the feature, actually runs without the
  feature.

  Enter one or more features separated by space, comma, or new line. `*` is a wildcard so `*` = all, `texture*` =
  all features that start with `texture`. `*f16` = all features that end in `f16`.

### Emulate Compat

  Experiment to show what places would fail in compatibility mode

### Capture

  Attempt to capture WebGPU calls to an HTML file using [webgpu_recorder](https://github.com/brendan-duncan/webgpu_recorder)

## Development

I don't know all the procedures for other browser but in Chrome, load the extension by cloning this repo and then

1. go to `about://extensions`
2. enable developer mode
3. pick "Load Unpacked"
4. Select the "extension" folder from this repo

From there, most of JavaScript files that augment the WebGPU API are live. If you edit them, just re-loading the page using the extension
will pick the changes. For UI files, and for `gpu-content-script.js`, the script that injects the other scripts into your page, it
will only update when you pick the refresh button in `about://extensions`. The refresh button looks like a circular arrow ↺ inside
each individual extension's info.