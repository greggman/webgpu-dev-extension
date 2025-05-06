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

## NOTE! Extension doesn't appear issue!!!

Currently, the plugin UI does not work if you are stopped at a breakpoint in the debugger.
Unpause execution in the debugger or close the DevTools and the UI should appear.
(PRs/ideas welcome! [See this issue](https://github.com/greggman/webgpu-dev-extension/issues/5))

## Options

### WebGPU Debug Helper

  This injects the [webgpu-debug-helper](https://github.com/greggman/webgpu-debug-helper).
  The WebGPU Debug Helper shows errors (see next option). It also throws on encoder errors.
  Normally `GPUCommandEncoder`, `GPURenderPassEncoder`, `GPUComputePassEncoder` and
  `GPURenderBundleEncoder` do not emit errors. Instead, they just record the first error
  and then you don't actually get the error until you `end` the pass and `finish` the
  encoder. With this option checked, most of the encoder errors will throw a JavaScript
  error immediately.

  What is the point of this option vs the next (show error)? Show error is a small script
  that only checks functions on `GPUDevice` and `GPUQueue` as those are the only objects
  that actually emit errors in WebGPU.

  WebGPU Debug Helper is a very large script. It might be buggy so I've kept both
  options so if you find a bug you can try to use the less capable but simpler
  "Show Errors" option. Of course if you do find a bug, please
  [create an issue](https://github.com/greggman/webgpu-dev-extension/issues/) and
  with a repo.

---
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

---
### Show Shader Errors

If a shader module gets an error, shows the entire shader in the JS console.

Normally shader errors only show the line the error happened on.

---
### Show Memory

Uses the [webgpu-memory](https://github.com/greggman/webgpu-memory) library to show
how much WebGPU memory is in use

<img src="https://greggman.github.io/webgpu-dev-extension/screenshots/show-memory.png" width="521">

The "max" is maximum amount of memory that was used since the last click on 🔄. 

---
### Add Descriptors

  Adds the descriptors used to create many objects to those objects. For example:
  When you call `createView` on a texture you pass in a descriptor. That descriptor is
  not reflected in the view itself which can make it hard to see what's going on.
  This adds that data onto the view so you can inspect it in the debugger or in the
  error messages printed by "Show Errors". Similarly, bindGroups, bindGroupLayouts,
  pipelines, pipelineLayouts, pass encoders, query sets, samplers, shader modules,
  external textures, ...

  <img src="https://greggman.github.io/webgpu-dev-extension/screenshots/view.png" width="600">

---
### Force Mode

  Lets you choose one of `'none'`, `'low-power'`, `'high-performance'`, `'compatibility-mode'` and `'force-fallback-adapter'`

---
### Dump Shaders

  Dumps the pages shaders

  <img src="https://greggman.github.io/webgpu-dev-extension/screenshots/dump-shaders.png" width="600">

---
### Auto Label

  Adds labels to objects that don't have them. So for example buffers will
  get labels `'buffer1'`, `'buffer2'`, etc... which should help you tell
  them apart in the debugger. Canvas textures, textures from `getCurrentTexture`,
  are labelled `"canvasTexture<num>[<id-of-html-element>]"`.

---
### Show Adapter Info

  Shows the adapter info anytime `requestAdapter` is called. This is useful to see which GPU was
  selected on a dual GPU computer.

  <img src="https://greggman.github.io/webgpu-dev-extension/screenshots/show-adapter-info.png" width="600">

---
### Track Pass State

  Add a `state` property to a `GPURenderPassEncoder`, `GPUComputePassEncoder` and
  `GPURenderBundleEncoder` that tracks the current pipeline, bindGroups, vertexBuffers,
  indexBuffer, viewport, etc.... so you can inspect them in the debugger.

  <img src="https://greggman.github.io/webgpu-dev-extension/screenshots/pass-state.png" width="600">

---
### DevTools Custom Formatters

Shows `GPUBuffer.usage` and `GPUTexture.usage` with named bits as well as `GPUAdapter.features` and `GPUDevice.features`

#### `GPUTexture` and `GPUBuffer`

* without this checked: `GPUTexture { ... usage: 6, ... }`
* with this checked: `GPUTexture { ... usage: 6 (COPY_DST|TEXTURE_BINDING), ... }`

#### `GPUDevice` and `GPUAdapter`

* without this checked: `GPUDevice.features`
* with this checked: `GPUDevice.features: ['shader-f16', 'timestamp-query', ...]`

note: You must turn on custom formatters in the DevTools (Settings->Preferences->Console->Custom formatters).

---
### Count Active Devices

  Prints to the console the number of active WebGPU devices

---
### Block Features

  Lets you block webgpu features. For example, type in `shader-f16` and the shader-f16 feature will be blocked.
  You can use this to test that your code, that is supposed to run without the feature, actually runs without the
  feature.

  Enter one or more features separated by space, comma, or new line. `*` is a wildcard so `*` = all, `texture*` =
  all features that start with `texture`. `*f16` = all features that end in `f16`.

---
### API Breakpoints

  Adds a `debugger` statement to the specified WebGPU API functions.

  Enter one or more API method names separated by space, comma, or new line. `*` is a wildcard
  so `*` = all. Each match is for whole string so 

  eg. `*destroy` adds breakpoints to `GPUDevice.destroy`, `GPUBuffer.destroy`,
  `GPUQuerySet.destroy` and `GPUTexture.destroy` where as `*fer.des*` would only
  add a breakpoint to `GPUBuffer.destroy`. Names are `API.methodName` so entering
  `copyTextureToBuffer` matches nothing. Use `*copyTextureToBuffer` or the full name like
  `GPUCommandEncoder.copyTextureToBuffer`.

  In DevTools, for each breakpoint added there is a `disable` variable you can set to disable
  the breakpoint for that particular API method.

---
### Disable WebGPU

  Returns `null` from `requestAdapter`.

---
### Remove WebGPU

  Removes `navigator.gpu` and other `GPU` classes

---
### rAF Skip Frames

Skips `requestAnimationFrames`. For example, if you're on a 120fps device like an M1 Mac
and you enter 3 then 3 out of 4 frames will be skipped, effectively making your app run
at 30fps. Default = 0

Remember this is not instant. You must refresh the page for it to take affect.

---
### Time Mult

Multiplies the time passed to the `requestAnimationFrame` callback, as well as `performance.now()`,
`Date.now()` and `setTimeout(callback,time)` and `setInterval(callback, time)` by this number.

For some apps, if you set this to 0.1 your app will run at 10% speed. If you set it 10 your app
will run at 10x speed. Default = 1

Remember this is not instant. You must refresh the page for it to take affect.

---
### Emulate Compat

  Experiment to show what places would fail in compatibility mode

---
### Capture

  Attempt to capture WebGPU calls to an HTML file using [webgpu_recorder](https://github.com/brendan-duncan/webgpu_recorder)

---
## Development

I don't know all the procedures for other browser but in Chrome, load the extension by cloning this repo and then

1. go to `about://extensions`
2. enable developer mode
3. pick "Load Unpacked"
4. Select the "extension" folder from this repo

From there, most of JavaScript files that augment the WebGPU API are live. If you edit them, just re-loading the page using the extension
will pick the changes. For UI files, and for `service-worker.js`, the script that injects the other scripts into your page, it
will only update when you pick the refresh button in `about://extensions`. The refresh button looks like a circular arrow ↺ inside
each individual extension's info.
