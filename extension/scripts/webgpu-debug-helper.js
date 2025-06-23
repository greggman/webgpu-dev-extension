// DO NOT EDIT !!! AUTO-GENERATED-FILE !!!
(function () {
    'use strict';

    /* webgpu-debug-helper@0.2.8, license MIT */
    (function (factory) {
        typeof define === 'function' && define.amd ? define(factory) :
        factory();
    })((function () {
        const s_objToDevice = new WeakMap();

        /* eslint-disable no-inner-declarations */
        if (typeof GPUDevice !== 'undefined') {
            const deviceToErrorScopeStack = new WeakMap();
            const origPushErrorScope = GPUDevice.prototype.pushErrorScope;
            const origPopErrorScope = GPUDevice.prototype.popErrorScope;
            const passToEncoderMap = new WeakMap();
            function errorWrapper(device, fnName, origFn, ...args) {
                const stack = new Error();
                origPushErrorScope.call(device, 'validation');
                const result = origFn.call(this, ...args);
                const errorScopeStack = deviceToErrorScopeStack.get(device);
                const currentErrorScope = errorScopeStack.findLast(scope => scope.filter === 'validation');
                const promise = origPopErrorScope.call(device)
                    .then(error => {
                    // If there was a currentErrorScope and there was no error the remove our promise.
                    if (currentErrorScope) {
                        if (!error) {
                            const ndx = currentErrorScope.errors.indexOf(promise);
                            if (ndx) {
                                currentErrorScope.errors.splice(ndx, 1);
                            }
                        }
                    }
                    else {
                        // there was no currentErrorScope so emit the error
                        if (error) {
                            device.dispatchEvent(new GPUUncapturedErrorEvent('uncapturederror', { error }));
                        }
                    }
                    // show it
                    if (error) {
                        console.error('WebGPU ERROR in:', fnName, args);
                        console.error(error.message);
                        console.error(stack.stack);
                    }
                    // return it (as a promise)
                    return error;
                });
                if (currentErrorScope) {
                    currentErrorScope.errors.push(promise);
                }
                return result;
            }
            function debugGroupWrapper(device, fnName, origFn, ...args) {
                this.pushDebugGroup(`${fnName}:\n${new Error().stack}`);
                const result = origFn.call(this, ...args);
                this.popDebugGroup();
                return result;
            }
            function pushDebugGroupWrapper(device, fnName, origFn, ...args) {
                this.pushDebugGroup(`${fnName}:\n${new Error().stack}`);
                const result = origFn.call(this, ...args);
                passToEncoderMap.set(result, this);
                return result;
            }
            function popDebugGroupWrapper(device, fnName, origFn, ...args) {
                const result = origFn.call(this, ...args);
                const encoder = passToEncoderMap.get(this);
                if (encoder) {
                    passToEncoderMap.delete(this);
                    encoder.popDebugGroup();
                }
                return result;
            }
            function addErrorWrapper(api, fnName) {
                const origFn = api.prototype[fnName];
                api.prototype[fnName] = function (...args) {
                    return errorWrapper.call(this, this, fnName.toString(), origFn, ...args);
                };
            }
            function addErrorWrapperWithDevice(api, fnName) {
                const origFn = api.prototype[fnName];
                api.prototype[fnName] = function (...args) {
                    const device = s_objToDevice.get(this);
                    return errorWrapper.call(this, device, fnName.toString(), origFn, ...args);
                };
            }
            function addDebugGroupWrapper(api, fnName) {
                const origFn = api.prototype[fnName];
                api.prototype[fnName] = function (...args) {
                    return debugGroupWrapper.call(this, this, fnName.toString(), origFn, ...args);
                };
            }
            function addPushDebugGroupWrapper(api, fnName) {
                const origFn = api.prototype[fnName];
                api.prototype[fnName] = function (...args) {
                    return pushDebugGroupWrapper.call(this, this, fnName.toString(), origFn, ...args);
                };
            }
            function addPopDebugGroupWrapper(api, fnName) {
                const origFn = api.prototype[fnName];
                api.prototype[fnName] = function (...args) {
                    return popDebugGroupWrapper.call(this, this, fnName.toString(), origFn, ...args);
                };
            }
            /**
             * given a class returns all the method names.
             */
            function getAPIFunctionNames(api) {
                return Object.entries(Object.getOwnPropertyDescriptors(api.prototype))
                    .filter(([, info]) => info.enumerable && typeof info.value === 'function')
                    .map(([name]) => name);
            }
            {
                const skip = new Set([
                    'pushErrorScope',
                    'popErrorScope',
                    'destroy',
                ]);
                getAPIFunctionNames(GPUDevice)
                    .filter(n => !skip.has(n))
                    .forEach(n => addErrorWrapper(GPUDevice, n));
                getAPIFunctionNames(GPUQueue)
                    .forEach(n => addErrorWrapperWithDevice(GPUQueue, n));
            }
            {
                const skip = new Set([
                    'pushDebugGroup',
                    'popDebugGroup',
                    'finish',
                    'end',
                    'beginComputePass',
                    'beginRenderPass',
                ]);
                getAPIFunctionNames(GPUCommandEncoder)
                    .filter(n => !skip.has(n))
                    .forEach(n => addDebugGroupWrapper(GPUCommandEncoder, n));
                getAPIFunctionNames(GPUComputePassEncoder)
                    .filter(n => !skip.has(n))
                    .forEach(n => addDebugGroupWrapper(GPUComputePassEncoder, n));
                getAPIFunctionNames(GPURenderPassEncoder)
                    .filter(n => !skip.has(n))
                    .forEach(n => addDebugGroupWrapper(GPURenderPassEncoder, n));
                getAPIFunctionNames(GPURenderBundleEncoder)
                    .filter(n => !skip.has(n))
                    .forEach(n => addDebugGroupWrapper(GPURenderBundleEncoder, n));
                addPushDebugGroupWrapper(GPUCommandEncoder, 'beginComputePass');
                addPushDebugGroupWrapper(GPUCommandEncoder, 'beginRenderPass');
                addPopDebugGroupWrapper(GPUComputePassEncoder, 'end');
                addPopDebugGroupWrapper(GPURenderPassEncoder, 'end');
            }
            GPUDevice.prototype.pushErrorScope = (function (origFn) {
                return function (filter) {
                    origFn.call(this, filter);
                    const errorScopeStack = deviceToErrorScopeStack.get(this);
                    errorScopeStack.push({ filter, errors: [] });
                };
            })(GPUDevice.prototype.pushErrorScope);
            GPUDevice.prototype.popErrorScope = (function (origFn) {
                return async function () {
                    const errorScopeStack = deviceToErrorScopeStack.get(this);
                    const errorScope = errorScopeStack.pop();
                    if (errorScope === undefined) {
                        throw new DOMException('popErrorScope called on empty error scope stack', 'OperationError');
                    }
                    const errPromise = origFn.call(this);
                    errorScope.errors.push(errPromise);
                    const errors = await Promise.all(errorScope.errors);
                    const error = errors.find(v => !!v);
                    return error ?? null;
                };
            })(GPUDevice.prototype.popErrorScope);
            GPUAdapter.prototype.requestDevice = (function (origFn) {
                return async function (...args) {
                    const device = await origFn.call(this, ...args);
                    if (device) {
                        device.addEventListener('uncapturederror', function (e) {
                            console.error(e.error.message);
                        });
                        deviceToErrorScopeStack.set(device, []);
                        s_objToDevice.set(device.queue, device);
                    }
                    return device;
                };
            })(GPUAdapter.prototype.requestDevice);
        }

        /* webgpu-utils@1.10.3, license MIT */
        function keysOf(obj) {
            return Object.keys(obj);
        }

        const createTypeDefs = (defs) => defs;
        const b$1 = createTypeDefs({
            i32: { numElements: 1, align: 4, size: 4, type: 'i32', View: Int32Array },
            u32: { numElements: 1, align: 4, size: 4, type: 'u32', View: Uint32Array },
            f32: { numElements: 1, align: 4, size: 4, type: 'f32', View: Float32Array },
            f16: { numElements: 1, align: 2, size: 2, type: 'u16', View: Uint16Array },
            vec2f: { numElements: 2, align: 8, size: 8, type: 'f32', View: Float32Array },
            vec2i: { numElements: 2, align: 8, size: 8, type: 'i32', View: Int32Array },
            vec2u: { numElements: 2, align: 8, size: 8, type: 'u32', View: Uint32Array },
            vec2h: { numElements: 2, align: 4, size: 4, type: 'u16', View: Uint16Array },
            vec3i: { numElements: 3, align: 16, size: 12, type: 'i32', View: Int32Array },
            vec3u: { numElements: 3, align: 16, size: 12, type: 'u32', View: Uint32Array },
            vec3f: { numElements: 3, align: 16, size: 12, type: 'f32', View: Float32Array },
            vec3h: { numElements: 3, align: 8, size: 6, type: 'u16', View: Uint16Array },
            vec4i: { numElements: 4, align: 16, size: 16, type: 'i32', View: Int32Array },
            vec4u: { numElements: 4, align: 16, size: 16, type: 'u32', View: Uint32Array },
            vec4f: { numElements: 4, align: 16, size: 16, type: 'f32', View: Float32Array },
            vec4h: { numElements: 4, align: 8, size: 8, type: 'u16', View: Uint16Array },
            // AlignOf(vecR)	SizeOf(array<vecR, C>)
            mat2x2f: { numElements: 4, align: 8, size: 16, type: 'f32', View: Float32Array },
            mat2x2h: { numElements: 4, align: 4, size: 8, type: 'u16', View: Uint16Array },
            mat3x2f: { numElements: 6, align: 8, size: 24, type: 'f32', View: Float32Array },
            mat3x2h: { numElements: 6, align: 4, size: 12, type: 'u16', View: Uint16Array },
            mat4x2f: { numElements: 8, align: 8, size: 32, type: 'f32', View: Float32Array },
            mat4x2h: { numElements: 8, align: 4, size: 16, type: 'u16', View: Uint16Array },
            mat2x3f: { numElements: 8, align: 16, size: 32, pad: [3, 1], type: 'f32', View: Float32Array },
            mat2x3h: { numElements: 8, align: 8, size: 16, pad: [3, 1], type: 'u16', View: Uint16Array },
            mat3x3f: { numElements: 12, align: 16, size: 48, pad: [3, 1], type: 'f32', View: Float32Array },
            mat3x3h: { numElements: 12, align: 8, size: 24, pad: [3, 1], type: 'u16', View: Uint16Array },
            mat4x3f: { numElements: 16, align: 16, size: 64, pad: [3, 1], type: 'f32', View: Float32Array },
            mat4x3h: { numElements: 16, align: 8, size: 32, pad: [3, 1], type: 'u16', View: Uint16Array },
            mat2x4f: { numElements: 8, align: 16, size: 32, type: 'f32', View: Float32Array },
            mat2x4h: { numElements: 8, align: 8, size: 16, type: 'u16', View: Uint16Array },
            mat3x4f: { numElements: 12, align: 16, size: 48, pad: [3, 1], type: 'f32', View: Float32Array },
            mat3x4h: { numElements: 12, align: 8, size: 24, pad: [3, 1], type: 'u16', View: Uint16Array },
            mat4x4f: { numElements: 16, align: 16, size: 64, type: 'f32', View: Float32Array },
            mat4x4h: { numElements: 16, align: 8, size: 32, type: 'u16', View: Uint16Array },
            // Note: At least as of WGSL V1 you can not create a bool for uniform or storage.
            // You can only create one in an internal struct. But, this code generates
            // views of structs and it needs to not fail if the struct has a bool
            bool: { numElements: 0, align: 1, size: 0, type: 'bool', View: Uint32Array },
        });
        const kWGSLTypeInfo = createTypeDefs({
            ...b$1,
            'atomic<i32>': b$1.i32,
            'atomic<u32>': b$1.u32,
            'vec2<i32>': b$1.vec2i,
            'vec2<u32>': b$1.vec2u,
            'vec2<f32>': b$1.vec2f,
            'vec2<f16>': b$1.vec2h,
            'vec3<i32>': b$1.vec3i,
            'vec3<u32>': b$1.vec3u,
            'vec3<f32>': b$1.vec3f,
            'vec3<f16>': b$1.vec3h,
            'vec4<i32>': b$1.vec4i,
            'vec4<u32>': b$1.vec4u,
            'vec4<f32>': b$1.vec4f,
            'vec4<f16>': b$1.vec4h,
            'mat2x2<f32>': b$1.mat2x2f,
            'mat2x2<f16>': b$1.mat2x2h,
            'mat3x2<f32>': b$1.mat3x2f,
            'mat3x2<f16>': b$1.mat3x2h,
            'mat4x2<f32>': b$1.mat4x2f,
            'mat4x2<f16>': b$1.mat4x2h,
            'mat2x3<f32>': b$1.mat2x3f,
            'mat2x3<f16>': b$1.mat2x3h,
            'mat3x3<f32>': b$1.mat3x3f,
            'mat3x3<f16>': b$1.mat3x3h,
            'mat4x3<f32>': b$1.mat4x3f,
            'mat4x3<f16>': b$1.mat4x3h,
            'mat2x4<f32>': b$1.mat2x4f,
            'mat2x4<f16>': b$1.mat2x4h,
            'mat3x4<f32>': b$1.mat3x4f,
            'mat3x4<f16>': b$1.mat3x4h,
            'mat4x4<f32>': b$1.mat4x4f,
            'mat4x4<f16>': b$1.mat4x4h,
        });
        const kWGSLTypes = keysOf(kWGSLTypeInfo);

        /**
         * Set which intrinsic types to make views for.
         *
         * Example:
         *
         * Given a an array of intrinsics like this
         * `array<vec3, 200>`
         *
         * The default is to create a single `Float32Array(4 * 200)`
         * because creating 200 `Float32Array` views is not usually
         * what you want.
         *
         * If you do want individual views then you'd call
         * `setIntrinsicsToView(['vec3f'])` and now you get
         * an array of 200 `Float32Array`s.
         *
         * Note: `setIntrinsicsToView` always sets ALL types. The list you
         * pass it is the types you want views created for, all other types
         * will be reset to do the default. In other words
         *
         * ```js
         * setIntrinsicsToView(['vec3f'])
         * setIntrinsicsToView(['vec2f'])
         * ```
         *
         * Only `vec2f` will have views created. `vec3f` has been reset to the default by
         * the second call
         *
         * You can pass in `true` as the 2nd parameter to make it set which types
         * to flatten and all others will be set to have views created. For example
         * to expand all types would be `setIntrinsicsToView([], true)`. To expand
         * all except `f32` would be `setIntrinsicsToView(['f32'], true)`.
         *
         * To reset all types to the default call it with no arguments
         *
         * @param types array of types to make views for
         * @param flatten whether to flatten or expand the specified types.
         */
        function setIntrinsicsToView(types = [], flatten) {
            // we need to track what we've viewed because for example `vec3f` references
            // the same info as `vec3<f32>` so we'd set one and reset the other.
            const visited = new Set();
            for (const type of kWGSLTypes) {
                const info = kWGSLTypeInfo[type];
                if (!visited.has(info)) {
                    visited.add(info);
                    info.flatten = types.includes(type) ? flatten : !flatten;
                }
            }
        }
        setIntrinsicsToView();

        class e{constructor(e,t){this.name=e,this.attributes=t,this.size=0;}get isArray(){return  false}get isStruct(){return  false}get isTemplate(){return  false}get isPointer(){return  false}getTypeName(){return this.name}}class t{constructor(e,t,n){this.name=e,this.type=t,this.attributes=n,this.offset=0,this.size=0;}get isArray(){return this.type.isArray}get isStruct(){return this.type.isStruct}get isTemplate(){return this.type.isTemplate}get align(){return this.type.isStruct?this.type.align:0}get members(){return this.type.isStruct?this.type.members:null}get format(){return this.type.isArray||this.type.isTemplate?this.type.format:null}get count(){return this.type.isArray?this.type.count:0}get stride(){return this.type.isArray?this.type.stride:this.size}}class n extends e{constructor(e,t){super(e,t),this.members=[],this.align=0,this.startLine=-1,this.endLine=-1,this.inUse=false;}get isStruct(){return  true}}class s extends e{constructor(e,t){super(e,t),this.count=0,this.stride=0;}get isArray(){return  true}getTypeName(){return `array<${this.format.getTypeName()}, ${this.count}>`}}class r extends e{constructor(e,t,n){super(e,n),this.format=t;}get isPointer(){return  true}getTypeName(){return `&${this.format.getTypeName()}`}}class a extends e{constructor(e,t,n,s){super(e,n),this.format=t,this.access=s;}get isTemplate(){return  true}getTypeName(){let e=this.name;if(null!==this.format){if('vec2'===e||'vec3'===e||'vec4'===e||'mat2x2'===e||'mat2x3'===e||'mat2x4'===e||'mat3x2'===e||'mat3x3'===e||'mat3x4'===e||'mat4x2'===e||'mat4x3'===e||'mat4x4'===e){if('f32'===this.format.name)return e+='f',e;if('i32'===this.format.name)return e+='i',e;if('u32'===this.format.name)return e+='u',e;if('bool'===this.format.name)return e+='b',e;if('f16'===this.format.name)return e+='h',e}e+=`<${this.format.name}>`;}else if('vec2'===e||'vec3'===e||'vec4'===e)return e;return e}}var i;(e=>{e[e.Uniform=0]='Uniform',e[e.Storage=1]='Storage',e[e.Texture=2]='Texture',e[e.Sampler=3]='Sampler',e[e.StorageTexture=4]='StorageTexture';})(i||(i={}));class o{constructor(e,t,n,s,r,a,i){this.name=e,this.type=t,this.group=n,this.binding=s,this.attributes=r,this.resourceType=a,this.access=i;}get isArray(){return this.type.isArray}get isStruct(){return this.type.isStruct}get isTemplate(){return this.type.isTemplate}get size(){return this.type.size}get align(){return this.type.isStruct?this.type.align:0}get members(){return this.type.isStruct?this.type.members:null}get format(){return this.type.isArray||this.type.isTemplate?this.type.format:null}get count(){return this.type.isArray?this.type.count:0}get stride(){return this.type.isArray?this.type.stride:this.size}}class l{constructor(e,t){this.name=e,this.type=t;}}class c{constructor(e,t,n,s){this.name=e,this.type=t,this.locationType=n,this.location=s,this.interpolation=null;}}class u{constructor(e,t,n,s){this.name=e,this.type=t,this.locationType=n,this.location=s;}}class h{constructor(e,t,n,s){this.name=e,this.type=t,this.attributes=n,this.id=s;}}class f{constructor(e,t,n){this.name=e,this.type=t,this.attributes=n;}}class p{constructor(e,t=null,n){this.stage=null,this.inputs=[],this.outputs=[],this.arguments=[],this.returnType=null,this.resources=[],this.overrides=[],this.startLine=-1,this.endLine=-1,this.inUse=false,this.calls=new Set,this.name=e,this.stage=t,this.attributes=n;}}class d{constructor(){this.vertex=[],this.fragment=[],this.compute=[];}}const m=new Float32Array(1),_=new Int32Array(m.buffer),g=new Uint16Array(1);function x(e){m[0]=e;const t=_[0],n=t>>31&1;let s=t>>23&255,r=8388607&t;if(255===s)return g[0]=n<<15|31744|(0!==r?512:0),g[0];if(0===s){if(0===r)return g[0]=n<<15,g[0];r|=8388608;let e=113;for(;!(8388608&r);)r<<=1,e--;return s=127-e,r&=8388607,s>0?(r=(r>>126-s)+(r>>127-s&1),g[0]=n<<15|s<<10|r>>13,g[0]):(g[0]=n<<15,g[0])}return s=s-127+15,s>=31?(g[0]=n<<15|31744,g[0]):s<=0?s<-10?(g[0]=n<<15,g[0]):(r=(8388608|r)>>1-s,g[0]=n<<15|r>>13,g[0]):(r>>=13,g[0]=n<<15|s<<10|r,g[0])}const y=new Uint32Array(1),b=new Float32Array(y.buffer,0,1);function v(e){const t=112+(e>>6&31)<<23|(63&e)<<17;return y[0]=t,b[0]}function w(e,t,n,s,r,a,i,o,l){const c=s*(i>>=r)*(a>>=r)+n*i+t*o;switch(l){case 'r8unorm':return [k(e,c,'8unorm',1)[0]];case 'r8snorm':return [k(e,c,'8snorm',1)[0]];case 'r8uint':return [k(e,c,'8uint',1)[0]];case 'r8sint':return [k(e,c,'8sint',1)[0]];case 'rg8unorm':{const t=k(e,c,'8unorm',2);return [t[0],t[1]]}case 'rg8snorm':{const t=k(e,c,'8snorm',2);return [t[0],t[1]]}case 'rg8uint':{const t=k(e,c,'8uint',2);return [t[0],t[1]]}case 'rg8sint':{const t=k(e,c,'8sint',2);return [t[0],t[1]]}case 'rgba8unorm-srgb':case 'rgba8unorm':{const t=k(e,c,'8unorm',4);return [t[0],t[1],t[2],t[3]]}case 'rgba8snorm':{const t=k(e,c,'8snorm',4);return [t[0],t[1],t[2],t[3]]}case 'rgba8uint':{const t=k(e,c,'8uint',4);return [t[0],t[1],t[2],t[3]]}case 'rgba8sint':{const t=k(e,c,'8sint',4);return [t[0],t[1],t[2],t[3]]}case 'bgra8unorm-srgb':case 'bgra8unorm':{const t=k(e,c,'8unorm',4);return [t[2],t[1],t[0],t[3]]}case 'r16uint':return [k(e,c,'16uint',1)[0]];case 'r16sint':return [k(e,c,'16sint',1)[0]];case 'r16float':return [k(e,c,'16float',1)[0]];case 'rg16uint':{const t=k(e,c,'16uint',2);return [t[0],t[1]]}case 'rg16sint':{const t=k(e,c,'16sint',2);return [t[0],t[1]]}case 'rg16float':{const t=k(e,c,'16float',2);return [t[0],t[1]]}case 'rgba16uint':{const t=k(e,c,'16uint',4);return [t[0],t[1],t[2],t[3]]}case 'rgba16sint':{const t=k(e,c,'16sint',4);return [t[0],t[1],t[2],t[3]]}case 'rgba16float':{const t=k(e,c,'16float',4);return [t[0],t[1],t[2],t[3]]}case 'r32uint':return [k(e,c,'32uint',1)[0]];case 'r32sint':return [k(e,c,'32sint',1)[0]];case 'depth16unorm':case 'depth24plus':case 'depth24plus-stencil8':case 'depth32float':case 'depth32float-stencil8':case 'r32float':return [k(e,c,'32float',1)[0]];case 'rg32uint':{const t=k(e,c,'32uint',2);return [t[0],t[1]]}case 'rg32sint':{const t=k(e,c,'32sint',2);return [t[0],t[1]]}case 'rg32float':{const t=k(e,c,'32float',2);return [t[0],t[1]]}case 'rgba32uint':{const t=k(e,c,'32uint',4);return [t[0],t[1],t[2],t[3]]}case 'rgba32sint':{const t=k(e,c,'32sint',4);return [t[0],t[1],t[2],t[3]]}case 'rgba32float':{const t=k(e,c,'32float',4);return [t[0],t[1],t[2],t[3]]}case 'rg11b10ufloat':{const t=new Uint32Array(e.buffer,c,1)[0],n=(4192256&t)>>11,s=(4290772992&t)>>22;return [v(2047&t),v(n),function(e){const t=112+(e>>5&31)<<23|(31&e)<<18;return y[0]=t,b[0]}(s),1]}}return null}function k(e,t,n,s){const r=[0,0,0,0];for(let c=0;c<s;++c)switch(n){case '8unorm':r[c]=e[t]/255,t++;break;case '8snorm':r[c]=e[t]/255*2-1,t++;break;case '8uint':r[c]=e[t],t++;break;case '8sint':r[c]=e[t]-127,t++;break;case '16uint':r[c]=e[t]|e[t+1]<<8,t+=2;break;case '16sint':r[c]=(e[t]|e[t+1]<<8)-32768,t+=2;break;case '16float':r[c]=(a=e[t]|e[t+1]<<8,i=undefined,o=undefined,l=undefined,i=(32768&a)>>15,l=1023&a,0==(o=(31744&a)>>10)?(i?-1:1)*Math.pow(2,-14)*(l/Math.pow(2,10)):31==o?l?NaN:1/0*(i?-1:1):(i?-1:1)*Math.pow(2,o-15)*(1+l/Math.pow(2,10))),t+=2;break;case '32uint':case '32sint':r[c]=e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24,t+=4;break;case '32float':r[c]=new Float32Array(e.buffer,t,1)[0],t+=4;}var a,i,o,l;return r}function I(e,t,n,s,r){for(let a=0;a<s;++a)switch(n){case '8unorm':e[t]=255*r[a],t++;break;case '8snorm':e[t]=.5*(r[a]+1)*255,t++;break;case '8uint':e[t]=r[a],t++;break;case '8sint':e[t]=r[a]+127,t++;break;case '16uint':new Uint16Array(e.buffer,t,1)[0]=r[a],t+=2;break;case '16sint':new Int16Array(e.buffer,t,1)[0]=r[a],t+=2;break;case '16float':{const n=x(r[a]);new Uint16Array(e.buffer,t,1)[0]=n,t+=2;break}case '32uint':new Uint32Array(e.buffer,t,1)[0]=r[a],t+=4;break;case '32sint':new Int32Array(e.buffer,t,1)[0]=r[a],t+=4;break;case '32float':new Float32Array(e.buffer,t,1)[0]=r[a],t+=4;}return r}const T={r8unorm:{bytesPerBlock:1,blockWidth:1,blockHeight:1,isCompressed:false,channels:1},r8snorm:{bytesPerBlock:1,blockWidth:1,blockHeight:1,isCompressed:false,channels:1},r8uint:{bytesPerBlock:1,blockWidth:1,blockHeight:1,isCompressed:false,channels:1},r8sint:{bytesPerBlock:1,blockWidth:1,blockHeight:1,isCompressed:false,channels:1},rg8unorm:{bytesPerBlock:2,blockWidth:1,blockHeight:1,isCompressed:false,channels:2},rg8snorm:{bytesPerBlock:2,blockWidth:1,blockHeight:1,isCompressed:false,channels:2},rg8uint:{bytesPerBlock:2,blockWidth:1,blockHeight:1,isCompressed:false,channels:2},rg8sint:{bytesPerBlock:2,blockWidth:1,blockHeight:1,isCompressed:false,channels:2},rgba8unorm:{bytesPerBlock:4,blockWidth:1,blockHeight:1,isCompressed:false,channels:4},'rgba8unorm-srgb':{bytesPerBlock:4,blockWidth:1,blockHeight:1,isCompressed:false,channels:4},rgba8snorm:{bytesPerBlock:4,blockWidth:1,blockHeight:1,isCompressed:false,channels:4},rgba8uint:{bytesPerBlock:4,blockWidth:1,blockHeight:1,isCompressed:false,channels:4},rgba8sint:{bytesPerBlock:4,blockWidth:1,blockHeight:1,isCompressed:false,channels:4},bgra8unorm:{bytesPerBlock:4,blockWidth:1,blockHeight:1,isCompressed:false,channels:4},'bgra8unorm-srgb':{bytesPerBlock:4,blockWidth:1,blockHeight:1,isCompressed:false,channels:4},r16uint:{bytesPerBlock:2,blockWidth:1,blockHeight:1,isCompressed:false,channels:1},r16sint:{bytesPerBlock:2,blockWidth:1,blockHeight:1,isCompressed:false,channels:1},r16float:{bytesPerBlock:2,blockWidth:1,blockHeight:1,isCompressed:false,channels:1},rg16uint:{bytesPerBlock:4,blockWidth:1,blockHeight:1,isCompressed:false,channels:2},rg16sint:{bytesPerBlock:4,blockWidth:1,blockHeight:1,isCompressed:false,channels:2},rg16float:{bytesPerBlock:4,blockWidth:1,blockHeight:1,isCompressed:false,channels:2},rgba16uint:{bytesPerBlock:8,blockWidth:1,blockHeight:1,isCompressed:false,channels:4},rgba16sint:{bytesPerBlock:8,blockWidth:1,blockHeight:1,isCompressed:false,channels:4},rgba16float:{bytesPerBlock:8,blockWidth:1,blockHeight:1,isCompressed:false,channels:4},r32uint:{bytesPerBlock:4,blockWidth:1,blockHeight:1,isCompressed:false,channels:1},r32sint:{bytesPerBlock:4,blockWidth:1,blockHeight:1,isCompressed:false,channels:1},r32float:{bytesPerBlock:4,blockWidth:1,blockHeight:1,isCompressed:false,channels:1},rg32uint:{bytesPerBlock:8,blockWidth:1,blockHeight:1,isCompressed:false,channels:2},rg32sint:{bytesPerBlock:8,blockWidth:1,blockHeight:1,isCompressed:false,channels:2},rg32float:{bytesPerBlock:8,blockWidth:1,blockHeight:1,isCompressed:false,channels:2},rgba32uint:{bytesPerBlock:16,blockWidth:1,blockHeight:1,isCompressed:false,channels:4},rgba32sint:{bytesPerBlock:16,blockWidth:1,blockHeight:1,isCompressed:false,channels:4},rgba32float:{bytesPerBlock:16,blockWidth:1,blockHeight:1,isCompressed:false,channels:4},rgb10a2uint:{bytesPerBlock:4,blockWidth:1,blockHeight:1,isCompressed:false,channels:4},rgb10a2unorm:{bytesPerBlock:4,blockWidth:1,blockHeight:1,isCompressed:false,channels:4},rg11b10ufloat:{bytesPerBlock:4,blockWidth:1,blockHeight:1,isCompressed:false,channels:4},stencil8:{bytesPerBlock:1,blockWidth:1,blockHeight:1,isCompressed:false,isDepthStencil:true,hasDepth:false,hasStencil:true,channels:1},depth16unorm:{bytesPerBlock:2,blockWidth:1,blockHeight:1,isCompressed:false,isDepthStencil:true,hasDepth:true,hasStencil:false,channels:1},depth24plus:{bytesPerBlock:4,blockWidth:1,blockHeight:1,isCompressed:false,isDepthStencil:true,hasDepth:true,hasStencil:false,depthOnlyFormat:'depth32float',channels:1},'depth24plus-stencil8':{bytesPerBlock:8,blockWidth:1,blockHeight:1,isCompressed:false,isDepthStencil:true,hasDepth:true,hasStencil:true,depthOnlyFormat:'depth32float',channels:1},depth32float:{bytesPerBlock:4,blockWidth:1,blockHeight:1,isCompressed:false,isDepthStencil:true,hasDepth:true,hasStencil:false,channels:1},'depth32float-stencil8':{bytesPerBlock:8,blockWidth:1,blockHeight:1,isCompressed:false,isDepthStencil:true,hasDepth:true,hasStencil:true,stencilOnlyFormat:'depth32float',channels:1},rgb9e5ufloat:{bytesPerBlock:4,blockWidth:1,blockHeight:1,isCompressed:false,channels:4},'bc1-rgba-unorm':{bytesPerBlock:8,blockWidth:4,blockHeight:4,isCompressed:true,channels:4},'bc1-rgba-unorm-srgb':{bytesPerBlock:8,blockWidth:4,blockHeight:4,isCompressed:true,channels:4},'bc2-rgba-unorm':{bytesPerBlock:16,blockWidth:4,blockHeight:4,isCompressed:true,channels:4},'bc2-rgba-unorm-srgb':{bytesPerBlock:16,blockWidth:4,blockHeight:4,isCompressed:true,channels:4},'bc3-rgba-unorm':{bytesPerBlock:16,blockWidth:4,blockHeight:4,isCompressed:true,channels:4},'bc3-rgba-unorm-srgb':{bytesPerBlock:16,blockWidth:4,blockHeight:4,isCompressed:true,channels:4},'bc4-r-unorm':{bytesPerBlock:8,blockWidth:4,blockHeight:4,isCompressed:true,channels:1},'bc4-r-snorm':{bytesPerBlock:8,blockWidth:4,blockHeight:4,isCompressed:true,channels:1},'bc5-rg-unorm':{bytesPerBlock:16,blockWidth:4,blockHeight:4,isCompressed:true,channels:2},'bc5-rg-snorm':{bytesPerBlock:16,blockWidth:4,blockHeight:4,isCompressed:true,channels:2},'bc6h-rgb-ufloat':{bytesPerBlock:16,blockWidth:4,blockHeight:4,isCompressed:true,channels:4},'bc6h-rgb-float':{bytesPerBlock:16,blockWidth:4,blockHeight:4,isCompressed:true,channels:4},'bc7-rgba-unorm':{bytesPerBlock:16,blockWidth:4,blockHeight:4,isCompressed:true,channels:4},'bc7-rgba-unorm-srgb':{bytesPerBlock:16,blockWidth:4,blockHeight:4,isCompressed:true,channels:4},'etc2-rgb8unorm':{bytesPerBlock:8,blockWidth:4,blockHeight:4,isCompressed:true,channels:4},'etc2-rgb8unorm-srgb':{bytesPerBlock:8,blockWidth:4,blockHeight:4,isCompressed:true,channels:4},'etc2-rgb8a1unorm':{bytesPerBlock:8,blockWidth:4,blockHeight:4,isCompressed:true,channels:4},'etc2-rgb8a1unorm-srgb':{bytesPerBlock:8,blockWidth:4,blockHeight:4,isCompressed:true,channels:4},'etc2-rgba8unorm':{bytesPerBlock:16,blockWidth:4,blockHeight:4,isCompressed:true,channels:4},'etc2-rgba8unorm-srgb':{bytesPerBlock:16,blockWidth:4,blockHeight:4,isCompressed:true,channels:4},'eac-r11unorm':{bytesPerBlock:8,blockWidth:1,blockHeight:1,isCompressed:true,channels:1},'eac-r11snorm':{bytesPerBlock:8,blockWidth:1,blockHeight:1,isCompressed:true,channels:1},'eac-rg11unorm':{bytesPerBlock:16,blockWidth:1,blockHeight:1,isCompressed:true,channels:2},'eac-rg11snorm':{bytesPerBlock:16,blockWidth:1,blockHeight:1,isCompressed:true,channels:2},'astc-4x4-unorm':{bytesPerBlock:16,blockWidth:4,blockHeight:4,isCompressed:true,channels:4},'astc-4x4-unorm-srgb':{bytesPerBlock:16,blockWidth:4,blockHeight:4,isCompressed:true,channels:4},'astc-5x4-unorm':{bytesPerBlock:16,blockWidth:5,blockHeight:4,isCompressed:true,channels:4},'astc-5x4-unorm-srgb':{bytesPerBlock:16,blockWidth:5,blockHeight:4,isCompressed:true,channels:4},'astc-5x5-unorm':{bytesPerBlock:16,blockWidth:5,blockHeight:5,isCompressed:true,channels:4},'astc-5x5-unorm-srgb':{bytesPerBlock:16,blockWidth:5,blockHeight:5,isCompressed:true,channels:4},'astc-6x5-unorm':{bytesPerBlock:16,blockWidth:6,blockHeight:5,isCompressed:true,channels:4},'astc-6x5-unorm-srgb':{bytesPerBlock:16,blockWidth:6,blockHeight:5,isCompressed:true,channels:4},'astc-6x6-unorm':{bytesPerBlock:16,blockWidth:6,blockHeight:6,isCompressed:true,channels:4},'astc-6x6-unorm-srgb':{bytesPerBlock:16,blockWidth:6,blockHeight:6,isCompressed:true,channels:4},'astc-8x5-unorm':{bytesPerBlock:16,blockWidth:8,blockHeight:5,isCompressed:true,channels:4},'astc-8x5-unorm-srgb':{bytesPerBlock:16,blockWidth:8,blockHeight:5,isCompressed:true,channels:4},'astc-8x6-unorm':{bytesPerBlock:16,blockWidth:8,blockHeight:6,isCompressed:true,channels:4},'astc-8x6-unorm-srgb':{bytesPerBlock:16,blockWidth:8,blockHeight:6,isCompressed:true,channels:4},'astc-8x8-unorm':{bytesPerBlock:16,blockWidth:8,blockHeight:8,isCompressed:true,channels:4},'astc-8x8-unorm-srgb':{bytesPerBlock:16,blockWidth:8,blockHeight:8,isCompressed:true,channels:4},'astc-10x5-unorm':{bytesPerBlock:16,blockWidth:10,blockHeight:5,isCompressed:true,channels:4},'astc-10x5-unorm-srgb':{bytesPerBlock:16,blockWidth:10,blockHeight:5,isCompressed:true,channels:4},'astc-10x6-unorm':{bytesPerBlock:16,blockWidth:10,blockHeight:6,isCompressed:true,channels:4},'astc-10x6-unorm-srgb':{bytesPerBlock:16,blockWidth:10,blockHeight:6,isCompressed:true,channels:4},'astc-10x8-unorm':{bytesPerBlock:16,blockWidth:10,blockHeight:8,isCompressed:true,channels:4},'astc-10x8-unorm-srgb':{bytesPerBlock:16,blockWidth:10,blockHeight:8,isCompressed:true,channels:4},'astc-10x10-unorm':{bytesPerBlock:16,blockWidth:10,blockHeight:10,isCompressed:true,channels:4},'astc-10x10-unorm-srgb':{bytesPerBlock:16,blockWidth:10,blockHeight:10,isCompressed:true,channels:4},'astc-12x10-unorm':{bytesPerBlock:16,blockWidth:12,blockHeight:10,isCompressed:true,channels:4},'astc-12x10-unorm-srgb':{bytesPerBlock:16,blockWidth:12,blockHeight:10,isCompressed:true,channels:4},'astc-12x12-unorm':{bytesPerBlock:16,blockWidth:12,blockHeight:12,isCompressed:true,channels:4},'astc-12x12-unorm-srgb':{bytesPerBlock:16,blockWidth:12,blockHeight:12,isCompressed:true,channels:4}};class S{constructor(){this.id=S._id++,this.line=0;}get isAstNode(){return  true}get astNodeType(){return ''}search(e){e(this);}searchBlock(e,t){if(e){t(A.instance);for(const n of e)n instanceof Array?this.searchBlock(n,t):n.search(t);t(E.instance);}}constEvaluate(e,t){throw new Error('Cannot evaluate node')}constEvaluateString(e){return this.constEvaluate(e).toString()}}S._id=0;class A extends S{}A.instance=new A;class E extends S{}E.instance=new E;const $=new Set(['all','all','any','select','arrayLength','abs','acos','acosh','asin','asinh','atan','atanh','atan2','ceil','clamp','cos','cosh','countLeadingZeros','countOneBits','countTrailingZeros','cross','degrees','determinant','distance','dot','dot4U8Packed','dot4I8Packed','exp','exp2','extractBits','faceForward','firstLeadingBit','firstTrailingBit','floor','fma','fract','frexp','insertBits','inverseSqrt','ldexp','length','log','log2','max','min','mix','modf','normalize','pow','quantizeToF16','radians','reflect','refract','reverseBits','round','saturate','sign','sin','sinh','smoothStep','sqrt','step','tan','tanh','transpose','trunc','dpdx','dpdxCoarse','dpdxFine','dpdy','dpdyCoarse','dpdyFine','fwidth','fwidthCoarse','fwidthFine','textureDimensions','textureGather','textureGatherCompare','textureLoad','textureNumLayers','textureNumLevels','textureNumSamples','textureSample','textureSampleBias','textureSampleCompare','textureSampleCompareLevel','textureSampleGrad','textureSampleLevel','textureSampleBaseClampToEdge','textureStore','atomicLoad','atomicStore','atomicAdd','atomicSub','atomicMax','atomicMin','atomicAnd','atomicOr','atomicXor','atomicExchange','atomicCompareExchangeWeak','pack4x8snorm','pack4x8unorm','pack4xI8','pack4xU8','pack4x8Clamp','pack4xU8Clamp','pack2x16snorm','pack2x16unorm','pack2x16float','unpack4x8snorm','unpack4x8unorm','unpack4xI8','unpack4xU8','unpack2x16snorm','unpack2x16unorm','unpack2x16float','storageBarrier','textureBarrier','workgroupBarrier','workgroupUniformLoad','subgroupAdd','subgroupExclusiveAdd','subgroupInclusiveAdd','subgroupAll','subgroupAnd','subgroupAny','subgroupBallot','subgroupBroadcast','subgroupBroadcastFirst','subgroupElect','subgroupMax','subgroupMin','subgroupMul','subgroupExclusiveMul','subgroupInclusiveMul','subgroupOr','subgroupShuffle','subgroupShuffleDown','subgroupShuffleUp','subgroupShuffleXor','subgroupXor','quadBroadcast','quadSwapDiagonal','quadSwapX','quadSwapY']);class L extends S{constructor(){super();}}class C extends L{constructor(e,t,n,s,r,a){super(),this.calls=new Set,this.name=e,this.args=t,this.returnType=n,this.body=s,this.startLine=r,this.endLine=a;}get astNodeType(){return 'function'}search(e){if(this.attributes)for(const t of this.attributes)e(t);e(this);for(const t of this.args)e(t);this.searchBlock(this.body,e);}}class D extends L{constructor(e){super(),this.expression=e;}get astNodeType(){return 'staticAssert'}search(e){this.expression.search(e);}}class N extends L{constructor(e,t){super(),this.condition=e,this.body=t;}get astNodeType(){return 'while'}search(e){this.condition.search(e),this.searchBlock(this.body,e);}}class V extends L{constructor(e,t){super(),this.body=e,this.loopId=t;}get astNodeType(){return 'continuing'}search(e){this.searchBlock(this.body,e);}}class O extends L{constructor(e,t,n,s){super(),this.init=e,this.condition=t,this.increment=n,this.body=s;}get astNodeType(){return 'for'}search(e){var t,n,s;null===(t=this.init)||undefined===t||t.search(e),null===(n=this.condition)||undefined===n||n.search(e),null===(s=this.increment)||undefined===s||s.search(e),this.searchBlock(this.body,e);}}class B extends L{constructor(e,t,n,s,r){super(),this.attributes=null,this.name=e,this.type=t,this.storage=n,this.access=s,this.value=r;}get astNodeType(){return 'var'}search(e){var t;e(this),null===(t=this.value)||undefined===t||t.search(e);}}class F extends L{constructor(e,t,n){super(),this.attributes=null,this.name=e,this.type=t,this.value=n;}get astNodeType(){return 'override'}search(e){var t;null===(t=this.value)||undefined===t||t.search(e);}}class M extends L{constructor(e,t,n,s,r){super(),this.attributes=null,this.name=e,this.type=t,this.storage=n,this.access=s,this.value=r;}get astNodeType(){return 'let'}search(e){var t;e(this),null===(t=this.value)||undefined===t||t.search(e);}}class U extends L{constructor(e,t,n,s,r){super(),this.attributes=null,this.name=e,this.type=t,this.storage=n,this.access=s,this.value=r;}get astNodeType(){return 'const'}constEvaluate(e,t){return this.value.constEvaluate(e,t)}search(e){var t;e(this),null===(t=this.value)||undefined===t||t.search(e);}}var P,W,q,H;(e=>{e.increment='++',e.decrement='--';})(P||(P={})),(e=>{e.parse=function(t){const n=t;if('parse'==n)throw new Error('Invalid value for IncrementOperator');return e[n]};})(P||(P={}));class z extends L{constructor(e,t){super(),this.operator=e,this.variable=t;}get astNodeType(){return 'increment'}search(e){this.variable.search(e);}}(e=>{e.assign='=',e.addAssign='+=',e.subtractAssin='-=',e.multiplyAssign='*=',e.divideAssign='/=',e.moduloAssign='%=',e.andAssign='&=',e.orAssign='|=',e.xorAssign='^=',e.shiftLeftAssign='<<=',e.shiftRightAssign='>>=';})(W||(W={})),(e=>{e.parse=function(e){const t=e;if('parse'==t)throw new Error('Invalid value for AssignOperator');return t};})(W||(W={}));class R extends L{constructor(e,t,n){super(),this.operator=e,this.variable=t,this.value=n;}get astNodeType(){return 'assign'}search(e){this.variable.search(e),this.value.search(e);}}class G extends L{constructor(e,t){super(),this.name=e,this.args=t;}get astNodeType(){return 'call'}isBuiltin(){return $.has(this.name)}search(e){for(const t of this.args)t.search(e);e(this);}}class X extends L{constructor(e,t){super(),this.body=e,this.continuing=t;}get astNodeType(){return 'loop'}}class j extends L{constructor(e,t){super(),this.condition=e,this.cases=t;}get astNodeType(){return 'switch'}}class Z extends L{constructor(e,t,n,s){super(),this.condition=e,this.body=t,this.elseif=n,this.else=s;}get astNodeType(){return 'if'}search(e){this.condition.search(e),this.searchBlock(this.body,e),this.searchBlock(this.elseif,e),this.searchBlock(this.else,e);}}class Q extends L{constructor(e){super(),this.value=e;}get astNodeType(){return 'return'}search(e){var t;null===(t=this.value)||undefined===t||t.search(e);}}class Y extends L{constructor(e){super(),this.name=e;}get astNodeType(){return 'enable'}}class K extends L{constructor(e){super(),this.extensions=e;}get astNodeType(){return 'requires'}}class J extends L{constructor(e,t){super(),this.severity=e,this.rule=t;}get astNodeType(){return 'diagnostic'}}class ee extends L{constructor(e,t){super(),this.name=e,this.type=t;}get astNodeType(){return 'alias'}}class te extends L{constructor(){super();}get astNodeType(){return 'discard'}}class ne extends L{constructor(){super(),this.condition=null,this.loopId=-1;}get astNodeType(){return 'break'}}class se extends L{constructor(){super(),this.loopId=-1;}get astNodeType(){return 'continue'}}class re extends L{constructor(e){super(),this.attributes=null,this.name=e;}get astNodeType(){return 'type'}get isStruct(){return  false}get isArray(){return  false}static maxFormatType(e){let t=e[0];if('f32'===t.name)return t;for(let n=1;n<e.length;++n){const s=re._priority.get(t.name);re._priority.get(e[n].name)<s&&(t=e[n]);}return 'x32'===t.name?re.i32:t}getTypeName(){return this.name}}re.x32=new re('x32'),re.f32=new re('f32'),re.i32=new re('i32'),re.u32=new re('u32'),re.f16=new re('f16'),re.bool=new re('bool'),re.void=new re('void'),re._priority=new Map([['f32',0],['f16',1],['u32',2],['i32',3],['x32',3]]);class ae extends re{constructor(e){super(e);}}class ie extends re{constructor(e,t,n,s){super(e),this.members=t,this.startLine=n,this.endLine=s;}get astNodeType(){return 'struct'}get isStruct(){return  true}getMemberIndex(e){for(let t=0;t<this.members.length;t++)if(this.members[t].name==e)return t;return  -1}search(e){for(const t of this.members)e(t);}}class oe extends re{constructor(e,t,n){super(e),this.format=t,this.access=n;}get astNodeType(){return 'template'}getTypeName(){let e=this.name;if(null!==this.format){if('vec2'===e||'vec3'===e||'vec4'===e||'mat2x2'===e||'mat2x3'===e||'mat2x4'===e||'mat3x2'===e||'mat3x3'===e||'mat3x4'===e||'mat4x2'===e||'mat4x3'===e||'mat4x4'===e){if('f32'===this.format.name)return e+='f',e;if('i32'===this.format.name)return e+='i',e;if('u32'===this.format.name)return e+='u',e;if('bool'===this.format.name)return e+='b',e;if('f16'===this.format.name)return e+='h',e}e+=`<${this.format.name}>`;}else if('vec2'===e||'vec3'===e||'vec4'===e)return e;return e}}oe.vec2f=new oe('vec2',re.f32,null),oe.vec3f=new oe('vec3',re.f32,null),oe.vec4f=new oe('vec4',re.f32,null),oe.vec2i=new oe('vec2',re.i32,null),oe.vec3i=new oe('vec3',re.i32,null),oe.vec4i=new oe('vec4',re.i32,null),oe.vec2u=new oe('vec2',re.u32,null),oe.vec3u=new oe('vec3',re.u32,null),oe.vec4u=new oe('vec4',re.u32,null),oe.vec2h=new oe('vec2',re.f16,null),oe.vec3h=new oe('vec3',re.f16,null),oe.vec4h=new oe('vec4',re.f16,null),oe.vec2b=new oe('vec2',re.bool,null),oe.vec3b=new oe('vec3',re.bool,null),oe.vec4b=new oe('vec4',re.bool,null),oe.mat2x2f=new oe('mat2x2',re.f32,null),oe.mat2x3f=new oe('mat2x3',re.f32,null),oe.mat2x4f=new oe('mat2x4',re.f32,null),oe.mat3x2f=new oe('mat3x2',re.f32,null),oe.mat3x3f=new oe('mat3x3',re.f32,null),oe.mat3x4f=new oe('mat3x4',re.f32,null),oe.mat4x2f=new oe('mat4x2',re.f32,null),oe.mat4x3f=new oe('mat4x3',re.f32,null),oe.mat4x4f=new oe('mat4x4',re.f32,null),oe.mat2x2h=new oe('mat2x2',re.f16,null),oe.mat2x3h=new oe('mat2x3',re.f16,null),oe.mat2x4h=new oe('mat2x4',re.f16,null),oe.mat3x2h=new oe('mat3x2',re.f16,null),oe.mat3x3h=new oe('mat3x3',re.f16,null),oe.mat3x4h=new oe('mat3x4',re.f16,null),oe.mat4x2h=new oe('mat4x2',re.f16,null),oe.mat4x3h=new oe('mat4x3',re.f16,null),oe.mat4x4h=new oe('mat4x4',re.f16,null),oe.mat2x2i=new oe('mat2x2',re.i32,null),oe.mat2x3i=new oe('mat2x3',re.i32,null),oe.mat2x4i=new oe('mat2x4',re.i32,null),oe.mat3x2i=new oe('mat3x2',re.i32,null),oe.mat3x3i=new oe('mat3x3',re.i32,null),oe.mat3x4i=new oe('mat3x4',re.i32,null),oe.mat4x2i=new oe('mat4x2',re.i32,null),oe.mat4x3i=new oe('mat4x3',re.i32,null),oe.mat4x4i=new oe('mat4x4',re.i32,null),oe.mat2x2u=new oe('mat2x2',re.u32,null),oe.mat2x3u=new oe('mat2x3',re.u32,null),oe.mat2x4u=new oe('mat2x4',re.u32,null),oe.mat3x2u=new oe('mat3x2',re.u32,null),oe.mat3x3u=new oe('mat3x3',re.u32,null),oe.mat3x4u=new oe('mat3x4',re.u32,null),oe.mat4x2u=new oe('mat4x2',re.u32,null),oe.mat4x3u=new oe('mat4x3',re.u32,null),oe.mat4x4u=new oe('mat4x4',re.u32,null);class le extends re{constructor(e,t,n,s){super(e),this.storage=t,this.type=n,this.access=s;}get astNodeType(){return 'pointer'}}class ce extends re{constructor(e,t,n,s){super(e),this.attributes=t,this.format=n,this.count=s;}get astNodeType(){return 'array'}get isArray(){return  true}}class ue extends re{constructor(e,t,n){super(e),this.format=t,this.access=n;}get astNodeType(){return 'sampler'}}class he extends S{constructor(){super(),this.postfix=null;}}class fe extends he{constructor(e){super(),this.value=e;}get astNodeType(){return 'stringExpr'}toString(){return this.value}constEvaluateString(){return this.value}}class pe extends he{constructor(e,t){super(),this.type=e,this.args=t;}get astNodeType(){return 'createExpr'}search(e){if(e(this),this.args)for(const t of this.args)t.search(e);}constEvaluate(e,t){return t&&(t[0]=this.type),e.evalExpression(this,e.context)}}class de extends he{constructor(e,t){super(),this.cachedReturnValue=null,this.name=e,this.args=t;}get astNodeType(){return 'callExpr'}setCachedReturnValue(e){this.cachedReturnValue=e;}get isBuiltin(){return $.has(this.name)}constEvaluate(e,t){return e.evalExpression(this,e.context)}search(e){for(const t of this.args)t.search(e);e(this);}}class me extends he{constructor(e){super(),this.name=e;}get astNodeType(){return 'varExpr'}search(e){e(this),this.postfix&&this.postfix.search(e);}constEvaluate(e,t){return e.evalExpression(this,e.context)}}class _e extends he{constructor(e,t){super(),this.name=e,this.initializer=t;}get astNodeType(){return 'constExpr'}constEvaluate(e,t){if(this.initializer){const t=e.evalExpression(this.initializer,e.context);return null!==t&&this.postfix?t.getSubData(e,this.postfix,e.context):t}return null}search(e){this.initializer.search(e);}}class ge extends he{constructor(e,t){super(),this.value=e,this.type=t;}get astNodeType(){return 'literalExpr'}constEvaluate(e,t){return undefined!==t&&(t[0]=this.type),this.value}get isScalar(){return this.value instanceof Oe}get isVector(){return this.value instanceof Fe||this.value instanceof Me}get scalarValue(){return this.value instanceof Oe?this.value.value:(console.error('Value is not scalar.'),0)}get vectorValue(){return this.value instanceof Fe||this.value instanceof Me?this.value.data:(console.error('Value is not a vector or matrix.'),new Float32Array(0))}}class xe extends he{constructor(e,t){super(),this.type=e,this.value=t;}get astNodeType(){return 'bitcastExpr'}search(e){this.value.search(e);}}class be extends he{constructor(e){super(),this.index=e;}search(e){this.index.search(e);}}class ve extends he{constructor(){super();}}class we extends ve{constructor(e,t){super(),this.operator=e,this.right=t;}get astNodeType(){return 'unaryOp'}constEvaluate(e,t){return e.evalExpression(this,e.context)}search(e){this.right.search(e);}}class ke extends ve{constructor(e,t,n){super(),this.operator=e,this.left=t,this.right=n;}get astNodeType(){return 'binaryOp'}_getPromotedType(e,t){return e.name===t.name?e:'f32'===e.name||'f32'===t.name?re.f32:'u32'===e.name||'u32'===t.name?re.u32:re.i32}constEvaluate(e,t){return e.evalExpression(this,e.context)}search(e){this.left.search(e),this.right.search(e);}}class Ie extends S{constructor(e){super(),this.body=e;}}class Te extends he{constructor(){super();}get astNodeType(){return 'default'}}class Se extends Ie{constructor(e,t){super(t),this.selectors=e;}get astNodeType(){return 'case'}search(e){this.searchBlock(this.body,e);}}class Ae extends Ie{constructor(e){super(e);}get astNodeType(){return 'default'}search(e){this.searchBlock(this.body,e);}}class Ee extends S{constructor(e,t,n){super(),this.name=e,this.type=t,this.attributes=n;}get astNodeType(){return 'argument'}}class $e extends S{constructor(e,t){super(),this.condition=e,this.body=t;}get astNodeType(){return 'elseif'}search(e){this.condition.search(e),this.searchBlock(this.body,e);}}class Le extends S{constructor(e,t,n){super(),this.name=e,this.type=t,this.attributes=n;}get astNodeType(){return 'member'}}class Ce extends S{constructor(e,t){super(),this.name=e,this.value=t;}get astNodeType(){return 'attribute'}}class De{constructor(e,t){this.parent=null,this.typeInfo=e,this.parent=t,this.id=De._id++;}clone(){throw `Clone: Not implemented for ${this.constructor.name}`}setDataValue(e,t,n,s){console.error(`SetDataValue: Not implemented for ${this.constructor.name}`);}getSubData(e,t,n){return console.error(`GetDataValue: Not implemented for ${this.constructor.name}`),null}toString(){return `<${this.typeInfo.getTypeName()}>`}}De._id=0;class Ne extends De{constructor(){super(new e('void',null),null);}toString(){return 'void'}}Ne.void=new Ne;class Ve extends De{constructor(e){super(new r('pointer',e.typeInfo,null),null),this.reference=e;}clone(){return this}setDataValue(e,t,n,s){this.reference.setDataValue(e,t,n,s);}getSubData(e,t,n){return t?this.reference.getSubData(e,t,n):this}toString(){return `&${this.reference.toString()}`}}class Oe extends De{constructor(e,t,n=null){super(t,n),e instanceof Int32Array||e instanceof Uint32Array||e instanceof Float32Array?this.data=e:'x32'===this.typeInfo.name?e-Math.floor(e)!=0?this.data=new Float32Array([e]):this.data=e>=0?new Uint32Array([e]):new Int32Array([e]):'i32'===this.typeInfo.name||'bool'===this.typeInfo.name?this.data=new Int32Array([e]):'u32'===this.typeInfo.name?this.data=new Uint32Array([e]):'f32'===this.typeInfo.name||'f16'===this.typeInfo.name?this.data=new Float32Array([e]):console.error('ScalarData2: Invalid type',t);}clone(){if(this.data instanceof Float32Array)return new Oe(new Float32Array(this.data),this.typeInfo,null);if(this.data instanceof Int32Array)return new Oe(new Int32Array(this.data),this.typeInfo,null);if(this.data instanceof Uint32Array)return new Oe(new Uint32Array(this.data),this.typeInfo,null);throw 'ScalarData: Invalid data type'}get value(){return this.data[0]}set value(e){this.data[0]=e;}setDataValue(e,t,n,s){if(n)return void console.error('SetDataValue: Scalar data does not support postfix',n);if(!(t instanceof Oe))return void console.error('SetDataValue: Invalid value',t);let r=t.data[0];'i32'===this.typeInfo.name||'u32'===this.typeInfo.name?r=Math.floor(r):'bool'===this.typeInfo.name&&(r=r?1:0),this.data[0]=r;}getSubData(e,t,n){return t?(console.error('getSubData: Scalar data does not support postfix',t),null):this}toString(){return `${this.value}`}}function Be(e,t,n){const s=t.length;return 2===s?'f32'===n?new Fe(new Float32Array(t),e.getTypeInfo('vec2f')):'i32'===n||'bool'===n?new Fe(new Int32Array(t),e.getTypeInfo('vec2i')):'u32'===n?new Fe(new Uint32Array(t),e.getTypeInfo('vec2u')):'f16'===n?new Fe(new Float32Array(t),e.getTypeInfo('vec2h')):(console.error(`getSubData: Unknown format ${n}`),null):3===s?'f32'===n?new Fe(new Float32Array(t),e.getTypeInfo('vec3f')):'i32'===n||'bool'===n?new Fe(new Int32Array(t),e.getTypeInfo('vec3i')):'u32'===n?new Fe(new Uint32Array(t),e.getTypeInfo('vec3u')):'f16'===n?new Fe(new Float32Array(t),e.getTypeInfo('vec3h')):(console.error(`getSubData: Unknown format ${n}`),null):4===s?'f32'===n?new Fe(new Float32Array(t),e.getTypeInfo('vec4f')):'i32'===n||'bool'===n?new Fe(new Int32Array(t),e.getTypeInfo('vec4i')):'u32'===n?new Fe(new Uint32Array(t),e.getTypeInfo('vec4u')):'f16'===n?new Fe(new Float32Array(t),e.getTypeInfo('vec4h')):(console.error(`getSubData: Unknown format ${n}`),null):(console.error(`getSubData: Invalid vector size ${t.length}`),null)}class Fe extends De{constructor(e,t,n=null){if(super(t,n),e instanceof Float32Array||e instanceof Uint32Array||e instanceof Int32Array)this.data=e;else {const t=this.typeInfo.name;'vec2f'===t||'vec3f'===t||'vec4f'===t?this.data=new Float32Array(e):'vec2i'===t||'vec3i'===t||'vec4i'===t?this.data=new Int32Array(e):'vec2u'===t||'vec3u'===t||'vec4u'===t?this.data=new Uint32Array(e):'vec2h'===t||'vec3h'===t||'vec4h'===t?this.data=new Float32Array(e):'vec2b'===t||'vec3b'===t||'vec4b'===t?this.data=new Int32Array(e):'vec2'===t||'vec3'===t||'vec4'===t?this.data=new Float32Array(e):console.error(`VectorData: Invalid type ${t}`);}}clone(){if(this.data instanceof Float32Array)return new Fe(new Float32Array(this.data),this.typeInfo,null);if(this.data instanceof Int32Array)return new Fe(new Int32Array(this.data),this.typeInfo,null);if(this.data instanceof Uint32Array)return new Fe(new Uint32Array(this.data),this.typeInfo,null);throw 'VectorData: Invalid data type'}setDataValue(e,t,n,s){n instanceof fe?console.error('TODO: Set vector postfix'):t instanceof Fe?this.data=t.data:console.error('SetDataValue: Invalid value',t);}getSubData(e,t,n){if(null===t)return this;let s=e.getTypeInfo('f32');if(this.typeInfo instanceof a)s=this.typeInfo.format||s;else {const t=this.typeInfo.name;'vec2f'===t||'vec3f'===t||'vec4f'===t?s=e.getTypeInfo('f32'):'vec2i'===t||'vec3i'===t||'vec4i'===t?s=e.getTypeInfo('i32'):'vec2b'===t||'vec3b'===t||'vec4b'===t?s=e.getTypeInfo('bool'):'vec2u'===t||'vec3u'===t||'vec4u'===t?s=e.getTypeInfo('u32'):'vec2h'===t||'vec3h'===t||'vec4h'===t?s=e.getTypeInfo('f16'):console.error(`GetSubData: Unknown type ${t}`);}let r=this;for(;null!==t&&null!==r;){if(t instanceof be){const a=t.index;let i=-1;if(a instanceof ge){if(!(a.value instanceof Oe))return console.error(`GetSubData: Invalid array index ${a.value}`),null;i=a.value.value;}else {const t=e.evalExpression(a,n);if(!(t instanceof Oe))return console.error('GetSubData: Unknown index type',a),null;i=t.value;}if(i<0||i>=r.data.length)return console.error('GetSubData: Index out of range',i),null;if(r.data instanceof Float32Array){const e=new Float32Array(r.data.buffer,r.data.byteOffset+4*i,1);return new Oe(e,s)}if(r.data instanceof Int32Array){const e=new Int32Array(r.data.buffer,r.data.byteOffset+4*i,1);return new Oe(e,s)}if(r.data instanceof Uint32Array){const e=new Uint32Array(r.data.buffer,r.data.byteOffset+4*i,1);return new Oe(e,s)}throw 'GetSubData: Invalid data type'}if(!(t instanceof fe))return console.error('GetSubData: Unknown postfix',t),null;{const n=t.value.toLowerCase();if(1===n.length){let e=0;if('x'===n||'r'===n)e=0;else if('y'===n||'g'===n)e=1;else if('z'===n||'b'===n)e=2;else {if('w'!==n&&'a'!==n)return console.error(`GetSubData: Unknown member ${n}`),null;e=3;}if(this.data instanceof Float32Array){let t=new Float32Array(this.data.buffer,this.data.byteOffset+4*e,1);return new Oe(t,s,this)}if(this.data instanceof Int32Array){let t=new Int32Array(this.data.buffer,this.data.byteOffset+4*e,1);return new Oe(t,s,this)}if(this.data instanceof Uint32Array){let t=new Uint32Array(this.data.buffer,this.data.byteOffset+4*e,1);return new Oe(t,s,this)}}const a=[];for(const e of n)'x'===e||'r'===e?a.push(this.data[0]):'y'===e||'g'===e?a.push(this.data[1]):'z'===e||'b'===e?a.push(this.data[2]):'w'===e||'a'===e?a.push(this.data[3]):console.error(`GetDataValue: Unknown member ${e}`);r=Be(e,a,s.name);}t=t.postfix;}return r}toString(){let e=`${this.data[0]}`;for(let t=1;t<this.data.length;++t)e+=`, ${this.data[t]}`;return e}}class Me extends De{constructor(e,t,n=null){super(t,n),e instanceof Float32Array?this.data=e:this.data=new Float32Array(e);}clone(){return new Me(new Float32Array(this.data),this.typeInfo,null)}setDataValue(e,t,n,s){n instanceof fe?console.error('TODO: Set matrix postfix'):t instanceof Me?this.data=t.data:console.error('SetDataValue: Invalid value',t);}getSubData(e,t,n){if(null===t)return this;const s=this.typeInfo.name;if(e.getTypeInfo('f32'),this.typeInfo instanceof a)this.typeInfo.format;else if(s.endsWith('f'))e.getTypeInfo('f32');else if(s.endsWith('i'))e.getTypeInfo('i32');else if(s.endsWith('u'))e.getTypeInfo('u32');else {if(!s.endsWith('h'))return console.error(`GetDataValue: Unknown type ${s}`),null;e.getTypeInfo('f16');}if(t instanceof be){const r=t.index;let a=-1;if(r instanceof ge){if(!(r.value instanceof Oe))return console.error(`GetDataValue: Invalid array index ${r.value}`),null;a=r.value.value;}else {const t=e.evalExpression(r,n);if(!(t instanceof Oe))return console.error('GetDataValue: Unknown index type',r),null;a=t.value;}if(a<0||a>=this.data.length)return console.error('GetDataValue: Index out of range',a),null;const i=s.endsWith('h')?'h':'f';let o;if('mat2x2'===s||'mat2x2f'===s||'mat2x2h'===s||'mat3x2'===s||'mat3x2f'===s||'mat3x2h'===s||'mat4x2'===s||'mat4x2f'===s||'mat4x2h'===s)o=new Fe(new Float32Array(this.data.buffer,this.data.byteOffset+2*a*4,2),e.getTypeInfo(`vec2${i}`));else if('mat2x3'===s||'mat2x3f'===s||'mat2x3h'===s||'mat3x3'===s||'mat3x3f'===s||'mat3x3h'===s||'mat4x3'===s||'mat4x3f'===s||'mat4x3h'===s)o=new Fe(new Float32Array(this.data.buffer,this.data.byteOffset+3*a*4,3),e.getTypeInfo(`vec3${i}`));else {if('mat2x4'!==s&&'mat2x4f'!==s&&'mat2x4h'!==s&&'mat3x4'!==s&&'mat3x4f'!==s&&'mat3x4h'!==s&&'mat4x4'!==s&&'mat4x4f'!==s&&'mat4x4h'!==s)return console.error(`GetDataValue: Unknown type ${s}`),null;o=new Fe(new Float32Array(this.data.buffer,this.data.byteOffset+4*a*4,4),e.getTypeInfo(`vec4${i}`));}return t.postfix?o.getSubData(e,t.postfix,n):o}return console.error('GetDataValue: Invalid postfix',t),null}toString(){let e=`${this.data[0]}`;for(let t=1;t<this.data.length;++t)e+=`, ${this.data[t]}`;return e}}class Ue extends De{constructor(e,t,n=0,s=null){super(t,s),this.buffer=e instanceof ArrayBuffer?e:e.buffer,this.offset=n;}clone(){const e=new Uint8Array(new Uint8Array(this.buffer,this.offset,this.typeInfo.size));return new Ue(e.buffer,this.typeInfo,0,null)}setDataValue(t,r,a,i){if(null===r)return void console.log('setDataValue: NULL data.');let o=this.offset,l=this.typeInfo;for(;a;){if(a instanceof be)if(l instanceof s){const e=a.index;if(e instanceof ge){if(!(e.value instanceof Oe))return void console.error(`SetDataValue: Invalid index type ${e.value}`);o+=e.value.value*l.stride;}else {const n=t.evalExpression(e,i);if(!(n instanceof Oe))return void console.error('SetDataValue: Unknown index type',e);o+=n.value*l.stride;}l=l.format;}else console.error(`SetDataValue: Type ${l.getTypeName()} is not an array`);else {if(!(a instanceof fe))return void console.error('SetDataValue: Unknown postfix type',a);{const t=a.value;if(l instanceof n){let e=false;for(const n of l.members)if(n.name===t){o+=n.offset,l=n.type,e=true;break}if(!e)return void console.error(`SetDataValue: Member ${t} not found`)}else if(l instanceof e){const e=l.getTypeName();let n=0;if('x'===t||'r'===t)n=0;else if('y'===t||'g'===t)n=1;else if('z'===t||'b'===t)n=2;else {if('w'!==t&&'a'!==t)return void console.error(`SetDataValue: Unknown member ${t}`);n=3;}if(!(r instanceof Oe))return void console.error('SetDataValue: Invalid value',r);const s=r.value;return 'vec2f'===e?void(new Float32Array(this.buffer,o,2)[n]=s):'vec3f'===e?void(new Float32Array(this.buffer,o,3)[n]=s):'vec4f'===e?void(new Float32Array(this.buffer,o,4)[n]=s):'vec2i'===e?void(new Int32Array(this.buffer,o,2)[n]=s):'vec3i'===e?void(new Int32Array(this.buffer,o,3)[n]=s):'vec4i'===e?void(new Int32Array(this.buffer,o,4)[n]=s):'vec2u'===e?void(new Uint32Array(this.buffer,o,2)[n]=s):'vec3u'===e?void(new Uint32Array(this.buffer,o,3)[n]=s):'vec4u'===e?void(new Uint32Array(this.buffer,o,4)[n]=s):void console.error(`SetDataValue: Type ${e} is not a struct`)}}}a=a.postfix;}this.setData(t,r,l,o,i);}setData(e,t,n,s,r){const a=n.getTypeName();if('f32'!==a&&'f16'!==a)if('i32'!==a&&'atomic<i32>'!==a&&'x32'!==a)if('u32'!==a&&'atomic<u32>'!==a)if('bool'!==a)if('vec2f'!==a&&'vec2h'!==a)if('vec3f'!==a&&'vec3h'!==a)if('vec4f'!==a&&'vec4h'!==a)if('vec2i'!==a)if('vec3i'!==a)if('vec4i'!==a)if('vec2u'!==a)if('vec3u'!==a)if('vec4u'!==a)if('vec2b'!==a)if('vec3b'!==a)if('vec4b'!==a)if('mat2x2f'!==a&&'mat2x2h'!==a)if('mat2x3f'!==a&&'mat2x3h'!==a)if('mat2x4f'!==a&&'mat2x4h'!==a)if('mat3x2f'!==a&&'mat3x2h'!==a)if('mat3x3f'!==a&&'mat3x3h'!==a)if('mat3x4f'!==a&&'mat3x4h'!==a)if('mat4x2f'!==a&&'mat4x2h'!==a)if('mat4x3f'!==a&&'mat4x3h'!==a)if('mat4x4f'!==a&&'mat4x4h'!==a)if(t instanceof Ue){if(n===t.typeInfo){return void new Uint8Array(this.buffer,s,t.buffer.byteLength).set(new Uint8Array(t.buffer))}console.error('SetDataValue: Type mismatch',a,t.typeInfo.getTypeName());}else console.error(`SetData: Unknown type ${a}`);else {const e=new Float32Array(this.buffer,s,16);t instanceof Me?(e[0]=t.data[0],e[1]=t.data[1],e[2]=t.data[2],e[3]=t.data[3],e[4]=t.data[4],e[5]=t.data[5],e[6]=t.data[6],e[7]=t.data[7],e[8]=t.data[8],e[9]=t.data[9],e[10]=t.data[10],e[11]=t.data[11],e[12]=t.data[12],e[13]=t.data[13],e[14]=t.data[14],e[15]=t.data[15]):(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]);}else {const e=new Float32Array(this.buffer,s,12);t instanceof Me?(e[0]=t.data[0],e[1]=t.data[1],e[2]=t.data[2],e[3]=t.data[3],e[4]=t.data[4],e[5]=t.data[5],e[6]=t.data[6],e[7]=t.data[7],e[8]=t.data[8],e[9]=t.data[9],e[10]=t.data[10],e[11]=t.data[11]):(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11]);}else {const e=new Float32Array(this.buffer,s,8);t instanceof Me?(e[0]=t.data[0],e[1]=t.data[1],e[2]=t.data[2],e[3]=t.data[3],e[4]=t.data[4],e[5]=t.data[5],e[6]=t.data[6],e[7]=t.data[7]):(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7]);}else {const e=new Float32Array(this.buffer,s,12);t instanceof Me?(e[0]=t.data[0],e[1]=t.data[1],e[2]=t.data[2],e[3]=t.data[3],e[4]=t.data[4],e[5]=t.data[5],e[6]=t.data[6],e[7]=t.data[7],e[8]=t.data[8],e[9]=t.data[9],e[10]=t.data[10],e[11]=t.data[11]):(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11]);}else {const e=new Float32Array(this.buffer,s,9);t instanceof Me?(e[0]=t.data[0],e[1]=t.data[1],e[2]=t.data[2],e[3]=t.data[3],e[4]=t.data[4],e[5]=t.data[5],e[6]=t.data[6],e[7]=t.data[7],e[8]=t.data[8]):(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8]);}else {const e=new Float32Array(this.buffer,s,6);t instanceof Me?(e[0]=t.data[0],e[1]=t.data[1],e[2]=t.data[2],e[3]=t.data[3],e[4]=t.data[4],e[5]=t.data[5]):(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5]);}else {const e=new Float32Array(this.buffer,s,8);t instanceof Me?(e[0]=t.data[0],e[1]=t.data[1],e[2]=t.data[2],e[3]=t.data[3],e[4]=t.data[4],e[5]=t.data[5],e[6]=t.data[6],e[7]=t.data[7]):(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7]);}else {const e=new Float32Array(this.buffer,s,6);t instanceof Me?(e[0]=t.data[0],e[1]=t.data[1],e[2]=t.data[2],e[3]=t.data[3],e[4]=t.data[4],e[5]=t.data[5]):(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5]);}else {const e=new Float32Array(this.buffer,s,4);t instanceof Me?(e[0]=t.data[0],e[1]=t.data[1],e[2]=t.data[2],e[3]=t.data[3]):(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3]);}else {const e=new Uint32Array(this.buffer,s,4);t instanceof Fe?(e[0]=t.data[0],e[1]=t.data[1],e[2]=t.data[2],e[3]=t.data[3]):(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3]);}else {const e=new Uint32Array(this.buffer,s,3);t instanceof Fe?(e[0]=t.data[0],e[1]=t.data[1],e[2]=t.data[2]):(e[0]=t[0],e[1]=t[1],e[2]=t[2]);}else {const e=new Uint32Array(this.buffer,s,2);t instanceof Fe?(e[0]=t.data[0],e[1]=t.data[1]):(e[0]=t[0],e[1]=t[1]);}else {const e=new Uint32Array(this.buffer,s,4);t instanceof Fe?(e[0]=t.data[0],e[1]=t.data[1],e[2]=t.data[2],e[3]=t.data[3]):(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3]);}else {const e=new Uint32Array(this.buffer,s,3);t instanceof Fe?(e[0]=t.data[0],e[1]=t.data[1],e[2]=t.data[2]):(e[0]=t[0],e[1]=t[1],e[2]=t[2]);}else {const e=new Uint32Array(this.buffer,s,2);t instanceof Fe?(e[0]=t.data[0],e[1]=t.data[1]):(e[0]=t[0],e[1]=t[1]);}else {const e=new Int32Array(this.buffer,s,4);t instanceof Fe?(e[0]=t.data[0],e[1]=t.data[1],e[2]=t.data[2],e[3]=t.data[3]):(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3]);}else {const e=new Int32Array(this.buffer,s,3);t instanceof Fe?(e[0]=t.data[0],e[1]=t.data[1],e[2]=t.data[2]):(e[0]=t[0],e[1]=t[1],e[2]=t[2]);}else {const e=new Int32Array(this.buffer,s,2);t instanceof Fe?(e[0]=t.data[0],e[1]=t.data[1]):(e[0]=t[0],e[1]=t[1]);}else {const e=new Float32Array(this.buffer,s,4);t instanceof Fe?(e[0]=t.data[0],e[1]=t.data[1],e[2]=t.data[2],e[3]=t.data[3]):(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3]);}else {const e=new Float32Array(this.buffer,s,3);t instanceof Fe?(e[0]=t.data[0],e[1]=t.data[1],e[2]=t.data[2]):(e[0]=t[0],e[1]=t[1],e[2]=t[2]);}else {const e=new Float32Array(this.buffer,s,2);t instanceof Fe?(e[0]=t.data[0],e[1]=t.data[1]):(e[0]=t[0],e[1]=t[1]);}else t instanceof Oe&&(new Int32Array(this.buffer,s,1)[0]=t.value);else t instanceof Oe&&(new Uint32Array(this.buffer,s,1)[0]=t.value);else t instanceof Oe&&(new Int32Array(this.buffer,s,1)[0]=t.value);else t instanceof Oe&&(new Float32Array(this.buffer,s,1)[0]=t.value);}getSubData(t,r,i){var o,l,c;if(null===r)return this;let u=this.offset,h=this.typeInfo;for(;r;){if(r instanceof be){const e=r.index,n=e instanceof he?t.evalExpression(e,i):e;let a=0;if(n instanceof Oe?a=n.value:'number'==typeof n?a=n:console.error('GetDataValue: Invalid index type',e),h instanceof s)u+=a*h.stride,h=h.format;else {const e=h.getTypeName();'mat4x4'===e||'mat4x4f'===e||'mat4x4h'===e?(u+=16*a,h=t.getTypeInfo('vec4f')):console.error(`getDataValue: Type ${h.getTypeName()} is not an array`);}}else {if(!(r instanceof fe))return console.error('GetDataValue: Unknown postfix type',r),null;{const s=r.value;if(h instanceof n){let e=false;for(const t of h.members)if(t.name===s){u+=t.offset,h=t.type,e=true;break}if(!e)return console.error(`GetDataValue: Member ${s} not found`),null}else if(h instanceof e){const e=h.getTypeName();if('vec2f'===e||'vec3f'===e||'vec4f'===e||'vec2i'===e||'vec3i'===e||'vec4i'===e||'vec2u'===e||'vec3u'===e||'vec4u'===e||'vec2b'===e||'vec3b'===e||'vec4b'===e||'vec2h'===e||'vec3h'===e||'vec4h'===e||'vec2'===e||'vec3'===e||'vec4'===e){if(s.length>0&&s.length<5){let n='f';const r=[];for(let a=0;a<s.length;++a){const i=s[a].toLowerCase();let o=0;if('x'===i||'r'===i)o=0;else if('y'===i||'g'===i)o=1;else if('z'===i||'b'===i)o=2;else {if('w'!==i&&'a'!==i)return console.error(`Unknown member ${s}`),null;o=3;}if(1===s.length){if(e.endsWith('f'))return this.buffer.byteLength<u+4*o+4?(console.log('Insufficient buffer data'),null):new Oe(new Float32Array(this.buffer,u+4*o,1),t.getTypeInfo('f32'),this);if(e.endsWith('h'))return new Oe(new Float32Array(this.buffer,u+4*o,1),t.getTypeInfo('f16'),this);if(e.endsWith('i'))return new Oe(new Int32Array(this.buffer,u+4*o,1),t.getTypeInfo('i32'),this);if(e.endsWith('b'))return new Oe(new Int32Array(this.buffer,u+4*o,1),t.getTypeInfo('bool'),this);if(e.endsWith('u'))return new Oe(new Uint32Array(this.buffer,u+4*o,1),t.getTypeInfo('i32'),this)}if('vec2f'===e)r.push(new Float32Array(this.buffer,u,2)[o]);else if('vec3f'===e){if(u+12>=this.buffer.byteLength)return console.log('Insufficient buffer data'),null;const e=new Float32Array(this.buffer,u,3);r.push(e[o]);}else if('vec4f'===e)r.push(new Float32Array(this.buffer,u,4)[o]);else if('vec2i'===e)n='i',r.push(new Int32Array(this.buffer,u,2)[o]);else if('vec3i'===e)n='i',r.push(new Int32Array(this.buffer,u,3)[o]);else if('vec4i'===e)n='i',r.push(new Int32Array(this.buffer,u,4)[o]);else if('vec2u'===e){n='u';const e=new Uint32Array(this.buffer,u,2);r.push(e[o]);}else 'vec3u'===e?(n='u',r.push(new Uint32Array(this.buffer,u,3)[o])):'vec4u'===e&&(n='u',r.push(new Uint32Array(this.buffer,u,4)[o]));}return 2===r.length?h=t.getTypeInfo(`vec2${n}`):3===r.length?h=t.getTypeInfo(`vec3${n}`):4===r.length?h=t.getTypeInfo(`vec4${n}`):console.error(`GetDataValue: Invalid vector length ${r.length}`),new Fe(r,h,null)}return console.error(`GetDataValue: Unknown member ${s}`),null}return console.error(`GetDataValue: Type ${e} is not a struct`),null}}}r=r.postfix;}const f=h.getTypeName();return 'f32'===f?new Oe(new Float32Array(this.buffer,u,1),h,this):'i32'===f?new Oe(new Int32Array(this.buffer,u,1),h,this):'u32'===f?new Oe(new Uint32Array(this.buffer,u,1),h,this):'vec2f'===f?new Fe(new Float32Array(this.buffer,u,2),h,this):'vec3f'===f?new Fe(new Float32Array(this.buffer,u,3),h,this):'vec4f'===f?new Fe(new Float32Array(this.buffer,u,4),h,this):'vec2i'===f?new Fe(new Int32Array(this.buffer,u,2),h,this):'vec3i'===f?new Fe(new Int32Array(this.buffer,u,3),h,this):'vec4i'===f?new Fe(new Int32Array(this.buffer,u,4),h,this):'vec2u'===f?new Fe(new Uint32Array(this.buffer,u,2),h,this):'vec3u'===f?new Fe(new Uint32Array(this.buffer,u,3),h,this):'vec4u'===f?new Fe(new Uint32Array(this.buffer,u,4),h,this):h instanceof a&&'atomic'===h.name?'u32'===(null===(o=h.format)||undefined===o?undefined:o.name)?new Oe(new Uint32Array(this.buffer,u,1)[0],h.format,this):'i32'===(null===(l=h.format)||undefined===l?undefined:l.name)?new Oe(new Int32Array(this.buffer,u,1)[0],h.format,this):(console.error(`GetDataValue: Invalid atomic format ${null===(c=h.format)||undefined===c?undefined:c.name}`),null):new Ue(this.buffer,h,u,this)}toString(){let e='';if(this.typeInfo instanceof s)if('f32'===this.typeInfo.format.name){const t=new Float32Array(this.buffer,this.offset);e=`[${t[0]}`;for(let n=1;n<t.length;++n)e+=`, ${t[n]}`;}else if('i32'===this.typeInfo.format.name){const t=new Int32Array(this.buffer,this.offset);e=`[${t[0]}`;for(let n=1;n<t.length;++n)e+=`, ${t[n]}`;}else if('u32'===this.typeInfo.format.name){const t=new Uint32Array(this.buffer,this.offset);e=`[${t[0]}`;for(let n=1;n<t.length;++n)e+=`, ${t[n]}`;}else if('vec2f'===this.typeInfo.format.name){const t=new Float32Array(this.buffer,this.offset);e=`[${t[0]}, ${t[1]}]`;for(let n=1;n<t.length/2;++n)e+=`, [${t[2*n]}, ${t[2*n+1]}]`;}else if('vec3f'===this.typeInfo.format.name){const t=new Float32Array(this.buffer,this.offset);e=`[${t[0]}, ${t[1]}, ${t[2]}]`;for(let n=4;n<t.length;n+=4)e+=`, [${t[n]}, ${t[n+1]}, ${t[n+2]}]`;}else if('vec4f'===this.typeInfo.format.name){const t=new Float32Array(this.buffer,this.offset);e=`[${t[0]}, ${t[1]}, ${t[2]}, ${t[3]}]`;for(let n=4;n<t.length;n+=4)e+=`, [${t[n]}, ${t[n+1]}, ${t[n+2]}, ${t[n+3]}]`;}else e='[...]';else this.typeInfo instanceof n?e+='{...}':e='[...]';return e}}class Pe extends De{constructor(e,t,n,s){super(t,null),this.data=e,this.descriptor=n,this.view=s;}clone(){return new Pe(this.data,this.typeInfo,this.descriptor,this.view)}get width(){var e,t;const n=this.descriptor.size;return n instanceof Array&&n.length>0?null!==(e=n[0])&&undefined!==e?e:0:n instanceof Object&&null!==(t=n.width)&&undefined!==t?t:0}get height(){var e,t;const n=this.descriptor.size;return n instanceof Array&&n.length>1?null!==(e=n[1])&&undefined!==e?e:0:n instanceof Object&&null!==(t=n.height)&&undefined!==t?t:0}get depthOrArrayLayers(){var e,t;const n=this.descriptor.size;return n instanceof Array&&n.length>2?null!==(e=n[2])&&undefined!==e?e:0:n instanceof Object&&null!==(t=n.depthOrArrayLayers)&&undefined!==t?t:0}get format(){var e;return this.descriptor&&null!==(e=this.descriptor.format)&&undefined!==e?e:'rgba8unorm'}get sampleCount(){var e;return this.descriptor&&null!==(e=this.descriptor.sampleCount)&&undefined!==e?e:1}get mipLevelCount(){var e;return this.descriptor&&null!==(e=this.descriptor.mipLevelCount)&&undefined!==e?e:1}get dimension(){var e;return this.descriptor&&null!==(e=this.descriptor.dimension)&&undefined!==e?e:'2d'}getMipLevelSize(e){if(e>=this.mipLevelCount)return [0,0,0];const t=[this.width,this.height,this.depthOrArrayLayers];for(let n=0;n<t.length;++n)t[n]=Math.max(1,t[n]>>e);return t}get texelByteSize(){const e=this.format,t=T[e];return t?t.isDepthStencil?4:t.bytesPerBlock:0}get bytesPerRow(){return this.width*this.texelByteSize}get isDepthStencil(){const e=this.format,t=T[e];return !!t&&t.isDepthStencil}getGpuSize(){const e=this.format,t=T[e],n=this.width;if(!e||n<=0||!t)return  -1;const s=this.height,r=this.depthOrArrayLayers,a=this.dimension;return n/t.blockWidth*('1d'===a?1:s/t.blockHeight)*t.bytesPerBlock*r}getPixel(e,t,n=0,s=0){const r=this.texelByteSize,a=this.bytesPerRow,i=this.height,o=this.data[s];return w(new Uint8Array(o),e,t,n,s,i,a,r,this.format)}setPixel(e,t,n,s,r){const a=this.texelByteSize,i=this.bytesPerRow,o=this.height,l=this.data[s];!function(e,t,n,s,r,a,i,o,l,c){const u=s*(i>>=r)*(a>>=r)+n*i+t*o;switch(l){case 'r8unorm':return void I(e,u,'8unorm',1,c);case 'r8snorm':return void I(e,u,'8snorm',1,c);case 'r8uint':return void I(e,u,'8uint',1,c);case 'r8sint':return void I(e,u,'8sint',1,c);case 'rg8unorm':return void I(e,u,'8unorm',2,c);case 'rg8snorm':return void I(e,u,'8snorm',2,c);case 'rg8uint':return void I(e,u,'8uint',2,c);case 'rg8sint':return void I(e,u,'8sint',2,c);case 'rgba8unorm-srgb':case 'rgba8unorm':case 'bgra8unorm-srgb':case 'bgra8unorm':return void I(e,u,'8unorm',4,c);case 'rgba8snorm':return void I(e,u,'8snorm',4,c);case 'rgba8uint':return void I(e,u,'8uint',4,c);case 'rgba8sint':return void I(e,u,'8sint',4,c);case 'r16uint':return void I(e,u,'16uint',1,c);case 'r16sint':return void I(e,u,'16sint',1,c);case 'r16float':return void I(e,u,'16float',1,c);case 'rg16uint':return void I(e,u,'16uint',2,c);case 'rg16sint':return void I(e,u,'16sint',2,c);case 'rg16float':return void I(e,u,'16float',2,c);case 'rgba16uint':return void I(e,u,'16uint',4,c);case 'rgba16sint':return void I(e,u,'16sint',4,c);case 'rgba16float':return void I(e,u,'16float',4,c);case 'r32uint':return void I(e,u,'32uint',1,c);case 'r32sint':return void I(e,u,'32sint',1,c);case 'depth16unorm':case 'depth24plus':case 'depth24plus-stencil8':case 'depth32float':case 'depth32float-stencil8':case 'r32float':return void I(e,u,'32float',1,c);case 'rg32uint':return void I(e,u,'32uint',2,c);case 'rg32sint':return void I(e,u,'32sint',2,c);case 'rg32float':return void I(e,u,'32float',2,c);case 'rgba32uint':return void I(e,u,'32uint',4,c);case 'rgba32sint':return void I(e,u,'32sint',4,c);case 'rgba32float':return void I(e,u,'32float',4,c);case 'rg11b10ufloat':console.error('TODO: rg11b10ufloat not supported for writing');}}(new Uint8Array(l),e,t,n,s,o,i,a,this.format,r);}}(e=>{e[e.token=0]='token',e[e.keyword=1]='keyword',e[e.reserved=2]='reserved';})(H||(H={}));class We{constructor(e,t,n){this.name=e,this.type=t,this.rule=n;}toString(){return this.name}}class qe{}q=qe,qe.none=new We('',H.reserved,''),qe.eof=new We('EOF',H.token,''),qe.reserved={asm:new We('asm',H.reserved,'asm'),bf16:new We('bf16',H.reserved,'bf16'),do:new We('do',H.reserved,'do'),enum:new We('enum',H.reserved,'enum'),f16:new We('f16',H.reserved,'f16'),f64:new We('f64',H.reserved,'f64'),handle:new We('handle',H.reserved,'handle'),i8:new We('i8',H.reserved,'i8'),i16:new We('i16',H.reserved,'i16'),i64:new We('i64',H.reserved,'i64'),mat:new We('mat',H.reserved,'mat'),premerge:new We('premerge',H.reserved,'premerge'),regardless:new We('regardless',H.reserved,'regardless'),typedef:new We('typedef',H.reserved,'typedef'),u8:new We('u8',H.reserved,'u8'),u16:new We('u16',H.reserved,'u16'),u64:new We('u64',H.reserved,'u64'),unless:new We('unless',H.reserved,'unless'),using:new We('using',H.reserved,'using'),vec:new We('vec',H.reserved,'vec'),void:new We('void',H.reserved,'void')},qe.keywords={array:new We('array',H.keyword,'array'),atomic:new We('atomic',H.keyword,'atomic'),bool:new We('bool',H.keyword,'bool'),f32:new We('f32',H.keyword,'f32'),i32:new We('i32',H.keyword,'i32'),mat2x2:new We('mat2x2',H.keyword,'mat2x2'),mat2x3:new We('mat2x3',H.keyword,'mat2x3'),mat2x4:new We('mat2x4',H.keyword,'mat2x4'),mat3x2:new We('mat3x2',H.keyword,'mat3x2'),mat3x3:new We('mat3x3',H.keyword,'mat3x3'),mat3x4:new We('mat3x4',H.keyword,'mat3x4'),mat4x2:new We('mat4x2',H.keyword,'mat4x2'),mat4x3:new We('mat4x3',H.keyword,'mat4x3'),mat4x4:new We('mat4x4',H.keyword,'mat4x4'),ptr:new We('ptr',H.keyword,'ptr'),sampler:new We('sampler',H.keyword,'sampler'),sampler_comparison:new We('sampler_comparison',H.keyword,'sampler_comparison'),struct:new We('struct',H.keyword,'struct'),texture_1d:new We('texture_1d',H.keyword,'texture_1d'),texture_2d:new We('texture_2d',H.keyword,'texture_2d'),texture_2d_array:new We('texture_2d_array',H.keyword,'texture_2d_array'),texture_3d:new We('texture_3d',H.keyword,'texture_3d'),texture_cube:new We('texture_cube',H.keyword,'texture_cube'),texture_cube_array:new We('texture_cube_array',H.keyword,'texture_cube_array'),texture_multisampled_2d:new We('texture_multisampled_2d',H.keyword,'texture_multisampled_2d'),texture_storage_1d:new We('texture_storage_1d',H.keyword,'texture_storage_1d'),texture_storage_2d:new We('texture_storage_2d',H.keyword,'texture_storage_2d'),texture_storage_2d_array:new We('texture_storage_2d_array',H.keyword,'texture_storage_2d_array'),texture_storage_3d:new We('texture_storage_3d',H.keyword,'texture_storage_3d'),texture_depth_2d:new We('texture_depth_2d',H.keyword,'texture_depth_2d'),texture_depth_2d_array:new We('texture_depth_2d_array',H.keyword,'texture_depth_2d_array'),texture_depth_cube:new We('texture_depth_cube',H.keyword,'texture_depth_cube'),texture_depth_cube_array:new We('texture_depth_cube_array',H.keyword,'texture_depth_cube_array'),texture_depth_multisampled_2d:new We('texture_depth_multisampled_2d',H.keyword,'texture_depth_multisampled_2d'),texture_external:new We('texture_external',H.keyword,'texture_external'),u32:new We('u32',H.keyword,'u32'),vec2:new We('vec2',H.keyword,'vec2'),vec3:new We('vec3',H.keyword,'vec3'),vec4:new We('vec4',H.keyword,'vec4'),bitcast:new We('bitcast',H.keyword,'bitcast'),block:new We('block',H.keyword,'block'),break:new We('break',H.keyword,'break'),case:new We('case',H.keyword,'case'),continue:new We('continue',H.keyword,'continue'),continuing:new We('continuing',H.keyword,'continuing'),default:new We('default',H.keyword,'default'),diagnostic:new We('diagnostic',H.keyword,'diagnostic'),discard:new We('discard',H.keyword,'discard'),else:new We('else',H.keyword,'else'),enable:new We('enable',H.keyword,'enable'),fallthrough:new We('fallthrough',H.keyword,'fallthrough'),false:new We('false',H.keyword,'false'),fn:new We('fn',H.keyword,'fn'),for:new We('for',H.keyword,'for'),function:new We('function',H.keyword,'function'),if:new We('if',H.keyword,'if'),let:new We('let',H.keyword,'let'),const:new We('const',H.keyword,'const'),loop:new We('loop',H.keyword,'loop'),while:new We('while',H.keyword,'while'),private:new We('private',H.keyword,'private'),read:new We('read',H.keyword,'read'),read_write:new We('read_write',H.keyword,'read_write'),return:new We('return',H.keyword,'return'),requires:new We('requires',H.keyword,'requires'),storage:new We('storage',H.keyword,'storage'),switch:new We('switch',H.keyword,'switch'),true:new We('true',H.keyword,'true'),alias:new We('alias',H.keyword,'alias'),type:new We('type',H.keyword,'type'),uniform:new We('uniform',H.keyword,'uniform'),var:new We('var',H.keyword,'var'),override:new We('override',H.keyword,'override'),workgroup:new We('workgroup',H.keyword,'workgroup'),write:new We('write',H.keyword,'write'),r8unorm:new We('r8unorm',H.keyword,'r8unorm'),r8snorm:new We('r8snorm',H.keyword,'r8snorm'),r8uint:new We('r8uint',H.keyword,'r8uint'),r8sint:new We('r8sint',H.keyword,'r8sint'),r16uint:new We('r16uint',H.keyword,'r16uint'),r16sint:new We('r16sint',H.keyword,'r16sint'),r16float:new We('r16float',H.keyword,'r16float'),rg8unorm:new We('rg8unorm',H.keyword,'rg8unorm'),rg8snorm:new We('rg8snorm',H.keyword,'rg8snorm'),rg8uint:new We('rg8uint',H.keyword,'rg8uint'),rg8sint:new We('rg8sint',H.keyword,'rg8sint'),r32uint:new We('r32uint',H.keyword,'r32uint'),r32sint:new We('r32sint',H.keyword,'r32sint'),r32float:new We('r32float',H.keyword,'r32float'),rg16uint:new We('rg16uint',H.keyword,'rg16uint'),rg16sint:new We('rg16sint',H.keyword,'rg16sint'),rg16float:new We('rg16float',H.keyword,'rg16float'),rgba8unorm:new We('rgba8unorm',H.keyword,'rgba8unorm'),rgba8unorm_srgb:new We('rgba8unorm_srgb',H.keyword,'rgba8unorm_srgb'),rgba8snorm:new We('rgba8snorm',H.keyword,'rgba8snorm'),rgba8uint:new We('rgba8uint',H.keyword,'rgba8uint'),rgba8sint:new We('rgba8sint',H.keyword,'rgba8sint'),bgra8unorm:new We('bgra8unorm',H.keyword,'bgra8unorm'),bgra8unorm_srgb:new We('bgra8unorm_srgb',H.keyword,'bgra8unorm_srgb'),rgb10a2unorm:new We('rgb10a2unorm',H.keyword,'rgb10a2unorm'),rg11b10float:new We('rg11b10float',H.keyword,'rg11b10float'),rg32uint:new We('rg32uint',H.keyword,'rg32uint'),rg32sint:new We('rg32sint',H.keyword,'rg32sint'),rg32float:new We('rg32float',H.keyword,'rg32float'),rgba16uint:new We('rgba16uint',H.keyword,'rgba16uint'),rgba16sint:new We('rgba16sint',H.keyword,'rgba16sint'),rgba16float:new We('rgba16float',H.keyword,'rgba16float'),rgba32uint:new We('rgba32uint',H.keyword,'rgba32uint'),rgba32sint:new We('rgba32sint',H.keyword,'rgba32sint'),rgba32float:new We('rgba32float',H.keyword,'rgba32float'),static_assert:new We('static_assert',H.keyword,'static_assert')},qe.tokens={decimal_float_literal:new We('decimal_float_literal',H.token,/((-?[0-9]*\.[0-9]+|-?[0-9]+\.[0-9]*)((e|E)(\+|-)?[0-9]+)?[fh]?)|(-?[0-9]+(e|E)(\+|-)?[0-9]+[fh]?)|(-?[0-9]+[fh])/),hex_float_literal:new We('hex_float_literal',H.token,/-?0x((([0-9a-fA-F]*\.[0-9a-fA-F]+|[0-9a-fA-F]+\.[0-9a-fA-F]*)((p|P)(\+|-)?[0-9]+[fh]?)?)|([0-9a-fA-F]+(p|P)(\+|-)?[0-9]+[fh]?))/),int_literal:new We('int_literal',H.token,/-?0x[0-9a-fA-F]+|0i?|-?[1-9][0-9]*i?/),uint_literal:new We('uint_literal',H.token,/0x[0-9a-fA-F]+u|0u|[1-9][0-9]*u/),name:new We('name',H.token,/([_\p{XID_Start}][\p{XID_Continue}]+)|([\p{XID_Start}])/u),ident:new We('ident',H.token,/[_a-zA-Z][0-9a-zA-Z_]*/),and:new We('and',H.token,'&'),and_and:new We('and_and',H.token,'&&'),arrow:new We('arrow ',H.token,'->'),attr:new We('attr',H.token,'@'),forward_slash:new We('forward_slash',H.token,'/'),bang:new We('bang',H.token,'!'),bracket_left:new We('bracket_left',H.token,'['),bracket_right:new We('bracket_right',H.token,']'),brace_left:new We('brace_left',H.token,'{'),brace_right:new We('brace_right',H.token,'}'),colon:new We('colon',H.token,':'),comma:new We('comma',H.token,','),equal:new We('equal',H.token,'='),equal_equal:new We('equal_equal',H.token,'=='),not_equal:new We('not_equal',H.token,'!='),greater_than:new We('greater_than',H.token,'>'),greater_than_equal:new We('greater_than_equal',H.token,'>='),shift_right:new We('shift_right',H.token,'>>'),less_than:new We('less_than',H.token,'<'),less_than_equal:new We('less_than_equal',H.token,'<='),shift_left:new We('shift_left',H.token,'<<'),modulo:new We('modulo',H.token,'%'),minus:new We('minus',H.token,'-'),minus_minus:new We('minus_minus',H.token,'--'),period:new We('period',H.token,'.'),plus:new We('plus',H.token,'+'),plus_plus:new We('plus_plus',H.token,'++'),or:new We('or',H.token,'|'),or_or:new We('or_or',H.token,'||'),paren_left:new We('paren_left',H.token,'('),paren_right:new We('paren_right',H.token,')'),semicolon:new We('semicolon',H.token,';'),star:new We('star',H.token,'*'),tilde:new We('tilde',H.token,'~'),underscore:new We('underscore',H.token,'_'),xor:new We('xor',H.token,'^'),plus_equal:new We('plus_equal',H.token,'+='),minus_equal:new We('minus_equal',H.token,'-='),times_equal:new We('times_equal',H.token,'*='),division_equal:new We('division_equal',H.token,'/='),modulo_equal:new We('modulo_equal',H.token,'%='),and_equal:new We('and_equal',H.token,'&='),or_equal:new We('or_equal',H.token,'|='),xor_equal:new We('xor_equal',H.token,'^='),shift_right_equal:new We('shift_right_equal',H.token,'>>='),shift_left_equal:new We('shift_left_equal',H.token,'<<=')},qe.simpleTokens={'@':q.tokens.attr,'{':q.tokens.brace_left,'}':q.tokens.brace_right,':':q.tokens.colon,',':q.tokens.comma,'(':q.tokens.paren_left,')':q.tokens.paren_right,';':q.tokens.semicolon},qe.literalTokens={'&':q.tokens.and,'&&':q.tokens.and_and,'->':q.tokens.arrow,'/':q.tokens.forward_slash,'!':q.tokens.bang,'[':q.tokens.bracket_left,']':q.tokens.bracket_right,'=':q.tokens.equal,'==':q.tokens.equal_equal,'!=':q.tokens.not_equal,'>':q.tokens.greater_than,'>=':q.tokens.greater_than_equal,'>>':q.tokens.shift_right,'<':q.tokens.less_than,'<=':q.tokens.less_than_equal,'<<':q.tokens.shift_left,'%':q.tokens.modulo,'-':q.tokens.minus,'--':q.tokens.minus_minus,'.':q.tokens.period,'+':q.tokens.plus,'++':q.tokens.plus_plus,'|':q.tokens.or,'||':q.tokens.or_or,'*':q.tokens.star,'~':q.tokens.tilde,_:q.tokens.underscore,'^':q.tokens.xor,'+=':q.tokens.plus_equal,'-=':q.tokens.minus_equal,'*=':q.tokens.times_equal,'/=':q.tokens.division_equal,'%=':q.tokens.modulo_equal,'&=':q.tokens.and_equal,'|=':q.tokens.or_equal,'^=':q.tokens.xor_equal,'>>=':q.tokens.shift_right_equal,'<<=':q.tokens.shift_left_equal},qe.regexTokens={decimal_float_literal:q.tokens.decimal_float_literal,hex_float_literal:q.tokens.hex_float_literal,int_literal:q.tokens.int_literal,uint_literal:q.tokens.uint_literal,ident:q.tokens.ident},qe.storage_class=[q.keywords.function,q.keywords.private,q.keywords.workgroup,q.keywords.uniform,q.keywords.storage],qe.access_mode=[q.keywords.read,q.keywords.write,q.keywords.read_write],qe.sampler_type=[q.keywords.sampler,q.keywords.sampler_comparison],qe.sampled_texture_type=[q.keywords.texture_1d,q.keywords.texture_2d,q.keywords.texture_2d_array,q.keywords.texture_3d,q.keywords.texture_cube,q.keywords.texture_cube_array],qe.multisampled_texture_type=[q.keywords.texture_multisampled_2d],qe.storage_texture_type=[q.keywords.texture_storage_1d,q.keywords.texture_storage_2d,q.keywords.texture_storage_2d_array,q.keywords.texture_storage_3d],qe.depth_texture_type=[q.keywords.texture_depth_2d,q.keywords.texture_depth_2d_array,q.keywords.texture_depth_cube,q.keywords.texture_depth_cube_array,q.keywords.texture_depth_multisampled_2d],qe.texture_external_type=[q.keywords.texture_external],qe.any_texture_type=[...q.sampled_texture_type,...q.multisampled_texture_type,...q.storage_texture_type,...q.depth_texture_type,...q.texture_external_type],qe.texel_format=[q.keywords.r8unorm,q.keywords.r8snorm,q.keywords.r8uint,q.keywords.r8sint,q.keywords.r16uint,q.keywords.r16sint,q.keywords.r16float,q.keywords.rg8unorm,q.keywords.rg8snorm,q.keywords.rg8uint,q.keywords.rg8sint,q.keywords.r32uint,q.keywords.r32sint,q.keywords.r32float,q.keywords.rg16uint,q.keywords.rg16sint,q.keywords.rg16float,q.keywords.rgba8unorm,q.keywords.rgba8unorm_srgb,q.keywords.rgba8snorm,q.keywords.rgba8uint,q.keywords.rgba8sint,q.keywords.bgra8unorm,q.keywords.bgra8unorm_srgb,q.keywords.rgb10a2unorm,q.keywords.rg11b10float,q.keywords.rg32uint,q.keywords.rg32sint,q.keywords.rg32float,q.keywords.rgba16uint,q.keywords.rgba16sint,q.keywords.rgba16float,q.keywords.rgba32uint,q.keywords.rgba32sint,q.keywords.rgba32float],qe.const_literal=[q.tokens.int_literal,q.tokens.uint_literal,q.tokens.decimal_float_literal,q.tokens.hex_float_literal,q.keywords.true,q.keywords.false],qe.literal_or_ident=[q.tokens.ident,q.tokens.int_literal,q.tokens.uint_literal,q.tokens.decimal_float_literal,q.tokens.hex_float_literal,q.tokens.name],qe.element_count_expression=[q.tokens.int_literal,q.tokens.uint_literal,q.tokens.ident],qe.template_types=[q.keywords.vec2,q.keywords.vec3,q.keywords.vec4,q.keywords.mat2x2,q.keywords.mat2x3,q.keywords.mat2x4,q.keywords.mat3x2,q.keywords.mat3x3,q.keywords.mat3x4,q.keywords.mat4x2,q.keywords.mat4x3,q.keywords.mat4x4,q.keywords.atomic,q.keywords.bitcast,...q.any_texture_type],qe.attribute_name=[q.tokens.ident,q.keywords.block,q.keywords.diagnostic],qe.assignment_operators=[q.tokens.equal,q.tokens.plus_equal,q.tokens.minus_equal,q.tokens.times_equal,q.tokens.division_equal,q.tokens.modulo_equal,q.tokens.and_equal,q.tokens.or_equal,q.tokens.xor_equal,q.tokens.shift_right_equal,q.tokens.shift_left_equal],qe.increment_operators=[q.tokens.plus_plus,q.tokens.minus_minus];class He{constructor(e,t,n,s,r){this.type=e,this.lexeme=t,this.line=n,this.start=s,this.end=r;}toString(){return this.lexeme}isTemplateType(){return  -1!=qe.template_types.indexOf(this.type)}isArrayType(){return this.type==qe.keywords.array}isArrayOrTemplateType(){return this.isArrayType()||this.isTemplateType()}}class ze{constructor(e){this._tokens=[],this._start=0,this._current=0,this._line=1,this._source=null!=e?e:'';}scanTokens(){for(;!this._isAtEnd();)if(this._start=this._current,!this.scanToken())throw `Invalid syntax at line ${this._line}`;return this._tokens.push(new He(qe.eof,'',this._line,this._current,this._current)),this._tokens}scanToken(){let e=this._advance();if('\n'==e)return this._line++,true;if(this._isWhitespace(e))return  true;if('/'==e){if('/'==this._peekAhead()){for(;'\n'!=e;){if(this._isAtEnd())return  true;e=this._advance();}return this._line++,true}if('*'==this._peekAhead()){this._advance();let t=1;for(;t>0;){if(this._isAtEnd())return  true;if(e=this._advance(),'\n'==e)this._line++;else if('*'==e){if('/'==this._peekAhead()&&(this._advance(),t--,0==t))return  true}else '/'==e&&'*'==this._peekAhead()&&(this._advance(),t++);}return  true}}const t=qe.simpleTokens[e];if(t)return this._addToken(t),true;let n=qe.none;const s=this._isAlpha(e),r='_'===e;if(this._isAlphaNumeric(e)){let t=this._peekAhead();for(;this._isAlphaNumeric(t);)e+=this._advance(),t=this._peekAhead();}if(s){const t=qe.keywords[e];if(t)return this._addToken(t),true}if(s||r)return this._addToken(qe.tokens.ident),true;for(;;){let t=this._findType(e);const s=this._peekAhead();if('-'==e&&this._tokens.length>0){if('='==s)return this._current++,e+=s,this._addToken(qe.tokens.minus_equal),true;if('-'==s)return this._current++,e+=s,this._addToken(qe.tokens.minus_minus),true;const n=this._tokens.length-1;if((-1!=qe.literal_or_ident.indexOf(this._tokens[n].type)||this._tokens[n].type==qe.tokens.paren_right)&&'>'!=s)return this._addToken(t),true}if('>'==e&&('>'==s||'='==s)){let e=false,n=this._tokens.length-1;for(let t=0;t<5&&n>=0&&-1===qe.assignment_operators.indexOf(this._tokens[n].type);++t,--n)if(this._tokens[n].type===qe.tokens.less_than){n>0&&this._tokens[n-1].isArrayOrTemplateType()&&(e=true);break}if(e)return this._addToken(t),true}if(t===qe.none){let s=e,r=0;const a=2;for(let e=0;e<a;++e)if(s+=this._peekAhead(e),t=this._findType(s),t!==qe.none){r=e;break}if(t===qe.none)return n!==qe.none&&(this._current--,this._addToken(n),true);e=s,this._current+=r+1;}if(n=t,this._isAtEnd())break;e+=this._advance();}return n!==qe.none&&(this._addToken(n),true)}_findType(e){for(const t in qe.regexTokens){const n=qe.regexTokens[t];if(this._match(e,n.rule))return n}const t=qe.literalTokens[e];return t||qe.none}_match(e,t){const n=t.exec(e);return n&&0==n.index&&n[0]==e}_isAtEnd(){return this._current>=this._source.length}_isAlpha(e){return !this._isNumeric(e)&&!this._isWhitespace(e)&&'_'!==e&&'.'!==e&&'('!==e&&')'!==e&&'['!==e&&']'!==e&&'{'!==e&&'}'!==e&&','!==e&&';'!==e&&':'!==e&&'='!==e&&'!'!==e&&'<'!==e&&'>'!==e&&'+'!==e&&'-'!==e&&'*'!==e&&'/'!==e&&'%'!==e&&'&'!==e&&'|'!==e&&'^'!==e&&'~'!==e&&'@'!==e&&'#'!==e&&'?'!==e&&'\''!==e&&'`'!==e&&'"'!==e&&'\\'!==e&&'\n'!==e&&'\r'!==e&&'\t'!==e&&'\0'!==e}_isNumeric(e){return e>='0'&&e<='9'}_isAlphaNumeric(e){return this._isAlpha(e)||this._isNumeric(e)||'_'===e}_isWhitespace(e){return ' '==e||'\t'==e||'\r'==e}_advance(e=0){let t=this._source[this._current];return e=e||0,e++,this._current+=e,t}_peekAhead(e=0){return e=e||0,this._current+e>=this._source.length?'\0':this._source[this._current+e]}_addToken(e){const t=this._source.substring(this._start,this._current);this._tokens.push(new He(e,t,this._line,this._start,this._current));}}function Re(e){return Array.isArray(e)||(null==e?undefined:e.buffer)instanceof ArrayBuffer}const Ge=new Float32Array(1),Xe=new Uint32Array(Ge.buffer),je=new Uint32Array(Ge.buffer),Ze=new Int32Array(1),Qe=new Float32Array(Ze.buffer),Ye=new Uint32Array(Ze.buffer),Ke=new Uint32Array(1),Je=new Float32Array(Ke.buffer),et=new Int32Array(Ke.buffer);function tt(e,t,n){if(t===n)return e;if('f32'===t){if('i32'===n||'x32'===n)return Ge[0]=e,Xe[0];if('u32'===n)return Ge[0]=e,je[0]}else if('i32'===t||'x32'===t){if('f32'===n)return Ze[0]=e,Qe[0];if('u32'===n)return Ze[0]=e,Ye[0]}else if('u32'===t){if('f32'===n)return Ke[0]=e,Je[0];if('i32'===n||'x32'===n)return Ke[0]=e,et[0]}return console.error(`Unsupported cast from ${t} to ${n}`),e}class nt{constructor(e){this.resources=null,this.inUse=false,this.info=null,this.node=e;}}class st{constructor(e,t){this.align=e,this.size=t;}}class rt{constructor(){this.uniforms=[],this.storage=[],this.textures=[],this.samplers=[],this.aliases=[],this.overrides=[],this.structs=[],this.entry=new d,this.functions=[],this._types=new Map,this._functions=new Map;}_isStorageTexture(e){return 'texture_storage_1d'==e.name||'texture_storage_2d'==e.name||'texture_storage_2d_array'==e.name||'texture_storage_3d'==e.name}updateAST(e){for(const t of e)t instanceof C&&this._functions.set(t.name,new nt(t));for(const t of e)if(t instanceof ie){const e=this.getTypeInfo(t,null);e instanceof n&&this.structs.push(e);}for(const t of e)if(t instanceof ee)this.aliases.push(this._getAliasInfo(t));else if(t instanceof F){const e=t,n=this._getAttributeNum(e.attributes,'id',0),s=null!=e.type?this.getTypeInfo(e.type,e.attributes):null;this.overrides.push(new h(e.name,s,e.attributes,n));}else if(this._isUniformVar(t)){const e=t,n=this._getAttributeNum(e.attributes,'group',0),s=this._getAttributeNum(e.attributes,'binding',0),r=this.getTypeInfo(e.type,e.attributes),a=new o(e.name,r,n,s,e.attributes,i.Uniform,e.access);a.access||(a.access='read'),this.uniforms.push(a);}else if(this._isStorageVar(t)){const e=t,n=this._getAttributeNum(e.attributes,'group',0),s=this._getAttributeNum(e.attributes,'binding',0),r=this.getTypeInfo(e.type,e.attributes),a=this._isStorageTexture(r),l=new o(e.name,r,n,s,e.attributes,a?i.StorageTexture:i.Storage,e.access);l.access||(l.access='read'),this.storage.push(l);}else if(this._isTextureVar(t)){const e=t,n=this._getAttributeNum(e.attributes,'group',0),s=this._getAttributeNum(e.attributes,'binding',0),r=this.getTypeInfo(e.type,e.attributes),a=this._isStorageTexture(r),l=new o(e.name,r,n,s,e.attributes,a?i.StorageTexture:i.Texture,e.access);l.access||(l.access='read'),a?this.storage.push(l):this.textures.push(l);}else if(this._isSamplerVar(t)){const e=t,n=this._getAttributeNum(e.attributes,'group',0),s=this._getAttributeNum(e.attributes,'binding',0),r=this.getTypeInfo(e.type,e.attributes),a=new o(e.name,r,n,s,e.attributes,i.Sampler,e.access);this.samplers.push(a);}else;for(const t of e)if(t instanceof C){const e=this._getAttribute(t,'vertex'),n=this._getAttribute(t,'fragment'),s=this._getAttribute(t,'compute'),r=e||n||s,a=new p(t.name,null==r?undefined:r.name,t.attributes);a.attributes=t.attributes,a.startLine=t.startLine,a.endLine=t.endLine,this.functions.push(a),this._functions.get(t.name).info=a,r&&(this._functions.get(t.name).inUse=true,a.inUse=true,a.resources=this._findResources(t,!!r),a.inputs=this._getInputs(t.args),a.outputs=this._getOutputs(t.returnType),this.entry[r.name].push(a)),a.arguments=t.args.map((e=>new f(e.name,this.getTypeInfo(e.type,e.attributes),e.attributes))),a.returnType=t.returnType?this.getTypeInfo(t.returnType,t.attributes):null;}for(const e of this._functions.values())e.info&&(e.info.inUse=e.inUse,this._addCalls(e.node,e.info.calls));for(const e of this._functions.values())e.node.search((t=>{var n,s,r;if(t instanceof Ce){if(t.value)if(Re(t.value))for(const s of t.value)for(const t of this.overrides)s===t.name&&(null===(n=e.info)||undefined===n||n.overrides.push(t));else for(const n of this.overrides)t.value===n.name&&(null===(s=e.info)||undefined===s||s.overrides.push(n));}else if(t instanceof me)for(const n of this.overrides)t.name===n.name&&(null===(r=e.info)||undefined===r||r.overrides.push(n));}));for(const e of this.uniforms)this._markStructsInUse(e.type);for(const e of this.storage)this._markStructsInUse(e.type);}getStructInfo(e){for(const t of this.structs)if(t.name==e)return t;return null}getOverrideInfo(e){for(const t of this.overrides)if(t.name==e)return t;return null}_markStructsInUse(e){if(e)if(e.isStruct){if(e.inUse=true,e.members)for(const t of e.members)this._markStructsInUse(t.type);}else if(e.isArray)this._markStructsInUse(e.format);else if(e.isTemplate)e.format&&this._markStructsInUse(e.format);else {const t=this._getAlias(e.name);t&&this._markStructsInUse(t);}}_addCalls(e,t){var n;for(const s of e.calls){const e=null===(n=this._functions.get(s.name))||undefined===n?undefined:n.info;e&&t.add(e);}}findResource(e,t,n){if(n){for(const s of this.entry.compute)if(s.name===n)for(const n of s.resources)if(n.group==e&&n.binding==t)return n;for(const s of this.entry.vertex)if(s.name===n)for(const n of s.resources)if(n.group==e&&n.binding==t)return n;for(const s of this.entry.fragment)if(s.name===n)for(const n of s.resources)if(n.group==e&&n.binding==t)return n}for(const n of this.uniforms)if(n.group==e&&n.binding==t)return n;for(const n of this.storage)if(n.group==e&&n.binding==t)return n;for(const n of this.textures)if(n.group==e&&n.binding==t)return n;for(const n of this.samplers)if(n.group==e&&n.binding==t)return n;return null}_findResource(e){for(const t of this.uniforms)if(t.name==e)return t;for(const t of this.storage)if(t.name==e)return t;for(const t of this.textures)if(t.name==e)return t;for(const t of this.samplers)if(t.name==e)return t;return null}_markStructsFromAST(e){const t=this.getTypeInfo(e,null);this._markStructsInUse(t);}_findResources(e,t){const n=[],s=this,r=[];return e.search((a=>{if(a instanceof A)r.push({});else if(a instanceof E)r.pop();else if(a instanceof B){const e=a;t&&null!==e.type&&this._markStructsFromAST(e.type),r.length>0&&(r[r.length-1][e.name]=e);}else if(a instanceof pe){const e=a;t&&null!==e.type&&this._markStructsFromAST(e.type);}else if(a instanceof M){const e=a;t&&null!==e.type&&this._markStructsFromAST(e.type),r.length>0&&(r[r.length-1][e.name]=e);}else if(a instanceof me){const e=a;if(r.length>0){if(r[r.length-1][e.name])return}const t=s._findResource(e.name);t&&n.push(t);}else if(a instanceof de){const r=a,i=s._functions.get(r.name);i&&(t&&(i.inUse=true),e.calls.add(i.node),null===i.resources&&(i.resources=s._findResources(i.node,t)),n.push(...i.resources));}else if(a instanceof G){const r=a,i=s._functions.get(r.name);i&&(t&&(i.inUse=true),e.calls.add(i.node),null===i.resources&&(i.resources=s._findResources(i.node,t)),n.push(...i.resources));}})),[...new Map(n.map((e=>[e.name,e]))).values()]}getBindGroups(){const e=[];function t(t,n){t>=e.length&&(e.length=t+1),undefined===e[t]&&(e[t]=[]),n>=e[t].length&&(e[t].length=n+1);}for(const n of this.uniforms){t(n.group,n.binding);e[n.group][n.binding]=n;}for(const n of this.storage){t(n.group,n.binding);e[n.group][n.binding]=n;}for(const n of this.textures){t(n.group,n.binding);e[n.group][n.binding]=n;}for(const n of this.samplers){t(n.group,n.binding);e[n.group][n.binding]=n;}return e}_getOutputs(e,t=undefined){if(undefined===t&&(t=[]),e instanceof ie)this._getStructOutputs(e,t);else {const n=this._getOutputInfo(e);null!==n&&t.push(n);}return t}_getStructOutputs(e,t){for(const n of e.members)if(n.type instanceof ie)this._getStructOutputs(n.type,t);else {const e=this._getAttribute(n,'location')||this._getAttribute(n,'builtin');if(null!==e){const s=this.getTypeInfo(n.type,n.type.attributes),r=this._parseInt(e.value),a=new u(n.name,s,e.name,r);t.push(a);}}}_getOutputInfo(e){const t=this._getAttribute(e,'location')||this._getAttribute(e,'builtin');if(null!==t){const n=this.getTypeInfo(e,e.attributes),s=this._parseInt(t.value);return new u('',n,t.name,s)}return null}_getInputs(e,t=undefined){ undefined===t&&(t=[]);for(const n of e)if(n.type instanceof ie)this._getStructInputs(n.type,t);else {const e=this._getInputInfo(n);null!==e&&t.push(e);}return t}_getStructInputs(e,t){for(const n of e.members)if(n.type instanceof ie)this._getStructInputs(n.type,t);else {const e=this._getInputInfo(n);null!==e&&t.push(e);}}_getInputInfo(e){const t=this._getAttribute(e,'location')||this._getAttribute(e,'builtin');if(null!==t){const n=this._getAttribute(e,'interpolation'),s=this.getTypeInfo(e.type,e.attributes),r=this._parseInt(t.value),a=new c(e.name,s,t.name,r);return null!==n&&(a.interpolation=this._parseString(n.value)),a}return null}_parseString(e){return e instanceof Array&&(e=e[0]),e}_parseInt(e){e instanceof Array&&(e=e[0]);const t=parseInt(e);return isNaN(t)?e:t}_getAlias(e){for(const t of this.aliases)if(t.name==e)return t.type;return null}_getAliasInfo(e){return new l(e.name,this.getTypeInfo(e.type,null))}getTypeInfoByName(e){for(const t of this.structs)if(t.name==e)return t;for(const t of this.aliases)if(t.name==e)return t.type;return null}getTypeInfo(i,o=null){if(this._types.has(i))return this._types.get(i);if(i instanceof le){const e=i.type?this.getTypeInfo(i.type,i.attributes):null,t=new r(i.name,e,o);return this._types.set(i,t),this._updateTypeInfo(t),t}if(i instanceof ce){const e=i,t=e.format?this.getTypeInfo(e.format,e.attributes):null,n=new s(e.name,o);return n.format=t,n.count=e.count,this._types.set(i,n),this._updateTypeInfo(n),n}if(i instanceof ie){const e=i,s=new n(e.name,o);s.startLine=e.startLine,s.endLine=e.endLine;for(const n of e.members){const e=this.getTypeInfo(n.type,n.attributes);s.members.push(new t(n.name,e,n.attributes));}return this._types.set(i,s),this._updateTypeInfo(s),s}if(i instanceof ue){const t=i,n=t.format instanceof re,s=t.format?n?this.getTypeInfo(t.format,null):new e(t.format,null):null,r=new a(t.name,s,o,t.access);return this._types.set(i,r),this._updateTypeInfo(r),r}if(i instanceof oe){const e=i,t=e.format?this.getTypeInfo(e.format,null):null,n=new a(e.name,t,o,e.access);return this._types.set(i,n),this._updateTypeInfo(n),n}const l=new e(i.name,o);return this._types.set(i,l),this._updateTypeInfo(l),l}_updateTypeInfo(e){var t,a,i;const o=this._getTypeSize(e);if(e.size=null!==(t=null==o?undefined:o.size)&&undefined!==t?t:0,e instanceof s&&e.format){const t=this._getTypeSize(e.format);e.stride=Math.max(null!==(a=null==t?undefined:t.size)&&undefined!==a?a:0,null!==(i=null==t?undefined:t.align)&&undefined!==i?i:0),this._updateTypeInfo(e.format);}e instanceof r&&this._updateTypeInfo(e.format),e instanceof n&&this._updateStructInfo(e);}_updateStructInfo(e){var t;let n=0,s=0,r=0,a=0;for(let i=0,o=e.members.length;i<o;++i){const o=e.members[i],l=this._getTypeSize(o);if(!l)continue;null!==(t=this._getAlias(o.type.name))&&undefined!==t||o.type;const c=l.align,u=l.size;n=this._roundUp(c,n+s),s=u,r=n,a=Math.max(a,c),o.offset=n,o.size=u,this._updateTypeInfo(o.type);}e.size=this._roundUp(a,r+s),e.align=a;}_getTypeSize(r){var a,i;if(null==r)return null;const o=this._getAttributeNum(r.attributes,'size',0),l=this._getAttributeNum(r.attributes,'align',0);if(r instanceof t&&(r=r.type),r instanceof e){const e=this._getAlias(r.name);null!==e&&(r=e);}{const e=rt._typeInfo[r.name];if(undefined!==e){const t='f16'===(null===(a=r.format)||undefined===a?undefined:a.name)?2:1;return new st(Math.max(l,e.align/t),Math.max(o,e.size/t))}}{const e=rt._typeInfo[r.name.substring(0,r.name.length-1)];if(e){const t='h'===r.name[r.name.length-1]?2:1;return new st(Math.max(l,e.align/t),Math.max(o,e.size/t))}}if(r instanceof s){let e=r,t=8,n=8;const s=this._getTypeSize(e.format);null!==s&&(n=s.size,t=s.align);return n=e.count*this._getAttributeNum(null!==(i=null==r?undefined:r.attributes)&&undefined!==i?i:null,'stride',this._roundUp(t,n)),o&&(n=o),new st(Math.max(l,t),Math.max(o,n))}if(r instanceof n){let e=0,t=0,n=0,s=0,a=0;for(const t of r.members){const r=this._getTypeSize(t.type);null!==r&&(e=Math.max(r.align,e),n=this._roundUp(r.align,n+s),s=r.size,a=n);}return t=this._roundUp(e,a+s),new st(Math.max(l,e),Math.max(o,t))}return null}_isUniformVar(e){return e instanceof B&&'uniform'==e.storage}_isStorageVar(e){return e instanceof B&&'storage'==e.storage}_isTextureVar(e){return e instanceof B&&null!==e.type&&-1!=rt._textureTypes.indexOf(e.type.name)}_isSamplerVar(e){return e instanceof B&&null!==e.type&&-1!=rt._samplerTypes.indexOf(e.type.name)}_getAttribute(e,t){const n=e;if(!n||!n.attributes)return null;const s=n.attributes;for(let e of s)if(e.name==t)return e;return null}_getAttributeNum(e,t,n){if(null===e)return n;for(let s of e)if(s.name==t){let e=null!==s&&null!==s.value?s.value:n;return e instanceof Array&&(e=e[0]),'number'==typeof e?e:'string'==typeof e?parseInt(e):n}return n}_roundUp(e,t){return Math.ceil(t/e)*e}}rt._typeInfo={f16:{align:2,size:2},i32:{align:4,size:4},u32:{align:4,size:4},f32:{align:4,size:4},atomic:{align:4,size:4},vec2:{align:8,size:8},vec3:{align:16,size:12},vec4:{align:16,size:16},mat2x2:{align:8,size:16},mat3x2:{align:8,size:24},mat4x2:{align:8,size:32},mat2x3:{align:16,size:32},mat3x3:{align:16,size:48},mat4x3:{align:16,size:64},mat2x4:{align:16,size:32},mat3x4:{align:16,size:48},mat4x4:{align:16,size:64}},rt._textureTypes=qe.any_texture_type.map((e=>e.name)),rt._samplerTypes=qe.sampler_type.map((e=>e.name));let at=0;class it{constructor(e,t,n){this.id=at++,this.name=e,this.value=t,this.node=n;}clone(){return new it(this.name,this.value,this.node)}}class ot{constructor(e){this.id=at++,this.name=e.name,this.node=e;}clone(){return new ot(this.node)}}class lt{constructor(e){this.parent=null,this.variables=new Map,this.functions=new Map,this.currentFunctionName='',this.id=at++,e&&(this.parent=e,this.currentFunctionName=e.currentFunctionName);}getVariable(e){var t;return this.variables.has(e)?null!==(t=this.variables.get(e))&&undefined!==t?t:null:this.parent?this.parent.getVariable(e):null}getFunction(e){var t;return this.functions.has(e)?null!==(t=this.functions.get(e))&&undefined!==t?t:null:this.parent?this.parent.getFunction(e):null}createVariable(e,t,n){this.variables.set(e,new it(e,t,null!=n?n:null));}setVariable(e,t,n){const s=this.getVariable(e);null!==s?s.value=t:this.createVariable(e,t,n);}getVariableValue(e){var t;const n=this.getVariable(e);return null!==(t=null==n?undefined:n.value)&&undefined!==t?t:null}clone(){return new lt(this)}}class ct{evalExpression(e,t){return null}getTypeInfo(e){return null}getVariableName(e,t){return ''}}class ut{constructor(e){this.exec=e;}getTypeInfo(e){return this.exec.getTypeInfo(e)}All(e,t){const n=this.exec.evalExpression(e.args[0],t);let s=true;if(n instanceof Fe)return n.data.forEach((e=>{e||(s=false);})),new Oe(s?1:0,this.getTypeInfo('bool'));throw new Error(`All() expects a vector argument. Line ${e.line}`)}Any(e,t){const n=this.exec.evalExpression(e.args[0],t);if(n instanceof Fe){const e=n.data.some((e=>e));return new Oe(e?1:0,this.getTypeInfo('bool'))}throw new Error(`Any() expects a vector argument. Line ${e.line}`)}Select(e,t){const n=this.exec.evalExpression(e.args[2],t);if(!(n instanceof Oe))throw new Error(`Select() expects a bool condition. Line ${e.line}`);return n.value?this.exec.evalExpression(e.args[1],t):this.exec.evalExpression(e.args[0],t)}ArrayLength(e,t){let n=e.args[0];n instanceof we&&(n=n.right);const s=this.exec.evalExpression(n,t);if(s instanceof Ue&&0===s.typeInfo.size){const e=s.typeInfo,t=s.buffer.byteLength/e.stride;return new Oe(t,this.getTypeInfo('u32'))}return new Oe(s.typeInfo.size,this.getTypeInfo('u32'))}Abs(e,t){const n=this.exec.evalExpression(e.args[0],t);if(n instanceof Fe)return new Fe(n.data.map((e=>Math.abs(e))),n.typeInfo);const s=n;return new Oe(Math.abs(s.value),s.typeInfo)}Acos(e,t){const n=this.exec.evalExpression(e.args[0],t);if(n instanceof Fe)return new Fe(n.data.map((e=>Math.acos(e))),n.typeInfo);const s=n;return new Oe(Math.acos(s.value),n.typeInfo)}Acosh(e,t){const n=this.exec.evalExpression(e.args[0],t);if(n instanceof Fe)return new Fe(n.data.map((e=>Math.acosh(e))),n.typeInfo);const s=n;return new Oe(Math.acosh(s.value),n.typeInfo)}Asin(e,t){const n=this.exec.evalExpression(e.args[0],t);if(n instanceof Fe)return new Fe(n.data.map((e=>Math.asin(e))),n.typeInfo);const s=n;return new Oe(Math.asin(s.value),n.typeInfo)}Asinh(e,t){const n=this.exec.evalExpression(e.args[0],t);if(n instanceof Fe)return new Fe(n.data.map((e=>Math.asinh(e))),n.typeInfo);const s=n;return new Oe(Math.asinh(s.value),n.typeInfo)}Atan(e,t){const n=this.exec.evalExpression(e.args[0],t);if(n instanceof Fe)return new Fe(n.data.map((e=>Math.atan(e))),n.typeInfo);const s=n;return new Oe(Math.atan(s.value),n.typeInfo)}Atanh(e,t){const n=this.exec.evalExpression(e.args[0],t);if(n instanceof Fe)return new Fe(n.data.map((e=>Math.atanh(e))),n.typeInfo);const s=n;return new Oe(Math.atanh(s.value),n.typeInfo)}Atan2(e,t){const n=this.exec.evalExpression(e.args[0],t),s=this.exec.evalExpression(e.args[1],t);if(n instanceof Fe&&s instanceof Fe)return new Fe(n.data.map(((e,t)=>Math.atan2(e,s.data[t]))),n.typeInfo);const r=n,a=s;return new Oe(Math.atan2(r.value,a.value),n.typeInfo)}Ceil(e,t){const n=this.exec.evalExpression(e.args[0],t);if(n instanceof Fe)return new Fe(n.data.map((e=>Math.ceil(e))),n.typeInfo);const s=n;return new Oe(Math.ceil(s.value),n.typeInfo)}_clamp(e,t,n){return Math.min(Math.max(e,t),n)}Clamp(e,t){const n=this.exec.evalExpression(e.args[0],t),s=this.exec.evalExpression(e.args[1],t),r=this.exec.evalExpression(e.args[2],t);if(n instanceof Fe&&s instanceof Fe&&r instanceof Fe)return new Fe(n.data.map(((e,t)=>this._clamp(e,s.data[t],r.data[t]))),n.typeInfo);const a=n,i=s,o=r;return new Oe(this._clamp(a.value,i.value,o.value),n.typeInfo)}Cos(e,t){const n=this.exec.evalExpression(e.args[0],t);if(n instanceof Fe)return new Fe(n.data.map((e=>Math.cos(e))),n.typeInfo);const s=n;return new Oe(Math.cos(s.value),n.typeInfo)}Cosh(e,t){const n=this.exec.evalExpression(e.args[0],t);if(n instanceof Fe)return new Fe(n.data.map((e=>Math.cosh(e))),n.typeInfo);const s=n;return new Oe(Math.cos(s.value),n.typeInfo)}CountLeadingZeros(e,t){const n=this.exec.evalExpression(e.args[0],t);if(n instanceof Fe)return new Fe(n.data.map((e=>Math.clz32(e))),n.typeInfo);const s=n;return new Oe(Math.clz32(s.value),n.typeInfo)}_countOneBits(e){let t=0;for(;0!==e;)1&e&&t++,e>>=1;return t}CountOneBits(e,t){const n=this.exec.evalExpression(e.args[0],t);if(n instanceof Fe)return new Fe(n.data.map((e=>this._countOneBits(e))),n.typeInfo);const s=n;return new Oe(this._countOneBits(s.value),n.typeInfo)}_countTrailingZeros(e){if(0===e)return 32;let t=0;for(;!(1&e);)e>>=1,t++;return t}CountTrailingZeros(e,t){const n=this.exec.evalExpression(e.args[0],t);if(n instanceof Fe)return new Fe(n.data.map((e=>this._countTrailingZeros(e))),n.typeInfo);const s=n;return new Oe(this._countTrailingZeros(s.value),n.typeInfo)}Cross(e,t){const n=this.exec.evalExpression(e.args[0],t),s=this.exec.evalExpression(e.args[1],t);if(n instanceof Fe&&s instanceof Fe){if(3!==n.data.length||3!==s.data.length)return console.error(`Cross() expects 3D vectors. Line ${e.line}`),null;const t=n.data,r=s.data;return new Fe([t[1]*r[2]-r[1]*t[2],t[2]*r[0]-r[2]*t[0],t[0]*r[1]-r[0]*t[1]],n.typeInfo)}return console.error(`Cross() expects vector arguments. Line ${e.line}`),null}Degrees(e,t){const n=this.exec.evalExpression(e.args[0],t),s=180/Math.PI;if(n instanceof Fe)return new Fe(n.data.map((e=>e*s)),n.typeInfo);return new Oe(n.value*s,this.getTypeInfo('f32'))}Determinant(e,t){const n=this.exec.evalExpression(e.args[0],t);if(n instanceof Me){const e=n.data,t=n.typeInfo.getTypeName(),s=t.endsWith('h')?this.getTypeInfo('f16'):this.getTypeInfo('f32');if('mat2x2'===t||'mat2x2f'===t||'mat2x2h'===t)return new Oe(e[0]*e[3]-e[1]*e[2],s);if('mat2x3'===t||'mat2x3f'===t||'mat2x3h'===t)return new Oe(e[0]*(e[4]*e[8]-e[5]*e[7])-e[1]*(e[3]*e[8]-e[5]*e[6])+e[2]*(e[3]*e[7]-e[4]*e[6]),s);if('mat2x4'===t||'mat2x4f'===t||'mat2x4h'===t)console.error(`TODO: Determinant for ${t}`);else if('mat3x2'===t||'mat3x2f'===t||'mat3x2h'===t)console.error(`TODO: Determinant for ${t}`);else {if('mat3x3'===t||'mat3x3f'===t||'mat3x3h'===t)return new Oe(e[0]*(e[4]*e[8]-e[5]*e[7])-e[1]*(e[3]*e[8]-e[5]*e[6])+e[2]*(e[3]*e[7]-e[4]*e[6]),s);'mat3x4'===t||'mat3x4f'===t||'mat3x4h'===t||'mat4x2'===t||'mat4x2f'===t||'mat4x2h'===t||'mat4x3'===t||'mat4x3f'===t||'mat4x3h'===t?console.error(`TODO: Determinant for ${t}`):'mat4x4'!==t&&'mat4x4f'!==t&&'mat4x4h'!==t||console.error(`TODO: Determinant for ${t}`);}}return console.error(`Determinant expects a matrix argument. Line ${e.line}`),null}Distance(e,t){const n=this.exec.evalExpression(e.args[0],t),s=this.exec.evalExpression(e.args[1],t);if(n instanceof Fe&&s instanceof Fe){let e=0;for(let t=0;t<n.data.length;++t)e+=(n.data[t]-s.data[t])*(n.data[t]-s.data[t]);return new Oe(Math.sqrt(e),this.getTypeInfo('f32'))}const r=n,a=s;return new Oe(Math.abs(r.value-a.value),n.typeInfo)}_dot(e,t){let n=0;for(let s=0;s<e.length;++s)n+=t[s]*e[s];return n}Dot(e,t){const n=this.exec.evalExpression(e.args[0],t),s=this.exec.evalExpression(e.args[1],t);return n instanceof Fe&&s instanceof Fe?new Oe(this._dot(n.data,s.data),this.getTypeInfo('f32')):(console.error(`Dot() expects vector arguments. Line ${e.line}`),null)}Dot4U8Packed(e,t){return console.error(`TODO: dot4U8Packed. Line ${e.line}`),null}Dot4I8Packed(e,t){return console.error(`TODO: dot4I8Packed. Line ${e.line}`),null}Exp(e,t){const n=this.exec.evalExpression(e.args[0],t);if(n instanceof Fe)return new Fe(n.data.map((e=>Math.exp(e))),n.typeInfo);const s=n;return new Oe(Math.exp(s.value),n.typeInfo)}Exp2(e,t){const n=this.exec.evalExpression(e.args[0],t);if(n instanceof Fe)return new Fe(n.data.map((e=>Math.pow(2,e))),n.typeInfo);const s=n;return new Oe(Math.pow(2,s.value),n.typeInfo)}ExtractBits(e,t){const n=this.exec.evalExpression(e.args[0],t),s=this.exec.evalExpression(e.args[1],t),r=this.exec.evalExpression(e.args[2],t);if('u32'!==s.typeInfo.name&&'x32'!==s.typeInfo.name)return console.error(`ExtractBits() expects an i32 offset argument. Line ${e.line}`),null;if('u32'!==r.typeInfo.name&&'x32'!==r.typeInfo.name)return console.error(`ExtractBits() expects an i32 count argument. Line ${e.line}`),null;const a=s.value,i=r.value;if(n instanceof Fe)return new Fe(n.data.map((e=>e>>a&(1<<i)-1)),n.typeInfo);if('i32'!==n.typeInfo.name&&'x32'!==n.typeInfo.name)return console.error(`ExtractBits() expects an i32 argument. Line ${e.line}`),null;const o=n.value;return new Oe(o>>a&(1<<i)-1,this.getTypeInfo('i32'))}FaceForward(e,t){const n=this.exec.evalExpression(e.args[0],t),s=this.exec.evalExpression(e.args[1],t),r=this.exec.evalExpression(e.args[2],t);if(n instanceof Fe&&s instanceof Fe&&r instanceof Fe){const e=this._dot(s.data,r.data);return new Fe(e<0?Array.from(n.data):n.data.map((e=>-e)),n.typeInfo)}return console.error(`FaceForward() expects vector arguments. Line ${e.line}`),null}_firstLeadingBit(e){return 0===e?-1:31-Math.clz32(e)}FirstLeadingBit(e,t){const n=this.exec.evalExpression(e.args[0],t);if(n instanceof Fe)return new Fe(n.data.map((e=>this._firstLeadingBit(e))),n.typeInfo);const s=n;return new Oe(this._firstLeadingBit(s.value),n.typeInfo)}_firstTrailingBit(e){return 0===e?-1:Math.log2(e&-e)}FirstTrailingBit(e,t){const n=this.exec.evalExpression(e.args[0],t);if(n instanceof Fe)return new Fe(n.data.map((e=>this._firstTrailingBit(e))),n.typeInfo);const s=n;return new Oe(this._firstTrailingBit(s.value),n.typeInfo)}Floor(e,t){const n=this.exec.evalExpression(e.args[0],t);if(n instanceof Fe)return new Fe(n.data.map((e=>Math.floor(e))),n.typeInfo);const s=n;return new Oe(Math.floor(s.value),n.typeInfo)}Fma(e,t){const n=this.exec.evalExpression(e.args[0],t),s=this.exec.evalExpression(e.args[1],t),r=this.exec.evalExpression(e.args[2],t);if(n instanceof Fe&&s instanceof Fe&&r instanceof Fe)return n.data.length!==s.data.length||n.data.length!==r.data.length?(console.error(`Fma() expects vectors of the same length. Line ${e.line}`),null):new Fe(n.data.map(((e,t)=>e*s.data[t]+r.data[t])),n.typeInfo);const a=n,i=s,o=r;return new Oe(a.value*i.value+o.value,a.typeInfo)}Fract(e,t){const n=this.exec.evalExpression(e.args[0],t);if(n instanceof Fe)return new Fe(n.data.map((e=>e-Math.floor(e))),n.typeInfo);const s=n;return new Oe(s.value-Math.floor(s.value),n.typeInfo)}Frexp(e,t){return console.error(`TODO: frexp. Line ${e.line}`),null}InsertBits(e,t){const n=this.exec.evalExpression(e.args[0],t),s=this.exec.evalExpression(e.args[1],t),r=this.exec.evalExpression(e.args[2],t),a=this.exec.evalExpression(e.args[3],t);if('u32'!==r.typeInfo.name&&'x32'!==r.typeInfo.name)return console.error(`InsertBits() expects an i32 offset argument. Line ${e.line}`),null;const i=r.value,o=(1<<a.value)-1<<i,l=~o;if(n instanceof Fe&&s instanceof Fe)return new Fe(n.data.map(((e,t)=>e&l|s.data[t]<<i&o)),n.typeInfo);const c=n.value,u=s.value;return new Oe(c&l|u<<i&o,n.typeInfo)}InverseSqrt(e,t){const n=this.exec.evalExpression(e.args[0],t);if(n instanceof Fe)return new Fe(n.data.map((e=>1/Math.sqrt(e))),n.typeInfo);const s=n;return new Oe(1/Math.sqrt(s.value),n.typeInfo)}Ldexp(e,t){return console.error(`TODO: ldexp. Line ${e.line}`),null}Length(e,t){const n=this.exec.evalExpression(e.args[0],t);if(n instanceof Fe){let e=0;return n.data.forEach((t=>{e+=t*t;})),new Oe(Math.sqrt(e),this.getTypeInfo('f32'))}const s=n;return new Oe(Math.abs(s.value),n.typeInfo)}Log(e,t){const n=this.exec.evalExpression(e.args[0],t);if(n instanceof Fe)return new Fe(n.data.map((e=>Math.log(e))),n.typeInfo);const s=n;return new Oe(Math.log(s.value),n.typeInfo)}Log2(e,t){const n=this.exec.evalExpression(e.args[0],t);if(n instanceof Fe)return new Fe(n.data.map((e=>Math.log2(e))),n.typeInfo);const s=n;return new Oe(Math.log2(s.value),n.typeInfo)}Max(e,t){const n=this.exec.evalExpression(e.args[0],t),s=this.exec.evalExpression(e.args[1],t);if(n instanceof Fe&&s instanceof Fe)return new Fe(n.data.map(((e,t)=>Math.max(e,s.data[t]))),n.typeInfo);const r=n,a=s;return new Oe(Math.max(r.value,a.value),n.typeInfo)}Min(e,t){const n=this.exec.evalExpression(e.args[0],t),s=this.exec.evalExpression(e.args[1],t);if(n instanceof Fe&&s instanceof Fe)return new Fe(n.data.map(((e,t)=>Math.min(e,s.data[t]))),n.typeInfo);const r=n,a=s;return new Oe(Math.min(r.value,a.value),n.typeInfo)}Mix(e,t){const n=this.exec.evalExpression(e.args[0],t),s=this.exec.evalExpression(e.args[1],t),r=this.exec.evalExpression(e.args[2],t);if(n instanceof Fe&&s instanceof Fe&&r instanceof Fe)return new Fe(n.data.map(((e,t)=>n.data[t]*(1-r.data[t])+s.data[t]*r.data[t])),n.typeInfo);const a=s,i=r;return new Oe(n.value*(1-i.value)+a.value*i.value,n.typeInfo)}Modf(e,t){const n=this.exec.evalExpression(e.args[0],t),s=this.exec.evalExpression(e.args[1],t);if(n instanceof Fe&&s instanceof Fe)return new Fe(n.data.map(((e,t)=>e%s.data[t])),n.typeInfo);const r=s;return new Oe(n.value%r.value,n.typeInfo)}Normalize(e,t){const n=this.exec.evalExpression(e.args[0],t);if(n instanceof Fe){const s=this.Length(e,t).value;return new Fe(n.data.map((e=>e/s)),n.typeInfo)}return console.error(`Normalize() expects a vector argument. Line ${e.line}`),null}Pow(e,t){const n=this.exec.evalExpression(e.args[0],t),s=this.exec.evalExpression(e.args[1],t);if(n instanceof Fe&&s instanceof Fe)return new Fe(n.data.map(((e,t)=>Math.pow(e,s.data[t]))),n.typeInfo);const r=n,a=s;return new Oe(Math.pow(r.value,a.value),n.typeInfo)}QuantizeToF16(e,t){const n=this.exec.evalExpression(e.args[0],t);if(n instanceof Fe)return new Fe(n.data.map((e=>e)),n.typeInfo);return new Oe(n.value,n.typeInfo)}Radians(e,t){const n=this.exec.evalExpression(e.args[0],t);if(n instanceof Fe)return new Fe(n.data.map((e=>e*Math.PI/180)),n.typeInfo);return new Oe(n.value*Math.PI/180,this.getTypeInfo('f32'))}Reflect(e,t){let n=this.exec.evalExpression(e.args[0],t),s=this.exec.evalExpression(e.args[1],t);if(n instanceof Fe&&s instanceof Fe){const e=this._dot(n.data,s.data);return new Fe(n.data.map(((t,n)=>t-2*e*s.data[n])),n.typeInfo)}return console.error(`Reflect() expects vector arguments. Line ${e.line}`),null}Refract(e,t){let n=this.exec.evalExpression(e.args[0],t),s=this.exec.evalExpression(e.args[1],t),r=this.exec.evalExpression(e.args[2],t);if(n instanceof Fe&&s instanceof Fe&&r instanceof Oe){const e=this._dot(s.data,n.data);return new Fe(n.data.map(((t,n)=>{const a=1-r.value*r.value*(1-e*e);if(a<0)return 0;const i=Math.sqrt(a);return r.value*t-(r.value*e+i)*s.data[n]})),n.typeInfo)}return console.error(`Refract() expects vector arguments and a scalar argument. Line ${e.line}`),null}ReverseBits(e,t){return console.error(`TODO: reverseBits. Line ${e.line}`),null}Round(e,t){const n=this.exec.evalExpression(e.args[0],t);if(n instanceof Fe)return new Fe(n.data.map((e=>Math.round(e))),n.typeInfo);const s=n;return new Oe(Math.round(s.value),n.typeInfo)}Saturate(e,t){const n=this.exec.evalExpression(e.args[0],t);if(n instanceof Fe)return new Fe(n.data.map((e=>Math.min(Math.max(e,0),1))),n.typeInfo);const s=n;return new Oe(Math.min(Math.max(s.value,0),1),n.typeInfo)}Sign(e,t){const n=this.exec.evalExpression(e.args[0],t);if(n instanceof Fe)return new Fe(n.data.map((e=>Math.sign(e))),n.typeInfo);const s=n;return new Oe(Math.sign(s.value),n.typeInfo)}Sin(e,t){const n=this.exec.evalExpression(e.args[0],t);if(n instanceof Fe)return new Fe(n.data.map((e=>Math.sin(e))),n.typeInfo);const s=n;return new Oe(Math.sin(s.value),n.typeInfo)}Sinh(e,t){const n=this.exec.evalExpression(e.args[0],t);if(n instanceof Fe)return new Fe(n.data.map((e=>Math.sinh(e))),n.typeInfo);const s=n;return new Oe(Math.sinh(s.value),n.typeInfo)}_smoothstep(e,t,n){const s=Math.min(Math.max((n-e)/(t-e),0),1);return s*s*(3-2*s)}SmoothStep(e,t){const n=this.exec.evalExpression(e.args[0],t),s=this.exec.evalExpression(e.args[1],t),r=this.exec.evalExpression(e.args[2],t);if(r instanceof Fe&&n instanceof Fe&&s instanceof Fe)return new Fe(r.data.map(((e,t)=>this._smoothstep(n.data[t],s.data[t],e))),r.typeInfo);const a=n,i=s,o=r;return new Oe(this._smoothstep(a.value,i.value,o.value),r.typeInfo)}Sqrt(e,t){const n=this.exec.evalExpression(e.args[0],t);if(n instanceof Fe)return new Fe(n.data.map((e=>Math.sqrt(e))),n.typeInfo);const s=n;return new Oe(Math.sqrt(s.value),n.typeInfo)}Step(e,t){const n=this.exec.evalExpression(e.args[0],t),s=this.exec.evalExpression(e.args[1],t);if(s instanceof Fe&&n instanceof Fe)return new Fe(s.data.map(((e,t)=>e<n.data[t]?0:1)),s.typeInfo);const r=n;return new Oe(s.value<r.value?0:1,r.typeInfo)}Tan(e,t){const n=this.exec.evalExpression(e.args[0],t);if(n instanceof Fe)return new Fe(n.data.map((e=>Math.tan(e))),n.typeInfo);const s=n;return new Oe(Math.tan(s.value),n.typeInfo)}Tanh(e,t){const n=this.exec.evalExpression(e.args[0],t);if(n instanceof Fe)return new Fe(n.data.map((e=>Math.tanh(e))),n.typeInfo);const s=n;return new Oe(Math.tanh(s.value),n.typeInfo)}_getTransposeType(e){const t=e.getTypeName();return 'mat2x2f'===t||'mat2x2h'===t?e:'mat2x3f'===t?this.getTypeInfo('mat3x2f'):'mat2x3h'===t?this.getTypeInfo('mat3x2h'):'mat2x4f'===t?this.getTypeInfo('mat4x2f'):'mat2x4h'===t?this.getTypeInfo('mat4x2h'):'mat3x2f'===t?this.getTypeInfo('mat2x3f'):'mat3x2h'===t?this.getTypeInfo('mat2x3h'):'mat3x3f'===t||'mat3x3h'===t?e:'mat3x4f'===t?this.getTypeInfo('mat4x3f'):'mat3x4h'===t?this.getTypeInfo('mat4x3h'):'mat4x2f'===t?this.getTypeInfo('mat2x4f'):'mat4x2h'===t?this.getTypeInfo('mat2x4h'):'mat4x3f'===t?this.getTypeInfo('mat3x4f'):'mat4x3h'===t?this.getTypeInfo('mat3x4h'):('mat4x4f'===t||'mat4x4h'===t||console.error(`Invalid matrix type ${t}`),e)}Transpose(e,t){const n=this.exec.evalExpression(e.args[0],t);if(!(n instanceof Me))return console.error(`Transpose() expects a matrix argument. Line ${e.line}`),null;const s=this._getTransposeType(n.typeInfo);if('mat2x2'===n.typeInfo.name||'mat2x2f'===n.typeInfo.name||'mat2x2h'===n.typeInfo.name){const e=n.data;return new Me([e[0],e[2],e[1],e[3]],s)}if('mat2x3'===n.typeInfo.name||'mat2x3f'===n.typeInfo.name||'mat2x3h'===n.typeInfo.name){const e=n.data;return new Me([e[0],e[3],e[6],e[1],e[4],e[7]],s)}if('mat2x4'===n.typeInfo.name||'mat2x4f'===n.typeInfo.name||'mat2x4h'===n.typeInfo.name){const e=n.data;return new Me([e[0],e[4],e[8],e[12],e[1],e[5],e[9],e[13]],s)}if('mat3x2'===n.typeInfo.name||'mat3x2f'===n.typeInfo.name||'mat3x2h'===n.typeInfo.name){const e=n.data;return new Me([e[0],e[3],e[1],e[4],e[2],e[5]],s)}if('mat3x3'===n.typeInfo.name||'mat3x3f'===n.typeInfo.name||'mat3x3h'===n.typeInfo.name){const e=n.data;return new Me([e[0],e[3],e[6],e[1],e[4],e[7],e[2],e[5],e[8]],s)}if('mat3x4'===n.typeInfo.name||'mat3x4f'===n.typeInfo.name||'mat3x4h'===n.typeInfo.name){const e=n.data;return new Me([e[0],e[4],e[8],e[12],e[1],e[5],e[9],e[13],e[2],e[6],e[10],e[14]],s)}if('mat4x2'===n.typeInfo.name||'mat4x2f'===n.typeInfo.name||'mat4x2h'===n.typeInfo.name){const e=n.data;return new Me([e[0],e[4],e[1],e[5],e[2],e[6]],s)}if('mat4x3'===n.typeInfo.name||'mat4x3f'===n.typeInfo.name||'mat4x3h'===n.typeInfo.name){const e=n.data;return new Me([e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]],s)}if('mat4x4'===n.typeInfo.name||'mat4x4f'===n.typeInfo.name||'mat4x4h'===n.typeInfo.name){const e=n.data;return new Me([e[0],e[4],e[8],e[12],e[1],e[5],e[9],e[13],e[2],e[6],e[10],e[14],e[3],e[7],e[11],e[15]],s)}return console.error(`Invalid matrix type ${n.typeInfo.name}`),null}Trunc(e,t){const n=this.exec.evalExpression(e.args[0],t);if(n instanceof Fe)return new Fe(n.data.map((e=>Math.trunc(e))),n.typeInfo);const s=n;return new Oe(Math.trunc(s.value),n.typeInfo)}Dpdx(e,t){return console.error(`TODO: dpdx. Line ${e.line}`),null}DpdxCoarse(e,t){return console.error(`TODO: dpdxCoarse. Line ${e.line}`),null}DpdxFine(e,t){return console.error('TODO: dpdxFine'),null}Dpdy(e,t){return console.error('TODO: dpdy'),null}DpdyCoarse(e,t){return console.error('TODO: dpdyCoarse'),null}DpdyFine(e,t){return console.error('TODO: dpdyFine'),null}Fwidth(e,t){return console.error('TODO: fwidth'),null}FwidthCoarse(e,t){return console.error('TODO: fwidthCoarse'),null}FwidthFine(e,t){return console.error('TODO: fwidthFine'),null}TextureDimensions(e,t){const n=e.args[0],s=e.args.length>1?this.exec.evalExpression(e.args[1],t).value:0;if(n instanceof me){const r=n.name,a=t.getVariableValue(r);if(a instanceof Pe){if(s<0||s>=a.mipLevelCount)return console.error(`Invalid mip level for textureDimensions. Line ${e.line}`),null;const t=a.getMipLevelSize(s),n=a.dimension;return '1d'===n?new Oe(t[0],this.getTypeInfo('u32')):'3d'===n?new Fe(t,this.getTypeInfo('vec3u')):'2d'===n?new Fe(t.slice(0,2),this.getTypeInfo('vec2u')):(console.error(`Invalid texture dimension ${n} not found. Line ${e.line}`),null)}return console.error(`Texture ${r} not found. Line ${e.line}`),null}return console.error(`Invalid texture argument for textureDimensions. Line ${e.line}`),null}TextureGather(e,t){return console.error('TODO: textureGather'),null}TextureGatherCompare(e,t){return console.error('TODO: textureGatherCompare'),null}TextureLoad(e,t){const n=e.args[0],s=this.exec.evalExpression(e.args[1],t),r=e.args.length>2?this.exec.evalExpression(e.args[2],t).value:0;if(!(s instanceof Fe)||2!==s.data.length)return console.error(`Invalid UV argument for textureLoad. Line ${e.line}`),null;if(n instanceof me){const a=n.name,i=t.getVariableValue(a);if(i instanceof Pe){const t=Math.floor(s.data[0]),n=Math.floor(s.data[1]);if(t<0||t>=i.width||n<0||n>=i.height)return console.error(`Texture ${a} out of bounds. Line ${e.line}`),null;const o=i.getPixel(t,n,0,r);return null===o?(console.error(`Invalid texture format for textureLoad. Line ${e.line}`),null):new Fe(o,this.getTypeInfo('vec4f'))}return console.error(`Texture ${a} not found. Line ${e.line}`),null}return console.error(`Invalid texture argument for textureLoad. Line ${e.line}`),null}TextureNumLayers(e,t){const n=e.args[0];if(n instanceof me){const s=n.name,r=t.getVariableValue(s);return r instanceof Pe?new Oe(r.depthOrArrayLayers,this.getTypeInfo('u32')):(console.error(`Texture ${s} not found. Line ${e.line}`),null)}return console.error(`Invalid texture argument for textureNumLayers. Line ${e.line}`),null}TextureNumLevels(e,t){const n=e.args[0];if(n instanceof me){const s=n.name,r=t.getVariableValue(s);return r instanceof Pe?new Oe(r.mipLevelCount,this.getTypeInfo('u32')):(console.error(`Texture ${s} not found. Line ${e.line}`),null)}return console.error(`Invalid texture argument for textureNumLevels. Line ${e.line}`),null}TextureNumSamples(e,t){const n=e.args[0];if(n instanceof me){const s=n.name,r=t.getVariableValue(s);return r instanceof Pe?new Oe(r.sampleCount,this.getTypeInfo('u32')):(console.error(`Texture ${s} not found. Line ${e.line}`),null)}return console.error(`Invalid texture argument for textureNumSamples. Line ${e.line}`),null}TextureSample(e,t){return console.error('TODO: textureSample'),null}TextureSampleBias(e,t){return console.error('TODO: textureSampleBias'),null}TextureSampleCompare(e,t){return console.error('TODO: textureSampleCompare'),null}TextureSampleCompareLevel(e,t){return console.error('TODO: textureSampleCompareLevel'),null}TextureSampleGrad(e,t){return console.error('TODO: textureSampleGrad'),null}TextureSampleLevel(e,t){return console.error('TODO: textureSampleLevel'),null}TextureSampleBaseClampToEdge(e,t){return console.error('TODO: textureSampleBaseClampToEdge'),null}TextureStore(e,t){const n=e.args[0],s=this.exec.evalExpression(e.args[1],t),r=4===e.args.length?this.exec.evalExpression(e.args[2],t).value:0,a=4===e.args.length?this.exec.evalExpression(e.args[3],t).data:this.exec.evalExpression(e.args[2],t).data;if(4!==a.length)return console.error(`Invalid value argument for textureStore. Line ${e.line}`),null;if(!(s instanceof Fe)||2!==s.data.length)return console.error(`Invalid UV argument for textureStore. Line ${e.line}`),null;if(n instanceof me){const i=n.name,o=t.getVariableValue(i);if(o instanceof Pe){const t=o.getMipLevelSize(0),n=Math.floor(s.data[0]),l=Math.floor(s.data[1]);return n<0||n>=t[0]||l<0||l>=t[1]?(console.error(`Texture ${i} out of bounds. Line ${e.line}`),null):(o.setPixel(n,l,0,r,Array.from(a)),null)}return console.error(`Texture ${i} not found. Line ${e.line}`),null}return console.error(`Invalid texture argument for textureStore. Line ${e.line}`),null}AtomicLoad(e,t){let n=e.args[0];n instanceof we&&(n=n.right);const s=this.exec.getVariableName(n,t);return t.getVariable(s).value.getSubData(this.exec,n.postfix,t)}AtomicStore(e,t){let n=e.args[0];n instanceof we&&(n=n.right);const s=this.exec.getVariableName(n,t),r=t.getVariable(s);let a=e.args[1];const i=this.exec.evalExpression(a,t),o=r.value.getSubData(this.exec,n.postfix,t);return o instanceof Oe&&i instanceof Oe&&(o.value=i.value),r.value instanceof Ue&&r.value.setDataValue(this.exec,o,n.postfix,t),null}AtomicAdd(e,t){let n=e.args[0];n instanceof we&&(n=n.right);const s=this.exec.getVariableName(n,t),r=t.getVariable(s);let a=e.args[1];const i=this.exec.evalExpression(a,t),o=r.value.getSubData(this.exec,n.postfix,t),l=new Oe(o.value,o.typeInfo);return o instanceof Oe&&i instanceof Oe&&(o.value+=i.value),r.value instanceof Ue&&r.value.setDataValue(this.exec,o,n.postfix,t),l}AtomicSub(e,t){let n=e.args[0];n instanceof we&&(n=n.right);const s=this.exec.getVariableName(n,t),r=t.getVariable(s);let a=e.args[1];const i=this.exec.evalExpression(a,t),o=r.value.getSubData(this.exec,n.postfix,t),l=new Oe(o.value,o.typeInfo);return o instanceof Oe&&i instanceof Oe&&(o.value-=i.value),r.value instanceof Ue&&r.value.setDataValue(this.exec,o,n.postfix,t),l}AtomicMax(e,t){let n=e.args[0];n instanceof we&&(n=n.right);const s=this.exec.getVariableName(n,t),r=t.getVariable(s);let a=e.args[1];const i=this.exec.evalExpression(a,t),o=r.value.getSubData(this.exec,n.postfix,t),l=new Oe(o.value,o.typeInfo);return o instanceof Oe&&i instanceof Oe&&(o.value=Math.max(o.value,i.value)),r.value instanceof Ue&&r.value.setDataValue(this.exec,o,n.postfix,t),l}AtomicMin(e,t){let n=e.args[0];n instanceof we&&(n=n.right);const s=this.exec.getVariableName(n,t),r=t.getVariable(s);let a=e.args[1];const i=this.exec.evalExpression(a,t),o=r.value.getSubData(this.exec,n.postfix,t),l=new Oe(o.value,o.typeInfo);return o instanceof Oe&&i instanceof Oe&&(o.value=Math.min(o.value,i.value)),r.value instanceof Ue&&r.value.setDataValue(this.exec,o,n.postfix,t),l}AtomicAnd(e,t){let n=e.args[0];n instanceof we&&(n=n.right);const s=this.exec.getVariableName(n,t),r=t.getVariable(s);let a=e.args[1];const i=this.exec.evalExpression(a,t),o=r.value.getSubData(this.exec,n.postfix,t),l=new Oe(o.value,o.typeInfo);return o instanceof Oe&&i instanceof Oe&&(o.value=o.value&i.value),r.value instanceof Ue&&r.value.setDataValue(this.exec,o,n.postfix,t),l}AtomicOr(e,t){let n=e.args[0];n instanceof we&&(n=n.right);const s=this.exec.getVariableName(n,t),r=t.getVariable(s);let a=e.args[1];const i=this.exec.evalExpression(a,t),o=r.value.getSubData(this.exec,n.postfix,t),l=new Oe(o.value,o.typeInfo);return o instanceof Oe&&i instanceof Oe&&(o.value=o.value|i.value),r.value instanceof Ue&&r.value.setDataValue(this.exec,o,n.postfix,t),l}AtomicXor(e,t){let n=e.args[0];n instanceof we&&(n=n.right);const s=this.exec.getVariableName(n,t),r=t.getVariable(s);let a=e.args[1];const i=this.exec.evalExpression(a,t),o=r.value.getSubData(this.exec,n.postfix,t),l=new Oe(o.value,o.typeInfo);return o instanceof Oe&&i instanceof Oe&&(o.value=o.value^i.value),r.value instanceof Ue&&r.value.setDataValue(this.exec,o,n.postfix,t),l}AtomicExchange(e,t){let n=e.args[0];n instanceof we&&(n=n.right);const s=this.exec.getVariableName(n,t),r=t.getVariable(s);let a=e.args[1];const i=this.exec.evalExpression(a,t),o=r.value.getSubData(this.exec,n.postfix,t),l=new Oe(o.value,o.typeInfo);return o instanceof Oe&&i instanceof Oe&&(o.value=i.value),r.value instanceof Ue&&r.value.setDataValue(this.exec,o,n.postfix,t),l}AtomicCompareExchangeWeak(e,t){return console.error('TODO: atomicCompareExchangeWeak'),null}Pack4x8snorm(e,t){return console.error('TODO: pack4x8snorm'),null}Pack4x8unorm(e,t){return console.error('TODO: pack4x8unorm'),null}Pack4xI8(e,t){return console.error('TODO: pack4xI8'),null}Pack4xU8(e,t){return console.error('TODO: pack4xU8'),null}Pack4x8Clamp(e,t){return console.error('TODO: pack4x8Clamp'),null}Pack4xU8Clamp(e,t){return console.error('TODO: pack4xU8Clamp'),null}Pack2x16snorm(e,t){return console.error('TODO: pack2x16snorm'),null}Pack2x16unorm(e,t){return console.error('TODO: pack2x16unorm'),null}Pack2x16float(e,t){return console.error('TODO: pack2x16float'),null}Unpack4x8snorm(e,t){return console.error('TODO: unpack4x8snorm'),null}Unpack4x8unorm(e,t){return console.error('TODO: unpack4x8unorm'),null}Unpack4xI8(e,t){return console.error('TODO: unpack4xI8'),null}Unpack4xU8(e,t){return console.error('TODO: unpack4xU8'),null}Unpack2x16snorm(e,t){return console.error('TODO: unpack2x16snorm'),null}Unpack2x16unorm(e,t){return console.error('TODO: unpack2x16unorm'),null}Unpack2x16float(e,t){return console.error('TODO: unpack2x16float'),null}StorageBarrier(e,t){return null}TextureBarrier(e,t){return null}WorkgroupBarrier(e,t){return null}WorkgroupUniformLoad(e,t){return null}SubgroupAdd(e,t){return console.error('TODO: subgroupAdd'),null}SubgroupExclusiveAdd(e,t){return console.error('TODO: subgroupExclusiveAdd'),null}SubgroupInclusiveAdd(e,t){return console.error('TODO: subgroupInclusiveAdd'),null}SubgroupAll(e,t){return console.error('TODO: subgroupAll'),null}SubgroupAnd(e,t){return console.error('TODO: subgroupAnd'),null}SubgroupAny(e,t){return console.error('TODO: subgroupAny'),null}SubgroupBallot(e,t){return console.error('TODO: subgroupBallot'),null}SubgroupBroadcast(e,t){return console.error('TODO: subgroupBroadcast'),null}SubgroupBroadcastFirst(e,t){return console.error('TODO: subgroupBroadcastFirst'),null}SubgroupElect(e,t){return console.error('TODO: subgroupElect'),null}SubgroupMax(e,t){return console.error('TODO: subgroupMax'),null}SubgroupMin(e,t){return console.error('TODO: subgroupMin'),null}SubgroupMul(e,t){return console.error('TODO: subgroupMul'),null}SubgroupExclusiveMul(e,t){return console.error('TODO: subgroupExclusiveMul'),null}SubgroupInclusiveMul(e,t){return console.error('TODO: subgroupInclusiveMul'),null}SubgroupOr(e,t){return console.error('TODO: subgroupOr'),null}SubgroupShuffle(e,t){return console.error('TODO: subgroupShuffle'),null}SubgroupShuffleDown(e,t){return console.error('TODO: subgroupShuffleDown'),null}SubgroupShuffleUp(e,t){return console.error('TODO: subgroupShuffleUp'),null}SubgroupShuffleXor(e,t){return console.error('TODO: subgroupShuffleXor'),null}SubgroupXor(e,t){return console.error('TODO: subgroupXor'),null}QuadBroadcast(e,t){return console.error('TODO: quadBroadcast'),null}QuadSwapDiagonal(e,t){return console.error('TODO: quadSwapDiagonal'),null}QuadSwapX(e,t){return console.error('TODO: quadSwapX'),null}QuadSwapY(e,t){return console.error('TODO: quadSwapY'),null}}const ht={vec2:2,vec2f:2,vec2i:2,vec2u:2,vec2b:2,vec2h:2,vec3:3,vec3f:3,vec3i:3,vec3u:3,vec3b:3,vec3h:3,vec4:4,vec4f:4,vec4i:4,vec4u:4,vec4b:4,vec4h:4},ft={mat2x2:[2,2,4],mat2x2f:[2,2,4],mat2x2h:[2,2,4],mat2x3:[2,3,6],mat2x3f:[2,3,6],mat2x3h:[2,3,6],mat2x4:[2,4,8],mat2x4f:[2,4,8],mat2x4h:[2,4,8],mat3x2:[3,2,6],mat3x2f:[3,2,6],mat3x2h:[3,2,6],mat3x3:[3,3,9],mat3x3f:[3,3,9],mat3x3h:[3,3,9],mat3x4:[3,4,12],mat3x4f:[3,4,12],mat3x4h:[3,4,12],mat4x2:[4,2,8],mat4x2f:[4,2,8],mat4x2h:[4,2,8],mat4x3:[4,3,12],mat4x3f:[4,3,12],mat4x3h:[4,3,12],mat4x4:[4,4,16],mat4x4f:[4,4,16],mat4x4h:[4,4,16]};class pt extends ct{constructor(e,t){var n;super(),this.ast=null!=e?e:[],this.reflection=new rt,this.reflection.updateAST(this.ast),this.context=null!==(n=null==t?undefined:t.clone())&&undefined!==n?n:new lt,this.builtins=new ut(this),this.typeInfo={bool:this.getTypeInfo(re.bool),i32:this.getTypeInfo(re.i32),u32:this.getTypeInfo(re.u32),f32:this.getTypeInfo(re.f32),f16:this.getTypeInfo(re.f16),vec2f:this.getTypeInfo(oe.vec2f),vec2u:this.getTypeInfo(oe.vec2u),vec2i:this.getTypeInfo(oe.vec2i),vec2h:this.getTypeInfo(oe.vec2h),vec3f:this.getTypeInfo(oe.vec3f),vec3u:this.getTypeInfo(oe.vec3u),vec3i:this.getTypeInfo(oe.vec3i),vec3h:this.getTypeInfo(oe.vec3h),vec4f:this.getTypeInfo(oe.vec4f),vec4u:this.getTypeInfo(oe.vec4u),vec4i:this.getTypeInfo(oe.vec4i),vec4h:this.getTypeInfo(oe.vec4h),mat2x2f:this.getTypeInfo(oe.mat2x2f),mat2x3f:this.getTypeInfo(oe.mat2x3f),mat2x4f:this.getTypeInfo(oe.mat2x4f),mat3x2f:this.getTypeInfo(oe.mat3x2f),mat3x3f:this.getTypeInfo(oe.mat3x3f),mat3x4f:this.getTypeInfo(oe.mat3x4f),mat4x2f:this.getTypeInfo(oe.mat4x2f),mat4x3f:this.getTypeInfo(oe.mat4x3f),mat4x4f:this.getTypeInfo(oe.mat4x4f)};}getVariableValue(e){var t,n;const r=null!==(n=null===(t=this.context.getVariable(e))||undefined===t?undefined:t.value)&&undefined!==n?n:null;if(null===r)return null;if(r instanceof Oe)return r.value;if(r instanceof Fe)return Array.from(r.data);if(r instanceof Me)return Array.from(r.data);if(r instanceof Ue&&r.typeInfo instanceof s){if('u32'===r.typeInfo.format.name)return Array.from(new Uint32Array(r.buffer,r.offset,r.typeInfo.count));if('i32'===r.typeInfo.format.name)return Array.from(new Int32Array(r.buffer,r.offset,r.typeInfo.count));if('f32'===r.typeInfo.format.name)return Array.from(new Float32Array(r.buffer,r.offset,r.typeInfo.count))}return console.error(`Unsupported return variable type ${r.typeInfo.name}`),null}execute(e){(e=null!=e?e:{}).constants&&this._setOverrides(e.constants,this.context),this._execStatements(this.ast,this.context);}dispatchWorkgroups(e,t,n,s){const r=this.context.clone();(s=null!=s?s:{}).constants&&this._setOverrides(s.constants,r),this._execStatements(this.ast,r);const a=r.getFunction(e);if(!a)return void console.error(`Function ${e} not found`);if('number'==typeof t)t=[t,1,1];else {if(0===t.length)return void console.error('Invalid dispatch count');1===t.length?t=[t[0],1,1]:2===t.length?t=[t[0],t[1],1]:t.length>3&&(t=[t[0],t[1],t[2]]);}const i=t[0],o=t[1],l=t[2],c=this.getTypeInfo('vec3u');r.setVariable('@num_workgroups',new Fe(t,c));for(const e in n)for(const t in n[e]){const s=n[e][t];r.variables.forEach((n=>{var r;const a=n.node;if(null==a?undefined:a.attributes){let i=null,o=null;for(const e of a.attributes)'binding'===e.name?i=e.value:'group'===e.name&&(o=e.value);if(t==i&&e==o)if(undefined!==s.texture&&undefined!==s.descriptor){const e=new Pe(s.texture,this.getTypeInfo(a.type),s.descriptor,null!==(r=s.texture.view)&&undefined!==r?r:null);n.value=e;}else undefined!==s.uniform?n.value=new Ue(s.uniform,this.getTypeInfo(a.type)):n.value=new Ue(s,this.getTypeInfo(a.type));}}));}for(let e=0;e<l;++e)for(let t=0;t<o;++t)for(let n=0;n<i;++n)r.setVariable('@workgroup_id',new Fe([n,t,e],this.getTypeInfo('vec3u'))),this._dispatchWorkgroup(a,[n,t,e],r);}execStatement(e,t){if(e instanceof Q)return this.evalExpression(e.value,t);if(e instanceof ne){if(e.condition){const n=this.evalExpression(e.condition,t);if(!(n instanceof Oe))throw new Error('Invalid break-if condition');if(!n.value)return null}return pt._breakObj}if(e instanceof se)return pt._continueObj;if(e instanceof M)this._let(e,t);else if(e instanceof B)this._var(e,t);else if(e instanceof U)this._const(e,t);else if(e instanceof C)this._function(e,t);else {if(e instanceof Z)return this._if(e,t);if(e instanceof j)return this._switch(e,t);if(e instanceof O)return this._for(e,t);if(e instanceof N)return this._while(e,t);if(e instanceof X)return this._loop(e,t);if(e instanceof V){const n=t.clone();return n.currentFunctionName=t.currentFunctionName,this._execStatements(e.body,n)}if(e instanceof R)this._assign(e,t);else if(e instanceof z)this._increment(e,t);else {if(e instanceof ie)return null;if(e instanceof F){const n=e.name;null===t.getVariable(n)&&t.setVariable(n,new Oe(0,this.getTypeInfo('u32')));}else if(e instanceof G)this._call(e,t);else {if(e instanceof J)return null;if(e instanceof ee)return null;console.error('Invalid statement type.',e,`Line ${e.line}`);}}}return null}evalExpression(e,t){return e instanceof ke?this._evalBinaryOp(e,t):e instanceof ge?this._evalLiteral(e,t):e instanceof me?this._evalVariable(e,t):e instanceof de?this._evalCall(e,t):e instanceof pe?this._evalCreate(e,t):e instanceof _e?this._evalConst(e,t):e instanceof xe?this._evalBitcast(e,t):e instanceof we?this._evalUnaryOp(e,t):(console.error('Invalid expression type',e,`Line ${e.line}`),null)}getTypeInfo(e){var t;if(e instanceof re){const t=this.reflection.getTypeInfo(e);if(null!==t)return t}let n=null!==(t=this.typeInfo[e])&&undefined!==t?t:null;return null!==n||(n=this.reflection.getTypeInfoByName(e)),n}_setOverrides(e,t){for(const n in e){const s=e[n],r=this.reflection.getOverrideInfo(n);null!==r?(null===r.type&&(r.type=this.getTypeInfo('u32')),'u32'===r.type.name||'i32'===r.type.name||'f32'===r.type.name||'f16'===r.type.name?t.setVariable(n,new Oe(s,r.type)):'bool'===r.type.name?t.setVariable(n,new Oe(s?1:0,r.type)):'vec2'===r.type.name||'vec3'===r.type.name||'vec4'===r.type.name||'vec2f'===r.type.name||'vec3f'===r.type.name||'vec4f'===r.type.name||'vec2i'===r.type.name||'vec3i'===r.type.name||'vec4i'===r.type.name||'vec2u'===r.type.name||'vec3u'===r.type.name||'vec4u'===r.type.name||'vec2h'===r.type.name||'vec3h'===r.type.name||'vec4h'===r.type.name?t.setVariable(n,new Fe(s,r.type)):console.error(`Invalid constant type for ${n}`)):console.error(`Override ${n} does not exist in the shader.`);}}_dispatchWorkgroup(e,t,n){const s=[1,1,1];for(const t of e.node.attributes)if('workgroup_size'===t.name){if(t.value.length>0){const e=n.getVariableValue(t.value[0]);s[0]=e instanceof Oe?e.value:parseInt(t.value[0]);}if(t.value.length>1){const e=n.getVariableValue(t.value[1]);s[1]=e instanceof Oe?e.value:parseInt(t.value[1]);}if(t.value.length>2){const e=n.getVariableValue(t.value[2]);s[2]=e instanceof Oe?e.value:parseInt(t.value[2]);}}const r=this.getTypeInfo('vec3u'),a=this.getTypeInfo('u32');n.setVariable('@workgroup_size',new Fe(s,r));const i=s[0],o=s[1],l=s[2];for(let c=0,u=0;c<l;++c)for(let l=0;l<o;++l)for(let o=0;o<i;++o,++u){const i=[o,l,c],h=[o+t[0]*s[0],l+t[1]*s[1],c+t[2]*s[2]];n.setVariable('@local_invocation_id',new Fe(i,r)),n.setVariable('@global_invocation_id',new Fe(h,r)),n.setVariable('@local_invocation_index',new Oe(u,a)),this._dispatchExec(e,n);}}_dispatchExec(e,t){for(const n of e.node.args)for(const e of n.attributes)if('builtin'===e.name){const s=`@${e.value}`,r=t.getVariable(s);undefined!==r&&t.variables.set(n.name,r);}this._execStatements(e.node.body,t);}getVariableName(e,t){for(;e instanceof we;)e=e.right;return e instanceof me?e.name:(console.error('Unknown variable type',e,'Line',e.line),null)}_execStatements(e,t){for(const n of e){if(n instanceof Array){const e=t.clone(),s=this._execStatements(n,e);if(s)return s;continue}const e=this.execStatement(n,t);if(e)return e}return null}_call(e,t){const n=t.clone();n.currentFunctionName=e.name;const s=t.getFunction(e.name);if(s){for(let t=0;t<s.node.args.length;++t){const r=s.node.args[t],a=this.evalExpression(e.args[t],n);n.setVariable(r.name,a,r);}this._execStatements(s.node.body,n);}else if(e.isBuiltin)this._callBuiltinFunction(e,n);else {this.getTypeInfo(e.name)&&this._evalCreate(e,t);}}_increment(e,t){const n=this.getVariableName(e.variable,t),s=t.getVariable(n);s?'++'===e.operator?s.value instanceof Oe?s.value.value++:console.error(`Variable ${n} is not a scalar. Line ${e.line}`):'--'===e.operator?s.value instanceof Oe?s.value.value--:console.error(`Variable ${n} is not a scalar. Line ${e.line}`):console.error(`Unknown increment operator ${e.operator}. Line ${e.line}`):console.error(`Variable ${n} not found. Line ${e.line}`);}_getVariableData(e,t){if(e instanceof me){const n=this.getVariableName(e,t),s=t.getVariable(n);return null===s?(console.error(`Variable ${n} not found. Line ${e.line}`),null):s.value.getSubData(this,e.postfix,t)}if(e instanceof we){if('*'===e.operator){const n=this._getVariableData(e.right,t);return n instanceof Ve?n.reference.getSubData(this,e.postfix,t):(console.error(`Variable ${e.right} is not a pointer. Line ${e.line}`),null)}if('&'===e.operator){const n=this._getVariableData(e.right,t);return new Ve(n)}}return null}_assign(e,t){let n=null,s='<var>',r=null;if(e.variable instanceof we){const n=this._getVariableData(e.variable,t),s=this.evalExpression(e.value,t),r=e.operator;if('='===r){if(n instanceof Oe||n instanceof Fe||n instanceof Me){if(s instanceof Oe||s instanceof Fe||s instanceof Me&&n.data.length===s.data.length)return void n.data.set(s.data);console.error(`Invalid assignment. Line ${e.line}`);}else if(n instanceof Ue&&s instanceof Ue&&n.buffer.byteLength-n.offset>=s.buffer.byteLength-s.offset)return void(n.buffer.byteLength%4==0?new Uint32Array(n.buffer,n.offset,n.typeInfo.size/4).set(new Uint32Array(s.buffer,s.offset,s.typeInfo.size/4)):new Uint8Array(n.buffer,n.offset,n.typeInfo.size).set(new Uint8Array(s.buffer,s.offset,s.typeInfo.size)));return console.error(`Invalid assignment. Line ${e.line}`),null}if('+='===r)return n instanceof Oe||n instanceof Fe||n instanceof Me?s instanceof Oe||s instanceof Fe||s instanceof Me?void n.data.set(s.data.map(((e,t)=>n.data[t]+e))):void console.error(`Invalid assignment . Line ${e.line}`):void console.error(`Invalid assignment. Line ${e.line}`);if('-='===r)return (n instanceof Oe||n instanceof Fe||n instanceof Me)&&(s instanceof Oe||s instanceof Fe||s instanceof Me)?void n.data.set(s.data.map(((e,t)=>n.data[t]-e))):void console.error(`Invalid assignment. Line ${e.line}`)}if(e.variable instanceof we){if('*'===e.variable.operator){s=this.getVariableName(e.variable.right,t);const r=t.getVariable(s);if(!(r&&r.value instanceof Ve))return void console.error(`Variable ${s} is not a pointer. Line ${e.line}`);n=r.value.reference;let a=e.variable.postfix;if(!a){let t=e.variable.right;for(;t instanceof we;){if(t.postfix){a=t.postfix;break}t=t.right;}}a&&(n=n.getSubData(this,a,t));}}else {r=e.variable.postfix,s=this.getVariableName(e.variable,t);const a=t.getVariable(s);if(null===a)return void console.error(`Variable ${s} not found. Line ${e.line}`);n=a.value;}if(n instanceof Ve&&(n=n.reference),null===n)return void console.error(`Variable ${s} not found. Line ${e.line}`);const a=this.evalExpression(e.value,t),i=e.operator;if('='===i)if(n instanceof Ue)n.setDataValue(this,a,r,t);else if(r){if(!(n instanceof Fe||n instanceof Me))return void console.error(`Variable ${s} is not a vector or matrix. Line ${e.line}`);if(r instanceof be){const i=this.evalExpression(r.index,t).value;if(n instanceof Fe){if(!(a instanceof Oe))return void console.error(`Invalid assignment to ${s}. Line ${e.line}`);n.data[i]=a.value;}else {if(!(n instanceof Me))return void console.error(`Invalid assignment to ${s}. Line ${e.line}`);{const i=this.evalExpression(r.index,t).value;if(i<0)return void console.error(`Invalid assignment to ${s}. Line ${e.line}`);if(!(a instanceof Fe))return void console.error(`Invalid assignment to ${s}. Line ${e.line}`);{const t=n.typeInfo.getTypeName();if('mat2x2'===t||'mat2x2f'===t||'mat2x2h'===t){if(!(i<2&&2===a.data.length))return void console.error(`Invalid assignment to ${s}. Line ${e.line}`);n.data[2*i]=a.data[0],n.data[2*i+1]=a.data[1];}else if('mat2x3'===t||'mat2x3f'===t||'mat2x3h'===t){if(!(i<2&&3===a.data.length))return void console.error(`Invalid assignment to ${s}. Line ${e.line}`);n.data[3*i]=a.data[0],n.data[3*i+1]=a.data[1],n.data[3*i+2]=a.data[2];}else if('mat2x4'===t||'mat2x4f'===t||'mat2x4h'===t){if(!(i<2&&4===a.data.length))return void console.error(`Invalid assignment to ${s}. Line ${e.line}`);n.data[4*i]=a.data[0],n.data[4*i+1]=a.data[1],n.data[4*i+2]=a.data[2],n.data[4*i+3]=a.data[3];}else if('mat3x2'===t||'mat3x2f'===t||'mat3x2h'===t){if(!(i<3&&2===a.data.length))return void console.error(`Invalid assignment to ${s}. Line ${e.line}`);n.data[2*i]=a.data[0],n.data[2*i+1]=a.data[1];}else if('mat3x3'===t||'mat3x3f'===t||'mat3x3h'===t){if(!(i<3&&3===a.data.length))return void console.error(`Invalid assignment to ${s}. Line ${e.line}`);n.data[3*i]=a.data[0],n.data[3*i+1]=a.data[1],n.data[3*i+2]=a.data[2];}else if('mat3x4'===t||'mat3x4f'===t||'mat3x4h'===t){if(!(i<3&&4===a.data.length))return void console.error(`Invalid assignment to ${s}. Line ${e.line}`);n.data[4*i]=a.data[0],n.data[4*i+1]=a.data[1],n.data[4*i+2]=a.data[2],n.data[4*i+3]=a.data[3];}else if('mat4x2'===t||'mat4x2f'===t||'mat4x2h'===t){if(!(i<4&&2===a.data.length))return void console.error(`Invalid assignment to ${s}. Line ${e.line}`);n.data[2*i]=a.data[0],n.data[2*i+1]=a.data[1];}else if('mat4x3'===t||'mat4x3f'===t||'mat4x3h'===t){if(!(i<4&&3===a.data.length))return void console.error(`Invalid assignment to ${s}. Line ${e.line}`);n.data[3*i]=a.data[0],n.data[3*i+1]=a.data[1],n.data[3*i+2]=a.data[2];}else {if('mat4x4'!==t&&'mat4x4f'!==t&&'mat4x4h'!==t)return void console.error(`Invalid assignment to ${s}. Line ${e.line}`);if(!(i<4&&4===a.data.length))return void console.error(`Invalid assignment to ${s}. Line ${e.line}`);n.data[4*i]=a.data[0],n.data[4*i+1]=a.data[1],n.data[4*i+2]=a.data[2],n.data[4*i+3]=a.data[3];}}}}}else if(r instanceof fe){const t=r.value;if(!(n instanceof Fe))return void console.error(`Invalid assignment to ${t}. Variable ${s} is not a vector. Line ${e.line}`);if(a instanceof Oe){if(t.length>1)return void console.error(`Invalid assignment to ${t} for variable ${s}. Line ${e.line}`);if('x'===t)n.data[0]=a.value;else if('y'===t){if(n.data.length<2)return void console.error(`Invalid assignment to ${t} for variable ${s}. Line ${e.line}`);n.data[1]=a.value;}else if('z'===t){if(n.data.length<3)return void console.error(`Invalid assignment to ${t} for variable ${s}. Line ${e.line}`);n.data[2]=a.value;}else if('w'===t){if(n.data.length<4)return void console.error(`Invalid assignment to ${t} for variable ${s}. Line ${e.line}`);n.data[3]=a.value;}}else {if(!(a instanceof Fe))return void console.error(`Invalid assignment to ${s}. Line ${e.line}`);if(t.length!==a.data.length)return void console.error(`Invalid assignment to ${t} for variable ${s}. Line ${e.line}`);for(let r=0;r<t.length;++r){const i=t[r];if('x'===i||'r'===i)n.data[0]=a.data[r];else if('y'===i||'g'===i){if(a.data.length<2)return void console.error(`Invalid assignment to ${i} for variable ${s}. Line ${e.line}`);n.data[1]=a.data[r];}else if('z'===i||'b'===i){if(a.data.length<3)return void console.error(`Invalid assignment to ${i} for variable ${s}. Line ${e.line}`);n.data[2]=a.data[r];}else {if('w'!==i&&'a'!==i)return void console.error(`Invalid assignment to ${i} for variable ${s}. Line ${e.line}`);if(a.data.length<4)return void console.error(`Invalid assignment to ${i} for variable ${s}. Line ${e.line}`);n.data[3]=a.data[r];}}}}}else n instanceof Oe&&a instanceof Oe?n.value=a.value:n instanceof Fe&&a instanceof Fe||n instanceof Me&&a instanceof Me?n.data.set(a.data):console.error(`Invalid assignment to ${s}. Line ${e.line}`);else {const s=n.getSubData(this,r,t);if(s instanceof Fe&&a instanceof Oe){const t=s.data,n=a.value;if('+='===i)for(let e=0;e<t.length;++e)t[e]+=n;else if('-='===i)for(let e=0;e<t.length;++e)t[e]-=n;else if('*='===i)for(let e=0;e<t.length;++e)t[e]*=n;else if('/='===i)for(let e=0;e<t.length;++e)t[e]/=n;else if('%='===i)for(let e=0;e<t.length;++e)t[e]%=n;else if('&='===i)for(let e=0;e<t.length;++e)t[e]&=n;else if('|='===i)for(let e=0;e<t.length;++e)t[e]|=n;else if('^='===i)for(let e=0;e<t.length;++e)t[e]^=n;else if('<<='===i)for(let e=0;e<t.length;++e)t[e]<<=n;else if('>>='===i)for(let e=0;e<t.length;++e)t[e]>>=n;else console.error(`Invalid operator ${i}. Line ${e.line}`);}else if(s instanceof Fe&&a instanceof Fe){const t=s.data,n=a.data;if(t.length!==n.length)return void console.error(`Vector length mismatch. Line ${e.line}`);if('+='===i)for(let e=0;e<t.length;++e)t[e]+=n[e];else if('-='===i)for(let e=0;e<t.length;++e)t[e]-=n[e];else if('*='===i)for(let e=0;e<t.length;++e)t[e]*=n[e];else if('/='===i)for(let e=0;e<t.length;++e)t[e]/=n[e];else if('%='===i)for(let e=0;e<t.length;++e)t[e]%=n[e];else if('&='===i)for(let e=0;e<t.length;++e)t[e]&=n[e];else if('|='===i)for(let e=0;e<t.length;++e)t[e]|=n[e];else if('^='===i)for(let e=0;e<t.length;++e)t[e]^=n[e];else if('<<='===i)for(let e=0;e<t.length;++e)t[e]<<=n[e];else if('>>='===i)for(let e=0;e<t.length;++e)t[e]>>=n[e];else console.error(`Invalid operator ${i}. Line ${e.line}`);}else {if(!(s instanceof Oe&&a instanceof Oe))return void console.error(`Invalid type for ${e.operator} operator. Line ${e.line}`);'+='===i?s.value+=a.value:'-='===i?s.value-=a.value:'*='===i?s.value*=a.value:'/='===i?s.value/=a.value:'%='===i?s.value%=a.value:'&='===i?s.value&=a.value:'|='===i?s.value|=a.value:'^='===i?s.value^=a.value:'<<='===i?s.value<<=a.value:'>>='===i?s.value>>=a.value:console.error(`Invalid operator ${i}. Line ${e.line}`);}n instanceof Ue&&n.setDataValue(this,s,r,t);}}_function(e,t){const n=new ot(e);t.functions.set(e.name,n);}_const(e,t){let n=null;null!==e.value&&(n=this.evalExpression(e.value,t)),t.createVariable(e.name,n,e);}_let(e,t){let n=null;if(null!==e.value){if(n=this.evalExpression(e.value,t),null===n)return void console.error(`Invalid value for variable ${e.name}. Line ${e.line}`);e.value instanceof we||(n=n.clone());}else {const s=e.type.name;if('f32'===s||'i32'===s||'u32'===s||'bool'===s||'f16'===s||'vec2'===s||'vec3'===s||'vec4'===s||'vec2f'===s||'vec3f'===s||'vec4f'===s||'vec2i'===s||'vec3i'===s||'vec4i'===s||'vec2u'===s||'vec3u'===s||'vec4u'===s||'vec2h'===s||'vec3h'===s||'vec4h'===s||'vec2b'===s||'vec3b'===s||'vec4b'===s||'mat2x2'===s||'mat2x3'===s||'mat2x4'===s||'mat3x2'===s||'mat3x3'===s||'mat3x4'===s||'mat4x2'===s||'mat4x3'===s||'mat4x4'===s||'mat2x2f'===s||'mat2x3f'===s||'mat2x4f'===s||'mat3x2f'===s||'mat3x3f'===s||'mat3x4f'===s||'mat4x2f'===s||'mat4x3f'===s||'mat4x4f'===s||'mat2x2h'===s||'mat2x3h'===s||'mat2x4h'===s||'mat3x2h'===s||'mat3x3h'===s||'mat3x4h'===s||'mat4x2h'===s||'mat4x3h'===s||'mat4x4h'===s||'array'===s){const s=new pe(e.type,[]);n=this._evalCreate(s,t);}}t.createVariable(e.name,n,e);}_var(e,t){let n=null;if(null!==e.value){if(n=this.evalExpression(e.value,t),null===n)return void console.error(`Invalid value for variable ${e.name}. Line ${e.line}`);e.value instanceof we||(n=n.clone());}else {if(null===e.type)return void console.error(`Variable ${e.name} has no type. Line ${e.line}`);const s=e.type.name;if('f32'===s||'i32'===s||'u32'===s||'bool'===s||'f16'===s||'vec2'===s||'vec3'===s||'vec4'===s||'vec2f'===s||'vec3f'===s||'vec4f'===s||'vec2i'===s||'vec3i'===s||'vec4i'===s||'vec2u'===s||'vec3u'===s||'vec4u'===s||'vec2h'===s||'vec3h'===s||'vec4h'===s||'vec2b'===s||'vec3b'===s||'vec4b'===s||'mat2x2'===s||'mat2x3'===s||'mat2x4'===s||'mat3x2'===s||'mat3x3'===s||'mat3x4'===s||'mat4x2'===s||'mat4x3'===s||'mat4x4'===s||'mat2x2f'===s||'mat2x3f'===s||'mat2x4f'===s||'mat3x2f'===s||'mat3x3f'===s||'mat3x4f'===s||'mat4x2f'===s||'mat4x3f'===s||'mat4x4f'===s||'mat2x2h'===s||'mat2x3h'===s||'mat2x4h'===s||'mat3x2h'===s||'mat3x3h'===s||'mat3x4h'===s||'mat4x2h'===s||'mat4x3h'===s||'mat4x4h'===s||e.type instanceof ce||e.type instanceof ie||e.type instanceof oe){const s=new pe(e.type,[]);n=this._evalCreate(s,t);}}t.createVariable(e.name,n,e);}_switch(e,t){t=t.clone();const n=this.evalExpression(e.condition,t);if(!(n instanceof Oe))return console.error(`Invalid if condition. Line ${e.line}`),null;let s=null;for(const r of e.cases)if(r instanceof Se)for(const a of r.selectors){if(a instanceof Te){s=r;continue}const i=this.evalExpression(a,t);if(!(i instanceof Oe))return console.error(`Invalid case selector. Line ${e.line}`),null;if(i.value===n.value)return this._execStatements(r.body,t)}else r instanceof Ae&&(s=r);return s?this._execStatements(s.body,t):null}_if(e,t){t=t.clone();const n=this.evalExpression(e.condition,t);if(!(n instanceof Oe))return console.error(`Invalid if condition. Line ${e.line}`),null;if(n.value)return this._execStatements(e.body,t);for(const n of e.elseif){const s=this.evalExpression(n.condition,t);if(!(s instanceof Oe))return console.error(`Invalid if condition. Line ${e.line}`),null;if(s.value)return this._execStatements(n.body,t)}return e.else?this._execStatements(e.else,t):null}_getScalarValue(e){return e instanceof Oe?e.value:(console.error('Expected scalar value.',e),0)}_for(e,t){for(t=t.clone(),this.execStatement(e.init,t);this._getScalarValue(this.evalExpression(e.condition,t));){const n=this._execStatements(e.body,t);if(n===pt._breakObj)break;if(null!==n&&n!==pt._continueObj)return n;this.execStatement(e.increment,t);}return null}_loop(e,t){for(t=t.clone();;){const n=this._execStatements(e.body,t);if(n===pt._breakObj)break;if(n===pt._continueObj){if(e.continuing){if(this._execStatements(e.continuing.body,t)===pt._breakObj)break}}else if(null!==n)return n}return null}_while(e,t){for(t=t.clone();this._getScalarValue(this.evalExpression(e.condition,t));){const n=this._execStatements(e.body,t);if(n===pt._breakObj)break;if(n!==pt._continueObj&&null!==n)return n}return null}_evalBitcast(e,t){const n=this.evalExpression(e.value,t),s=e.type;if(n instanceof Oe){const e=tt(n.value,n.typeInfo.name,s.name);return new Oe(e,this.getTypeInfo(s))}if(n instanceof Fe){const t=n.typeInfo.getTypeName();let r='';if(t.endsWith('f'))r='f32';else if(t.endsWith('i'))r='i32';else if(t.endsWith('u'))r='u32';else if(t.endsWith('b'))r='bool';else {if(!t.endsWith('h'))return console.error(`Unknown vector type ${t}. Line ${e.line}`),null;r='f16';}const a=s.getTypeName();let i='';if(a.endsWith('f'))i='f32';else if(a.endsWith('i'))i='i32';else if(a.endsWith('u'))i='u32';else if(a.endsWith('b'))i='bool';else {if(!a.endsWith('h'))return console.error(`Unknown vector type ${i}. Line ${e.line}`),null;i='f16';}const o=function(e,t,n){if(t===n)return e;const s=new Array(e.length);for(let r=0;r<e.length;r++)s[r]=tt(e[r],t,n);return s}(Array.from(n.data),r,i);return new Fe(o,this.getTypeInfo(s))}return console.error(`TODO: bitcast for ${n.typeInfo.name}. Line ${e.line}`),null}_evalConst(e,t){return t.getVariableValue(e.name).clone().getSubData(this,e.postfix,t)}_evalCreate(e,t){var r;if(e instanceof pe){if(null===e.type)return Ne.void;switch(e.type.getTypeName()){case 'bool':case 'i32':case 'u32':case 'f32':case 'f16':return this._callConstructorValue(e,t);case 'vec2':case 'vec3':case 'vec4':case 'vec2f':case 'vec3f':case 'vec4f':case 'vec2h':case 'vec3h':case 'vec4h':case 'vec2i':case 'vec3i':case 'vec4i':case 'vec2u':case 'vec3u':case 'vec4u':case 'vec2b':case 'vec3b':case 'vec4b':return this._callConstructorVec(e,t);case 'mat2x2':case 'mat2x2f':case 'mat2x2h':case 'mat2x3':case 'mat2x3f':case 'mat2x3h':case 'mat2x4':case 'mat2x4f':case 'mat2x4h':case 'mat3x2':case 'mat3x2f':case 'mat3x2h':case 'mat3x3':case 'mat3x3f':case 'mat3x3h':case 'mat3x4':case 'mat3x4f':case 'mat3x4h':case 'mat4x2':case 'mat4x2f':case 'mat4x2h':case 'mat4x3':case 'mat4x3f':case 'mat4x3h':case 'mat4x4':case 'mat4x4f':case 'mat4x4h':return this._callConstructorMatrix(e,t)}}const a=e instanceof pe?e.type.name:e.name,i=e instanceof pe?this.getTypeInfo(e.type):this.getTypeInfo(e.name);if(null===i)return console.error(`Unknown type ${a}. Line ${e.line}`),null;if(0===i.size)return null;const o=new Ue(new ArrayBuffer(i.size),i,0);if(i instanceof n){if(e.args)for(let n=0;n<e.args.length;++n){const s=i.members[n],r=e.args[n],a=this.evalExpression(r,t);o.setData(this,a,s.type,s.offset,t);}}else if(i instanceof s){let n=0;if(e.args)for(let s=0;s<e.args.length;++s){const a=e.args[s],l=this.evalExpression(a,t);null===i.format&&('x32'===(null===(r=l.typeInfo)||undefined===r?undefined:r.name)?i.format=this.getTypeInfo('i32'):i.format=l.typeInfo),o.setData(this,l,i.format,n,t),n+=i.stride;}}else console.error(`Unknown type "${a}". Line ${e.line}`);return e instanceof pe?o.getSubData(this,e.postfix,t):o}_evalLiteral(e,t){const n=this.getTypeInfo(e.type),s=n.name;if('x32'===s||'u32'===s||'f32'===s||'f16'===s||'i32'===s||'bool'===s){return new Oe(e.scalarValue,n)}return 'vec2'===s||'vec3'===s||'vec4'===s||'vec2f'===s||'vec3f'===s||'vec4f'===s||'vec2h'===s||'vec3h'===s||'vec4h'===s||'vec2i'===s||'vec3i'===s||'vec4i'===s||'vec2u'===s||'vec3u'===s||'vec4u'===s?this._callConstructorVec(e,t):'mat2x2'===s||'mat2x3'===s||'mat2x4'===s||'mat3x2'===s||'mat3x3'===s||'mat3x4'===s||'mat4x2'===s||'mat4x3'===s||'mat4x4'===s||'mat2x2f'===s||'mat2x3f'===s||'mat2x4f'===s||'mat3x2f'===s||'mat3x3f'===s||'mat3x4f'===s||'mat4x2f'===s||'mat4x3f'===s||'mat4x4f'===s||'mat2x2h'===s||'mat2x3h'===s||'mat2x4h'===s||'mat3x2h'===s||'mat3x3h'===s||'mat3x4h'===s||'mat4x2h'===s||'mat4x3h'===s||'mat4x4h'===s?this._callConstructorMatrix(e,t):e.value}_evalVariable(e,t){const n=t.getVariableValue(e.name);return null===n?n:n.getSubData(this,e.postfix,t)}_maxFormatTypeInfo(e){let t=e[0];if('f32'===t.name)return t;for(let n=1;n<e.length;++n){const s=pt._priority.get(t.name);pt._priority.get(e[n].name)<s&&(t=e[n]);}return 'x32'===t.name?this.getTypeInfo('i32'):t}_evalUnaryOp(e,t){const n=this.evalExpression(e.right,t);if('&'===e.operator)return new Ve(n);if('*'===e.operator)return n instanceof Ve?n.reference.getSubData(this,e.postfix,t):(console.error(`Invalid dereference. Line ${e.line}`),null);const s=n instanceof Oe?n.value:n instanceof Fe?Array.from(n.data):null;switch(e.operator){case '+':{if(Re(s)){const e=s.map(((e,t)=>+e));return new Fe(e,n.typeInfo)}const e=s,t=this._maxFormatTypeInfo([n.typeInfo,n.typeInfo]);return new Oe(+e,t)}case '-':{if(Re(s)){const e=s.map(((e,t)=>-e));return new Fe(e,n.typeInfo)}const e=s,t=this._maxFormatTypeInfo([n.typeInfo,n.typeInfo]);return new Oe(-e,t)}case '!':{if(Re(s)){const e=s.map(((e,t)=>e?0:1));return new Fe(e,n.typeInfo)}const e=s,t=this._maxFormatTypeInfo([n.typeInfo,n.typeInfo]);return new Oe(e?0:1,t)}case '~':{if(Re(s)){const e=s.map(((e,t)=>~e));return new Fe(e,n.typeInfo)}const e=s,t=this._maxFormatTypeInfo([n.typeInfo,n.typeInfo]);return new Oe(~e,t)}}return console.error(`Invalid unary operator ${e.operator}. Line ${e.line}`),null}_evalBinaryOp(e,t){const n=this.evalExpression(e.left,t),s=this.evalExpression(e.right,t),r=n instanceof Oe?n.value:n instanceof Fe||n instanceof Me?Array.from(n.data):null,a=s instanceof Oe?s.value:s instanceof Fe||s instanceof Me?Array.from(s.data):null;switch(e.operator){case '+':{if(Re(r)&&Re(a)){const t=r,s=a;if(t.length!==s.length)return console.error(`Vector length mismatch. Line ${e.line}.`),null;const i=t.map(((e,t)=>e+s[t]));return new Fe(i,n.typeInfo)}if(Re(r)){const e=a,t=r.map(((t,n)=>t+e));return new Fe(t,n.typeInfo)}if(Re(a)){const e=r,t=a.map(((t,n)=>e+t));return new Fe(t,s.typeInfo)}const t=r,i=a,o=this._maxFormatTypeInfo([n.typeInfo,s.typeInfo]);return new Oe(t+i,o)}case '-':{if(Re(r)&&Re(a)){const t=r,s=a;if(t.length!==s.length)return console.error(`Vector length mismatch. Line ${e.line}.`),null;const i=t.map(((e,t)=>e-s[t]));return new Fe(i,n.typeInfo)}if(Re(r)){const e=a,t=r.map(((t,n)=>t-e));return new Fe(t,n.typeInfo)}if(Re(a)){const e=r,t=a.map(((t,n)=>e-t));return new Fe(t,s.typeInfo)}const t=r,i=a,o=this._maxFormatTypeInfo([n.typeInfo,s.typeInfo]);return new Oe(t-i,o)}case '*':{if(Re(r)&&Re(a)){const t=r,i=a;if(n instanceof Me&&s instanceof Me){const r=function(e,t,n,s){if(undefined===ft[t.name]||undefined===ft[s.name])return null;const r=ft[t.name][0],a=ft[t.name][1],i=ft[s.name][0];if(r!==ft[s.name][1])return null;const o=new Array(i*a);for(let t=0;t<a;t++)for(let s=0;s<i;s++){let l=0;for(let i=0;i<r;i++)l+=e[i*a+t]*n[s*r+i];o[t*i+s]=l;}return o}(t,n.typeInfo,i,s.typeInfo);if(null===r)return console.error(`Matrix multiplication failed. Line ${e.line}.`),null;const a=ft[s.typeInfo.name][0],o=ft[n.typeInfo.name][1],l=this.getTypeInfo(`mat${a}x${o}f`);return new Me(r,l)}if(n instanceof Me&&s instanceof Fe){const r=function(e,t,n,s){if(undefined===ft[t.name]||undefined===ht[s.name])return null;const r=ft[t.name][0],a=ft[t.name][1];if(r!==n.length)return null;const i=new Array(a);for(let t=0;t<a;t++){let s=0;for(let i=0;i<r;i++)s+=e[i*a+t]*n[i];i[t]=s;}return i}(t,n.typeInfo,i,s.typeInfo);return null===r?(console.error(`Matrix vector multiplication failed. Line ${e.line}.`),null):new Fe(r,s.typeInfo)}if(n instanceof Fe&&s instanceof Me){const r=function(e,t,n,s){if(undefined===ht[t.name]||undefined===ft[s.name])return null;const r=ft[s.name][0],a=ft[s.name][1];if(a!==e.length)return null;const i=[];for(let t=0;t<r;t++){let s=0;for(let i=0;i<a;i++)s+=e[i]*n[i*r+t];i[t]=s;}return i}(t,n.typeInfo,i,s.typeInfo);return null===r?(console.error(`Matrix vector multiplication failed. Line ${e.line}.`),null):new Fe(r,n.typeInfo)}{if(t.length!==i.length)return console.error(`Vector length mismatch. Line ${e.line}.`),null;const s=t.map(((e,t)=>e*i[t]));return new Fe(s,n.typeInfo)}}if(Re(r)){const e=a,t=r.map(((t,n)=>t*e));return n instanceof Me?new Me(t,n.typeInfo):new Fe(t,n.typeInfo)}if(Re(a)){const e=r,t=a.map(((t,n)=>e*t));return s instanceof Me?new Me(t,s.typeInfo):new Fe(t,s.typeInfo)}const t=r,i=a,o=this._maxFormatTypeInfo([n.typeInfo,s.typeInfo]);return new Oe(t*i,o)}case '%':{if(Re(r)&&Re(a)){const t=r,s=a;if(t.length!==s.length)return console.error(`Vector length mismatch. Line ${e.line}.`),null;const i=t.map(((e,t)=>e%s[t]));return new Fe(i,n.typeInfo)}if(Re(r)){const e=a,t=r.map(((t,n)=>t%e));return new Fe(t,n.typeInfo)}if(Re(a)){const e=r,t=a.map(((t,n)=>e%t));return new Fe(t,s.typeInfo)}const t=r,i=a,o=this._maxFormatTypeInfo([n.typeInfo,s.typeInfo]);return new Oe(t%i,o)}case '/':{if(Re(r)&&Re(a)){const t=r,s=a;if(t.length!==s.length)return console.error(`Vector length mismatch. Line ${e.line}.`),null;const i=t.map(((e,t)=>e/s[t]));return new Fe(i,n.typeInfo)}if(Re(r)){const e=a,t=r.map(((t,n)=>t/e));return new Fe(t,n.typeInfo)}if(Re(a)){const e=r,t=a.map(((t,n)=>e/t));return new Fe(t,s.typeInfo)}const t=r,i=a,o=this._maxFormatTypeInfo([n.typeInfo,s.typeInfo]);return new Oe(t/i,o)}case '&':{if(Re(r)&&Re(a)){const t=r,s=a;if(t.length!==s.length)return console.error(`Vector length mismatch. Line ${e.line}.`),null;const i=t.map(((e,t)=>e&s[t]));return new Fe(i,n.typeInfo)}if(Re(r)){const e=a,t=r.map(((t,n)=>t&e));return new Fe(t,n.typeInfo)}if(Re(a)){const e=r,t=a.map(((t,n)=>e&t));return new Fe(t,s.typeInfo)}const t=r,i=a,o=this._maxFormatTypeInfo([n.typeInfo,s.typeInfo]);return new Oe(t&i,o)}case '|':{if(Re(r)&&Re(a)){const t=r,s=a;if(t.length!==s.length)return console.error(`Vector length mismatch. Line ${e.line}.`),null;const i=t.map(((e,t)=>e|s[t]));return new Fe(i,n.typeInfo)}if(Re(r)){const e=a,t=r.map(((t,n)=>t|e));return new Fe(t,n.typeInfo)}if(Re(a)){const e=r,t=a.map(((t,n)=>e|t));return new Fe(t,s.typeInfo)}const t=r,i=a,o=this._maxFormatTypeInfo([n.typeInfo,s.typeInfo]);return new Oe(t|i,o)}case '^':{if(Re(r)&&Re(a)){const t=r,s=a;if(t.length!==s.length)return console.error(`Vector length mismatch. Line ${e.line}.`),null;const i=t.map(((e,t)=>e^s[t]));return new Fe(i,n.typeInfo)}if(Re(r)){const e=a,t=r.map(((t,n)=>t^e));return new Fe(t,n.typeInfo)}if(Re(a)){const e=r,t=a.map(((t,n)=>e^t));return new Fe(t,s.typeInfo)}const t=r,i=a,o=this._maxFormatTypeInfo([n.typeInfo,s.typeInfo]);return new Oe(t^i,o)}case '<<':{if(Re(r)&&Re(a)){const t=r,s=a;if(t.length!==s.length)return console.error(`Vector length mismatch. Line ${e.line}.`),null;const i=t.map(((e,t)=>e<<s[t]));return new Fe(i,n.typeInfo)}if(Re(r)){const e=a,t=r.map(((t,n)=>t<<e));return new Fe(t,n.typeInfo)}if(Re(a)){const e=r,t=a.map(((t,n)=>e<<t));return new Fe(t,s.typeInfo)}const t=r,i=a,o=this._maxFormatTypeInfo([n.typeInfo,s.typeInfo]);return new Oe(t<<i,o)}case '>>':{if(Re(r)&&Re(a)){const t=r,s=a;if(t.length!==s.length)return console.error(`Vector length mismatch. Line ${e.line}.`),null;const i=t.map(((e,t)=>e>>s[t]));return new Fe(i,n.typeInfo)}if(Re(r)){const e=a,t=r.map(((t,n)=>t>>e));return new Fe(t,n.typeInfo)}if(Re(a)){const e=r,t=a.map(((t,n)=>e>>t));return new Fe(t,s.typeInfo)}const t=r,i=a,o=this._maxFormatTypeInfo([n.typeInfo,s.typeInfo]);return new Oe(t>>i,o)}case '>':if(Re(r)&&Re(a)){const t=r,s=a;if(t.length!==s.length)return console.error(`Vector length mismatch. Line ${e.line}.`),null;const i=t.map(((e,t)=>e>s[t]?1:0));return new Fe(i,n.typeInfo)}if(Re(r)){const e=a,t=r.map(((t,n)=>t>e?1:0));return new Fe(t,n.typeInfo)}if(Re(a)){const e=r,t=a.map(((t,n)=>e>t?1:0));return new Fe(t,s.typeInfo)}return new Oe(r>a?1:0,this.getTypeInfo('bool'));case '<':if(Re(r)&&Re(a)){const t=r,s=a;if(t.length!==s.length)return console.error(`Vector length mismatch. Line ${e.line}.`),null;const i=t.map(((e,t)=>e<s[t]?1:0));return new Fe(i,n.typeInfo)}if(Re(r)){const e=a,t=r.map(((t,n)=>t<e?1:0));return new Fe(t,n.typeInfo)}if(Re(a)){const e=r,t=a.map(((t,n)=>e<t?1:0));return new Fe(t,s.typeInfo)}return new Oe(r<a?1:0,this.getTypeInfo('bool'));case '==':if(Re(r)&&Re(a)){const t=r,s=a;if(t.length!==s.length)return console.error(`Vector length mismatch. Line ${e.line}.`),null;const i=t.map(((e,t)=>e===s[t]?1:0));return new Fe(i,n.typeInfo)}if(Re(r)){const e=a,t=r.map(((t,n)=>t==e?1:0));return new Fe(t,n.typeInfo)}if(Re(a)){const e=r,t=a.map(((t,n)=>e==t?1:0));return new Fe(t,s.typeInfo)}return new Oe(r===a?1:0,this.getTypeInfo('bool'));case '!=':if(Re(r)&&Re(a)){const t=r,s=a;if(t.length!==s.length)return console.error(`Vector length mismatch. Line ${e.line}.`),null;const i=t.map(((e,t)=>e!==s[t]?1:0));return new Fe(i,n.typeInfo)}if(Re(r)){const e=a,t=r.map(((t,n)=>t!==e?1:0));return new Fe(t,n.typeInfo)}if(Re(a)){const e=r,t=a.map(((t,n)=>e!==t?1:0));return new Fe(t,s.typeInfo)}return new Oe(r!==a?1:0,this.getTypeInfo('bool'));case '>=':if(Re(r)&&Re(a)){const t=r,s=a;if(t.length!==s.length)return console.error(`Vector length mismatch. Line ${e.line}.`),null;const i=t.map(((e,t)=>e>=s[t]?1:0));return new Fe(i,n.typeInfo)}if(Re(r)){const e=a,t=r.map(((t,n)=>t>=e?1:0));return new Fe(t,n.typeInfo)}if(Re(a)){const e=r,t=a.map(((t,n)=>e>=t?1:0));return new Fe(t,s.typeInfo)}return new Oe(r>=a?1:0,this.getTypeInfo('bool'));case '<=':if(Re(r)&&Re(a)){const t=r,s=a;if(t.length!==s.length)return console.error(`Vector length mismatch. Line ${e.line}.`),null;const i=t.map(((e,t)=>e<=s[t]?1:0));return new Fe(i,n.typeInfo)}if(Re(r)){const e=a,t=r.map(((t,n)=>t<=e?1:0));return new Fe(t,n.typeInfo)}if(Re(a)){const e=r,t=a.map(((t,n)=>e<=t?1:0));return new Fe(t,s.typeInfo)}return new Oe(r<=a?1:0,this.getTypeInfo('bool'));case '&&':if(Re(r)&&Re(a)){const t=r,s=a;if(t.length!==s.length)return console.error(`Vector length mismatch. Line ${e.line}.`),null;const i=t.map(((e,t)=>e&&s[t]?1:0));return new Fe(i,n.typeInfo)}if(Re(r)){const e=a,t=r.map(((t,n)=>t&&e?1:0));return new Fe(t,n.typeInfo)}if(Re(a)){const e=r,t=a.map(((t,n)=>e&&t?1:0));return new Fe(t,s.typeInfo)}return new Oe(r&&a?1:0,this.getTypeInfo('bool'));case '||':if(Re(r)&&Re(a)){const t=r,s=a;if(t.length!==s.length)return console.error(`Vector length mismatch. Line ${e.line}.`),null;const i=t.map(((e,t)=>e||s[t]?1:0));return new Fe(i,n.typeInfo)}if(Re(r)){const e=a,t=r.map(((t,n)=>t||e?1:0));return new Fe(t,n.typeInfo)}if(Re(a)){const e=r,t=a.map(((t,n)=>e||t?1:0));return new Fe(t,s.typeInfo)}return new Oe(r||a?1:0,this.getTypeInfo('bool'))}return console.error(`Unknown operator ${e.operator}. Line ${e.line}`),null}_evalCall(e,t){if(null!==e.cachedReturnValue)return e.cachedReturnValue;const n=t.clone();n.currentFunctionName=e.name;const s=t.getFunction(e.name);if(!s){if(e.isBuiltin)return this._callBuiltinFunction(e,n);return this.getTypeInfo(e.name)?this._evalCreate(e,t):(console.error(`Unknown function "${e.name}". Line ${e.line}`),null)}for(let t=0;t<s.node.args.length;++t){const r=s.node.args[t],a=this.evalExpression(e.args[t],n);n.createVariable(r.name,a,r);}return this._execStatements(s.node.body,n)}_callBuiltinFunction(e,t){switch(e.name){case 'all':return this.builtins.All(e,t);case 'any':return this.builtins.Any(e,t);case 'select':return this.builtins.Select(e,t);case 'arrayLength':return this.builtins.ArrayLength(e,t);case 'abs':return this.builtins.Abs(e,t);case 'acos':return this.builtins.Acos(e,t);case 'acosh':return this.builtins.Acosh(e,t);case 'asin':return this.builtins.Asin(e,t);case 'asinh':return this.builtins.Asinh(e,t);case 'atan':return this.builtins.Atan(e,t);case 'atanh':return this.builtins.Atanh(e,t);case 'atan2':return this.builtins.Atan2(e,t);case 'ceil':return this.builtins.Ceil(e,t);case 'clamp':return this.builtins.Clamp(e,t);case 'cos':return this.builtins.Cos(e,t);case 'cosh':return this.builtins.Cosh(e,t);case 'countLeadingZeros':return this.builtins.CountLeadingZeros(e,t);case 'countOneBits':return this.builtins.CountOneBits(e,t);case 'countTrailingZeros':return this.builtins.CountTrailingZeros(e,t);case 'cross':return this.builtins.Cross(e,t);case 'degrees':return this.builtins.Degrees(e,t);case 'determinant':return this.builtins.Determinant(e,t);case 'distance':return this.builtins.Distance(e,t);case 'dot':return this.builtins.Dot(e,t);case 'dot4U8Packed':return this.builtins.Dot4U8Packed(e,t);case 'dot4I8Packed':return this.builtins.Dot4I8Packed(e,t);case 'exp':return this.builtins.Exp(e,t);case 'exp2':return this.builtins.Exp2(e,t);case 'extractBits':return this.builtins.ExtractBits(e,t);case 'faceForward':return this.builtins.FaceForward(e,t);case 'firstLeadingBit':return this.builtins.FirstLeadingBit(e,t);case 'firstTrailingBit':return this.builtins.FirstTrailingBit(e,t);case 'floor':return this.builtins.Floor(e,t);case 'fma':return this.builtins.Fma(e,t);case 'fract':return this.builtins.Fract(e,t);case 'frexp':return this.builtins.Frexp(e,t);case 'insertBits':return this.builtins.InsertBits(e,t);case 'inverseSqrt':return this.builtins.InverseSqrt(e,t);case 'ldexp':return this.builtins.Ldexp(e,t);case 'length':return this.builtins.Length(e,t);case 'log':return this.builtins.Log(e,t);case 'log2':return this.builtins.Log2(e,t);case 'max':return this.builtins.Max(e,t);case 'min':return this.builtins.Min(e,t);case 'mix':return this.builtins.Mix(e,t);case 'modf':return this.builtins.Modf(e,t);case 'normalize':return this.builtins.Normalize(e,t);case 'pow':return this.builtins.Pow(e,t);case 'quantizeToF16':return this.builtins.QuantizeToF16(e,t);case 'radians':return this.builtins.Radians(e,t);case 'reflect':return this.builtins.Reflect(e,t);case 'refract':return this.builtins.Refract(e,t);case 'reverseBits':return this.builtins.ReverseBits(e,t);case 'round':return this.builtins.Round(e,t);case 'saturate':return this.builtins.Saturate(e,t);case 'sign':return this.builtins.Sign(e,t);case 'sin':return this.builtins.Sin(e,t);case 'sinh':return this.builtins.Sinh(e,t);case 'smoothStep':return this.builtins.SmoothStep(e,t);case 'sqrt':return this.builtins.Sqrt(e,t);case 'step':return this.builtins.Step(e,t);case 'tan':return this.builtins.Tan(e,t);case 'tanh':return this.builtins.Tanh(e,t);case 'transpose':return this.builtins.Transpose(e,t);case 'trunc':return this.builtins.Trunc(e,t);case 'dpdx':return this.builtins.Dpdx(e,t);case 'dpdxCoarse':return this.builtins.DpdxCoarse(e,t);case 'dpdxFine':return this.builtins.DpdxFine(e,t);case 'dpdy':return this.builtins.Dpdy(e,t);case 'dpdyCoarse':return this.builtins.DpdyCoarse(e,t);case 'dpdyFine':return this.builtins.DpdyFine(e,t);case 'fwidth':return this.builtins.Fwidth(e,t);case 'fwidthCoarse':return this.builtins.FwidthCoarse(e,t);case 'fwidthFine':return this.builtins.FwidthFine(e,t);case 'textureDimensions':return this.builtins.TextureDimensions(e,t);case 'textureGather':return this.builtins.TextureGather(e,t);case 'textureGatherCompare':return this.builtins.TextureGatherCompare(e,t);case 'textureLoad':return this.builtins.TextureLoad(e,t);case 'textureNumLayers':return this.builtins.TextureNumLayers(e,t);case 'textureNumLevels':return this.builtins.TextureNumLevels(e,t);case 'textureNumSamples':return this.builtins.TextureNumSamples(e,t);case 'textureSample':return this.builtins.TextureSample(e,t);case 'textureSampleBias':return this.builtins.TextureSampleBias(e,t);case 'textureSampleCompare':return this.builtins.TextureSampleCompare(e,t);case 'textureSampleCompareLevel':return this.builtins.TextureSampleCompareLevel(e,t);case 'textureSampleGrad':return this.builtins.TextureSampleGrad(e,t);case 'textureSampleLevel':return this.builtins.TextureSampleLevel(e,t);case 'textureSampleBaseClampToEdge':return this.builtins.TextureSampleBaseClampToEdge(e,t);case 'textureStore':return this.builtins.TextureStore(e,t);case 'atomicLoad':return this.builtins.AtomicLoad(e,t);case 'atomicStore':return this.builtins.AtomicStore(e,t);case 'atomicAdd':return this.builtins.AtomicAdd(e,t);case 'atomicSub':return this.builtins.AtomicSub(e,t);case 'atomicMax':return this.builtins.AtomicMax(e,t);case 'atomicMin':return this.builtins.AtomicMin(e,t);case 'atomicAnd':return this.builtins.AtomicAnd(e,t);case 'atomicOr':return this.builtins.AtomicOr(e,t);case 'atomicXor':return this.builtins.AtomicXor(e,t);case 'atomicExchange':return this.builtins.AtomicExchange(e,t);case 'atomicCompareExchangeWeak':return this.builtins.AtomicCompareExchangeWeak(e,t);case 'pack4x8snorm':return this.builtins.Pack4x8snorm(e,t);case 'pack4x8unorm':return this.builtins.Pack4x8unorm(e,t);case 'pack4xI8':return this.builtins.Pack4xI8(e,t);case 'pack4xU8':return this.builtins.Pack4xU8(e,t);case 'pack4x8Clamp':return this.builtins.Pack4x8Clamp(e,t);case 'pack4xU8Clamp':return this.builtins.Pack4xU8Clamp(e,t);case 'pack2x16snorm':return this.builtins.Pack2x16snorm(e,t);case 'pack2x16unorm':return this.builtins.Pack2x16unorm(e,t);case 'pack2x16float':return this.builtins.Pack2x16float(e,t);case 'unpack4x8snorm':return this.builtins.Unpack4x8snorm(e,t);case 'unpack4x8unorm':return this.builtins.Unpack4x8unorm(e,t);case 'unpack4xI8':return this.builtins.Unpack4xI8(e,t);case 'unpack4xU8':return this.builtins.Unpack4xU8(e,t);case 'unpack2x16snorm':return this.builtins.Unpack2x16snorm(e,t);case 'unpack2x16unorm':return this.builtins.Unpack2x16unorm(e,t);case 'unpack2x16float':return this.builtins.Unpack2x16float(e,t);case 'storageBarrier':return this.builtins.StorageBarrier(e,t);case 'textureBarrier':return this.builtins.TextureBarrier(e,t);case 'workgroupBarrier':return this.builtins.WorkgroupBarrier(e,t);case 'workgroupUniformLoad':return this.builtins.WorkgroupUniformLoad(e,t);case 'subgroupAdd':return this.builtins.SubgroupAdd(e,t);case 'subgroupExclusiveAdd':return this.builtins.SubgroupExclusiveAdd(e,t);case 'subgroupInclusiveAdd':return this.builtins.SubgroupInclusiveAdd(e,t);case 'subgroupAll':return this.builtins.SubgroupAll(e,t);case 'subgroupAnd':return this.builtins.SubgroupAnd(e,t);case 'subgroupAny':return this.builtins.SubgroupAny(e,t);case 'subgroupBallot':return this.builtins.SubgroupBallot(e,t);case 'subgroupBroadcast':return this.builtins.SubgroupBroadcast(e,t);case 'subgroupBroadcastFirst':return this.builtins.SubgroupBroadcastFirst(e,t);case 'subgroupElect':return this.builtins.SubgroupElect(e,t);case 'subgroupMax':return this.builtins.SubgroupMax(e,t);case 'subgroupMin':return this.builtins.SubgroupMin(e,t);case 'subgroupMul':return this.builtins.SubgroupMul(e,t);case 'subgroupExclusiveMul':return this.builtins.SubgroupExclusiveMul(e,t);case 'subgroupInclusiveMul':return this.builtins.SubgroupInclusiveMul(e,t);case 'subgroupOr':return this.builtins.SubgroupOr(e,t);case 'subgroupShuffle':return this.builtins.SubgroupShuffle(e,t);case 'subgroupShuffleDown':return this.builtins.SubgroupShuffleDown(e,t);case 'subgroupShuffleUp':return this.builtins.SubgroupShuffleUp(e,t);case 'subgroupShuffleXor':return this.builtins.SubgroupShuffleXor(e,t);case 'subgroupXor':return this.builtins.SubgroupXor(e,t);case 'quadBroadcast':return this.builtins.QuadBroadcast(e,t);case 'quadSwapDiagonal':return this.builtins.QuadSwapDiagonal(e,t);case 'quadSwapX':return this.builtins.QuadSwapX(e,t);case 'quadSwapY':return this.builtins.QuadSwapY(e,t)}const n=t.getFunction(e.name);if(n){const s=t.clone();for(let t=0;t<n.node.args.length;++t){const r=n.node.args[t],a=this.evalExpression(e.args[t],s);s.setVariable(r.name,a,r);}return this._execStatements(n.node.body,s)}return null}_callConstructorValue(e,t){if(!e.args||0===e.args.length)return new Oe(0,this.getTypeInfo(e.type));const n=this.evalExpression(e.args[0],t);return n.typeInfo=this.getTypeInfo(e.type),n.getSubData(this,e.postfix,t).clone()}_callConstructorVec(e,t){const n=this.getTypeInfo(e.type),s=e.type.getTypeName(),r=ht[s];if(undefined===r)return console.error(`Invalid vec constructor ${s}. Line ${e.line}`),null;const a=[];if(e instanceof ge)if(e.isVector){const t=e.vectorValue;for(const e of t)a.push(e);}else a.push(e.scalarValue);else if(e.args)for(const n of e.args){const e=this.evalExpression(n,t);if(e instanceof Fe){const t=e.data;for(let e=0;e<t.length;++e){let n=t[e];a.push(n);}}else if(e instanceof Oe){let t=e.value;a.push(t);}}if(e.type instanceof oe&&null===e.type.format&&(e.type.format=oe.f32),0===a.length){const s=new Array(r).fill(0);return new Fe(s,n).getSubData(this,e.postfix,t)}if(1===a.length)for(;a.length<r;)a.push(a[0]);if(a.length<r)return console.error(`Invalid vec constructor. Line ${e.line}`),null;return new Fe(a.length>r?a.slice(0,r):a,n).getSubData(this,e.postfix,t)}_callConstructorMatrix(e,t){const n=this.getTypeInfo(e.type),s=e.type.getTypeName(),r=ft[s];if(undefined===r)return console.error(`Invalid matrix constructor ${s}. Line ${e.line}`),null;const i=[];if(e instanceof ge)if(e.isVector){const t=e.vectorValue;for(const e of t)i.push(e);}else i.push(e.scalarValue);else if(e.args)for(const n of e.args){const e=this.evalExpression(n,t);e instanceof Fe?i.push(...e.data):e instanceof Oe?i.push(e.value):e instanceof Me&&i.push(...e.data);}if(n instanceof a&&null===n.format&&(n.format=this.getTypeInfo('f32')),0===i.length){const s=new Array(r[2]).fill(0);return new Me(s,n).getSubData(this,e.postfix,t)}return i.length!==r[2]?(console.error(`Invalid matrix constructor. Line ${e.line}`),null):new Me(i,n).getSubData(this,e.postfix,t)}}pt._breakObj=new De(new e('BREAK',null),null),pt._continueObj=new De(new e('CONTINUE',null),null),pt._priority=new Map([['f32',0],['f16',1],['u32',2],['i32',3],['x32',3]]);class dt{constructor(){this.constants=new Map,this.aliases=new Map,this.structs=new Map;}}class mt{constructor(){this._tokens=[],this._current=0,this._currentLine=1,this._deferArrayCountEval=[],this._currentLoop=[],this._context=new dt,this._exec=new pt,this._forwardTypeCount=0;}parse(e){this._initialize(e),this._deferArrayCountEval.length=0;const t=[];for(;!this._isAtEnd();){const e=this._global_decl_or_directive();if(!e)break;t.push(e);}if(this._deferArrayCountEval.length>0){for(const e of this._deferArrayCountEval){const t=e.arrayType,n=e.countNode;if(n instanceof me){const e=n.name,s=this._context.constants.get(e);if(s)try{const e=s.constEvaluate(this._exec);t.count=e;}catch(e){}}}this._deferArrayCountEval.length=0;}if(this._forwardTypeCount>0)for(const e of t)e.search((e=>{e instanceof Le||e instanceof le?e.type=this._forwardType(e.type):e instanceof ce?e.format=this._forwardType(e.format):e instanceof B||e instanceof M||e instanceof U?e.type=this._forwardType(e.type):e instanceof C?e.returnType=this._forwardType(e.returnType):e instanceof Ee&&(e.type=this._forwardType(e.type));}));return t}_forwardType(e){if(e instanceof ae){const t=this._getType(e.name);if(t)return t}else e instanceof le?e.type=this._forwardType(e.type):e instanceof ce&&(e.format=this._forwardType(e.format));return e}_initialize(e){if(e)if('string'==typeof e){const t=new ze(e);this._tokens=t.scanTokens();}else this._tokens=e;else this._tokens=[];this._current=0;}_updateNode(e,t){return e.line=null!=t?t:this._currentLine,e}_error(e,t){return {token:e,message:t,toString:()=>`${t}`}}_isAtEnd(){return this._current>=this._tokens.length||this._peek().type==qe.eof}_match(e){if(e instanceof We)return !!this._check(e)&&(this._advance(),true);for(let t=0,n=e.length;t<n;++t){const n=e[t];if(this._check(n))return this._advance(),true}return  false}_consume(e,t){if(this._check(e))return this._advance();throw this._error(this._peek(),`${t}. Line:${this._currentLine}`)}_check(e){if(this._isAtEnd())return  false;const t=this._peek();if(e instanceof Array){const n=t.type;let s=false;for(const t of e){if(n===t)return  true;t===qe.tokens.name&&(s=true);}if(s){const e=qe.tokens.name.rule.exec(t.lexeme);if(e&&0==e.index&&e[0]==t.lexeme)return  true}return  false}if(t.type===e)return  true;if(e===qe.tokens.name){const e=qe.tokens.name.rule.exec(t.lexeme);return e&&0==e.index&&e[0]==t.lexeme}return  false}_advance(){var e,t;return this._currentLine=null!==(t=null===(e=this._peek())||undefined===e?undefined:e.line)&&undefined!==t?t:-1,this._isAtEnd()||this._current++,this._previous()}_peek(){return this._tokens[this._current]}_previous(){return this._tokens[this._current-1]}_global_decl_or_directive(){for(;this._match(qe.tokens.semicolon)&&!this._isAtEnd(););if(this._match(qe.keywords.alias)){const e=this._type_alias();return this._consume(qe.tokens.semicolon,'Expected \';\''),this._exec.reflection.updateAST([e]),e}if(this._match(qe.keywords.diagnostic)){const e=this._diagnostic();return this._consume(qe.tokens.semicolon,'Expected \';\''),this._exec.reflection.updateAST([e]),e}if(this._match(qe.keywords.requires)){const e=this._requires_directive();return this._consume(qe.tokens.semicolon,'Expected \';\''),this._exec.reflection.updateAST([e]),e}if(this._match(qe.keywords.enable)){const e=this._enable_directive();return this._consume(qe.tokens.semicolon,'Expected \';\''),this._exec.reflection.updateAST([e]),e}const e=this._attribute();if(this._check(qe.keywords.var)){const t=this._global_variable_decl();return null!=t&&(t.attributes=e),this._consume(qe.tokens.semicolon,'Expected \';\'.'),this._exec.reflection.updateAST([t]),t}if(this._check(qe.keywords.override)){const t=this._override_variable_decl();return null!=t&&(t.attributes=e),this._consume(qe.tokens.semicolon,'Expected \';\'.'),this._exec.reflection.updateAST([t]),t}if(this._check(qe.keywords.let)){const t=this._global_let_decl();return null!=t&&(t.attributes=e),this._consume(qe.tokens.semicolon,'Expected \';\'.'),this._exec.reflection.updateAST([t]),t}if(this._check(qe.keywords.const)){const t=this._global_const_decl();return null!=t&&(t.attributes=e),this._consume(qe.tokens.semicolon,'Expected \';\'.'),this._exec.reflection.updateAST([t]),t}if(this._check(qe.keywords.struct)){const t=this._struct_decl();return null!=t&&(t.attributes=e),this._exec.reflection.updateAST([t]),t}if(this._check(qe.keywords.fn)){const t=this._function_decl();return null!=t&&(t.attributes=e),this._exec.reflection.updateAST([t]),t}return null}_function_decl(){if(!this._match(qe.keywords.fn))return null;const e=this._currentLine,t=this._consume(qe.tokens.ident,'Expected function name.').toString();this._consume(qe.tokens.paren_left,'Expected \'(\' for function arguments.');const n=[];if(!this._check(qe.tokens.paren_right))do{if(this._check(qe.tokens.paren_right))break;const e=this._attribute(),t=this._consume(qe.tokens.name,'Expected argument name.').toString();this._consume(qe.tokens.colon,'Expected \':\' for argument type.');const s=this._attribute(),r=this._type_decl();null!=r&&(r.attributes=s,n.push(this._updateNode(new Ee(t,r,e))));}while(this._match(qe.tokens.comma));this._consume(qe.tokens.paren_right,'Expected \')\' after function arguments.');let s=null;if(this._match(qe.tokens.arrow)){const e=this._attribute();s=this._type_decl(),null!=s&&(s.attributes=e);}const r=this._compound_statement(),a=this._currentLine;return this._updateNode(new C(t,n,s,r,e,a),e)}_compound_statement(){const e=[];for(this._consume(qe.tokens.brace_left,'Expected \'{\' for block.');!this._check(qe.tokens.brace_right);){const t=this._statement();null!==t&&e.push(t);}return this._consume(qe.tokens.brace_right,'Expected \'}\' for block.'),e}_statement(){for(;this._match(qe.tokens.semicolon)&&!this._isAtEnd(););if(this._check(qe.tokens.attr)&&this._attribute(),this._check(qe.keywords.if))return this._if_statement();if(this._check(qe.keywords.switch))return this._switch_statement();if(this._check(qe.keywords.loop))return this._loop_statement();if(this._check(qe.keywords.for))return this._for_statement();if(this._check(qe.keywords.while))return this._while_statement();if(this._check(qe.keywords.continuing))return this._continuing_statement();if(this._check(qe.keywords.static_assert))return this._static_assert_statement();if(this._check(qe.tokens.brace_left))return this._compound_statement();let e=null;if(this._check(qe.keywords.return))e=this._return_statement();else if(this._check([qe.keywords.var,qe.keywords.let,qe.keywords.const]))e=this._variable_statement();else if(this._match(qe.keywords.discard))e=this._updateNode(new te);else if(this._match(qe.keywords.break)){const t=this._updateNode(new ne);if(this._currentLoop.length>0){const e=this._currentLoop[this._currentLoop.length-1];t.loopId=e.id;}e=t,this._check(qe.keywords.if)&&(this._advance(),t.condition=this._optional_paren_expression());}else if(this._match(qe.keywords.continue)){const t=this._updateNode(new se);if(!(this._currentLoop.length>0))throw this._error(this._peek(),`Continue statement must be inside a loop. Line: ${t.line}`);{const e=this._currentLoop[this._currentLoop.length-1];t.loopId=e.id;}e=t;}else e=this._increment_decrement_statement()||this._func_call_statement()||this._assignment_statement();return null!=e&&this._consume(qe.tokens.semicolon,'Expected \';\' after statement.'),e}_static_assert_statement(){if(!this._match(qe.keywords.static_assert))return null;const e=this._currentLine,t=this._optional_paren_expression();return this._updateNode(new D(t),e)}_while_statement(){if(!this._match(qe.keywords.while))return null;const e=this._updateNode(new N(null,null));return this._currentLoop.push(e),e.condition=this._optional_paren_expression(),this._check(qe.tokens.attr)&&this._attribute(),e.body=this._compound_statement(),this._currentLoop.pop(),e}_continuing_statement(){const e=this._currentLoop.length>0?this._currentLoop[this._currentLoop.length-1].id:-1;if(!this._match(qe.keywords.continuing))return null;const t=this._currentLine,n=this._compound_statement();return this._updateNode(new V(n,e),t)}_for_statement(){if(!this._match(qe.keywords.for))return null;this._consume(qe.tokens.paren_left,'Expected \'(\'.');const e=this._updateNode(new O(null,null,null,null));return this._currentLoop.push(e),e.init=this._check(qe.tokens.semicolon)?null:this._for_init(),this._consume(qe.tokens.semicolon,'Expected \';\'.'),e.condition=this._check(qe.tokens.semicolon)?null:this._short_circuit_or_expression(),this._consume(qe.tokens.semicolon,'Expected \';\'.'),e.increment=this._check(qe.tokens.paren_right)?null:this._for_increment(),this._consume(qe.tokens.paren_right,'Expected \')\'.'),this._check(qe.tokens.attr)&&this._attribute(),e.body=this._compound_statement(),this._currentLoop.pop(),e}_for_init(){return this._variable_statement()||this._func_call_statement()||this._assignment_statement()}_for_increment(){return this._func_call_statement()||this._increment_decrement_statement()||this._assignment_statement()}_variable_statement(){if(this._check(qe.keywords.var)){const e=this._variable_decl();if(null===e)throw this._error(this._peek(),'Variable declaration expected.');let t=null;return this._match(qe.tokens.equal)&&(t=this._short_circuit_or_expression()),this._updateNode(new B(e.name,e.type,e.storage,e.access,t),e.line)}if(this._match(qe.keywords.let)){const e=this._currentLine,t=this._consume(qe.tokens.name,'Expected name for let.').toString();let n=null;if(this._match(qe.tokens.colon)){const e=this._attribute();n=this._type_decl(),null!=n&&(n.attributes=e);}this._consume(qe.tokens.equal,'Expected \'=\' for let.');const s=this._short_circuit_or_expression();return this._updateNode(new M(t,n,null,null,s),e)}if(this._match(qe.keywords.const)){const e=this._currentLine,t=this._consume(qe.tokens.name,'Expected name for const.').toString();let n=null;if(this._match(qe.tokens.colon)){const e=this._attribute();n=this._type_decl(),null!=n&&(n.attributes=e);}this._consume(qe.tokens.equal,'Expected \'=\' for const.');const s=this._short_circuit_or_expression();return null===n&&s instanceof ge&&(n=s.type),this._updateNode(new U(t,n,null,null,s),e)}return null}_increment_decrement_statement(){const e=this._current,t=this._unary_expression();if(null==t)return null;if(!this._check(qe.increment_operators))return this._current=e,null;const n=this._consume(qe.increment_operators,'Expected increment operator');return this._updateNode(new z(n.type===qe.tokens.plus_plus?P.increment:P.decrement,t))}_assignment_statement(){let e=null;const t=this._currentLine;if(this._check(qe.tokens.brace_right))return null;let n=this._match(qe.tokens.underscore);if(n||(e=this._unary_expression()),!n&&null==e)return null;const s=this._consume(qe.assignment_operators,'Expected assignment operator.'),r=this._short_circuit_or_expression();return this._updateNode(new R(W.parse(s.lexeme),e,r),t)}_func_call_statement(){if(!this._check(qe.tokens.ident))return null;const e=this._currentLine,t=this._current,n=this._consume(qe.tokens.ident,'Expected function name.'),s=this._argument_expression_list();return null===s?(this._current=t,null):this._updateNode(new G(n.lexeme,s),e)}_loop_statement(){if(!this._match(qe.keywords.loop))return null;this._check(qe.tokens.attr)&&this._attribute(),this._consume(qe.tokens.brace_left,'Expected \'{\' for loop.');const e=this._updateNode(new X([],null));this._currentLoop.push(e);let t=this._statement();for(;null!==t;){if(Array.isArray(t))for(let n of t)e.body.push(n);else e.body.push(t);if(t instanceof V){e.continuing=t;break}t=this._statement();}return this._currentLoop.pop(),this._consume(qe.tokens.brace_right,'Expected \'}\' for loop.'),e}_switch_statement(){if(!this._match(qe.keywords.switch))return null;const e=this._updateNode(new j(null,[]));if(this._currentLoop.push(e),e.condition=this._optional_paren_expression(),this._check(qe.tokens.attr)&&this._attribute(),this._consume(qe.tokens.brace_left,'Expected \'{\' for switch.'),e.cases=this._switch_body(),null==e.cases||0==e.cases.length)throw this._error(this._previous(),'Expected \'case\' or \'default\'.');return this._consume(qe.tokens.brace_right,'Expected \'}\' for switch.'),this._currentLoop.pop(),e}_switch_body(){const e=[];let t=false;for(;this._check([qe.keywords.default,qe.keywords.case]);){if(this._match(qe.keywords.case)){const n=this._case_selectors();for(const e of n)if(e instanceof Te){if(t)throw this._error(this._previous(),'Multiple default cases in switch statement.');t=true;break}this._match(qe.tokens.colon),this._check(qe.tokens.attr)&&this._attribute(),this._consume(qe.tokens.brace_left,'Exected \'{\' for switch case.');const s=this._case_body();this._consume(qe.tokens.brace_right,'Exected \'}\' for switch case.'),e.push(this._updateNode(new Se(n,s)));}if(this._match(qe.keywords.default)){if(t)throw this._error(this._previous(),'Multiple default cases in switch statement.');this._match(qe.tokens.colon),this._check(qe.tokens.attr)&&this._attribute(),this._consume(qe.tokens.brace_left,'Exected \'{\' for switch default.');const n=this._case_body();this._consume(qe.tokens.brace_right,'Exected \'}\' for switch default.'),e.push(this._updateNode(new Ae(n)));}}return e}_case_selectors(){const e=[];for(this._match(qe.keywords.default)?e.push(this._updateNode(new Te)):e.push(this._shift_expression());this._match(qe.tokens.comma);)this._match(qe.keywords.default)?e.push(this._updateNode(new Te)):e.push(this._shift_expression());return e}_case_body(){if(this._match(qe.keywords.fallthrough))return this._consume(qe.tokens.semicolon,'Expected \';\''),[];let e=this._statement();if(null==e)return [];e instanceof Array||(e=[e]);const t=this._case_body();return 0==t.length?e:[...e,t[0]]}_if_statement(){if(!this._match(qe.keywords.if))return null;const e=this._currentLine,t=this._optional_paren_expression();this._check(qe.tokens.attr)&&this._attribute();const n=this._compound_statement();let s=[];this._match_elseif()&&(this._check(qe.tokens.attr)&&this._attribute(),s=this._elseif_statement(s));let r=null;return this._match(qe.keywords.else)&&(this._check(qe.tokens.attr)&&this._attribute(),r=this._compound_statement()),this._updateNode(new Z(t,n,s,r),e)}_match_elseif(){return this._tokens[this._current].type===qe.keywords.else&&this._tokens[this._current+1].type===qe.keywords.if&&(this._advance(),this._advance(),true)}_elseif_statement(e=[]){const t=this._optional_paren_expression(),n=this._compound_statement();return e.push(this._updateNode(new $e(t,n))),this._match_elseif()&&(this._check(qe.tokens.attr)&&this._attribute(),this._elseif_statement(e)),e}_return_statement(){if(!this._match(qe.keywords.return))return null;const e=this._short_circuit_or_expression();return this._updateNode(new Q(e))}_short_circuit_or_expression(){let e=this._short_circuit_and_expr();for(;this._match(qe.tokens.or_or);)e=this._updateNode(new ke(this._previous().toString(),e,this._short_circuit_and_expr()));return e}_short_circuit_and_expr(){let e=this._inclusive_or_expression();for(;this._match(qe.tokens.and_and);)e=this._updateNode(new ke(this._previous().toString(),e,this._inclusive_or_expression()));return e}_inclusive_or_expression(){let e=this._exclusive_or_expression();for(;this._match(qe.tokens.or);)e=this._updateNode(new ke(this._previous().toString(),e,this._exclusive_or_expression()));return e}_exclusive_or_expression(){let e=this._and_expression();for(;this._match(qe.tokens.xor);)e=this._updateNode(new ke(this._previous().toString(),e,this._and_expression()));return e}_and_expression(){let e=this._equality_expression();for(;this._match(qe.tokens.and);)e=this._updateNode(new ke(this._previous().toString(),e,this._equality_expression()));return e}_equality_expression(){const e=this._relational_expression();return this._match([qe.tokens.equal_equal,qe.tokens.not_equal])?this._updateNode(new ke(this._previous().toString(),e,this._relational_expression())):e}_relational_expression(){let e=this._shift_expression();for(;this._match([qe.tokens.less_than,qe.tokens.greater_than,qe.tokens.less_than_equal,qe.tokens.greater_than_equal]);)e=this._updateNode(new ke(this._previous().toString(),e,this._shift_expression()));return e}_shift_expression(){let e=this._additive_expression();for(;this._match([qe.tokens.shift_left,qe.tokens.shift_right]);)e=this._updateNode(new ke(this._previous().toString(),e,this._additive_expression()));return e}_additive_expression(){let e=this._multiplicative_expression();for(;this._match([qe.tokens.plus,qe.tokens.minus]);)e=this._updateNode(new ke(this._previous().toString(),e,this._multiplicative_expression()));return e}_multiplicative_expression(){let e=this._unary_expression();for(;this._match([qe.tokens.star,qe.tokens.forward_slash,qe.tokens.modulo]);)e=this._updateNode(new ke(this._previous().toString(),e,this._unary_expression()));return e}_unary_expression(){return this._match([qe.tokens.minus,qe.tokens.bang,qe.tokens.tilde,qe.tokens.star,qe.tokens.and])?this._updateNode(new we(this._previous().toString(),this._unary_expression())):this._singular_expression()}_singular_expression(){const e=this._primary_expression(),t=this._postfix_expression();return t&&(e.postfix=t),e}_postfix_expression(){if(this._match(qe.tokens.bracket_left)){const e=this._short_circuit_or_expression();this._consume(qe.tokens.bracket_right,'Expected \']\'.');const t=this._updateNode(new be(e)),n=this._postfix_expression();return n&&(t.postfix=n),t}if(this._match(qe.tokens.period)){const e=this._consume(qe.tokens.name,'Expected member name.'),t=this._postfix_expression(),n=this._updateNode(new fe(e.lexeme));return t&&(n.postfix=t),n}return null}_getStruct(e){if(this._context.aliases.has(e)){return this._context.aliases.get(e).type}if(this._context.structs.has(e)){return this._context.structs.get(e)}return null}_getType(e){const t=this._getStruct(e);if(null!==t)return t;switch(e){case 'void':return re.void;case 'bool':return re.bool;case 'i32':return re.i32;case 'u32':return re.u32;case 'f32':return re.f32;case 'f16':return re.f16;case 'vec2f':return oe.vec2f;case 'vec3f':return oe.vec3f;case 'vec4f':return oe.vec4f;case 'vec2i':return oe.vec2i;case 'vec3i':return oe.vec3i;case 'vec4i':return oe.vec4i;case 'vec2u':return oe.vec2u;case 'vec3u':return oe.vec3u;case 'vec4u':return oe.vec4u;case 'vec2h':return oe.vec2h;case 'vec3h':return oe.vec3h;case 'vec4h':return oe.vec4h;case 'mat2x2f':return oe.mat2x2f;case 'mat2x3f':return oe.mat2x3f;case 'mat2x4f':return oe.mat2x4f;case 'mat3x2f':return oe.mat3x2f;case 'mat3x3f':return oe.mat3x3f;case 'mat3x4f':return oe.mat3x4f;case 'mat4x2f':return oe.mat4x2f;case 'mat4x3f':return oe.mat4x3f;case 'mat4x4f':return oe.mat4x4f;case 'mat2x2h':return oe.mat2x2h;case 'mat2x3h':return oe.mat2x3h;case 'mat2x4h':return oe.mat2x4h;case 'mat3x2h':return oe.mat3x2h;case 'mat3x3h':return oe.mat3x3h;case 'mat3x4h':return oe.mat3x4h;case 'mat4x2h':return oe.mat4x2h;case 'mat4x3h':return oe.mat4x3h;case 'mat4x4h':return oe.mat4x4h;case 'mat2x2i':return oe.mat2x2i;case 'mat2x3i':return oe.mat2x3i;case 'mat2x4i':return oe.mat2x4i;case 'mat3x2i':return oe.mat3x2i;case 'mat3x3i':return oe.mat3x3i;case 'mat3x4i':return oe.mat3x4i;case 'mat4x2i':return oe.mat4x2i;case 'mat4x3i':return oe.mat4x3i;case 'mat4x4i':return oe.mat4x4i;case 'mat2x2u':return oe.mat2x2u;case 'mat2x3u':return oe.mat2x3u;case 'mat2x4u':return oe.mat2x4u;case 'mat3x2u':return oe.mat3x2u;case 'mat3x3u':return oe.mat3x3u;case 'mat3x4u':return oe.mat3x4u;case 'mat4x2u':return oe.mat4x2u;case 'mat4x3u':return oe.mat4x3u;case 'mat4x4u':return oe.mat4x4u}return null}_validateTypeRange(e,t){if('i32'===t.name){if(e<-2147483648||e>2147483647)throw this._error(this._previous(),`Value out of range for i32: ${e}. Line: ${this._currentLine}.`)}else if('u32'===t.name&&(e<0||e>4294967295))throw this._error(this._previous(),`Value out of range for u32: ${e}. Line: ${this._currentLine}.`)}_primary_expression(){if(this._match(qe.tokens.ident)){const e=this._previous().toString();if(this._check(qe.tokens.paren_left)){const t=this._argument_expression_list(),n=this._getType(e);return null!==n?this._updateNode(new pe(n,t)):this._updateNode(new de(e,t))}if(this._context.constants.has(e)){const t=this._context.constants.get(e);return this._updateNode(new _e(e,t.value))}return this._updateNode(new me(e))}if(this._match(qe.tokens.int_literal)){const e=this._previous().toString();let t=e.endsWith('i')||e.endsWith('i')?re.i32:e.endsWith('u')||e.endsWith('U')?re.u32:re.x32;const n=parseInt(e);return this._validateTypeRange(n,t),this._updateNode(new ge(new Oe(n,this._exec.getTypeInfo(t)),t))}if(this._match(qe.tokens.uint_literal)){const e=parseInt(this._previous().toString());return this._validateTypeRange(e,re.u32),this._updateNode(new ge(new Oe(e,this._exec.getTypeInfo(re.u32)),re.u32))}if(this._match([qe.tokens.decimal_float_literal,qe.tokens.hex_float_literal])){let e=this._previous().toString(),t=e.endsWith('h');t&&(e=e.substring(0,e.length-1));const n=parseFloat(e);this._validateTypeRange(n,t?re.f16:re.f32);const s=t?re.f16:re.f32;return this._updateNode(new ge(new Oe(n,this._exec.getTypeInfo(s)),s))}if(this._match([qe.keywords.true,qe.keywords.false])){let e=this._previous().toString()===qe.keywords.true.rule;return this._updateNode(new ge(new Oe(e?1:0,this._exec.getTypeInfo(re.bool)),re.bool))}if(this._check(qe.tokens.paren_left))return this._paren_expression();if(this._match(qe.keywords.bitcast)){this._consume(qe.tokens.less_than,'Expected \'<\'.');const e=this._type_decl();this._consume(qe.tokens.greater_than,'Expected \'>\'.');const t=this._paren_expression();return this._updateNode(new xe(e,t))}const e=this._type_decl(),t=this._argument_expression_list();return this._updateNode(new pe(e,t))}_argument_expression_list(){if(!this._match(qe.tokens.paren_left))return null;const e=[];do{if(this._check(qe.tokens.paren_right))break;const t=this._short_circuit_or_expression();e.push(t);}while(this._match(qe.tokens.comma));return this._consume(qe.tokens.paren_right,'Expected \')\' for agument list'),e}_optional_paren_expression(){this._match(qe.tokens.paren_left);const e=this._short_circuit_or_expression();return this._match(qe.tokens.paren_right),e}_paren_expression(){this._consume(qe.tokens.paren_left,'Expected \'(\'.');const e=this._short_circuit_or_expression();return this._consume(qe.tokens.paren_right,'Expected \')\'.'),e}_struct_decl(){if(!this._match(qe.keywords.struct))return null;const e=this._currentLine,t=this._consume(qe.tokens.ident,'Expected name for struct.').toString();this._consume(qe.tokens.brace_left,'Expected \'{\' for struct body.');const n=[];for(;!this._check(qe.tokens.brace_right);){const e=this._attribute(),t=this._consume(qe.tokens.name,'Expected variable name.').toString();this._consume(qe.tokens.colon,'Expected \':\' for struct member type.');const s=this._attribute(),r=this._type_decl();null!=r&&(r.attributes=s),this._check(qe.tokens.brace_right)?this._match(qe.tokens.comma):this._consume(qe.tokens.comma,'Expected \',\' for struct member.'),n.push(this._updateNode(new Le(t,r,e)));}this._consume(qe.tokens.brace_right,'Expected \'}\' after struct body.');const s=this._currentLine,r=this._updateNode(new ie(t,n,e,s),e);return this._context.structs.set(t,r),r}_global_variable_decl(){const e=this._variable_decl();if(!e)return null;if(this._match(qe.tokens.equal)){const t=this._const_expression();e.value=t;}if(null!==e.type&&e.value instanceof ge){if('x32'!==e.value.type.name){if(e.type.getTypeName()!==e.value.type.getTypeName())throw this._error(this._peek(),`Invalid cast from ${e.value.type.name} to ${e.type.name}. Line:${this._currentLine}`)}e.value.isScalar&&this._validateTypeRange(e.value.scalarValue,e.type),e.value.type=e.type;}else null===e.type&&e.value instanceof ge&&(e.type='x32'===e.value.type.name?re.i32:e.value.type,e.value.isScalar&&this._validateTypeRange(e.value.scalarValue,e.type));return e}_override_variable_decl(){const e=this._override_decl();return e&&this._match(qe.tokens.equal)&&(e.value=this._const_expression()),e}_global_const_decl(){var e;if(!this._match(qe.keywords.const))return null;const t=this._consume(qe.tokens.name,'Expected variable name'),n=this._currentLine;let s=null;if(this._match(qe.tokens.colon)){const e=this._attribute();s=this._type_decl(),null!=s&&(s.attributes=e);}let r=null;this._consume(qe.tokens.equal,'const declarations require an assignment');const i=this._short_circuit_or_expression();try{let e=[re.f32],n=i.constEvaluate(this._exec,e);n instanceof Oe&&this._validateTypeRange(n.value,e[0]),e[0]instanceof oe&&null===e[0].format&&n.typeInfo instanceof a&&null!==n.typeInfo.format&&('f16'===n.typeInfo.format.name?e[0].format=re.f16:'f32'===n.typeInfo.format.name?e[0].format=re.f32:'i32'===n.typeInfo.format.name?e[0].format=re.i32:'u32'===n.typeInfo.format.name?e[0].format=re.u32:'bool'===n.typeInfo.format.name?e[0].format=re.bool:console.error(`TODO: impelement template format type ${n.typeInfo.format.name}`)),r=this._updateNode(new ge(n,e[0])),this._exec.context.setVariable(t.toString(),n);}catch(e){r=i;}if(null!==s&&r instanceof ge){if('x32'!==r.type.name){if(s.getTypeName()!==r.type.getTypeName())throw this._error(this._peek(),`Invalid cast from ${r.type.name} to ${s.name}. Line:${this._currentLine}`)}r.type=s,r.isScalar&&this._validateTypeRange(r.scalarValue,r.type);}else null===s&&r instanceof ge&&(s=null!==(e=null==r?undefined:r.type)&&undefined!==e?e:re.f32,s===re.x32&&(s=re.i32));const o=this._updateNode(new U(t.toString(),s,'','',r),n);return this._context.constants.set(o.name,o),o}_global_let_decl(){if(!this._match(qe.keywords.let))return null;const e=this._currentLine,t=this._consume(qe.tokens.name,'Expected variable name');let n=null;if(this._match(qe.tokens.colon)){const e=this._attribute();n=this._type_decl(),null!=n&&(n.attributes=e);}let s=null;if(this._match(qe.tokens.equal)&&(s=this._const_expression()),null!==n&&s instanceof ge){if('x32'!==s.type.name){if(n.getTypeName()!==s.type.getTypeName())throw this._error(this._peek(),`Invalid cast from ${s.type.name} to ${n.name}. Line:${this._currentLine}`)}s.type=n;}else null===n&&s instanceof ge&&(n='x32'===s.type.name?re.i32:s.type);return s instanceof ge&&s.isScalar&&this._validateTypeRange(s.scalarValue,n),this._updateNode(new M(t.toString(),n,'','',s),e)}_const_expression(){return this._short_circuit_or_expression()}_variable_decl(){if(!this._match(qe.keywords.var))return null;const e=this._currentLine;let t='',n='';this._match(qe.tokens.less_than)&&(t=this._consume(qe.storage_class,'Expected storage_class.').toString(),this._match(qe.tokens.comma)&&(n=this._consume(qe.access_mode,'Expected access_mode.').toString()),this._consume(qe.tokens.greater_than,'Expected \'>\'.'));const s=this._consume(qe.tokens.name,'Expected variable name');let r=null;if(this._match(qe.tokens.colon)){const e=this._attribute();r=this._type_decl(),null!=r&&(r.attributes=e);}return this._updateNode(new B(s.toString(),r,t,n,null),e)}_override_decl(){if(!this._match(qe.keywords.override))return null;const e=this._consume(qe.tokens.name,'Expected variable name');let t=null;if(this._match(qe.tokens.colon)){const e=this._attribute();t=this._type_decl(),null!=t&&(t.attributes=e);}return this._updateNode(new F(e.toString(),t,null))}_diagnostic(){this._consume(qe.tokens.paren_left,'Expected \'(\'');const e=this._consume(qe.tokens.ident,'Expected severity control name.');this._consume(qe.tokens.comma,'Expected \',\'');let t=this._consume(qe.tokens.ident,'Expected diagnostic rule name.').toString();if(this._match(qe.tokens.period)){t+=`.${this._consume(qe.tokens.ident,'Expected diagnostic message.').toString()}`;}return this._consume(qe.tokens.paren_right,'Expected \')\''),this._updateNode(new J(e.toString(),t))}_enable_directive(){const e=this._consume(qe.tokens.ident,'identity expected.');return this._updateNode(new Y(e.toString()))}_requires_directive(){const e=[this._consume(qe.tokens.ident,'identity expected.').toString()];for(;this._match(qe.tokens.comma);){const t=this._consume(qe.tokens.ident,'identity expected.');e.push(t.toString());}return this._updateNode(new K(e))}_type_alias(){const e=this._consume(qe.tokens.ident,'identity expected.');this._consume(qe.tokens.equal,'Expected \'=\' for type alias.');let t=this._type_decl();if(null===t)throw this._error(this._peek(),'Expected Type for Alias.');this._context.aliases.has(t.name)&&(t=this._context.aliases.get(t.name).type);const n=this._updateNode(new ee(e.toString(),t));return this._context.aliases.set(n.name,n),n}_type_decl(){if(this._check([qe.tokens.ident,...qe.texel_format,qe.keywords.bool,qe.keywords.f32,qe.keywords.i32,qe.keywords.u32])){const e=this._advance().toString();if(this._context.structs.has(e))return this._context.structs.get(e);if(this._context.aliases.has(e))return this._context.aliases.get(e).type;if(!this._getType(e)){const t=this._updateNode(new ae(e));return this._forwardTypeCount++,t}return this._updateNode(new re(e))}let e=this._texture_sampler_types();if(e)return e;if(this._check(qe.template_types)){let e=this._advance().toString(),t=null,n=null;this._match(qe.tokens.less_than)&&(t=this._type_decl(),n=null,this._match(qe.tokens.comma)&&(n=this._consume(qe.access_mode,'Expected access_mode for pointer').toString()),this._consume(qe.tokens.greater_than,'Expected \'>\' for type.'));return this._updateNode(new oe(e,t,n))}if(this._match(qe.keywords.ptr)){let e=this._previous().toString();this._consume(qe.tokens.less_than,'Expected \'<\' for pointer.');const t=this._consume(qe.storage_class,'Expected storage_class for pointer');this._consume(qe.tokens.comma,'Expected \',\' for pointer.');const n=this._type_decl();let s=null;this._match(qe.tokens.comma)&&(s=this._consume(qe.access_mode,'Expected access_mode for pointer').toString()),this._consume(qe.tokens.greater_than,'Expected \'>\' for pointer.');return this._updateNode(new le(e,t.toString(),n,s))}const t=this._attribute();if(this._match(qe.keywords.array)){let e=null,n=-1;const s=this._previous();let r=null;if(this._match(qe.tokens.less_than)){e=this._type_decl(),this._context.aliases.has(e.name)&&(e=this._context.aliases.get(e.name).type);let t='';if(this._match(qe.tokens.comma)){r=this._shift_expression();try{t=r.constEvaluate(this._exec).toString(),r=null;}catch(e){t='1';}}this._consume(qe.tokens.greater_than,'Expected \'>\' for array.'),n=t?parseInt(t):0;}const a=this._updateNode(new ce(s.toString(),t,e,n));return r&&this._deferArrayCountEval.push({arrayType:a,countNode:r}),a}return null}_texture_sampler_types(){if(this._match(qe.sampler_type))return this._updateNode(new ue(this._previous().toString(),null,null));if(this._match(qe.depth_texture_type))return this._updateNode(new ue(this._previous().toString(),null,null));if(this._match(qe.sampled_texture_type)||this._match(qe.multisampled_texture_type)){const e=this._previous();this._consume(qe.tokens.less_than,'Expected \'<\' for sampler type.');const t=this._type_decl();return this._consume(qe.tokens.greater_than,'Expected \'>\' for sampler type.'),this._updateNode(new ue(e.toString(),t,null))}if(this._match(qe.storage_texture_type)){const e=this._previous();this._consume(qe.tokens.less_than,'Expected \'<\' for sampler type.');const t=this._consume(qe.texel_format,'Invalid texel format.').toString();this._consume(qe.tokens.comma,'Expected \',\' after texel format.');const n=this._consume(qe.access_mode,'Expected access mode for storage texture type.').toString();return this._consume(qe.tokens.greater_than,'Expected \'>\' for sampler type.'),this._updateNode(new ue(e.toString(),t,n))}return null}_attribute(){let e=[];for(;this._match(qe.tokens.attr);){const t=this._consume(qe.attribute_name,'Expected attribute name'),n=this._updateNode(new Ce(t.toString(),null));if(this._match(qe.tokens.paren_left)){if(n.value=this._consume(qe.literal_or_ident,'Expected attribute value').toString(),this._check(qe.tokens.comma)){this._advance();do{const e=this._consume(qe.literal_or_ident,'Expected attribute value').toString();n.value instanceof Array||(n.value=[n.value]),n.value.push(e);}while(this._match(qe.tokens.comma))}this._consume(qe.tokens.paren_right,'Expected \')\'');}e.push(n);}return 0==e.length?null:e}}class _t extends rt{constructor(e){super(),e&&this.update(e);}update(e){const t=(new mt).parse(e);this.updateAST(t);}}

        function getEntryPointForStage(defs, stage, stageFlags) {
            const { entryPoint: entryPointName } = stage;
            if (entryPointName) {
                const ep = defs.entryPoints[entryPointName];
                return (ep && ep.stage === stageFlags) ? ep : undefined;
            }
            return Object.values(defs.entryPoints).filter(ep => ep.stage === stageFlags)[0];
        }
        function getStageResources(defs, stage, stageFlags) {
            if (!stage) {
                return [];
            }
            const entryPoint = getEntryPointForStage(defs, stage, stageFlags);
            return entryPoint?.resources || [];
        }
        const byBinding = (a, b) => Math.sign(a.binding - b.binding);
        /**
         * Gets GPUBindGroupLayoutDescriptors for the given pipeline.
         *
         * Important: Assumes you pipeline is valid (it doesn't check for errors).
         *
         * Note: In WebGPU some layouts must be specified manually. For example an unfiltered-float
         *    sampler can not be derived since it is unknown at compile time pipeline creation time
         *    which texture you'll use.
         *
         * MAINTENANCE_TODO: Add example
         *
         * @param defs ShaderDataDefinitions or an array of ShaderDataDefinitions as
         *    returned from {@link makeShaderDataDefinitions}. If an array more than 1
         *    definition it's assumed the vertex shader is in the first and the fragment
         *    shader in the second.
         * @param desc A PipelineDescriptor. You should be able to pass in the same object you passed
         *    to `createRenderPipeline` or `createComputePipeline`.
         * @returns An array of GPUBindGroupLayoutDescriptors which you can pass, one at a time, to
         *    `createBindGroupLayout`. Note: the array will be sparse if there are gaps in group
         *    numbers. Note: Each GPUBindGroupLayoutDescriptor.entries will be sorted by binding.
         */
        function makeBindGroupLayoutDescriptors(defs, desc) {
            defs = Array.isArray(defs) ? defs : [defs];
            const resources = [
                ...getStageResources(defs[0], desc.vertex, GPUShaderStage.VERTEX),
                ...getStageResources(defs[defs.length - 1], desc.fragment, GPUShaderStage.FRAGMENT),
                ...getStageResources(defs[0], desc.compute, GPUShaderStage.COMPUTE),
            ];
            const bindGroupLayoutDescriptorsByGroupByBinding = [];
            for (const resource of resources) {
                const bindingsToBindGroupEntry = bindGroupLayoutDescriptorsByGroupByBinding[resource.group] || new Map();
                bindGroupLayoutDescriptorsByGroupByBinding[resource.group] = bindingsToBindGroupEntry;
                // Should we error here if the 2 don't match?
                const entry = bindingsToBindGroupEntry.get(resource.entry.binding);
                bindingsToBindGroupEntry.set(resource.entry.binding, {
                    ...resource.entry,
                    visibility: resource.entry.visibility | (entry?.visibility || 0),
                });
            }
            const descriptors = bindGroupLayoutDescriptorsByGroupByBinding.map(v => ({ entries: [...v.values()].sort(byBinding) }));
            for (let i = 0; i < descriptors.length; ++i) {
                if (!descriptors[i]) {
                    descriptors[i] = { entries: [] };
                }
            }
            return descriptors;
        }
        function getNamedVariables(reflect, variables) {
            return Object.fromEntries(variables.map(v => {
                const typeDefinition = addVariableType(reflect, v, 0);
                return [
                    v.name,
                    {
                        typeDefinition,
                        group: v.group,
                        binding: v.binding,
                        size: typeDefinition.size,
                    },
                ];
            }));
        }
        function makeStructDefinition(reflect, structInfo, offset) {
            // StructDefinition
            const fields = Object.fromEntries(structInfo.members.map(m => {
                return [
                    m.name,
                    {
                        offset: m.offset,
                        type: addType(reflect, m.type, 0),
                    },
                ];
            }));
            return {
                fields,
                size: structInfo.size,
                offset,
            };
        }
        function getTextureSampleType(type) {
            if (type.name.includes('depth')) {
                return 'depth';
            }
            // unfiltered-float
            switch (type.format?.name) {
                case 'f32': return 'float';
                case 'i32': return 'sint';
                case 'u32': return 'uint';
                default:
                    throw new Error('unknown texture sample type');
            }
        }
        function getViewDimension(type) {
            if (type.name.includes('2d_array')) {
                return '2d-array';
            }
            if (type.name.includes('cube_array')) {
                return 'cube-array';
            }
            if (type.name.includes('3d')) {
                return '3d';
            }
            if (type.name.includes('1d')) {
                return '1d';
            }
            if (type.name.includes('cube')) {
                return 'cube';
            }
            return '2d';
        }
        function getStorageTextureAccess(type) {
            switch (type.access) {
                case 'read': return 'read-only';
                case 'write': return 'write-only';
                case 'read_write': return 'read-write';
                default:
                    throw new Error('unknonw storage texture access');
            }
        }
        function getSamplerType(type) {
            // "non-filtering" can only be specified manually.
            return type.name.endsWith('_comparison')
                ? 'comparison'
                : 'filtering';
        }
        function getBindGroupLayoutEntry(resource, visibility) {
            const { binding, access, type } = resource;
            switch (resource.resourceType) {
                case i.Uniform:
                    return {
                        binding,
                        visibility,
                        buffer: {
                            ...(resource.size && { minBindingSize: resource.size }),
                        },
                    };
                case i.Storage:
                    return {
                        binding,
                        visibility,
                        buffer: {
                            type: (access === '' || access === 'read') ? 'read-only-storage' : 'storage',
                            ...(resource.size && { minBindingSize: resource.size }),
                        },
                    };
                case i.Texture: {
                    if (type.name === 'texture_external') {
                        return {
                            binding,
                            visibility,
                            externalTexture: {},
                        };
                    }
                    const multisampled = type.name.includes('multisampled');
                    return {
                        binding,
                        visibility,
                        texture: {
                            sampleType: getTextureSampleType(type),
                            viewDimension: getViewDimension(type),
                            multisampled,
                        },
                    };
                }
                case i.Sampler:
                    return {
                        binding,
                        visibility,
                        sampler: {
                            type: getSamplerType(type),
                        },
                    };
                case i.StorageTexture:
                    return {
                        binding,
                        visibility,
                        storageTexture: {
                            access: getStorageTextureAccess(type),
                            format: type.format.name,
                            viewDimension: getViewDimension(type),
                        },
                    };
                default:
                    throw new Error('unknown resource type');
            }
        }
        function addEntryPoints(funcInfos, stage) {
            const entryPoints = {};
            for (const info of funcInfos) {
                entryPoints[info.name] = {
                    stage,
                    resources: info.resources.map(resource => {
                        const { name, group } = resource;
                        return {
                            name,
                            group,
                            entry: getBindGroupLayoutEntry(resource, stage),
                        };
                    }),
                };
            }
            return entryPoints;
        }
        /**
         * Given a WGSL shader, returns data definitions for structures,
         * uniforms, and storage buffers
         *
         * Example:
         *
         * ```js
         * const code = `
         * struct MyStruct {
         *    color: vec4f,
         *    brightness: f32,
         *    kernel: array<f32, 9>,
         * };
         * @group(0) @binding(0) var<uniform> myUniforms: MyUniforms;
         * `;
         * const defs = makeShaderDataDefinitions(code);
         * const myUniformValues = makeStructuredView(defs.uniforms.myUniforms);
         *
         * myUniformValues.set({
         *   color: [1, 0, 1, 1],
         *   brightness: 0.8,
         *   kernel: [
         *      1, 0, -1,
         *      2, 0, -2,
         *      1, 0, -1,
         *   ],
         * });
         * device.queue.writeBuffer(uniformBuffer, 0, myUniformValues.arrayBuffer);
         * ```
         *
         * @param code WGSL shader. Note: it is not required for this to be a complete shader
         * @returns definitions of the structures by name. Useful for passing to {@link makeStructuredView}
         */
        function makeShaderDataDefinitions(code) {
            const reflect = new _t(code);
            const structs = Object.fromEntries(reflect.structs.map(structInfo => {
                return [structInfo.name, makeStructDefinition(reflect, structInfo, 0)];
            }));
            const uniforms = getNamedVariables(reflect, reflect.uniforms);
            const storages = getNamedVariables(reflect, reflect.storage.filter(v => v.resourceType === i.Storage));
            const storageTextures = getNamedVariables(reflect, reflect.storage.filter(v => v.resourceType === i.StorageTexture));
            const textures = getNamedVariables(reflect, reflect.textures.filter(v => v.type.name !== 'texture_external'));
            const externalTextures = getNamedVariables(reflect, reflect.textures.filter(v => v.type.name === 'texture_external'));
            const samplers = getNamedVariables(reflect, reflect.samplers);
            const entryPoints = {
                ...addEntryPoints(reflect.entry.vertex, GPUShaderStage.VERTEX),
                ...addEntryPoints(reflect.entry.fragment, GPUShaderStage.FRAGMENT),
                ...addEntryPoints(reflect.entry.compute, GPUShaderStage.COMPUTE),
            };
            return {
                externalTextures,
                samplers,
                structs,
                storages,
                storageTextures,
                textures,
                uniforms,
                entryPoints,
            };
        }
        function assert$1(cond, msg = '') {
            if (!cond) {
                throw new Error(msg);
            }
        }
        /*
         write down what I want for a given type

            struct VSUniforms {
                foo: u32,
            };
            @group(4) @binding(1) var<uniform> uni1: f32;
            @group(3) @binding(2) var<uniform> uni2: array<f32, 5>;
            @group(2) @binding(3) var<uniform> uni3: VSUniforms;
            @group(1) @binding(4) var<uniform> uni4: array<VSUniforms, 6>;

            uni1: {
                type: 'f32',
                numElements: undefined
            },
            uni2: {
                type: 'array',
                elementType: 'f32'
                numElements: 5,
            },
            uni3: {
                type: 'struct',
                fields: {
                    foo: {
                        type: 'f32',
                        numElements: undefined
                    }
                },
            },
            uni4: {
                type: 'array',
                elementType:
                fields: {
                    foo: {
                        type: 'f32',
                        numElements: undefined
                    }
                },
                fields: {
                    foo: {
                        type: 'f32',
                        numElements: undefined
                    }
                },
                ...
            ]

            */
        function addVariableType(reflect, v, offset) {
            switch (v.resourceType) {
                case i.Uniform:
                case i.Storage:
                case i.StorageTexture:
                    return addType(reflect, v.type, offset);
                default:
                    return {
                        size: 0,
                        type: v.type.name,
                    };
            }
        }
        function addType(reflect, typeInfo, offset) {
            if (typeInfo.isArray) {
                assert$1(!typeInfo.isStruct, 'struct array is invalid');
                assert$1(!typeInfo.isStruct, 'template array is invalid');
                const arrayInfo = typeInfo;
                // ArrayDefinition
                return {
                    size: arrayInfo.size,
                    elementType: addType(reflect, arrayInfo.format, offset),
                    numElements: arrayInfo.count,
                };
            }
            else if (typeInfo.isStruct) {
                assert$1(!typeInfo.isTemplate, 'template struct is invalid');
                const structInfo = typeInfo;
                return makeStructDefinition(reflect, structInfo, offset);
            }
            else {
                // template is like vec4<f32> or mat4x4<f16>
                const asTemplateInfo = typeInfo;
                const type = typeInfo.isTemplate
                    ? `${asTemplateInfo.name}<${asTemplateInfo.format.name}>`
                    : typeInfo.name;
                // IntrinsicDefinition
                return {
                    size: typeInfo.size,
                    type: type,
                };
            }
        }

        const kTypedArrayToAttribFormat = new Map([
            [Int8Array, { formats: ['sint8', 'snorm8'], defaultForType: 1 }],
            [Uint8Array, { formats: ['uint8', 'unorm8'], defaultForType: 1 }],
            [Int16Array, { formats: ['sint16', 'snorm16'], defaultForType: 1 }],
            [Uint16Array, { formats: ['uint16', 'unorm16'], defaultForType: 1 }],
            [Int32Array, { formats: ['sint32', 'snorm32'], defaultForType: 0 }],
            [Uint32Array, { formats: ['uint32', 'unorm32'], defaultForType: 0 }],
            [Float32Array, { formats: ['float32', 'float32'], defaultForType: 0 }],
            // TODO: Add Float16Array
        ]);
        new Map([...kTypedArrayToAttribFormat.entries()].map(([Type, { formats: [s1, s2] }]) => [[s1, Type], [s2, Type]]).flat());

        // exported from the WebGPU CTS by adding the following line to src/webgpu/format_info.ts
        //
        //    console.log(JSON.stringify(kAllTextureFormatInfo, null, 2));
        /** `kDepthStencilFormatResolvedAspect[format][aspect]` returns the aspect-specific format for a
         *  depth-stencil format, or `undefined` if the format doesn't have the aspect.
         */
        const kDepthStencilFormatResolvedAspect = {
            // kUnsizedDepthStencilFormats
            depth24plus: {
                all: 'depth24plus',
                'depth-only': 'depth24plus',
                'stencil-only': undefined,
            },
            'depth24plus-stencil8': {
                all: 'depth24plus-stencil8',
                'depth-only': 'depth24plus',
                'stencil-only': 'stencil8',
            },
            // kSizedDepthStencilFormats
            depth16unorm: {
                all: 'depth16unorm',
                'depth-only': 'depth16unorm',
                'stencil-only': undefined,
            },
            depth32float: {
                all: 'depth32float',
                'depth-only': 'depth32float',
                'stencil-only': undefined,
            },
            'depth32float-stencil8': {
                all: 'depth32float-stencil8',
                'depth-only': 'depth32float',
                'stencil-only': 'stencil8',
            },
            stencil8: {
                all: 'stencil8',
                'depth-only': undefined,
                'stencil-only': 'stencil8',
            },
        };
        function getDepthStencilFormatResolvedAspect(format, aspect) {
            const info = kDepthStencilFormatResolvedAspect[format];
            return info ? info[aspect] : undefined;
        }
        const kAllTextureFormatInfo = {
            "r8unorm": {
                "blockWidth": 1,
                "blockHeight": 1,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 1
                },
                "colorRender": {
                    "blend": true,
                    "resolve": true,
                    "byteCost": 1,
                    "alignment": 1
                },
                "multisample": true,
                "bytesPerBlock": 1
            },
            "r8snorm": {
                "blockWidth": 1,
                "blockHeight": 1,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 1
                },
                "multisample": false,
                "bytesPerBlock": 1
            },
            "r8uint": {
                "blockWidth": 1,
                "blockHeight": 1,
                "color": {
                    "type": "uint",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 1
                },
                "colorRender": {
                    "blend": false,
                    "resolve": false,
                    "byteCost": 1,
                    "alignment": 1
                },
                "multisample": true,
                "bytesPerBlock": 1
            },
            "r8sint": {
                "blockWidth": 1,
                "blockHeight": 1,
                "color": {
                    "type": "sint",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 1
                },
                "colorRender": {
                    "blend": false,
                    "resolve": false,
                    "byteCost": 1,
                    "alignment": 1
                },
                "multisample": true,
                "bytesPerBlock": 1
            },
            "rg8unorm": {
                "blockWidth": 1,
                "blockHeight": 1,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 2
                },
                "colorRender": {
                    "blend": true,
                    "resolve": true,
                    "byteCost": 2,
                    "alignment": 1
                },
                "multisample": true,
                "bytesPerBlock": 2
            },
            "rg8snorm": {
                "blockWidth": 1,
                "blockHeight": 1,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 2
                },
                "multisample": false,
                "bytesPerBlock": 2
            },
            "rg8uint": {
                "blockWidth": 1,
                "blockHeight": 1,
                "color": {
                    "type": "uint",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 2
                },
                "colorRender": {
                    "blend": false,
                    "resolve": false,
                    "byteCost": 2,
                    "alignment": 1
                },
                "multisample": true,
                "bytesPerBlock": 2
            },
            "rg8sint": {
                "blockWidth": 1,
                "blockHeight": 1,
                "color": {
                    "type": "sint",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 2
                },
                "colorRender": {
                    "blend": false,
                    "resolve": false,
                    "byteCost": 2,
                    "alignment": 1
                },
                "multisample": true,
                "bytesPerBlock": 2
            },
            "rgba8unorm": {
                "blockWidth": 1,
                "blockHeight": 1,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": true,
                    "readWriteStorage": false,
                    "bytes": 4
                },
                "colorRender": {
                    "blend": true,
                    "resolve": true,
                    "byteCost": 8,
                    "alignment": 1
                },
                "multisample": true,
                "baseFormat": "rgba8unorm",
                "bytesPerBlock": 4
            },
            "rgba8unorm-srgb": {
                "blockWidth": 1,
                "blockHeight": 1,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 4
                },
                "colorRender": {
                    "blend": true,
                    "resolve": true,
                    "byteCost": 8,
                    "alignment": 1
                },
                "multisample": true,
                "baseFormat": "rgba8unorm",
                "bytesPerBlock": 4
            },
            "rgba8snorm": {
                "blockWidth": 1,
                "blockHeight": 1,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": true,
                    "readWriteStorage": false,
                    "bytes": 4
                },
                "multisample": false,
                "bytesPerBlock": 4
            },
            "rgba8uint": {
                "blockWidth": 1,
                "blockHeight": 1,
                "color": {
                    "type": "uint",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": true,
                    "readWriteStorage": false,
                    "bytes": 4
                },
                "colorRender": {
                    "blend": false,
                    "resolve": false,
                    "byteCost": 4,
                    "alignment": 1
                },
                "multisample": true,
                "bytesPerBlock": 4
            },
            "rgba8sint": {
                "blockWidth": 1,
                "blockHeight": 1,
                "color": {
                    "type": "sint",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": true,
                    "readWriteStorage": false,
                    "bytes": 4
                },
                "colorRender": {
                    "blend": false,
                    "resolve": false,
                    "byteCost": 4,
                    "alignment": 1
                },
                "multisample": true,
                "bytesPerBlock": 4
            },
            "bgra8unorm": {
                "blockWidth": 1,
                "blockHeight": 1,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 4
                },
                "colorRender": {
                    "blend": true,
                    "resolve": true,
                    "byteCost": 8,
                    "alignment": 1
                },
                "multisample": true,
                "baseFormat": "bgra8unorm",
                "bytesPerBlock": 4
            },
            "bgra8unorm-srgb": {
                "blockWidth": 1,
                "blockHeight": 1,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 4
                },
                "colorRender": {
                    "blend": true,
                    "resolve": true,
                    "byteCost": 8,
                    "alignment": 1
                },
                "multisample": true,
                "baseFormat": "bgra8unorm",
                "bytesPerBlock": 4
            },
            "r16uint": {
                "blockWidth": 1,
                "blockHeight": 1,
                "color": {
                    "type": "uint",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 2
                },
                "colorRender": {
                    "blend": false,
                    "resolve": false,
                    "byteCost": 2,
                    "alignment": 2
                },
                "multisample": true,
                "bytesPerBlock": 2
            },
            "r16sint": {
                "blockWidth": 1,
                "blockHeight": 1,
                "color": {
                    "type": "sint",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 2
                },
                "colorRender": {
                    "blend": false,
                    "resolve": false,
                    "byteCost": 2,
                    "alignment": 2
                },
                "multisample": true,
                "bytesPerBlock": 2
            },
            "r16float": {
                "blockWidth": 1,
                "blockHeight": 1,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 2
                },
                "colorRender": {
                    "blend": true,
                    "resolve": true,
                    "byteCost": 2,
                    "alignment": 2
                },
                "multisample": true,
                "bytesPerBlock": 2
            },
            "rg16uint": {
                "blockWidth": 1,
                "blockHeight": 1,
                "color": {
                    "type": "uint",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 4
                },
                "colorRender": {
                    "blend": false,
                    "resolve": false,
                    "byteCost": 4,
                    "alignment": 2
                },
                "multisample": true,
                "bytesPerBlock": 4
            },
            "rg16sint": {
                "blockWidth": 1,
                "blockHeight": 1,
                "color": {
                    "type": "sint",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 4
                },
                "colorRender": {
                    "blend": false,
                    "resolve": false,
                    "byteCost": 4,
                    "alignment": 2
                },
                "multisample": true,
                "bytesPerBlock": 4
            },
            "rg16float": {
                "blockWidth": 1,
                "blockHeight": 1,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 4
                },
                "colorRender": {
                    "blend": true,
                    "resolve": true,
                    "byteCost": 4,
                    "alignment": 2
                },
                "multisample": true,
                "bytesPerBlock": 4
            },
            "rgba16uint": {
                "blockWidth": 1,
                "blockHeight": 1,
                "color": {
                    "type": "uint",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": true,
                    "readWriteStorage": false,
                    "bytes": 8
                },
                "colorRender": {
                    "blend": false,
                    "resolve": false,
                    "byteCost": 8,
                    "alignment": 2
                },
                "multisample": true,
                "bytesPerBlock": 8
            },
            "rgba16sint": {
                "blockWidth": 1,
                "blockHeight": 1,
                "color": {
                    "type": "sint",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": true,
                    "readWriteStorage": false,
                    "bytes": 8
                },
                "colorRender": {
                    "blend": false,
                    "resolve": false,
                    "byteCost": 8,
                    "alignment": 2
                },
                "multisample": true,
                "bytesPerBlock": 8
            },
            "rgba16float": {
                "blockWidth": 1,
                "blockHeight": 1,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": true,
                    "readWriteStorage": false,
                    "bytes": 8
                },
                "colorRender": {
                    "blend": true,
                    "resolve": true,
                    "byteCost": 8,
                    "alignment": 2
                },
                "multisample": true,
                "bytesPerBlock": 8
            },
            "r32uint": {
                "blockWidth": 1,
                "blockHeight": 1,
                "color": {
                    "type": "uint",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": true,
                    "readWriteStorage": true,
                    "bytes": 4
                },
                "colorRender": {
                    "blend": false,
                    "resolve": false,
                    "byteCost": 4,
                    "alignment": 4
                },
                "multisample": false,
                "bytesPerBlock": 4
            },
            "r32sint": {
                "blockWidth": 1,
                "blockHeight": 1,
                "color": {
                    "type": "sint",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": true,
                    "readWriteStorage": true,
                    "bytes": 4
                },
                "colorRender": {
                    "blend": false,
                    "resolve": false,
                    "byteCost": 4,
                    "alignment": 4
                },
                "multisample": false,
                "bytesPerBlock": 4
            },
            "r32float": {
                "blockWidth": 1,
                "blockHeight": 1,
                "color": {
                    "type": "unfilterable-float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": true,
                    "readWriteStorage": true,
                    "bytes": 4
                },
                "colorRender": {
                    "blend": false,
                    "resolve": false,
                    "byteCost": 4,
                    "alignment": 4
                },
                "multisample": true,
                "bytesPerBlock": 4
            },
            "rg32uint": {
                "blockWidth": 1,
                "blockHeight": 1,
                "color": {
                    "type": "uint",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": true,
                    "readWriteStorage": false,
                    "bytes": 8
                },
                "colorRender": {
                    "blend": false,
                    "resolve": false,
                    "byteCost": 8,
                    "alignment": 4
                },
                "multisample": false,
                "bytesPerBlock": 8
            },
            "rg32sint": {
                "blockWidth": 1,
                "blockHeight": 1,
                "color": {
                    "type": "sint",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": true,
                    "readWriteStorage": false,
                    "bytes": 8
                },
                "colorRender": {
                    "blend": false,
                    "resolve": false,
                    "byteCost": 8,
                    "alignment": 4
                },
                "multisample": false,
                "bytesPerBlock": 8
            },
            "rg32float": {
                "blockWidth": 1,
                "blockHeight": 1,
                "color": {
                    "type": "unfilterable-float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": true,
                    "readWriteStorage": false,
                    "bytes": 8
                },
                "colorRender": {
                    "blend": false,
                    "resolve": false,
                    "byteCost": 8,
                    "alignment": 4
                },
                "multisample": false,
                "bytesPerBlock": 8
            },
            "rgba32uint": {
                "blockWidth": 1,
                "blockHeight": 1,
                "color": {
                    "type": "uint",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": true,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "colorRender": {
                    "blend": false,
                    "resolve": false,
                    "byteCost": 16,
                    "alignment": 4
                },
                "multisample": false,
                "bytesPerBlock": 16
            },
            "rgba32sint": {
                "blockWidth": 1,
                "blockHeight": 1,
                "color": {
                    "type": "sint",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": true,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "colorRender": {
                    "blend": false,
                    "resolve": false,
                    "byteCost": 16,
                    "alignment": 4
                },
                "multisample": false,
                "bytesPerBlock": 16
            },
            "rgba32float": {
                "blockWidth": 1,
                "blockHeight": 1,
                "color": {
                    "type": "unfilterable-float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": true,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "colorRender": {
                    "blend": false,
                    "resolve": false,
                    "byteCost": 16,
                    "alignment": 4
                },
                "multisample": false,
                "bytesPerBlock": 16
            },
            "rgb10a2uint": {
                "blockWidth": 1,
                "blockHeight": 1,
                "color": {
                    "type": "uint",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 4
                },
                "colorRender": {
                    "blend": false,
                    "resolve": false,
                    "byteCost": 8,
                    "alignment": 4
                },
                "multisample": true,
                "bytesPerBlock": 4
            },
            "rgb10a2unorm": {
                "blockWidth": 1,
                "blockHeight": 1,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 4
                },
                "colorRender": {
                    "blend": true,
                    "resolve": true,
                    "byteCost": 8,
                    "alignment": 4
                },
                "multisample": true,
                "bytesPerBlock": 4
            },
            "rg11b10ufloat": {
                "blockWidth": 1,
                "blockHeight": 1,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 4
                },
                "multisample": false,
                "bytesPerBlock": 4
            },
            "rgb9e5ufloat": {
                "blockWidth": 1,
                "blockHeight": 1,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 4
                },
                "multisample": false,
                "bytesPerBlock": 4
            },
            "stencil8": {
                "blockWidth": 1,
                "blockHeight": 1,
                "stencil": {
                    "type": "uint",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 1
                },
                "multisample": true,
                "bytesPerBlock": 1
            },
            "depth16unorm": {
                "blockWidth": 1,
                "blockHeight": 1,
                "depth": {
                    "type": "depth",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 2
                },
                "multisample": true,
                "bytesPerBlock": 2
            },
            "depth32float": {
                "blockWidth": 1,
                "blockHeight": 1,
                "depth": {
                    "type": "depth",
                    "copySrc": true,
                    "copyDst": false,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 4
                },
                "multisample": true,
                "bytesPerBlock": 4
            },
            "depth24plus": {
                "blockWidth": 1,
                "blockHeight": 1,
                "depth": {
                    "type": "depth",
                    "copySrc": false,
                    "copyDst": false,
                    "storage": false,
                    "readWriteStorage": false
                },
                "multisample": true
            },
            "depth24plus-stencil8": {
                "blockWidth": 1,
                "blockHeight": 1,
                "depth": {
                    "type": "depth",
                    "copySrc": false,
                    "copyDst": false,
                    "storage": false,
                    "readWriteStorage": false
                },
                "stencil": {
                    "type": "uint",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 1
                },
                "multisample": true
            },
            "depth32float-stencil8": {
                "blockWidth": 1,
                "blockHeight": 1,
                "depth": {
                    "type": "depth",
                    "copySrc": true,
                    "copyDst": false,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 4
                },
                "stencil": {
                    "type": "uint",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 1
                },
                "multisample": true,
                "feature": "depth32float-stencil8"
            },
            "bc1-rgba-unorm": {
                "blockWidth": 4,
                "blockHeight": 4,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 8
                },
                "multisample": false,
                "feature": "texture-compression-bc",
                "baseFormat": "bc1-rgba-unorm",
                "bytesPerBlock": 8
            },
            "bc1-rgba-unorm-srgb": {
                "blockWidth": 4,
                "blockHeight": 4,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 8
                },
                "multisample": false,
                "feature": "texture-compression-bc",
                "baseFormat": "bc1-rgba-unorm",
                "bytesPerBlock": 8
            },
            "bc2-rgba-unorm": {
                "blockWidth": 4,
                "blockHeight": 4,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-bc",
                "baseFormat": "bc2-rgba-unorm",
                "bytesPerBlock": 16
            },
            "bc2-rgba-unorm-srgb": {
                "blockWidth": 4,
                "blockHeight": 4,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-bc",
                "baseFormat": "bc2-rgba-unorm",
                "bytesPerBlock": 16
            },
            "bc3-rgba-unorm": {
                "blockWidth": 4,
                "blockHeight": 4,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-bc",
                "baseFormat": "bc3-rgba-unorm",
                "bytesPerBlock": 16
            },
            "bc3-rgba-unorm-srgb": {
                "blockWidth": 4,
                "blockHeight": 4,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-bc",
                "baseFormat": "bc3-rgba-unorm",
                "bytesPerBlock": 16
            },
            "bc4-r-unorm": {
                "blockWidth": 4,
                "blockHeight": 4,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 8
                },
                "multisample": false,
                "feature": "texture-compression-bc",
                "bytesPerBlock": 8
            },
            "bc4-r-snorm": {
                "blockWidth": 4,
                "blockHeight": 4,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 8
                },
                "multisample": false,
                "feature": "texture-compression-bc",
                "bytesPerBlock": 8
            },
            "bc5-rg-unorm": {
                "blockWidth": 4,
                "blockHeight": 4,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-bc",
                "bytesPerBlock": 16
            },
            "bc5-rg-snorm": {
                "blockWidth": 4,
                "blockHeight": 4,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-bc",
                "bytesPerBlock": 16
            },
            "bc6h-rgb-ufloat": {
                "blockWidth": 4,
                "blockHeight": 4,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-bc",
                "bytesPerBlock": 16
            },
            "bc6h-rgb-float": {
                "blockWidth": 4,
                "blockHeight": 4,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-bc",
                "bytesPerBlock": 16
            },
            "bc7-rgba-unorm": {
                "blockWidth": 4,
                "blockHeight": 4,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-bc",
                "baseFormat": "bc7-rgba-unorm",
                "bytesPerBlock": 16
            },
            "bc7-rgba-unorm-srgb": {
                "blockWidth": 4,
                "blockHeight": 4,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-bc",
                "baseFormat": "bc7-rgba-unorm",
                "bytesPerBlock": 16
            },
            "etc2-rgb8unorm": {
                "blockWidth": 4,
                "blockHeight": 4,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 8
                },
                "multisample": false,
                "feature": "texture-compression-etc2",
                "baseFormat": "etc2-rgb8unorm",
                "bytesPerBlock": 8
            },
            "etc2-rgb8unorm-srgb": {
                "blockWidth": 4,
                "blockHeight": 4,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 8
                },
                "multisample": false,
                "feature": "texture-compression-etc2",
                "baseFormat": "etc2-rgb8unorm",
                "bytesPerBlock": 8
            },
            "etc2-rgb8a1unorm": {
                "blockWidth": 4,
                "blockHeight": 4,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 8
                },
                "multisample": false,
                "feature": "texture-compression-etc2",
                "baseFormat": "etc2-rgb8a1unorm",
                "bytesPerBlock": 8
            },
            "etc2-rgb8a1unorm-srgb": {
                "blockWidth": 4,
                "blockHeight": 4,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 8
                },
                "multisample": false,
                "feature": "texture-compression-etc2",
                "baseFormat": "etc2-rgb8a1unorm",
                "bytesPerBlock": 8
            },
            "etc2-rgba8unorm": {
                "blockWidth": 4,
                "blockHeight": 4,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-etc2",
                "baseFormat": "etc2-rgba8unorm",
                "bytesPerBlock": 16
            },
            "etc2-rgba8unorm-srgb": {
                "blockWidth": 4,
                "blockHeight": 4,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-etc2",
                "baseFormat": "etc2-rgba8unorm",
                "bytesPerBlock": 16
            },
            "eac-r11unorm": {
                "blockWidth": 4,
                "blockHeight": 4,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 8
                },
                "multisample": false,
                "feature": "texture-compression-etc2",
                "bytesPerBlock": 8
            },
            "eac-r11snorm": {
                "blockWidth": 4,
                "blockHeight": 4,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 8
                },
                "multisample": false,
                "feature": "texture-compression-etc2",
                "bytesPerBlock": 8
            },
            "eac-rg11unorm": {
                "blockWidth": 4,
                "blockHeight": 4,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-etc2",
                "bytesPerBlock": 16
            },
            "eac-rg11snorm": {
                "blockWidth": 4,
                "blockHeight": 4,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-etc2",
                "bytesPerBlock": 16
            },
            "astc-4x4-unorm": {
                "blockWidth": 4,
                "blockHeight": 4,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-astc",
                "baseFormat": "astc-4x4-unorm",
                "bytesPerBlock": 16
            },
            "astc-4x4-unorm-srgb": {
                "blockWidth": 4,
                "blockHeight": 4,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-astc",
                "baseFormat": "astc-4x4-unorm",
                "bytesPerBlock": 16
            },
            "astc-5x4-unorm": {
                "blockWidth": 5,
                "blockHeight": 4,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-astc",
                "baseFormat": "astc-5x4-unorm",
                "bytesPerBlock": 16
            },
            "astc-5x4-unorm-srgb": {
                "blockWidth": 5,
                "blockHeight": 4,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-astc",
                "baseFormat": "astc-5x4-unorm",
                "bytesPerBlock": 16
            },
            "astc-5x5-unorm": {
                "blockWidth": 5,
                "blockHeight": 5,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-astc",
                "baseFormat": "astc-5x5-unorm",
                "bytesPerBlock": 16
            },
            "astc-5x5-unorm-srgb": {
                "blockWidth": 5,
                "blockHeight": 5,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-astc",
                "baseFormat": "astc-5x5-unorm",
                "bytesPerBlock": 16
            },
            "astc-6x5-unorm": {
                "blockWidth": 6,
                "blockHeight": 5,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-astc",
                "baseFormat": "astc-6x5-unorm",
                "bytesPerBlock": 16
            },
            "astc-6x5-unorm-srgb": {
                "blockWidth": 6,
                "blockHeight": 5,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-astc",
                "baseFormat": "astc-6x5-unorm",
                "bytesPerBlock": 16
            },
            "astc-6x6-unorm": {
                "blockWidth": 6,
                "blockHeight": 6,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-astc",
                "baseFormat": "astc-6x6-unorm",
                "bytesPerBlock": 16
            },
            "astc-6x6-unorm-srgb": {
                "blockWidth": 6,
                "blockHeight": 6,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-astc",
                "baseFormat": "astc-6x6-unorm",
                "bytesPerBlock": 16
            },
            "astc-8x5-unorm": {
                "blockWidth": 8,
                "blockHeight": 5,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-astc",
                "baseFormat": "astc-8x5-unorm",
                "bytesPerBlock": 16
            },
            "astc-8x5-unorm-srgb": {
                "blockWidth": 8,
                "blockHeight": 5,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-astc",
                "baseFormat": "astc-8x5-unorm",
                "bytesPerBlock": 16
            },
            "astc-8x6-unorm": {
                "blockWidth": 8,
                "blockHeight": 6,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-astc",
                "baseFormat": "astc-8x6-unorm",
                "bytesPerBlock": 16
            },
            "astc-8x6-unorm-srgb": {
                "blockWidth": 8,
                "blockHeight": 6,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-astc",
                "baseFormat": "astc-8x6-unorm",
                "bytesPerBlock": 16
            },
            "astc-8x8-unorm": {
                "blockWidth": 8,
                "blockHeight": 8,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-astc",
                "baseFormat": "astc-8x8-unorm",
                "bytesPerBlock": 16
            },
            "astc-8x8-unorm-srgb": {
                "blockWidth": 8,
                "blockHeight": 8,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-astc",
                "baseFormat": "astc-8x8-unorm",
                "bytesPerBlock": 16
            },
            "astc-10x5-unorm": {
                "blockWidth": 10,
                "blockHeight": 5,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-astc",
                "baseFormat": "astc-10x5-unorm",
                "bytesPerBlock": 16
            },
            "astc-10x5-unorm-srgb": {
                "blockWidth": 10,
                "blockHeight": 5,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-astc",
                "baseFormat": "astc-10x5-unorm",
                "bytesPerBlock": 16
            },
            "astc-10x6-unorm": {
                "blockWidth": 10,
                "blockHeight": 6,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-astc",
                "baseFormat": "astc-10x6-unorm",
                "bytesPerBlock": 16
            },
            "astc-10x6-unorm-srgb": {
                "blockWidth": 10,
                "blockHeight": 6,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-astc",
                "baseFormat": "astc-10x6-unorm",
                "bytesPerBlock": 16
            },
            "astc-10x8-unorm": {
                "blockWidth": 10,
                "blockHeight": 8,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-astc",
                "baseFormat": "astc-10x8-unorm",
                "bytesPerBlock": 16
            },
            "astc-10x8-unorm-srgb": {
                "blockWidth": 10,
                "blockHeight": 8,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-astc",
                "baseFormat": "astc-10x8-unorm",
                "bytesPerBlock": 16
            },
            "astc-10x10-unorm": {
                "blockWidth": 10,
                "blockHeight": 10,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-astc",
                "baseFormat": "astc-10x10-unorm",
                "bytesPerBlock": 16
            },
            "astc-10x10-unorm-srgb": {
                "blockWidth": 10,
                "blockHeight": 10,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-astc",
                "baseFormat": "astc-10x10-unorm",
                "bytesPerBlock": 16
            },
            "astc-12x10-unorm": {
                "blockWidth": 12,
                "blockHeight": 10,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-astc",
                "baseFormat": "astc-12x10-unorm",
                "bytesPerBlock": 16
            },
            "astc-12x10-unorm-srgb": {
                "blockWidth": 12,
                "blockHeight": 10,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-astc",
                "baseFormat": "astc-12x10-unorm",
                "bytesPerBlock": 16
            },
            "astc-12x12-unorm": {
                "blockWidth": 12,
                "blockHeight": 12,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-astc",
                "baseFormat": "astc-12x12-unorm",
                "bytesPerBlock": 16
            },
            "astc-12x12-unorm-srgb": {
                "blockWidth": 12,
                "blockHeight": 12,
                "color": {
                    "type": "float",
                    "copySrc": true,
                    "copyDst": true,
                    "storage": false,
                    "readWriteStorage": false,
                    "bytes": 16
                },
                "multisample": false,
                "feature": "texture-compression-astc",
                "baseFormat": "astc-12x12-unorm",
                "bytesPerBlock": 16
            }
        };

        function bitmaskToString(bitNames, mask) {
            const names = [];
            for (const [k, v] of Object.entries(bitNames)) {
                if (mask & v) {
                    names.push(k);
                }
            }
            return names.join('|');
        }
        function bufferUsageToString(mask) {
            return bitmaskToString(GPUBufferUsage, mask);
        }
        function textureUsageToString(mask) {
            return bitmaskToString(GPUTextureUsage, mask);
        }
        function unreachable(msg) {
            throw Error(`unreachable: ${''}`);
        }
        function roundUp(v, align) {
            return Math.ceil(v / align) * align;
        }
        function trimNulls(a) {
            const ndx = a.findLastIndex(v => v !== null);
            return a.slice(0, ndx + 1);
        }
        function reifyGPUOrigin3D(e) {
            e = e || [];
            const d = e;
            if (typeof d.x === 'number' || typeof d.y === 'number' || typeof d.z === 'number') {
                return [
                    d.x ?? 0,
                    d.y ?? 0,
                    d.z ?? 0,
                ];
            }
            const a = [...e];
            return [
                a[0] ?? 0,
                a[1] ?? 0,
                a[2] ?? 0,
            ];
        }
        function reifyGPUExtent3D(e) {
            const d = e;
            if (typeof d.width === 'number') {
                return [
                    d.width,
                    d.height ?? 1,
                    d.depthOrArrayLayers ?? 1,
                ];
            }
            const a = [...e];
            return [
                a[0],
                a[1] ?? 1,
                a[2] ?? 1,
            ];
        }
        function logicalMipLevelSpecificTextureExtent(texture, mipLevel) {
            switch (texture.dimension) {
                case '1d':
                    return [
                        Math.max(1, texture.width >> mipLevel),
                        1,
                        1,
                    ];
                case '2d':
                    return [
                        Math.max(1, texture.width >> mipLevel),
                        Math.max(1, texture.height >> mipLevel),
                        texture.depthOrArrayLayers,
                    ];
                case '3d':
                    return [
                        Math.max(1, texture.width >> mipLevel),
                        Math.max(1, texture.height >> mipLevel),
                        Math.max(1, texture.depthOrArrayLayers >> mipLevel),
                    ];
                default:
                    unreachable();
                    return [];
            }
        }
        function physicalMipLevelSpecificTextureExtent(texture, mipLevel) {
            const { blockWidth, blockHeight, } = kAllTextureFormatInfo[texture.format];
            const [width, height, depthOrArrayLayers] = logicalMipLevelSpecificTextureExtent(texture, mipLevel);
            switch (texture.dimension) {
                case '1d':
                    return [
                        roundUp(width, blockWidth),
                        1,
                        1,
                    ];
                case '2d':
                case '3d':
                    return [
                        roundUp(width, blockWidth),
                        roundUp(height, blockHeight),
                        depthOrArrayLayers,
                    ];
                default:
                    unreachable();
                    return [];
            }
        }

        function getProperties(o) {
            const keyValues = [];
            for (const k in o) {
                const v = o[k];
                if (typeof v !== 'function') {
                    if (o instanceof GPUBuffer && k === 'usage') {
                        keyValues.push(`${k}: ${v} (${bufferUsageToString(v)})`);
                    }
                    else if (o instanceof GPUTexture && k === 'usage') {
                        keyValues.push(`${k}: ${v} (${textureUsageToString(v)})`);
                    }
                    else {
                        keyValues.push(`${k}: ${JSON.stringify(v)}`);
                    }
                }
            }
            return keyValues.join(', ');
        }
        function objToString(o) {
            return `${o.constructor.name}(${o.label}){${getProperties(o)}}`;
        }
        function emitError(msg, objs = []) {
            throw new Error(`${msg}\n${(objs).map(o => objToString(o)).join('\n')}`);
        }
        function assert(condition, msg, resources) {
            if (!condition) {
                const lines = (resources || []).map(r => `    ${objToString(r)}`).join('\n');
                const m = msg ? (typeof msg === 'string' ? msg : msg()) : '';
                emitError(`${m}${lines ? `\n${lines}` : ''}`);
            }
        }

        function validateEncoderState(encoder, state) {
            assert(state === 'open', () => `encoder state(${state}) is not "open"`, [encoder]);
        }
        const s_commandEncoderToInfoMap = new WeakMap();
        function createCommandEncoder(commandEncoder) {
            s_commandEncoderToInfoMap.set(commandEncoder, { state: 'open' });
        }
        function unlockCommandEncoder(commandEncoder) {
            const info = s_commandEncoderToInfoMap.get(commandEncoder);
            assert(info.state === 'locked');
            info.state = 'open';
        }
        function lockCommandEncoder(commandEncoder) {
            getCommandBufferInfoAndValidateState(commandEncoder).state = 'locked';
        }
        function finishCommandEncoder(commandEncoder) {
            getCommandBufferInfoAndValidateState(commandEncoder).state = 'ended';
        }
        function getCommandBufferInfoAndValidateState(commandEncoder) {
            const info = s_commandEncoderToInfoMap.get(commandEncoder);
            validateEncoderState(commandEncoder, info.state);
            return info;
        }
        //function validateBindGroups(this: PassEncoder, _: void) {
        //  const {pipeline, bindGroups} = s_passToState.get(this)!;
        //  if (!pipeline) {
        //    emitError('no pipeline', [this]);
        //    return;
        //  }
        //  // get bind group indices needed for current pipeline
        //  const requiredGroupLayouts = s_pipelineToRequiredGroupLayouts.get(pipeline) || [];
        //  for (const {ndx, layout: requiredLayout} of requiredGroupLayouts) {
        //    const bindGroup = bindGroups[ndx];
        //    if (!bindGroup) {
        //      emitError(`no bindGroup at ndx: ${ndx}`);
        //      return;
        //    }
        //
        //    {
        //      const error = validateBindGroupIsGroupEquivalent(requiredLayout, bindGroup);
        //      if (error) {
        //        emitError(error);
        //        return;
        //      }
        //    }
        //
        //    {
        //      const error = validateMinBindingSize(requiredLayout, bindGroup));
        //      if (eror)
        //      emitErr
        //    }
        //  }
        //}

        /**
         * Adds a wrapper function to a class method that gets called before the actual function
         */
        function wrapFunctionBefore(API, fnName, fn) {
            const origFn = API.prototype[fnName];
            API.prototype[fnName] = function (...args) {
                fn.call(this, args);
                return origFn.call(this, ...args);
            };
        }
        /**
         * Adds a wrapper function to a class method that gets called after the actual function
         */
        function wrapFunctionAfter(API, fnName, fn) {
            const origFn = API.prototype[fnName];
            API.prototype[fnName] = function (...args) {
                const result = origFn.call(this, ...args);
                fn.call(this, result, args);
                return result;
            };
        }
        /**
         * Adds a wrapper function to an async class method that gets called after the actual function
         */
        function wrapAsyncFunctionAfter(API, fnName, fn) {
            const origFn = API.prototype[fnName];
            API.prototype[fnName] = async function (...args) {
                const result = await origFn.call(this, ...args);
                fn.call(this, result, args);
                return result;
            };
        }

        // A normal GPUPipelineDescriptor just has references to GPUBindGroupLayout objects
        // but we need the GPUBindGroupLayoutDescriptor for each. They don't exist for
        const s_bindGroupLayoutToBindGroupLayoutDescriptorPlus = new WeakMap();
        const s_pipelineLayoutToBindGroupLayoutDescriptorsPlus = new WeakMap();
        // getBindGroupLayout always returns a different object which means we can't
        // use it as a key in a map to look up it's layout descriptor ┌∩┐(◣_◢)┌∩┐
        function trackNewBindGroupLayout(layout, [group]) {
            // We need to associate this with it's BindGroupLayoutDescriptorPlus
            const pipelineLayout = s_pipelineToReifiedPipelineLayoutDescriptor.get(this);
            const descPlus = pipelineLayout.bindGroupLayoutDescriptors[group];
            if (descPlus) {
                s_bindGroupLayoutToBindGroupLayoutDescriptorPlus.set(layout, descPlus);
            }
        }
        wrapFunctionAfter(GPUComputePipeline, 'getBindGroupLayout', trackNewBindGroupLayout);
        wrapFunctionAfter(GPURenderPipeline, 'getBindGroupLayout', trackNewBindGroupLayout);
        // We're using JSON.stringify to make a hash/id
        // so we need the properties to be in the same order
        function createRenderPassLayout(colorFormats, sampleCount, depthStencilFormat) {
            return {
                colorFormats,
                sampleCount,
                ...(depthStencilFormat && { depthStencilFormat }),
            };
        }
        const s_renderPipelineToRenderPipelineDescriptor = new WeakMap();
        const s_pipelineToReifiedPipelineLayoutDescriptor = new WeakMap();
        function reifyConstants(c) {
            return { ...c };
        }
        function reifyProgramableStage(ps) {
            const { /*module,*/ entryPoint, constants } = ps;
            return {
                ...(entryPoint && { entryPoint }),
                ...(constants && { constants: reifyConstants(constants) }),
            };
        }
        function reifyVertexAttribute(attr) {
            const { format, offset, shaderLocation } = attr;
            return { format, offset, shaderLocation };
        }
        function reifyVertexBufferLayout(buffer) {
            const { arrayStride, stepMode = 'vertex', attributes } = buffer;
            return {
                arrayStride,
                stepMode,
                attributes: [...attributes].map(reifyVertexAttribute),
            };
        }
        function reifyVertexState(vertex) {
            const { buffers } = vertex;
            return {
                ...reifyProgramableStage(vertex),
                ...(buffers && { buffers: [...buffers].map(b => b ? reifyVertexBufferLayout(b) : null) }),
            };
        }
        function reifyBlendComponent(bc) {
            const { operation = 'add', srcFactor = 'one', dstFactor = 'zero' } = bc;
            return {
                operation,
                srcFactor,
                dstFactor,
            };
        }
        function reifyBlendState(blend) {
            return {
                color: reifyBlendComponent(blend.color),
                alpha: reifyBlendComponent(blend.alpha),
            };
        }
        function reifyColorTargetState(cts) {
            const { format, blend, writeMask } = cts;
            return {
                format,
                ...(blend && { blend: reifyBlendState(blend) }),
                writeMask: writeMask ?? 0xF,
            };
        }
        function reifyFragmentState(fragment) {
            return {
                ...reifyProgramableStage(fragment),
                targets: [...fragment.targets].map(t => t ? reifyColorTargetState(t) : null),
            };
        }
        function reifyPrimitiveState(p) {
            const { topology = 'triangle-list', stripIndexFormat, frontFace = 'ccw', cullMode = 'none',
            // unclippedDepth,
             } = p;
            return {
                topology,
                ...(stripIndexFormat && { stripIndexFormat }),
                frontFace,
                cullMode,
            };
        }
        function reifyStencilFaceState(sf) {
            const { compare = "always", failOp = "keep", depthFailOp = "keep", passOp = "keep", } = sf;
            return {
                compare, failOp, depthFailOp, passOp,
            };
        }
        function reifyDepthStencilState(ds) {
            const { format, depthWriteEnabled, depthCompare, stencilFront, stencilBack, stencilReadMask = 0xFFFFFFFF, stencilWriteMask = 0xFFFFFFFF, depthBias = 0, depthBiasSlopeScale = 0, depthBiasClamp = 0, } = ds;
            return {
                format,
                ...(depthCompare && { depthCompare }),
                ...(depthWriteEnabled !== undefined && { depthWriteEnabled }),
                ...(stencilFront && { stencilFront: reifyStencilFaceState(stencilFront) }),
                ...(stencilBack && { stencilBack: reifyStencilFaceState(stencilBack) }),
                stencilReadMask,
                stencilWriteMask,
                depthBias,
                depthBiasSlopeScale,
                depthBiasClamp,
            };
        }
        function reifyMultisampleState(ms) {
            const { count = 1, mask = 0xFFFFFFFF, alphaToCoverageEnabled = false, } = ms;
            return { count, mask, alphaToCoverageEnabled };
        }
        function reifyRenderPipelineDescriptor(desc) {
            const { vertex, fragment, primitive, depthStencil, multisample, } = desc;
            const renderPassLayout = createRenderPassLayout(fragment ? trimNulls([...fragment.targets].map(t => t ? t.format : null)) : [], multisample?.count || 1, depthStencil?.format);
            return {
                vertex: reifyVertexState(vertex),
                ...(fragment && reifyFragmentState(fragment)),
                ...(primitive && reifyPrimitiveState(primitive)),
                ...(depthStencil && reifyDepthStencilState(depthStencil)),
                ...(multisample && reifyMultisampleState(multisample)),
                passLayoutInfo: {
                    renderPassLayout,
                    passLayoutSignature: JSON.stringify(renderPassLayout),
                },
            };
        }
        function trackRenderPipelineDescriptor(pipeline, desc) {
            s_renderPipelineToRenderPipelineDescriptor.set(pipeline, reifyRenderPipelineDescriptor(desc));
        }

        const s_destroyedResource = new WeakSet();
        function assertNotDestroyed(obj) {
            assert(!s_destroyedResource.has(obj), () => `${objToString(obj)} is destroyed`);
        }
        wrapFunctionBefore(GPUBuffer, 'destroy', function () {
            s_destroyedResource.add(this);
        });
        wrapFunctionBefore(GPUTexture, 'destroy', function () {
            s_destroyedResource.add(this);
        });
        wrapFunctionBefore(GPUQuerySet, 'destroy', function () {
            s_destroyedResource.add(this);
        });
        wrapFunctionBefore(GPUDevice, 'destroy', function () {
            s_destroyedResource.add(this);
        });
        const s_bindGroupToInfo = new WeakMap();

        const s_textureViewToTexture = new WeakMap();
        const s_textureViewToDesc = new WeakMap();
        function resolveTextureAspect(format, aspect) {
            switch (aspect) {
                case 'all':
                    return format;
                case 'depth-only':
                case 'stencil-only':
                    return getDepthStencilFormatResolvedAspect(format, aspect);
            }
            return undefined;
        }
        function reifyTextureViewDescriptor(texture, desc) {
            const dimension = desc?.dimension ?? (texture.dimension === '2d'
                ? (texture.depthOrArrayLayers === 1 ? '2d' : '2d-array')
                : texture.dimension);
            const aspect = desc?.aspect ?? 'all';
            let format = desc?.format;
            if (!format) {
                const f = resolveTextureAspect(texture.format, aspect);
                format = f ?? texture.format;
            }
            return {
                format,
                dimension,
                aspect,
                baseMipLevel: desc?.baseMipLevel ?? 0,
                mipLevelCount: desc?.mipLevelCount ?? (texture.mipLevelCount - (desc?.baseMipLevel ?? 0)),
                baseArrayLayer: desc?.baseArrayLayer ?? 0,
                arrayLayerCount: desc?.arrayLayerCount ?? (dimension === 'cube'
                    ? 6
                    : (dimension === '2d-array' || dimension === 'cube-array'
                        ? texture.depthOrArrayLayers - (desc?.baseArrayLayer ?? 0)
                        : 1)),
            };
        }
        let lastDesc;
        wrapFunctionBefore(GPUTexture, 'createView', function ([desc]) {
            lastDesc = desc;
        });
        wrapFunctionAfter(GPUTexture, 'createView', function (view) {
            s_textureViewToTexture.set(view, this);
            s_textureViewToDesc.set(view, reifyTextureViewDescriptor(this, lastDesc));
        });

        function getResourceFromBindingResource(bindingResource) {
            if (bindingResource instanceof GPUTextureView) {
                return s_textureViewToTexture.get(bindingResource);
            }
            else if (bindingResource instanceof GPUSampler ||
                bindingResource instanceof GPUExternalTexture ||
                bindingResource instanceof GPUBuffer) {
                return bindingResource;
            }
            else {
                return bindingResource.buffer;
            }
        }
        const autoIdRE = /^(.*?)autoId\((\d+)\)/;
        function generateErrorMessageForMismatchedBindGroupLayouts(group, bindGroupInfo, bindGroupLayoutDescriptor) {
            const bgAuto = autoIdRE.exec(bindGroupInfo.layoutPlus.signature);
            const bglAuto = autoIdRE.exec(bindGroupLayoutDescriptor.signature);
            if (bgAuto || bglAuto) {
                // are they both auto?
                if (!bgAuto === !bglAuto) {
                    if (bgAuto[2] !== bglAuto[2]) {
                        return `bindGroup in group(${group}) is not compatible with pipeline requirements for that group \
because they are from different layout: 'auto' pipelines.`;
                    }
                }
                else {
                    return `bindGroup in group(${group}) is not compatible with pipeline requirements for that group \
because bindGroup's layout ${bgAuto ? 'is' : 'is not'} from a layout: 'auto' pipeline \
and the pipeline's bindGroup layout requirements ${bglAuto ? 'is' : 'is not'} from a layout: 'auto' pipeline`;
                }
            }
            return `bindGroup in group(${group}) is not compatible with pipeline requirements for that group

bindGroup.layout = ${JSON.stringify(bindGroupInfo.layoutPlus.bindGroupLayoutDescriptor, null, 2)}

pipeline.group[${group}] requirements = ${JSON.stringify(bindGroupLayoutDescriptor.bindGroupLayoutDescriptor, null, 2)}`;
        }
        function validateEncoderBindGroups(bindGroups, pipeline) {
            assert(!!pipeline, 'no pipeline set');
            const device = s_objToDevice.get(pipeline);
            const reifiedPipelineDescriptor = s_pipelineToReifiedPipelineLayoutDescriptor.get(pipeline);
            reifiedPipelineDescriptor.bindGroupLayoutDescriptors.forEach((bindGroupLayoutDescriptor, group) => {
                if (bindGroupLayoutDescriptor === undefined) {
                    return;
                }
                const binding = bindGroups[group];
                assert(!!binding, () => `required bindGroup missing from group(${group})`);
                const bindGroupInfo = s_bindGroupToInfo.get(binding.bindGroup);
                assert(bindGroupInfo.layoutPlus.signature === bindGroupLayoutDescriptor.signature, () => generateErrorMessageForMismatchedBindGroupLayouts(group, bindGroupInfo, bindGroupLayoutDescriptor));
                for (const { binding, resource: bindingResource } of bindGroupInfo.entries) {
                    const resource = getResourceFromBindingResource(bindingResource);
                    if (resource instanceof GPUTexture || resource instanceof GPUBuffer) {
                        assertNotDestroyed(resource);
                    }
                    assert(s_objToDevice.get(resource) === device, () => `texture at binding(${binding}) group(${group}) is not from same device`, [resource]);
                }
            });
            const bindGroupSpaceUsed = 0;
            return bindGroupSpaceUsed;
        }
        function validateBindGroupResourcesNotDestroyed(entries) {
            for (const { resource } of entries) {
                if (resource instanceof GPUTextureView) {
                    const texture = s_textureViewToTexture.get(resource);
                    assertNotDestroyed(texture);
                }
                else {
                    const asBufferBinding = resource;
                    const buffer = asBufferBinding.buffer;
                    if (buffer instanceof GPUBuffer) {
                        assertNotDestroyed(buffer);
                    }
                }
            }
        }
        [
            GPUShaderStage.VERTEX,
            GPUShaderStage.FRAGMENT,
            GPUShaderStage.COMPUTE,
        ];
        function* forEachDynamicBinding(info) {
            let dynamicOffsetIndex = 0;
            for (const entry of info.entries) {
                const bindingDescriptor = info.layoutPlus.entriesById[entry.binding];
                if (bindingDescriptor.buffer?.hasDynamicOffset) {
                    const bufferBinding = entry.resource;
                    const bufferLayout = bindingDescriptor.buffer;
                    yield { bufferBinding, bufferLayout, dynamicOffsetIndex };
                    ++dynamicOffsetIndex;
                }
            }
        }
        function wrapBindingCommandsMixin(API, s_passToPassInfoMap) {
            wrapFunctionBefore(API, 'setBindGroup', function ([index, bindGroup, dynamicOffsetsArg, dynamicOffsetDataStart, dynamicOffsetDataLength]) {
                const info = s_passToPassInfoMap.get(this);
                validateEncoderState(this, info.state);
                const bindGroupBindings = info.bindGroups;
                const dynamicOffsetCount = bindGroup
                    ? s_bindGroupToInfo.get(bindGroup).layoutPlus.dynamicOffsetCount
                    : 0;
                dynamicOffsetsArg = dynamicOffsetsArg ? new Uint32Array(dynamicOffsetsArg) : new Uint32Array(0);
                dynamicOffsetDataStart = dynamicOffsetDataStart ?? 0;
                dynamicOffsetDataLength = dynamicOffsetDataLength ?? dynamicOffsetsArg.length;
                const dynamicOffsets = dynamicOffsetsArg.slice(dynamicOffsetDataStart, dynamicOffsetDataLength);
                assert(dynamicOffsets.length === dynamicOffsetCount, `there must be the same number of dynamicOffsets(${dynamicOffsets.length}) as the layout requires (${dynamicOffsetCount})`);
                const device = s_objToDevice.get(this);
                const maxIndex = device.limits.maxBindGroups;
                assert(index >= 0, () => `index(${index}) must be >= 0`);
                assert(index < maxIndex, () => `index(${index}) must be < device.limits.maxBindGroups(${maxIndex})`);
                if (bindGroup) {
                    assert(device === s_objToDevice.get(bindGroup), () => `bindGroup must be from same device as ${parent.constructor.name}`, [bindGroup, parent]);
                    // Validate resources are not destroyed
                    const info = s_bindGroupToInfo.get(bindGroup);
                    validateBindGroupResourcesNotDestroyed(info.entries);
                    // Validate Dynamic Offsets
                    for (const { bufferBinding, bufferLayout, dynamicOffsetIndex } of forEachDynamicBinding(info)) {
                        const dynamicOffset = dynamicOffsets[dynamicOffsetIndex];
                        assert((bufferBinding.offset || 0) + dynamicOffset + (bufferLayout.minBindingSize || 0) <= bufferBinding.buffer.size, 'dynamic offset is out of range');
                        switch (bufferLayout.type) {
                            case 'uniform':
                                assert(dynamicOffset % device.limits.minUniformBufferOffsetAlignment === 0, () => `dynamicOffset[${dynamicOffsetIndex}](${dynamicOffset}) used for a uniform buffer is not a multiple of device.limits.minUniformBufferOffsetAlignment(${device.limits.minUniformBufferOffsetAlignment})`);
                                break;
                            case 'storage':
                            case 'read-only-storage':
                                assert(dynamicOffset % device.limits.minStorageBufferOffsetAlignment === 0, () => `dynamicOffset[${dynamicOffsetIndex}](${dynamicOffset}) used for a uniform buffer is not a multiple of device.limits.minStorageBufferOffsetAlignment(${device.limits.minStorageBufferOffsetAlignment})`);
                                break;
                        }
                    }
                    bindGroupBindings[index] = {
                        bindGroup,
                        dynamicOffsets,
                    };
                }
                else {
                    bindGroupBindings[index] = undefined;
                }
            });
        }

        function toArray(v) {
            return Array.isArray(v) ? v : [...v];
        }
        function validateValidToDraw(mixin, info, fn) {
            const bindGroupSpaceUsed = validateEncoderBindGroups(info.bindGroups, info.pipeline);
            const pipelineDescriptor = s_renderPipelineToRenderPipelineDescriptor.get(info.pipeline);
            const device = s_objToDevice.get(mixin);
            let vertexBufferSpaceUsed = 0;
            if (pipelineDescriptor.vertex.buffers) {
                // buffers is sequence so no forEach, convert to array
                const buffers = toArray(pipelineDescriptor.vertex.buffers);
                buffers.forEach((buffer, slot) => {
                    if (buffer) {
                        const vertexBufferBinding = info.vertexBuffers[slot];
                        assert(!!vertexBufferBinding, () => `no vertexBuffer in slot(${slot})`);
                        assertNotDestroyed(vertexBufferBinding.buffer);
                        fn(slot, buffer, vertexBufferBinding);
                        // don't need to check that vertex buffer is same device as was checked at setVertexBuffer
                        vertexBufferSpaceUsed = slot;
                    }
                });
            }
            // TODO: test!
            assert(bindGroupSpaceUsed + vertexBufferSpaceUsed <= device.limits.maxBindGroupsPlusVertexBuffers, () => `bindGroupSpaceUsed(${bindGroupSpaceUsed}) + vertexBufferSpaceUsed(${vertexBufferSpaceUsed}) <= device.limits.maxBindGroupsPlusVertexBuffers(${device.limits.maxBindGroupsPlusVertexBuffers})`);
        }
        function validateValidToDrawIndexed(mixin, info, fn) {
            assert(!!info.indexBuffer, 'indexBuffer is not set');
            const device = s_objToDevice.get(mixin);
            assertNotDestroyed(info.indexBuffer.buffer);
            assert(device === s_objToDevice.get(info.indexBuffer.buffer), 'indexBuffer is not from same device');
            validateValidToDraw(mixin, info, fn);
            const pipelineDescriptor = s_renderPipelineToRenderPipelineDescriptor.get(info.pipeline);
            switch (pipelineDescriptor.primitive?.topology) {
                case 'line-strip':
                case 'triangle-strip':
                    assert(info.indexFormat === pipelineDescriptor.primitive?.stripIndexFormat, () => `indexFormat(${info.indexFormat}) !== pipeline.primitive.stripIndexFormat(${pipelineDescriptor.primitive?.stripIndexFormat})`);
            }
        }
        function bufferSizeFromBufferBinding({ buffer, offset, size }) {
            offset = offset ?? 0;
            return size ?? buffer.size - offset;
        }
        const kVertexFormatInfo = {
            "float16": { components: 1, bytes: 2, type: "f16" },
            "float16x2": { components: 2, bytes: 4, type: "vec2<f16>" },
            "float16x4": { components: 4, bytes: 8, type: "vec4<f16>" },
            "float32": { components: 1, bytes: 4, type: "f32" },
            "float32x2": { components: 2, bytes: 8, type: "vec2<f32>" },
            "float32x3": { components: 3, bytes: 12, type: "vec3<f32>" },
            "float32x4": { components: 4, bytes: 16, type: "vec4<f32>" },
            "sint16": { components: 1, bytes: 2, type: "i32" },
            "sint16x2": { components: 2, bytes: 4, type: "vec2<i32>" },
            "sint16x4": { components: 4, bytes: 8, type: "vec4<i32>" },
            "sint32": { components: 1, bytes: 4, type: "i32" },
            "sint32x2": { components: 2, bytes: 8, type: "vec2<i32>" },
            "sint32x3": { components: 3, bytes: 12, type: "vec3<i32>" },
            "sint32x4": { components: 4, bytes: 16, type: "vec4<i32>" },
            "sint8": { components: 1, bytes: 1, type: "i32" },
            "sint8x2": { components: 2, bytes: 2, type: "vec2<i32>" },
            "sint8x4": { components: 4, bytes: 4, type: "vec4<i32>" },
            "snorm16": { components: 1, bytes: 2, type: "f32" },
            "snorm16x2": { components: 2, bytes: 4, type: "vec2<f32>" },
            "snorm16x4": { components: 4, bytes: 8, type: "vec4<f32>" },
            "snorm8": { components: 1, bytes: 1, type: "f32" },
            "snorm8x2": { components: 2, bytes: 2, type: "vec2<f32>" },
            "snorm8x4": { components: 4, bytes: 4, type: "vec4<f32>" },
            "uint16": { components: 1, bytes: 2, type: "u32" },
            "uint16x2": { components: 2, bytes: 4, type: "vec2<u32>" },
            "uint16x4": { components: 4, bytes: 8, type: "vec4<u32>" },
            "uint32": { components: 1, bytes: 4, type: "u32" },
            "uint32x2": { components: 2, bytes: 8, type: "vec2<u32>" },
            "uint32x3": { components: 3, bytes: 12, type: "vec3<u32>" },
            "uint32x4": { components: 4, bytes: 16, type: "vec4<u32>" },
            "uint8": { components: 1, bytes: 1, type: "u32" },
            "uint8x2": { components: 2, bytes: 2, type: "vec2<u32>" },
            "uint8x4": { components: 4, bytes: 4, type: "vec4<u32>" },
            "unorm10-10-10-2": { components: 4, bytes: 4, type: "vec4<f32>" },
            "unorm16": { components: 1, bytes: 2, type: "f32" },
            "unorm16x2": { components: 2, bytes: 4, type: "vec2<f32>" },
            "unorm16x4": { components: 4, bytes: 8, type: "vec4<f32>" },
            "unorm8": { components: 1, bytes: 1, type: "f32" },
            "unorm8x2": { components: 2, bytes: 2, type: "vec2<f32>" },
            "unorm8x4-bgra": { components: 4, bytes: 4, type: "vec4<u32>" },
            "unorm8x4": { components: 4, bytes: 4, type: "vec4<f32>" },
        };
        function getLastStride(layout) {
            let lastStride = 0;
            for (const { offset, format } of layout.attributes) {
                lastStride = Math.max(lastStride, offset + kVertexFormatInfo[format].bytes);
            }
            return lastStride;
        }
        function wrapRenderCommandsMixin(API, s_renderPassToPassInfoMap, getRenderPassInfo) {
            wrapFunctionBefore(API, 'draw', function ([vertexCount, a_instanceCount, a_firstVertex, a_firstInstance]) {
                const instanceCount = a_instanceCount ?? 1;
                const firstVertex = a_firstVertex ?? 0;
                const firstInstance = a_firstInstance ?? 0;
                const info = s_renderPassToPassInfoMap.get(this);
                validateEncoderState(this, info.state);
                validateValidToDraw(this, info, (slot, layout, vertexBufferBinding) => {
                    const bufferSize = bufferSizeFromBufferBinding(vertexBufferBinding);
                    const stride = layout.arrayStride;
                    const lastStride = getLastStride(layout);
                    const strideCount = layout.stepMode === 'instance'
                        ? firstInstance + instanceCount
                        : firstVertex + vertexCount;
                    if (strideCount !== 0) {
                        const bytesNeeded = (strideCount - 1) * stride + lastStride;
                        assert(bytesNeeded <= bufferSize, () => `slot(${slot}) vertex buffer binding size ${bufferSize} is not large enough for bytes needed(${bytesNeeded})`);
                    }
                });
            });
            wrapFunctionBefore(API, 'drawIndexed', function ([indexCount, a_instanceCount, a_firstIndex, /*a_baseVertex*/ , a_firstInstance]) {
                const instanceCount = a_instanceCount ?? 1;
                const firstIndex = a_firstIndex ?? 0;
                // const baseVertex = a_baseVertex ?? 0;
                const firstInstance = a_firstInstance ?? 0;
                const info = s_renderPassToPassInfoMap.get(this);
                validateEncoderState(this, info.state);
                validateValidToDrawIndexed(this, info, (slot, layout, vertexBufferBinding) => {
                    const bufferSize = bufferSizeFromBufferBinding(vertexBufferBinding);
                    const stride = layout.arrayStride;
                    const lastStride = getLastStride(layout);
                    const strideCount = firstInstance + instanceCount;
                    if (layout.stepMode === 'instance') {
                        const bytesNeeded = (strideCount - 1) * stride + lastStride;
                        assert(bytesNeeded <= bufferSize, () => `slot(${slot}) vertex buffer binding size ${bufferSize} is not large enough for bytes needed(${bytesNeeded})`);
                    }
                });
                const bufferSize = bufferSizeFromBufferBinding(info.indexBuffer);
                const indexByteSize = info.indexFormat === 'uint16' ? 2 : 4;
                const bytesNeeded = firstIndex + indexCount * indexByteSize;
                assert(bytesNeeded <= bufferSize, () => `indexBuffer bound size(${bufferSize}) is not large enough for bytesNeeded(${bytesNeeded})`);
            });
            const kIndirectDrawParametersSize = 16;
            wrapFunctionBefore(API, 'drawIndirect', function ([indirectBuffer, indirectOffset]) {
                const info = s_renderPassToPassInfoMap.get(this);
                validateEncoderState(this, info.state);
                validateValidToDraw(this, info, () => { });
                assertNotDestroyed(indirectBuffer);
                const device = s_objToDevice.get(this);
                assert(device === s_objToDevice.get(indirectBuffer), 'indirectBuffer is not from same device', [indirectBuffer]);
                assert(!!(indirectBuffer.usage & GPUBufferUsage.INDIRECT), () => `buffer(${bufferUsageToString(indirectBuffer.usage)}) must have usage INDIRECT`, [indirectBuffer, this]);
                assert(indirectOffset + kIndirectDrawParametersSize <= indirectBuffer.size, `indirectOffset(${indirectOffset}) + sizeOfIndirectParameters(${kIndirectDrawParametersSize}) > indirectBuffer.size(${indirectBuffer.size})`, [indirectBuffer]);
                assert(indirectOffset % 4 === 0, () => `indirectOffset(${indirectOffset}) is not multiple of 4`);
            });
            const kIndirectDrawIndexedParametersSize = 20;
            wrapFunctionBefore(API, 'drawIndexedIndirect', function ([indirectBuffer, indirectOffset]) {
                const info = s_renderPassToPassInfoMap.get(this);
                validateEncoderState(this, info.state);
                validateValidToDrawIndexed(this, info, () => { });
                assertNotDestroyed(indirectBuffer);
                const device = s_objToDevice.get(this);
                assert(device === s_objToDevice.get(indirectBuffer), 'indirectBuffer is not from same device', [indirectBuffer]);
                assert(!!(indirectBuffer.usage & GPUBufferUsage.INDIRECT), () => `buffer(${bufferUsageToString(indirectBuffer.usage)}) must have usage INDIRECT`, [indirectBuffer, this]);
                assert(indirectOffset + kIndirectDrawIndexedParametersSize <= indirectBuffer.size, `indirectOffset(${indirectOffset}) + sizeOfIndirectParameters(${kIndirectDrawIndexedParametersSize}) > indirectBuffer.size(${indirectBuffer.size})`, [indirectBuffer]);
                assert(indirectOffset % 4 === 0, () => `indirectOffset(${indirectOffset}) is not multiple of 4`);
            });
            wrapFunctionBefore(API, 'setPipeline', function ([pipeline]) {
                const info = s_renderPassToPassInfoMap.get(this);
                validateEncoderState(this, info.state);
                assert(s_objToDevice.get(this) === s_objToDevice.get(pipeline), 'pipeline must be from same device as renderPassEncoder', [pipeline, this]);
                const pipelineDesc = s_renderPipelineToRenderPipelineDescriptor.get(pipeline);
                const passLayoutInfo = getRenderPassInfo(this);
                assert(pipelineDesc.passLayoutInfo.passLayoutSignature === passLayoutInfo.passLayoutSignature, () => `pipeline is not compatible with ${this.constructor.name}

${this.constructor.name} expects ${JSON.stringify(passLayoutInfo.renderPassLayout, null, 2)}

pipeline is: ${JSON.stringify(pipelineDesc.passLayoutInfo.renderPassLayout, null, 2)}
`, [pipeline, this]);
                info.pipeline = pipeline;
            });
            wrapFunctionBefore(API, 'setIndexBuffer', function ([buffer, format, offset, size]) {
                const info = s_renderPassToPassInfoMap.get(this);
                validateEncoderState(this, info.state);
                const device = s_objToDevice.get(this);
                offset = offset ?? 0;
                size = size ?? Math.max(0, buffer.size - offset);
                assert(device === s_objToDevice.get(buffer), 'buffer must be from the same device', [buffer, this]);
                assertNotDestroyed(buffer);
                assert(!!(buffer.usage & GPUBufferUsage.INDEX), () => `buffer(${bufferUsageToString(buffer.usage)}) must have usage INDEX`, [buffer, this]);
                const align = format === 'uint16' ? 2 : 4;
                assert(offset % align === 0, () => `offset(${offset}) must be multiple of index format: ${format}`, [buffer, this]);
                assert(offset + size <= buffer.size, () => `offset(${offset}) + size(${size}) is not <= buffer.size(${buffer.size})`, [buffer, this]);
                info.indexBuffer = {
                    buffer,
                    offset,
                    size,
                };
                info.indexFormat = format;
            });
            wrapFunctionBefore(API, 'setVertexBuffer', function ([slot, buffer, offset, size]) {
                const info = s_renderPassToPassInfoMap.get(this);
                validateEncoderState(this, info.state);
                const device = s_objToDevice.get(this);
                const maxSlot = device.limits.maxVertexBuffers;
                const bufferSize = buffer?.size || 0;
                offset = offset ?? 0;
                size = size ?? Math.max(0, bufferSize - offset);
                assert(slot >= 0, () => `slot(${slot}) must be >= 0`, [this]);
                assert(slot < maxSlot, () => `slot(${slot}) must be < device.limits.maxVertexBuffers(${maxSlot})`, [this]);
                assert(offset % 4 === 0, () => `offset(${offset}) must be multiple of 4`, [this]);
                assert(offset + size <= bufferSize, () => `offset(${offset}) + size(${size}) is not <= buffer.size(${bufferSize})`, [this, ...(buffer ? [buffer] : [])]);
                if (!buffer) {
                    info.vertexBuffers[slot] = undefined;
                }
                else {
                    assert(device === s_objToDevice.get(buffer), 'buffer must be from the same device', [buffer, this]);
                    assertNotDestroyed(buffer);
                    assert(!!(buffer.usage & GPUBufferUsage.VERTEX), () => `buffer(${bufferUsageToString(buffer.usage)}) must have usage VERTEX`, [buffer, this]);
                    info.vertexBuffers[slot] = {
                        buffer,
                        offset,
                        size,
                    };
                }
            });
        }

        const s_bundleEncoderToPassInfoMap = new WeakMap();
        const s_bundleToPassInfoMap = new WeakMap();
        function getRenderPassLayout$1(bundleEncoder) {
            return s_bundleEncoderToPassInfoMap.get(bundleEncoder).passLayoutInfo;
        }
        function getRenderPassLayoutForRenderBundle(bundle) {
            return s_bundleToPassInfoMap.get(bundle);
        }
        wrapRenderCommandsMixin(GPURenderBundleEncoder, s_bundleEncoderToPassInfoMap, getRenderPassLayout$1);
        function createRenderBundleEncoder(encoder, desc) {
            const { sampleCount = 1, depthStencilFormat, colorFormats } = desc;
            const renderPassLayout = createRenderPassLayout(trimNulls([...colorFormats]), sampleCount, depthStencilFormat);
            s_bundleEncoderToPassInfoMap.set(encoder, {
                state: 'open', // this is not needed. should we move it?
                desc: { ...desc },
                vertexBuffers: [],
                bindGroups: [],
                passLayoutInfo: {
                    renderPassLayout,
                    passLayoutSignature: JSON.stringify(renderPassLayout),
                },
            });
        }
        wrapBindingCommandsMixin(GPURenderBundleEncoder, s_bundleEncoderToPassInfoMap);
        wrapFunctionBefore(GPURenderBundleEncoder, 'finish', function () {
            const info = s_bundleEncoderToPassInfoMap.get(this);
            validateEncoderState(this, info.state);
            info.state = 'ended';
        });
        wrapFunctionAfter(GPURenderBundleEncoder, 'finish', function (bundle) {
            s_objToDevice.set(bundle, s_objToDevice.get(this));
            s_bundleToPassInfoMap.set(bundle, s_bundleEncoderToPassInfoMap.get(this));
        });

        const s_shaderModuleToDefs = new WeakMap();
        function addDefs(defs, stage) {
            if (stage) {
                defs.push(s_shaderModuleToDefs.get(stage.module));
            }
        }
        function reifyBufferLayout(buffer) {
            return {
                type: buffer.type ?? 'uniform',
                hasDynamicOffset: !!buffer.hasDynamicOffset,
                minBindingSize: buffer.minBindingSize ?? 0,
            };
        }
        function reifySamplerLayout(sampler) {
            return {
                type: sampler.type ?? 'filtering',
            };
        }
        function reifyTextureLayout(texture) {
            return {
                sampleType: texture.sampleType ?? 'float',
                viewDimension: texture.viewDimension ?? '2d',
                multisampled: !!texture.multisampled,
            };
        }
        function reifyStorageTexture(storageTexture) {
            return {
                access: storageTexture.access ?? 'write-only',
                format: storageTexture.format,
                viewDimension: storageTexture.viewDimension ?? '2d',
            };
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        function reifyExternalTexture(externalTexture) {
            return {};
        }
        function reifyBindGroupLayoutEntry({ binding, visibility, buffer, sampler, texture, storageTexture, externalTexture, }) {
            return {
                binding,
                visibility,
                ...(buffer && { buffer: reifyBufferLayout(buffer) }),
                ...(sampler && { sampler: reifySamplerLayout(sampler) }),
                ...(texture && { texture: reifyTextureLayout(texture) }),
                ...(storageTexture && { storageTexture: reifyStorageTexture(storageTexture) }),
                ...(externalTexture && { externalTexture: reifyExternalTexture() }),
            };
        }
        function bindGroupLayoutDescriptorToBindGroupLayoutDescriptorPlus(src, autoId) {
            const bindGroupLayoutDescriptor = {
                entries: [...src.entries].map(reifyBindGroupLayoutEntry),
            };
            const entriesById = Object.fromEntries(bindGroupLayoutDescriptor.entries.map(e => [e.binding, e]));
            const dynamicOffsetCount = bindGroupLayoutDescriptor.entries.reduce((a, v) => a + (v.buffer?.hasDynamicOffset ? 1 : 0), 0);
            const signature = `${JSON.stringify(bindGroupLayoutDescriptor)}${autoId ? `:autoId(${autoId})` : ''})`;
            return {
                bindGroupLayoutDescriptor,
                entriesById,
                dynamicOffsetCount,
                signature,
            };
        }
        let s_autoCount = 1;
        function getReifiedPipelineLayoutDescriptor(desc) {
            if (desc.layout === 'auto') {
                // It's auto so we need to make a reified pipeline descriptor
                const defs = [];
                addDefs(defs, desc.vertex);
                addDefs(defs, desc.fragment);
                addDefs(defs, desc.compute);
                const autoId = s_autoCount++;
                const bindGroupLayoutDescriptors = makeBindGroupLayoutDescriptors(defs, desc).map(b => bindGroupLayoutDescriptorToBindGroupLayoutDescriptorPlus(b, autoId));
                return {
                    bindGroupLayoutDescriptors,
                };
            }
            else {
                const bindGroupLayoutDescriptors = s_pipelineLayoutToBindGroupLayoutDescriptorsPlus.get(desc.layout);
                return {
                    bindGroupLayoutDescriptors,
                };
            }
        }
        function trackPipelineLayouts(device, pipeline, desc) {
            s_pipelineToReifiedPipelineLayoutDescriptor.set(pipeline, getReifiedPipelineLayoutDescriptor(desc));
        }
        wrapFunctionAfter(GPUDevice, 'createShaderModule', function (module, [desc]) {
            assertNotDestroyed(this);
            s_objToDevice.set(module, this);
            s_shaderModuleToDefs.set(module, makeShaderDataDefinitions(desc.code));
        });
        wrapFunctionAfter(GPUDevice, 'createBindGroup', function (bindGroup, [desc]) {
            s_objToDevice.set(bindGroup, this);
            const { layout } = desc;
            // copy the entries since the user might change them
            const entries = [];
            for (const { binding, resource } of [...desc.entries]) {
                const r = resource instanceof GPUBuffer ||
                    resource instanceof GPUSampler ||
                    resource instanceof GPUTextureView ||
                    resource instanceof GPUExternalTexture
                    ? resource
                    : { ...resource };
                const rb = r;
                if (rb.buffer instanceof GPUBuffer) {
                    const offset = rb.offset || 0;
                    const size = rb.size || rb.buffer.size - offset;
                    assert(offset + size <= rb.buffer.size, () => `offset(${offset} + size(${size}) > buffer.size(${rb.buffer.size}))`, [rb.buffer]);
                }
                entries.push({
                    binding,
                    resource: r,
                });
            }
            entries.sort((a, b) => a.binding - b.binding);
            validateBindGroupResourcesNotDestroyed(entries);
            const layoutPlus = s_bindGroupLayoutToBindGroupLayoutDescriptorPlus.get(layout);
            s_bindGroupToInfo.set(bindGroup, {
                entries,
                layoutPlus,
            });
        });
        wrapFunctionAfter(GPUDevice, 'createBuffer', function (buffer) {
            assertNotDestroyed(this);
            s_objToDevice.set(buffer, this);
        });
        wrapFunctionAfter(GPUDevice, 'createQuerySet', function (querySet) {
            assertNotDestroyed(this);
            s_objToDevice.set(querySet, this);
        });
        wrapFunctionAfter(GPUDevice, 'createSampler', function (sampler) {
            assertNotDestroyed(this);
            s_objToDevice.set(sampler, this);
        });
        wrapFunctionAfter(GPUDevice, 'createTexture', function (texture) {
            assertNotDestroyed(this);
            s_objToDevice.set(texture, this);
        });
        wrapFunctionAfter(GPUDevice, 'importExternalTexture', function (externalTexture) {
            s_objToDevice.set(externalTexture, this);
        });
        wrapFunctionAfter(GPUDevice, 'createCommandEncoder', function (commandEncoder) {
            assertNotDestroyed(this);
            s_objToDevice.set(commandEncoder, this);
            createCommandEncoder(commandEncoder);
        });
        wrapFunctionAfter(GPUDevice, 'createRenderBundleEncoder', function (bundleEncoder, [desc]) {
            assertNotDestroyed(this);
            s_objToDevice.set(bundleEncoder, this);
            createRenderBundleEncoder(bundleEncoder, desc);
        });
        wrapFunctionAfter(GPUDevice, 'createRenderPipeline', function (pipeline, [desc]) {
            assertNotDestroyed(this);
            s_objToDevice.set(pipeline, this);
            trackRenderPipelineDescriptor(pipeline, desc);
            trackPipelineLayouts(this, pipeline, desc);
        });
        wrapFunctionAfter(GPUDevice, 'createComputePipeline', function (pipeline, [desc]) {
            assertNotDestroyed(this);
            s_objToDevice.set(pipeline, this);
            trackPipelineLayouts(this, pipeline, desc);
        });
        wrapAsyncFunctionAfter(GPUDevice, 'createRenderPipelineAsync', function (pipeline, [desc]) {
            assertNotDestroyed(this);
            s_objToDevice.set(pipeline, this);
            trackRenderPipelineDescriptor(pipeline, desc);
            trackPipelineLayouts(this, pipeline, desc);
        });
        wrapAsyncFunctionAfter(GPUDevice, 'createComputePipelineAsync', function (pipeline, [desc]) {
            assertNotDestroyed(this);
            s_objToDevice.set(pipeline, this);
            trackPipelineLayouts(this, pipeline, desc);
        });
        wrapFunctionAfter(GPUDevice, 'createBindGroupLayout', function (bindGroupLayout, [desc]) {
            s_bindGroupLayoutToBindGroupLayoutDescriptorPlus.set(bindGroupLayout, bindGroupLayoutDescriptorToBindGroupLayoutDescriptorPlus(desc, 0));
        });
        wrapFunctionAfter(GPUDevice, 'createPipelineLayout', function (pipelineLayout, [desc]) {
            // need to copy the description because the user may change it after
            const bglDescriptorsPlus = [...desc.bindGroupLayouts].map(bgl => bgl ? s_bindGroupLayoutToBindGroupLayoutDescriptorPlus.get(bgl) : undefined);
            s_pipelineLayoutToBindGroupLayoutDescriptorsPlus.set(pipelineLayout, bglDescriptorsPlus);
        });

        wrapFunctionBefore(GPUCanvasContext, 'configure', function ([desc]) {
            s_objToDevice.set(this, desc.device);
        });
        wrapFunctionBefore(GPUCanvasContext, 'unconfigure', function () {
            s_objToDevice.delete(this);
        });
        wrapFunctionAfter(GPUCanvasContext, 'getCurrentTexture', function (texture) {
            const device = s_objToDevice.get(this);
            s_objToDevice.set(texture, device);
        });

        function validateTimestampWrites(device, timestampWrites) {
            const { querySet, beginningOfPassWriteIndex, endOfPassWriteIndex } = timestampWrites;
            assertNotDestroyed(querySet);
            assert(s_objToDevice.get(querySet) === device, 'querySet not from same device', [querySet]);
            assert(querySet.type === 'timestamp', () => `querySet.type(${querySet.type}) !== 'timestamp'`);
            assert(beginningOfPassWriteIndex === undefined || beginningOfPassWriteIndex < querySet.count, () => `timestampWrites.beginningOfPassWriteIndex(${beginningOfPassWriteIndex}) is >= querySet.count(${querySet.count})`);
            assert(endOfPassWriteIndex === undefined || endOfPassWriteIndex < querySet.count, () => `timestampWrites.endOfPassWriteIndex(${endOfPassWriteIndex}) is >= querySet.count(${querySet.count})`);
            assert(beginningOfPassWriteIndex !== undefined || endOfPassWriteIndex !== undefined, () => `at least one of beginningOfPassWriteIndex(${beginningOfPassWriteIndex}) or endOfPassWriteIndex(${endOfPassWriteIndex})`);
            assert(beginningOfPassWriteIndex !== endOfPassWriteIndex, () => `beginningOfPassWriteIndex(${beginningOfPassWriteIndex}) and endOfPassWriteIndex(${endOfPassWriteIndex}) may not be the same`);
        }

        const s_computePassToPassInfoMap = new WeakMap();
        function beginComputePass(commandEncoder, passEncoder, desc) {
            const device = s_objToDevice.get(commandEncoder);
            const { timestampWrites } = desc || {};
            if (timestampWrites) {
                validateTimestampWrites(device, timestampWrites);
            }
            s_computePassToPassInfoMap.set(passEncoder, {
                state: 'open',
                commandEncoder,
                bindGroups: [],
            });
        }
        wrapBindingCommandsMixin(GPUComputePassEncoder, s_computePassToPassInfoMap);
        wrapFunctionBefore(GPUComputePassEncoder, 'setPipeline', function ([pipeline]) {
            const info = s_computePassToPassInfoMap.get(this);
            validateEncoderState(this, info.state);
            assert(s_objToDevice.get(info.commandEncoder) === s_objToDevice.get(pipeline), 'pipeline must be from same device as computePassEncoder', [this, info.commandEncoder]);
            info.pipeline = pipeline;
        });
        wrapFunctionBefore(GPUComputePassEncoder, 'end', function () {
            const info = s_computePassToPassInfoMap.get(this);
            validateEncoderState(this, info.state);
            info.state = 'ended';
            unlockCommandEncoder(info.commandEncoder);
        });
        wrapFunctionBefore(GPUComputePassEncoder, 'dispatchWorkgroups', function ([workgroupCountX, workgroupCountY = 1, workgroupCountZ = 1]) {
            const info = s_computePassToPassInfoMap.get(this);
            validateEncoderState(this, info.state);
            validateEncoderBindGroups(info.bindGroups, info.pipeline);
            const device = s_objToDevice.get(this);
            assert(workgroupCountX <= device.limits.maxComputeWorkgroupsPerDimension, () => `workGroupCountX(${workgroupCountX}) > device.limits.maxComputeWorkgroupsPerDimension(${device.limits.maxComputeWorkgroupsPerDimension})`);
            assert(workgroupCountY <= device.limits.maxComputeWorkgroupsPerDimension, () => `workGroupCountY(${workgroupCountY}) > device.limits.maxComputeWorkgroupsPerDimension(${device.limits.maxComputeWorkgroupsPerDimension})`);
            assert(workgroupCountZ <= device.limits.maxComputeWorkgroupsPerDimension, () => `workGroupCountZ(${workgroupCountZ}) > device.limits.maxComputeWorkgroupsPerDimension(${device.limits.maxComputeWorkgroupsPerDimension})`);
        });
        const kIndirectDispatchWorkgroupsParametersSize = 12;
        wrapFunctionBefore(GPUComputePassEncoder, 'dispatchWorkgroupsIndirect', function ([indirectBuffer, indirectOffset]) {
            const info = s_computePassToPassInfoMap.get(this);
            validateEncoderState(this, info.state);
            validateEncoderBindGroups(info.bindGroups, info.pipeline);
            assertNotDestroyed(indirectBuffer);
            const device = s_objToDevice.get(this);
            assert(device === s_objToDevice.get(indirectBuffer), 'indirectBuffer is not from same device', [indirectBuffer]);
            assert(!!(indirectBuffer.usage & GPUBufferUsage.INDIRECT), () => `buffer(${bufferUsageToString(indirectBuffer.usage)}) must have usage INDIRECT`, [indirectBuffer, this]);
            assert(indirectOffset + kIndirectDispatchWorkgroupsParametersSize <= indirectBuffer.size, `indirectOffset(${indirectOffset}) + sizeOfIndirectParameters(${kIndirectDispatchWorkgroupsParametersSize}) > indirectBuffer.size(${indirectBuffer.size})`, [indirectBuffer]);
            assert(indirectOffset % 4 === 0, () => `indirectOffset(${indirectOffset}) is not multiple of 4`);
        });

        const s_renderPassToPassInfoMap = new WeakMap();
        function getRenderPassLayout(passEncoder) {
            return s_renderPassToPassInfoMap.get(passEncoder).passLayoutInfo;
        }
        /*
        function checkTextureNotInUse(inuseTextures: InUseTextures, texture: GPUTexture, fullView: TextureViewDescriptor) {
          const views = inuseTextures.get(texture);
          if (!views) {
            return;
          }
        }
        */
        function markTextureInUse(inuseTextures, texture, view) {
            const fullView = s_textureViewToDesc.get(view);
            const inUseDepthOrArrayLayers = inuseTextures.get(texture) || new Map();
            inuseTextures.set(texture, inUseDepthOrArrayLayers);
            for (let l = 0; l < fullView.arrayLayerCount; ++l) {
                const layer = l + fullView.baseArrayLayer;
                const inUseMipLevels = inUseDepthOrArrayLayers.get(layer) || new Set();
                inUseDepthOrArrayLayers.set(layer, inUseMipLevels);
                for (let m = 0; m < fullView.mipLevelCount; ++m) {
                    const mipLevel = m + fullView.baseMipLevel;
                    assert(!inUseMipLevels.has(mipLevel), () => `mipLevel(${mipLevel}) of layer(${layer}) is already in use`, [texture]);
                    inUseMipLevels.add(mipLevel);
                }
            }
        }
        function validateViewAspectIsAllAspectsOfTexture(texture, aspect) {
            const { depth, stencil } = kAllTextureFormatInfo[texture.format];
            if (depth && stencil) {
                assert(aspect === 'all', 'aspect must be all for depth-stencil textures', [texture]);
            }
            else if (depth) {
                assert(aspect === 'all' || aspect === 'depth-only', 'aspect must be all or depth-only for depth textures', [texture]);
            }
            else if (stencil) {
                assert(aspect === 'all' || aspect === 'stencil-only', 'aspect must be all or stencil-only for stencil textures', [texture]);
            }
        }
        function validateRenderableTextureView(texture, viewDesc) {
            assert((texture.usage & GPUTextureUsage.RENDER_ATTACHMENT) !== 0, () => `texture.usage(${textureUsageToString(texture.usage)}) is missing RENDER_ATTACHMENT`, [texture]);
            const { dimension, mipLevelCount, arrayLayerCount, aspect } = viewDesc;
            assert(dimension === '2d' || dimension === '3d', () => `dimension(${dimension}) must be 2d or 3d`);
            assert(mipLevelCount === 1, () => `mipLevelCount(${mipLevelCount}) must be 1`);
            assert(arrayLayerCount === 1, () => `arrayLayerCount(${arrayLayerCount}) must be 1`);
            validateViewAspectIsAllAspectsOfTexture(texture, aspect);
        }
        function validateRenderPassColorAttachment(attachment, slot) {
            const { view, resolveTarget, depthSlice, loadOp } = attachment;
            const renderViewDesc = s_textureViewToDesc.get(view);
            const renderTexture = s_textureViewToTexture.get(view);
            const formatInfo = kAllTextureFormatInfo[renderViewDesc.format];
            validateRenderableTextureView(renderTexture, renderViewDesc);
            assert(!!formatInfo.colorRender, () => `format(${renderViewDesc.format}) is not color renderable`);
            if (renderViewDesc.dimension === '3d') {
                assert(!!depthSlice, () => `attachment(${slot})'s dimension is '3d' but depthSlice is missing`);
                const [, , d] = logicalMipLevelSpecificTextureExtent(renderTexture, renderViewDesc.baseMipLevel);
                assert(depthSlice < d, () => `depthSlice(${depthSlice}) must be < depth(${d}) at mipLevel(${renderViewDesc.mipLevelCount}) of texture`, [renderTexture]);
            }
            else {
                assert(depthSlice === undefined, `attachment(${slot}) is not 3d so depthSlice must NOT be provided`);
            }
            if (resolveTarget) {
                const resolveViewDesc = s_textureViewToDesc.get(resolveTarget);
                const resolveTexture = s_textureViewToTexture.get(resolveTarget);
                const [tw, th] = logicalMipLevelSpecificTextureExtent(renderTexture, renderViewDesc.baseMipLevel);
                const [rw, rh] = logicalMipLevelSpecificTextureExtent(resolveTexture, resolveViewDesc.baseMipLevel);
                assert(tw === rw && th === rh, () => `resolveTarget render extent(${rw}, ${rh}) != view render extent (${tw}, ${th})`);
                assert(renderTexture.sampleCount > 1, 'resolveTarget is set so view texture must have sampleCount > 1', [renderTexture]);
                assert(resolveTexture.sampleCount === 1, 'resolveTarget.sampleCount must be 1', [resolveTarget]);
                validateRenderableTextureView(resolveTexture, resolveViewDesc);
                assert(resolveViewDesc.format === renderViewDesc.format, () => `resolveTarget.view.format(${resolveViewDesc.format}) must equal target.view.format(${renderViewDesc.format})`);
                assert(resolveTexture.format === renderTexture.format, () => `resolve texture format(${resolveTexture.format}) must equal target texture format(${renderTexture.format})`);
                const resolveFormatInfo = kAllTextureFormatInfo[resolveTexture.format];
                assert(!!resolveFormatInfo?.colorRender?.resolve, () => `resolve texture.format(${resolveTexture.format}) does not support resolving`);
            }
        }
        wrapRenderCommandsMixin(GPURenderPassEncoder, s_renderPassToPassInfoMap, getRenderPassLayout);
        function beginRenderPass(commandEncoder, passEncoder, desc) {
            let targetWidth;
            let targetHeight;
            const device = s_objToDevice.get(commandEncoder);
            const inuseTextures = new Map();
            const colorFormats = [];
            let passSampleCount;
            let depthStencilFormat;
            let bytesPerSample = 0;
            let numAttachments = 0;
            const checkRenderExtent = (texture, view) => {
                const desc = s_textureViewToDesc.get(view);
                const [width, height] = logicalMipLevelSpecificTextureExtent(texture, desc.baseMipLevel);
                if (targetWidth === undefined) {
                    targetWidth = width;
                    targetHeight = height;
                }
                else if (targetWidth !== width || targetHeight !== height) {
                    emitError('attachments are not all the same width and height', [view, texture, passEncoder, commandEncoder]);
                }
            };
            const addView = (attachment, isDepth) => {
                if (!attachment) {
                    if (!isDepth) {
                        colorFormats.push(null);
                    }
                    return;
                }
                ++numAttachments;
                const { view } = attachment;
                const texture = s_textureViewToTexture.get(view);
                assertNotDestroyed(texture);
                assert(s_objToDevice.get(texture) === device, 'texture is not from same device as command encoder', [texture, commandEncoder]);
                const { sampleCount, format } = texture;
                const formatInfo = kAllTextureFormatInfo[format];
                markTextureInUse(inuseTextures, texture, view);
                const { colorRender, depth, stencil } = formatInfo;
                checkRenderExtent(texture, view);
                if (isDepth) {
                    assert(!!depth || !!stencil, () => `format(${format}) is not a depth stencil format`);
                    depthStencilFormat = format;
                }
                else {
                    validateRenderPassColorAttachment(attachment, colorFormats.length - 1);
                    colorFormats.push(format);
                    bytesPerSample += roundUp(colorRender.byteCost, colorRender.alignment);
                }
                if (!passSampleCount) {
                    passSampleCount = sampleCount;
                }
                else {
                    assert(sampleCount === passSampleCount, 'all attachments do not have the same sampleCount');
                }
            };
            const { timestampWrites, colorAttachments, depthStencilAttachment, occlusionQuerySet } = desc;
            for (const colorAttachment of colorAttachments || []) {
                addView(colorAttachment);
            }
            addView(depthStencilAttachment, true);
            assert(numAttachments > 0, 'there must be at least 1 colorAttachment or depthStencilAttachment');
            assert(numAttachments <= device.limits.maxColorAttachments, () => `numAttachments(${numAttachments}) > device.limits.maxColorAttachments(${device.limits.maxColorAttachments})`);
            assert(bytesPerSample <= device.limits.maxColorAttachmentBytesPerSample, () => `color attachments bytesPerSample(${bytesPerSample}) > device.limits.maxColorAttachmentBytesPerSample(${device.limits.maxColorAttachmentBytesPerSample})`);
            if (timestampWrites) {
                validateTimestampWrites(device, timestampWrites);
            }
            if (occlusionQuerySet) {
                assertNotDestroyed(occlusionQuerySet);
                assert(device === s_objToDevice.get(occlusionQuerySet), 'occlusionQuerySet is not from same device', [occlusionQuerySet]);
                assert(occlusionQuerySet.type === 'occlusion', () => `occlusionQuerySet.type(${occlusionQuerySet.type}) is not 'occlusion'`, [occlusionQuerySet]);
            }
            const renderPassLayout = createRenderPassLayout(trimNulls(colorFormats), passSampleCount, depthStencilFormat);
            s_renderPassToPassInfoMap.set(passEncoder, {
                state: 'open',
                commandEncoder,
                targetWidth: targetWidth || 0,
                targetHeight: targetHeight || 0,
                vertexBuffers: [],
                bindGroups: [],
                occlusionQuerySet,
                occlusionIndices: new Map(),
                occlusionQueryActiveIndex: -1,
                passLayoutInfo: {
                    renderPassLayout,
                    passLayoutSignature: JSON.stringify(renderPassLayout),
                },
                inuseTextures,
            });
        }
        wrapFunctionBefore(GPURenderPassEncoder, 'executeBundles', function ([bundles]) {
            const info = s_renderPassToPassInfoMap.get(this);
            validateEncoderState(this, info.state);
            const device = s_objToDevice.get(this);
            let bundleCount = 0;
            for (const bundle of bundles) {
                assert(s_objToDevice.get(bundle) === device, () => 'bundle[${count}] is not from same device as render pass encoder', [bundle]);
                const count = bundleCount;
                const bundleDesc = getRenderPassLayoutForRenderBundle(bundle);
                const passLayoutInfo = getRenderPassLayout(this);
                assert(bundleDesc.passLayoutInfo.passLayoutSignature === passLayoutInfo.passLayoutSignature, () => `bundle[${count}] is not compatible with ${this.constructor.name}

${this.constructor.name} expects ${JSON.stringify(passLayoutInfo.renderPassLayout, null, 2)}

bundle is: ${JSON.stringify(bundleDesc.passLayoutInfo.renderPassLayout, null, 2)}
`, [bundle, this]);
                ++bundleCount;
            }
            info.bindGroups.length = 0;
            info.pipeline = undefined;
            info.indexBuffer = undefined;
            info.indexFormat = undefined;
            info.vertexBuffers.length = 0;
        });
        wrapFunctionBefore(GPURenderPassEncoder, 'beginOcclusionQuery', function ([queryIndex]) {
            const info = s_renderPassToPassInfoMap.get(this);
            validateEncoderState(this, info.state);
            const { occlusionIndices, occlusionQueryActive, occlusionQuerySet } = info;
            assert(!!occlusionQuerySet, 'no occlusionQuerySet in pass');
            assertNotDestroyed(occlusionQuerySet);
            assert(queryIndex < occlusionQuerySet.count, () => `queryIndex(${queryIndex}) >= occlusionQuerySet.count(${occlusionQuerySet.count})`, [occlusionQuerySet]);
            const queryErr = occlusionIndices.get(queryIndex);
            assert(!queryErr, () => `queryIndex(${queryIndex}) was already used in this pass at ${queryErr.stack}`);
            assert(!occlusionQueryActive, () => `another query is already active from ${occlusionQueryActive.stack}`);
            info.occlusionQueryActive = new Error();
            info.occlusionQueryActiveIndex = queryIndex;
        });
        wrapFunctionBefore(GPURenderPassEncoder, 'endOcclusionQuery', function () {
            const info = s_renderPassToPassInfoMap.get(this);
            validateEncoderState(this, info.state);
            const { occlusionIndices, occlusionQueryActive, occlusionQueryActiveIndex, occlusionQuerySet } = info;
            assert(!!info.occlusionQueryActive, 'no occlusion query is active');
            occlusionIndices.set(occlusionQueryActiveIndex, occlusionQueryActive);
            if (occlusionQuerySet) {
                assertNotDestroyed(occlusionQuerySet);
            }
            info.occlusionQueryActive = undefined;
        });
        wrapBindingCommandsMixin(GPURenderPassEncoder, s_renderPassToPassInfoMap);
        wrapFunctionBefore(GPURenderPassEncoder, 'end', function () {
            const info = s_renderPassToPassInfoMap.get(this);
            validateEncoderState(this, info.state);
            info.state = 'ended';
            unlockCommandEncoder(info.commandEncoder);
            assert(!info.occlusionQueryActive, () => `occlusion queryIndex(${info.occlusionQueryActiveIndex}) is still active`);
        });
        wrapFunctionBefore(GPURenderPassEncoder, 'setViewport', function ([x, y, width, height, minDepth, maxDepth]) {
            const info = s_renderPassToPassInfoMap.get(this);
            validateEncoderState(this, info.state);
            const { targetWidth, targetHeight, } = info;
            assert(x >= 0, () => `x(${x}) < 0`, [this]);
            assert(y >= 0, () => `y(${y}) < 0`, [this]);
            assert(x + width <= targetWidth, () => `x(${x}) + width(${width}) > texture.width(${targetWidth})`, [this]);
            assert(y + height <= targetHeight, () => `y(${x}) + height(${height}) > texture.height(${targetHeight})`, [this]);
            assert(minDepth >= 0 && minDepth <= 1.0, () => `minDepth(${minDepth}) must be >= 0 and <= 1`);
            assert(maxDepth >= 0 && maxDepth <= 1.0, () => `maxDepth(${maxDepth}) must be >= 0 and <= 1`);
            assert(minDepth < maxDepth, () => `minDepth(${minDepth}) must be < maxDepth(${maxDepth})`);
        });
        wrapFunctionBefore(GPURenderPassEncoder, 'setScissorRect', function ([x, y, width, height]) {
            const info = s_renderPassToPassInfoMap.get(this);
            validateEncoderState(this, info.state);
            const { targetWidth, targetHeight, } = info;
            assert(x >= 0, () => `x(${x}) < 0`, [this]);
            assert(y >= 0, () => `y(${y}) < 0`, [this]);
            assert(x + width <= targetWidth, () => `x(${x}) + width(${width}) > texture.width(${targetWidth})`, [this]);
            assert(y + height <= targetHeight, () => `y(${x}) + height(${height}) > texture.height(${targetHeight})`, [this]);
        });

        wrapFunctionAfter(GPUCommandEncoder, 'beginComputePass', function (passEncoder, [desc]) {
            s_objToDevice.set(passEncoder, s_objToDevice.get(this));
            lockCommandEncoder(this);
            beginComputePass(this, passEncoder, desc);
        });
        wrapFunctionAfter(GPUCommandEncoder, 'beginRenderPass', function (passEncoder, [desc]) {
            s_objToDevice.set(passEncoder, s_objToDevice.get(this));
            lockCommandEncoder(this);
            beginRenderPass(this, passEncoder, desc);
        });
        wrapFunctionBefore(GPUCommandEncoder, 'finish', function () {
            finishCommandEncoder(this);
        });
        wrapFunctionBefore(GPUCommandEncoder, 'copyBufferToBuffer', function ([src, srcOffset, dst, dstOffset, size]) {
            getCommandBufferInfoAndValidateState(this);
            assertNotDestroyed(src);
            assertNotDestroyed(dst);
            dstOffset = dstOffset ?? 0;
            size = size ?? src.size - srcOffset;
            const device = s_objToDevice.get(this);
            assert(device === s_objToDevice.get(src), 'src is not from same device as commandEncoder', [src, this]);
            assert(device === s_objToDevice.get(dst), 'dst is not from same device as commandEncoder', [dst, this]);
            assert(src !== dst, 'src must not be same buffer as dst', [src, dst]);
            assert(!!(src.usage & GPUBufferUsage.COPY_SRC), () => `src.usage(${bufferUsageToString(src.usage)} missing COPY_SRC)`, [src]);
            assert(!!(dst.usage & GPUBufferUsage.COPY_DST), () => `dst.usage(${bufferUsageToString(dst.usage)} missing COPY_DST)`, [dst]);
            assert(srcOffset + size <= src.size, () => `srcOffset(${srcOffset}) + size(${size}) > srcBuffer.size(${src.size})`, [src]);
            assert(dstOffset + size <= dst.size, () => `dstOffset(${dstOffset}) + size(${size}) > dstBuffer.size(${dst.size})`, [dst]);
            assert(size % 4 === 0, () => `size(${size}) is not multiple of 4`);
            assert(srcOffset % 4 === 0, () => `srcOffset(${srcOffset}) is not multiple of 4`);
            assert(dstOffset % 4 === 0, () => `dstOffset(${dstOffset}) is not multiple of 4`);
        });
        function validateImageCopyBuffer(icb) {
            assertNotDestroyed(icb.buffer);
            const bytesPerRow = icb.bytesPerRow || 0;
            assert(bytesPerRow % 256 === 0, () => `src.bytesPerRow(${bytesPerRow}) not multiple of 256`, [icb.buffer]);
        }
        function validateImageCopyTexture(ict, copySize) {
            assertNotDestroyed(ict.texture);
            const formatInfo = kAllTextureFormatInfo[ict.texture.format];
            const { blockWidth, blockHeight, } = formatInfo;
            const mipLevel = ict.mipLevel || 0;
            const [origX, origY] = reifyGPUOrigin3D(ict.origin);
            assert(mipLevel < ict.texture.mipLevelCount, () => `mipLevel(${mipLevel}) must be less than texture.mipLevelCount(${ict.texture.mipLevelCount})`, [ict.texture]);
            assert(origX % blockWidth === 0, () => `origin.x(${origX}) not multiple of blockWidth(${blockWidth})`, [ict.texture]);
            assert(origY % blockHeight === 0, () => `origin.y(${origY}) not multiple of blockHeight(${blockHeight})`, [ict.texture]);
            const [copyWidth, copyHeight, copyDepthOrArrayLayers] = reifyGPUExtent3D(copySize);
            if (formatInfo.depth && formatInfo.stencil && ict.texture.sampleCount > 1) {
                const [w, h, d] = physicalMipLevelSpecificTextureExtent(ict.texture, mipLevel);
                assert(copyWidth === w &&
                    copyHeight === h &&
                    copyDepthOrArrayLayers === d, 'copySize must match textureSize for depth-stencil textures', [ict.texture]);
            }
        }
        function validateTextureCopyRange(ict, copySize) {
            const formatInfo = kAllTextureFormatInfo[ict.texture.format];
            const { blockWidth, blockHeight, } = formatInfo;
            const mipLevel = ict.mipLevel || 0;
            const [origX, origY, origZ] = reifyGPUOrigin3D(ict.origin);
            const [copyWidth, copyHeight, copyDepthOrArrayLayers] = reifyGPUExtent3D(copySize);
            const [w, h, d] = physicalMipLevelSpecificTextureExtent(ict.texture, mipLevel);
            const res = [ict.texture];
            assert(origX + copyWidth <= w, () => `origin.x(${origX}) + copySize.width(${copyWidth}) is > physical width(${w}) of mipLevel(${mipLevel})`, res);
            assert(origY + copyHeight <= h, () => `origin.y(${origY}) + copySize.height(${copyHeight}) is > physical height(${h}) of mipLevel(${mipLevel})`, res);
            assert(origZ + copyDepthOrArrayLayers <= d, () => `origin.z(${origZ}) + copySize.depthOrArrayBuffers(${copyDepthOrArrayLayers}) is > texture.depthOrArrayLayers(${d}) of mipLevel(${mipLevel})`, res);
            assert(copyWidth % blockWidth === 0, () => `copySize.width(${copyWidth}) is not multiple of blockWidth(${blockWidth})`, res);
            assert(copyHeight % blockHeight === 0, () => `copySize.height(${copyHeight}) is not multiple of blockHeight(${blockHeight})`, res);
        }
        function validateLinearTextureData(idl, byteSize, format, copyExtent) {
            const formatInfo = kAllTextureFormatInfo[format];
            const [copyWidth, copyHeight, copyDepthOrArrayLayers] = reifyGPUExtent3D(copyExtent);
            const { blockWidth, blockHeight } = formatInfo;
            const widthInBlocks = copyWidth / blockWidth;
            const heightInBlocks = copyHeight / blockHeight;
            const bytesInLastRow = widthInBlocks * formatInfo.bytesPerBlock;
            assert(widthInBlocks % 1 === 0, () => `width(${copyWidth}) must be multiple of blockWidth${blockWidth}`);
            assert(heightInBlocks % 1 === 0, () => `height(${copyHeight}) must be multiple of blockHeight${blockHeight}`);
            if (heightInBlocks > 1) {
                assert(idl.bytesPerRow !== undefined, () => `bytesPerRow must be set if heightInBlocks(${heightInBlocks}) > 1`);
            }
            if (copyDepthOrArrayLayers > 1) {
                assert(idl.bytesPerRow !== undefined, () => `bytesPerRow must be set if copySize.depthOrArrayLayers(${copyDepthOrArrayLayers}) > 1`);
            }
            if (copyDepthOrArrayLayers > 1) {
                assert(idl.rowsPerImage !== undefined, () => `rowsPerImage must be set if copySize.depthOrArrayLayers(${copyDepthOrArrayLayers}) > 1`);
            }
            if (idl.bytesPerRow !== undefined) {
                assert(idl.bytesPerRow >= bytesInLastRow, () => `bytesPerRow(${idl.bytesPerRow}) must be >= bytes in the last row(${bytesInLastRow})`);
            }
            if (idl.rowsPerImage !== undefined) {
                assert(idl.rowsPerImage >= heightInBlocks, () => `rowsPerImage(${idl.rowsPerImage}) must be >= heightInBlocks(${heightInBlocks})`);
            }
            const bytesPerRow = idl.bytesPerRow ?? 0;
            const rowsPerImage = idl.rowsPerImage ?? 0;
            let requiredBytesInCopy = 0;
            if (copyDepthOrArrayLayers > 0) {
                // all layers except the last one
                requiredBytesInCopy += bytesPerRow * rowsPerImage * (copyDepthOrArrayLayers - 1);
                if (heightInBlocks > 0) {
                    // last layer = all rows padded + last row
                    requiredBytesInCopy += bytesPerRow * (heightInBlocks - 1) + bytesInLastRow;
                }
            }
            const offset = idl.offset ?? 0;
            assert(offset + requiredBytesInCopy <= byteSize, () => `offset(${offset}) + requiredBytesInCopy(${requiredBytesInCopy}) must be <= buffer.size(${byteSize})`);
        }
        function validateB2TorT2BCopy(encoder, buf, tex, copySize, bufferIsSource) {
            const device = s_objToDevice.get(encoder);
            assert(device === s_objToDevice.get(buf.buffer), 'buffer is not from same device as commandEncoder', [buf.buffer, encoder]);
            assert(device === s_objToDevice.get(tex.texture), 'texture is not from same device as commandEncoder', [tex.texture, encoder]);
            validateImageCopyBuffer(buf);
            const [bufRequiredUsage, texRequiredUsage] = bufferIsSource
                ? ['COPY_SRC', 'COPY_DST']
                : ['COPY_DST', 'COPY_SRC'];
            assert(!!(buf.buffer.usage & GPUBufferUsage[bufRequiredUsage]), () => `src.usage(${bufferUsageToString(buf.buffer.usage)} missing ${bufRequiredUsage})`, [buf.buffer]);
            validateImageCopyTexture(tex, copySize);
            const formatInfo = kAllTextureFormatInfo[tex.texture.format];
            assert(!!(tex.texture.usage & GPUTextureUsage[texRequiredUsage]), () => `dst.texture.usage(${textureUsageToString(tex.texture.usage)} missing ${texRequiredUsage})`, [tex.texture]);
            assert(tex.texture.sampleCount === 1, 'sampleCount must be 1', [tex.texture]);
            let aspectSpecificFormat = tex.texture.format;
            const isDepthOrStencil = formatInfo.depth || formatInfo.stencil;
            if (isDepthOrStencil) {
                if (!formatInfo.stencil) {
                    assert(tex.aspect !== 'stencil-only', 'can not use stencil-only aspect on non stencil texture', [tex.texture]);
                }
                if (!formatInfo.depth) {
                    assert(tex.aspect !== 'depth-only', 'can not use depth-only aspect on non depth texture', [tex.texture]);
                }
                assert(tex.aspect === 'depth-only' || tex.aspect === 'stencil-only', 'must use one aspect');
                const aspect = tex.aspect === 'depth-only' ? 'depth' : 'stencil';
                const info = formatInfo[aspect];
                assert(!!info?.copyDst, `can not copy to ${tex.aspect} of texture of format(${tex.texture.format})`, [tex.texture]);
                if (aspectSpecificFormat === 'depth24plus-stencil8') {
                    aspectSpecificFormat = tex.aspect === 'depth-only'
                        ? 'depth24plus'
                        : 'stencil8';
                }
                else if (aspectSpecificFormat === 'depth32float-stencil8') {
                    aspectSpecificFormat = tex.aspect === 'depth-only'
                        ? 'depth32float'
                        : 'stencil8';
                }
            }
            validateTextureCopyRange(tex, copySize);
            const srcOffset = buf.offset || 0;
            if (!isDepthOrStencil) {
                const texelCopyBlockFootPrint = formatInfo.bytesPerBlock;
                assert(srcOffset % texelCopyBlockFootPrint === 0, () => `src.offset(${srcOffset}) must multiple of blockSize(${texelCopyBlockFootPrint})`);
            }
            else {
                assert(srcOffset % 4 === 0, () => `src.offset(${srcOffset}) must by multiple of 4 for depth and/or stencil textures`);
            }
            validateLinearTextureData(buf, buf.buffer.size, aspectSpecificFormat, copySize);
        }
        function isCopyCompatible(format1, format2) {
            return format1.replace('-srgb', '') === format2.replace('-srgb', '');
        }
        function isIntersectingAxis(v1, v2, size) {
            const distance = Math.abs(v2 - v1);
            const gap = distance - size;
            return gap < 0;
        }
        wrapFunctionBefore(GPUCommandEncoder, 'copyBufferToTexture', function ([src, dst, copySize]) {
            getCommandBufferInfoAndValidateState(this);
            validateB2TorT2BCopy(this, src, dst, copySize, true);
        });
        wrapFunctionBefore(GPUCommandEncoder, 'copyTextureToBuffer', function ([src, dst, copySize]) {
            getCommandBufferInfoAndValidateState(this);
            validateB2TorT2BCopy(this, dst, src, copySize, false);
        });
        wrapFunctionBefore(GPUCommandEncoder, 'copyTextureToTexture', function ([src, dst, copySize]) {
            getCommandBufferInfoAndValidateState(this);
            const device = s_objToDevice.get(this);
            assert(device === s_objToDevice.get(src.texture), 'src.texture is not from same device as commandEncoder', [src, this]);
            assert(device === s_objToDevice.get(dst.texture), 'dst.texture is not from same device as commandEncoder', [dst, this]);
            validateImageCopyTexture(src, copySize);
            assert(!!(src.texture.usage & GPUTextureUsage.COPY_SRC), () => `src.texture.usage(${textureUsageToString(src.texture.usage)} missing COPY_SRC`, [src.texture]);
            validateImageCopyTexture(dst, copySize);
            assert(!!(dst.texture.usage & GPUTextureUsage.COPY_DST), () => `src.texture.usage(${textureUsageToString(dst.texture.usage)} missing COPY_DST`, [dst.texture]);
            assert(src.texture.sampleCount === dst.texture.sampleCount, () => `src.texture.sampleCount(${src.texture.sampleCount}) must equal dst.texture.sampleCount(${dst.texture.sampleCount})`, [src.texture, dst.texture]);
            assert(isCopyCompatible(src.texture.format, dst.texture.format), () => `src.texture.format(${src.texture.format}) must be copy compatible with dst.texture.format(${dst.texture.format})`, [src.texture, dst.texture]);
            const formatInfo = kAllTextureFormatInfo[src.texture.format];
            const isDepthStencil = !!formatInfo.depth && !!formatInfo.stencil;
            if (isDepthStencil) {
                assert(src.aspect === 'all', () => `src.aspect must be 'all' when format(${src.texture.format}) is a depth-stencil format`, [src.texture]);
                assert(dst.aspect === 'all', () => `dst.aspect must be 'all' when format(${dst.texture.format}) is a depth-stencil format`, [dst.texture]);
            }
            validateTextureCopyRange(src, copySize);
            validateTextureCopyRange(dst, copySize);
            if (src.texture === dst.texture) {
                const srcOrigin = reifyGPUOrigin3D(src.origin);
                const dstOrigin = reifyGPUOrigin3D(dst.origin);
                const size = reifyGPUExtent3D(copySize);
                assert(!isIntersectingAxis(srcOrigin[0], dstOrigin[0], size[0]) &&
                    !isIntersectingAxis(srcOrigin[1], dstOrigin[1], size[1]) &&
                    !isIntersectingAxis(srcOrigin[2], dstOrigin[2], size[2]), () => `when src and dst textures are the same texture, copy boxes must not overlap`, [src.texture, dst.texture]);
            }
        });
        wrapFunctionBefore(GPUCommandEncoder, 'clearBuffer', function ([buffer, offset, size]) {
            getCommandBufferInfoAndValidateState(this);
            assertNotDestroyed(buffer);
            offset = offset ?? 0;
            size = size ?? buffer.size - offset;
            assert(s_objToDevice.get(this) === s_objToDevice.get(buffer), 'buffer not from same device as encoder', [buffer, this]);
            assert(!!(buffer.usage & GPUBufferUsage.COPY_DST), () => `buffer.usage(${bufferUsageToString(buffer.usage)}) must have COPY_DST`, [buffer]);
            assert(size % 4 === 0, () => `size(${size}) must be multiple of 4`);
            assert(offset % 4 === 0, () => `offset(${offset}) must be multiple of 4`);
            assert(offset + size <= buffer.size, () => `offset(${offset}) + size(${size}) must be <= buffer.size(${buffer.size})`);
        });
        wrapFunctionBefore(GPUCommandEncoder, 'resolveQuerySet', function ([querySet, firstQuery, queryCount, destination, destinationOffset]) {
            getCommandBufferInfoAndValidateState(this);
            assertNotDestroyed(querySet);
            assertNotDestroyed(destination);
            const device = s_objToDevice.get(this);
            assert(s_objToDevice.get(querySet) === device, 'querySet not from same device', [querySet]);
            assert(s_objToDevice.get(destination) === device, 'destination buffer not from same device', [destination]);
            assert((destination.usage & GPUBufferUsage.QUERY_RESOLVE) !== 0, () => `destination.usage(${bufferUsageToString(destination.usage)} does not contain QUERY_RESOLVE)`, [destination]);
            assert(firstQuery < querySet.count, () => `firstQuery(${firstQuery}) out of range for querySet.count(${querySet.count})`);
            assert(firstQuery + queryCount <= querySet.count, () => `firstQuery(${firstQuery}) + queryCount(${queryCount}) > querySet.count(${querySet.count})`);
            assert(destinationOffset % 256 === 0, () => `destinationOffset(${destinationOffset}) is not multiple of 256`);
            assert(destinationOffset + queryCount * 8 <= destination.size, () => `destinationOffset(${destinationOffset}) + queryCount(${queryCount}) * 8 > destination.size(${destination.size})`);
        });

        console.log('webgpu-debug-helper running');

    }));

})();
//# sourceMappingURL=webgpu-debug-helper.js.map
