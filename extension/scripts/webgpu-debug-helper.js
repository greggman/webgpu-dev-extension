/* webgpu-debug-helper@0.1.2, license MIT */
(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

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
    function assert$1(condition, msg, resources) {
        if (!condition) {
            const lines = (resources || []).map(r => `    ${objToString(r)}`).join('\n');
            const m = msg ? (typeof msg === 'string' ? msg : msg()) : '';
            emitError(`${m}${lines ? `\n${lines}` : ''}`);
        }
    }

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

    const s_objToDevice = new WeakMap();
    const s_destroyedResource = new WeakSet();
    function assertNotDestroyed(obj) {
        assert$1(!s_destroyedResource.has(obj), () => `${objToString(obj)} is destroyed`);
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

    const deviceToErrorScopeStack = new WeakMap();
    const origPushErrorScope = GPUDevice.prototype.pushErrorScope;
    const origPopErrorScope = GPUDevice.prototype.popErrorScope;
    function errorWrapper(device, fnName, origFn, ...args) {
        const stack = new Error();
        origPushErrorScope.call(device, 'validation');
        const result = origFn.call(this, ...args);
        const errorScopeStack = deviceToErrorScopeStack.get(device);
        const currentErrorScope = errorScopeStack.findLast(scope => scope.filter === 'validation');
        const promise = origPopErrorScope.call(device)
            .then(error => {
            // If there was a currentErrorScope when we added pushed then remove our promise
            if (currentErrorScope) {
                const ndx = currentErrorScope.errors.indexOf(promise);
                if (ndx) {
                    currentErrorScope.errors.splice(ndx, 1);
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
    /**
     * given a class returns all the method names.
     */
    function getAPIFunctionNames(api) {
        return Object.entries(Object.getOwnPropertyDescriptors(api.prototype))
            .filter(([, info]) => info.enumerable && typeof info.value === 'function')
            .map(([name]) => name);
    }
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
    GPUDevice.prototype.pushErrorScope = (function (origFn) {
        return function (filter) {
            origFn.call(this, filter);
            const errorScopeStack = deviceToErrorScopeStack.get(this);
            errorScopeStack.push({ filter, errors: [] });
        };
    })(GPUDevice.prototype.pushErrorScope);
    GPUDevice.prototype.popErrorScope = (function (origFn) {
        return function () {
            const errorScopeStack = deviceToErrorScopeStack.get(this);
            const errorScope = errorScopeStack.pop();
            if (errorScope === undefined) {
                throw new DOMException('popErrorScope called on empty error scope stack', 'OperationError');
            }
            const errPromise = origFn.call(this);
            return errorScope.errors.pop() ?? errPromise;
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

    /* webgpu-utils@1.8.2, license MIT */
    function keysOf(obj) {
        return Object.keys(obj);
    }

    const createTypeDefs = (defs) => defs;
    const b = createTypeDefs({
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
        ...b,
        'atomic<i32>': b.i32,
        'atomic<u32>': b.u32,
        'vec2<i32>': b.vec2i,
        'vec2<u32>': b.vec2u,
        'vec2<f32>': b.vec2f,
        'vec2<f16>': b.vec2h,
        'vec3<i32>': b.vec3i,
        'vec3<u32>': b.vec3u,
        'vec3<f32>': b.vec3f,
        'vec3<f16>': b.vec3h,
        'vec4<i32>': b.vec4i,
        'vec4<u32>': b.vec4u,
        'vec4<f32>': b.vec4f,
        'vec4<f16>': b.vec4h,
        'mat2x2<f32>': b.mat2x2f,
        'mat2x2<f16>': b.mat2x2h,
        'mat3x2<f32>': b.mat3x2f,
        'mat3x2<f16>': b.mat3x2h,
        'mat4x2<f32>': b.mat4x2f,
        'mat4x2<f16>': b.mat4x2h,
        'mat2x3<f32>': b.mat2x3f,
        'mat2x3<f16>': b.mat2x3h,
        'mat3x3<f32>': b.mat3x3f,
        'mat3x3<f16>': b.mat3x3h,
        'mat4x3<f32>': b.mat4x3f,
        'mat4x3<f16>': b.mat4x3h,
        'mat2x4<f32>': b.mat2x4f,
        'mat2x4<f16>': b.mat2x4h,
        'mat3x4<f32>': b.mat3x4f,
        'mat3x4<f16>': b.mat3x4h,
        'mat4x4<f32>': b.mat4x4f,
        'mat4x4<f16>': b.mat4x4h,
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

    class ParseContext {
        constructor() {
            this.constants = new Map();
            this.aliases = new Map();
            this.structs = new Map();
        }
    }
    /**
     * @class Node
     * @category AST
     * Base class for AST nodes parsed from a WGSL shader.
     */
    class Node {
        constructor() { }
        get isAstNode() {
            return true;
        }
        get astNodeType() {
            return "";
        }
        evaluate(context) {
            throw new Error("Cannot evaluate node");
        }
        evaluateString(context) {
            return this.evaluate(context).toString();
        }
        search(callback) { }
        searchBlock(block, callback) {
            if (block) {
                callback(_BlockStart.instance);
                for (const node of block) {
                    if (node instanceof Array) {
                        this.searchBlock(node, callback);
                    }
                    else {
                        node.search(callback);
                    }
                }
                callback(_BlockEnd.instance);
            }
        }
    }
    // For internal use only
    class _BlockStart extends Node {
    }
    _BlockStart.instance = new _BlockStart();
    // For internal use only
    class _BlockEnd extends Node {
    }
    _BlockEnd.instance = new _BlockEnd();
    /**
     * @class Statement
     * @extends Node
     * @category AST
     */
    class Statement extends Node {
        constructor() {
            super();
        }
    }
    /**
     * @class Function
     * @extends Statement
     * @category AST
     */
    class Function extends Statement {
        constructor(name, args, returnType, body, startLine, endLine) {
            super();
            this.calls = new Set();
            this.name = name;
            this.args = args;
            this.returnType = returnType;
            this.body = body;
            this.startLine = startLine;
            this.endLine = endLine;
        }
        get astNodeType() {
            return "function";
        }
        search(callback) {
            this.searchBlock(this.body, callback);
        }
    }
    /**
     * @class StaticAssert
     * @extends Statement
     * @category AST
     */
    class StaticAssert extends Statement {
        constructor(expression) {
            super();
            this.expression = expression;
        }
        get astNodeType() {
            return "staticAssert";
        }
        search(callback) {
            this.expression.search(callback);
        }
    }
    /**
     * @class While
     * @extends Statement
     * @category AST
     */
    class While extends Statement {
        constructor(condition, body) {
            super();
            this.condition = condition;
            this.body = body;
        }
        get astNodeType() {
            return "while";
        }
        search(callback) {
            this.condition.search(callback);
            this.searchBlock(this.body, callback);
        }
    }
    /**
     * @class Continuing
     * @extends Statement
     * @category AST
     */
    class Continuing extends Statement {
        constructor(body) {
            super();
            this.body = body;
        }
        get astNodeType() {
            return "continuing";
        }
        search(callback) {
            this.searchBlock(this.body, callback);
        }
    }
    /**
     * @class For
     * @extends Statement
     * @category AST
     */
    class For extends Statement {
        constructor(init, condition, increment, body) {
            super();
            this.init = init;
            this.condition = condition;
            this.increment = increment;
            this.body = body;
        }
        get astNodeType() {
            return "for";
        }
        search(callback) {
            var _a, _b, _c;
            (_a = this.init) === null || _a === void 0 ? void 0 : _a.search(callback);
            (_b = this.condition) === null || _b === void 0 ? void 0 : _b.search(callback);
            (_c = this.increment) === null || _c === void 0 ? void 0 : _c.search(callback);
            this.searchBlock(this.body, callback);
        }
    }
    /**
     * @class Var
     * @extends Statement
     * @category AST
     */
    class Var extends Statement {
        constructor(name, type, storage, access, value) {
            super();
            this.name = name;
            this.type = type;
            this.storage = storage;
            this.access = access;
            this.value = value;
        }
        get astNodeType() {
            return "var";
        }
        search(callback) {
            var _a;
            callback(this);
            (_a = this.value) === null || _a === void 0 ? void 0 : _a.search(callback);
        }
    }
    /**
     * @class Override
     * @extends Statement
     * @category AST
     */
    class Override extends Statement {
        constructor(name, type, value) {
            super();
            this.name = name;
            this.type = type;
            this.value = value;
        }
        get astNodeType() {
            return "override";
        }
        search(callback) {
            var _a;
            (_a = this.value) === null || _a === void 0 ? void 0 : _a.search(callback);
        }
    }
    /**
     * @class Let
     * @extends Statement
     * @category AST
     */
    class Let extends Statement {
        constructor(name, type, storage, access, value) {
            super();
            this.name = name;
            this.type = type;
            this.storage = storage;
            this.access = access;
            this.value = value;
        }
        get astNodeType() {
            return "let";
        }
        search(callback) {
            var _a;
            callback(this);
            (_a = this.value) === null || _a === void 0 ? void 0 : _a.search(callback);
        }
    }
    /**
     * @class Const
     * @extends Statement
     * @category AST
     */
    class Const extends Statement {
        constructor(name, type, storage, access, value) {
            super();
            this.name = name;
            this.type = type;
            this.storage = storage;
            this.access = access;
            this.value = value;
        }
        get astNodeType() {
            return "const";
        }
        evaluate(context) {
            return this.value.evaluate(context);
        }
        search(callback) {
            var _a;
            callback(this);
            (_a = this.value) === null || _a === void 0 ? void 0 : _a.search(callback);
        }
    }
    var IncrementOperator;
    (function (IncrementOperator) {
        IncrementOperator["increment"] = "++";
        IncrementOperator["decrement"] = "--";
    })(IncrementOperator || (IncrementOperator = {}));
    (function (IncrementOperator) {
        function parse(val) {
            const key = val;
            if (key == "parse")
                throw new Error("Invalid value for IncrementOperator");
            return IncrementOperator[key];
        }
        IncrementOperator.parse = parse;
    })(IncrementOperator || (IncrementOperator = {}));
    /**
     * @class Increment
     * @extends Statement
     * @category AST
     */
    class Increment extends Statement {
        constructor(operator, variable) {
            super();
            this.operator = operator;
            this.variable = variable;
        }
        get astNodeType() {
            return "increment";
        }
        search(callback) {
            this.variable.search(callback);
        }
    }
    var AssignOperator;
    (function (AssignOperator) {
        AssignOperator["assign"] = "=";
        AssignOperator["addAssign"] = "+=";
        AssignOperator["subtractAssin"] = "-=";
        AssignOperator["multiplyAssign"] = "*=";
        AssignOperator["divideAssign"] = "/=";
        AssignOperator["moduloAssign"] = "%=";
        AssignOperator["andAssign"] = "&=";
        AssignOperator["orAssign"] = "|=";
        AssignOperator["xorAssign"] = "^=";
        AssignOperator["shiftLeftAssign"] = "<<=";
        AssignOperator["shiftRightAssign"] = ">>=";
    })(AssignOperator || (AssignOperator = {}));
    (function (AssignOperator) {
        function parse(val) {
            const key = val;
            if (key == "parse") {
                throw new Error("Invalid value for AssignOperator");
            }
            //return AssignOperator[key];
            return key;
        }
        AssignOperator.parse = parse;
    })(AssignOperator || (AssignOperator = {}));
    /**
     * @class Assign
     * @extends Statement
     * @category AST
     */
    class Assign extends Statement {
        constructor(operator, variable, value) {
            super();
            this.operator = operator;
            this.variable = variable;
            this.value = value;
        }
        get astNodeType() {
            return "assign";
        }
        search(callback) {
            this.variable.search(callback);
            this.value.search(callback);
        }
    }
    /**
     * @class Call
     * @extends Statement
     * @category AST
     */
    class Call extends Statement {
        constructor(name, args) {
            super();
            this.name = name;
            this.args = args;
        }
        get astNodeType() {
            return "call";
        }
        search(callback) {
            for (const node of this.args) {
                node.search(callback);
            }
            callback(this);
        }
    }
    /**
     * @class Loop
     * @extends Statement
     * @category AST
     */
    class Loop extends Statement {
        constructor(body, continuing) {
            super();
            this.body = body;
            this.continuing = continuing;
        }
        get astNodeType() {
            return "loop";
        }
    }
    /**
     * @class Switch
     * @extends Statement
     * @category AST
     */
    class Switch extends Statement {
        constructor(condition, body) {
            super();
            this.condition = condition;
            this.body = body;
        }
        get astNodeType() {
            return "body";
        }
    }
    /**
     * @class If
     * @extends Statement
     * @category AST
     */
    class If extends Statement {
        constructor(condition, body, elseif, _else) {
            super();
            this.condition = condition;
            this.body = body;
            this.elseif = elseif;
            this.else = _else;
        }
        get astNodeType() {
            return "if";
        }
        search(callback) {
            this.condition.search(callback);
            this.searchBlock(this.body, callback);
            this.searchBlock(this.elseif, callback);
            this.searchBlock(this.else, callback);
        }
    }
    /**
     * @class Return
     * @extends Statement
     * @category AST
     */
    class Return extends Statement {
        constructor(value) {
            super();
            this.value = value;
        }
        get astNodeType() {
            return "return";
        }
        search(callback) {
            var _a;
            (_a = this.value) === null || _a === void 0 ? void 0 : _a.search(callback);
        }
    }
    /**
     * @class Enable
     * @extends Statement
     * @category AST
     */
    class Enable extends Statement {
        constructor(name) {
            super();
            this.name = name;
        }
        get astNodeType() {
            return "enable";
        }
    }
    /**
     * @class Requires
     * @extends Statement
     * @category AST
     */
    class Requires extends Statement {
        constructor(extensions) {
            super();
            this.extensions = extensions;
        }
        get astNodeType() {
            return "requires";
        }
    }
    /**
     * @class Diagnostic
     * @extends Statement
     * @category AST
     */
    class Diagnostic extends Statement {
        constructor(severity, rule) {
            super();
            this.severity = severity;
            this.rule = rule;
        }
        get astNodeType() {
            return "diagnostic";
        }
    }
    /**
     * @class Alias
     * @extends Statement
     * @category AST
     */
    class Alias extends Statement {
        constructor(name, type) {
            super();
            this.name = name;
            this.type = type;
        }
        get astNodeType() {
            return "alias";
        }
    }
    /**
     * @class Discard
     * @extends Statement
     * @category AST
     */
    class Discard extends Statement {
        constructor() {
            super();
        }
        get astNodeType() {
            return "discard";
        }
    }
    /**
     * @class Break
     * @extends Statement
     * @category AST
     */
    class Break extends Statement {
        constructor() {
            super();
        }
        get astNodeType() {
            return "break";
        }
    }
    /**
     * @class Continue
     * @extends Statement
     * @category AST
     */
    class Continue extends Statement {
        constructor() {
            super();
        }
        get astNodeType() {
            return "continue";
        }
    }
    /**
     * @class Type
     * @extends Statement
     * @category AST
     */
    class Type extends Statement {
        constructor(name) {
            super();
            this.name = name;
        }
        get astNodeType() {
            return "type";
        }
        get isStruct() {
            return false;
        }
        get isArray() {
            return false;
        }
    }
    /**
     * @class StructType
     * @extends Type
     * @category AST
     */
    class Struct extends Type {
        constructor(name, members, startLine, endLine) {
            super(name);
            this.members = members;
            this.startLine = startLine;
            this.endLine = endLine;
        }
        get astNodeType() {
            return "struct";
        }
        get isStruct() {
            return true;
        }
        /// Return the index of the member with the given name, or -1 if not found.
        getMemberIndex(name) {
            for (let i = 0; i < this.members.length; i++) {
                if (this.members[i].name == name)
                    return i;
            }
            return -1;
        }
    }
    /**
     * @class TemplateType
     * @extends Type
     * @category AST
     */
    class TemplateType extends Type {
        constructor(name, format, access) {
            super(name);
            this.format = format;
            this.access = access;
        }
        get astNodeType() {
            return "template";
        }
    }
    /**
     * @class PointerType
     * @extends Type
     * @category AST
     */
    class PointerType extends Type {
        constructor(name, storage, type, access) {
            super(name);
            this.storage = storage;
            this.type = type;
            this.access = access;
        }
        get astNodeType() {
            return "pointer";
        }
    }
    /**
     * @class ArrayType
     * @extends Type
     * @category AST
     */
    class ArrayType extends Type {
        constructor(name, attributes, format, count) {
            super(name);
            this.attributes = attributes;
            this.format = format;
            this.count = count;
        }
        get astNodeType() {
            return "array";
        }
        get isArray() {
            return true;
        }
    }
    /**
     * @class SamplerType
     * @extends Type
     * @category AST
     */
    class SamplerType extends Type {
        constructor(name, format, access) {
            super(name);
            this.format = format;
            this.access = access;
        }
        get astNodeType() {
            return "sampler";
        }
    }
    /**
     * @class Expression
     * @extends Node
     * @category AST
     */
    class Expression extends Node {
        constructor() {
            super();
        }
    }
    /**
     * @class StringExpr
     * @extends Expression
     * @category AST
     */
    class StringExpr extends Expression {
        constructor(value) {
            super();
            this.value = value;
        }
        get astNodeType() {
            return "stringExpr";
        }
        toString() {
            return this.value;
        }
        evaluateString() {
            return this.value;
        }
    }
    /**
     * @class CreateExpr
     * @extends Expression
     * @category AST
     */
    class CreateExpr extends Expression {
        constructor(type, args) {
            super();
            this.type = type;
            this.args = args;
        }
        get astNodeType() {
            return "createExpr";
        }
        search(callback) {
            callback(this);
            for (const node of this.args) {
                node.search(callback);
            }
        }
    }
    /**
     * @class CallExpr
     * @extends Expression
     * @category AST
     */
    class CallExpr extends Expression {
        constructor(name, args) {
            super();
            this.name = name;
            this.args = args;
        }
        get astNodeType() {
            return "callExpr";
        }
        evaluate(context) {
            switch (this.name) {
                case "abs":
                    return Math.abs(this.args[0].evaluate(context));
                case "acos":
                    return Math.acos(this.args[0].evaluate(context));
                case "acosh":
                    return Math.acosh(this.args[0].evaluate(context));
                case "asin":
                    return Math.asin(this.args[0].evaluate(context));
                case "asinh":
                    return Math.asinh(this.args[0].evaluate(context));
                case "atan":
                    return Math.atan(this.args[0].evaluate(context));
                case "atan2":
                    return Math.atan2(this.args[0].evaluate(context), this.args[1].evaluate(context));
                case "atanh":
                    return Math.atanh(this.args[0].evaluate(context));
                case "ceil":
                    return Math.ceil(this.args[0].evaluate(context));
                case "clamp":
                    return Math.min(Math.max(this.args[0].evaluate(context), this.args[1].evaluate(context)), this.args[2].evaluate(context));
                case "cos":
                    return Math.cos(this.args[0].evaluate(context));
                //case "cross":
                //TODO: (x[i] * y[j] - x[j] * y[i])
                case "degrees":
                    return (this.args[0].evaluate(context) * 180) / Math.PI;
                //case "determinant":
                //TODO implement
                case "distance":
                    return Math.sqrt(Math.pow(this.args[0].evaluate(context) - this.args[1].evaluate(context), 2));
                case "dot":
                //TODO: (x[i] * y[i])
                case "exp":
                    return Math.exp(this.args[0].evaluate(context));
                case "exp2":
                    return Math.pow(2, this.args[0].evaluate(context));
                //case "extractBits":
                //TODO: implement
                //case "firstLeadingBit":
                //TODO: implement
                case "floor":
                    return Math.floor(this.args[0].evaluate(context));
                case "fma":
                    return (this.args[0].evaluate(context) * this.args[1].evaluate(context) +
                        this.args[2].evaluate(context));
                case "fract":
                    return (this.args[0].evaluate(context) -
                        Math.floor(this.args[0].evaluate(context)));
                //case "frexp":
                //TODO: implement
                case "inverseSqrt":
                    return 1 / Math.sqrt(this.args[0].evaluate(context));
                //case "length":
                //TODO: implement
                case "log":
                    return Math.log(this.args[0].evaluate(context));
                case "log2":
                    return Math.log2(this.args[0].evaluate(context));
                case "max":
                    return Math.max(this.args[0].evaluate(context), this.args[1].evaluate(context));
                case "min":
                    return Math.min(this.args[0].evaluate(context), this.args[1].evaluate(context));
                case "mix":
                    return (this.args[0].evaluate(context) *
                        (1 - this.args[2].evaluate(context)) +
                        this.args[1].evaluate(context) * this.args[2].evaluate(context));
                case "modf":
                    return (this.args[0].evaluate(context) -
                        Math.floor(this.args[0].evaluate(context)));
                case "pow":
                    return Math.pow(this.args[0].evaluate(context), this.args[1].evaluate(context));
                case "radians":
                    return (this.args[0].evaluate(context) * Math.PI) / 180;
                case "round":
                    return Math.round(this.args[0].evaluate(context));
                case "sign":
                    return Math.sign(this.args[0].evaluate(context));
                case "sin":
                    return Math.sin(this.args[0].evaluate(context));
                case "sinh":
                    return Math.sinh(this.args[0].evaluate(context));
                case "saturate":
                    return Math.min(Math.max(this.args[0].evaluate(context), 0), 1);
                case "smoothstep":
                    return (this.args[0].evaluate(context) *
                        this.args[0].evaluate(context) *
                        (3 - 2 * this.args[0].evaluate(context)));
                case "sqrt":
                    return Math.sqrt(this.args[0].evaluate(context));
                case "step":
                    return this.args[0].evaluate(context) < this.args[1].evaluate(context)
                        ? 0
                        : 1;
                case "tan":
                    return Math.tan(this.args[0].evaluate(context));
                case "tanh":
                    return Math.tanh(this.args[0].evaluate(context));
                case "trunc":
                    return Math.trunc(this.args[0].evaluate(context));
                default:
                    throw new Error("Non const function: " + this.name);
            }
        }
        search(callback) {
            for (const node of this.args) {
                node.search(callback);
            }
            callback(this);
        }
    }
    /**
     * @class VariableExpr
     * @extends Expression
     * @category AST
     */
    class VariableExpr extends Expression {
        constructor(name) {
            super();
            this.name = name;
        }
        get astNodeType() {
            return "varExpr";
        }
        search(callback) {
            callback(this);
            if (this.postfix) {
                this.postfix.search(callback);
            }
        }
        evaluate(context) {
            const constant = context.constants.get(this.name);
            if (!constant) {
                throw new Error("Cannot evaluate node");
            }
            return constant.evaluate(context);
        }
    }
    /**
     * @class ConstExpr
     * @extends Expression
     * @category AST
     */
    class ConstExpr extends Expression {
        constructor(name, initializer) {
            super();
            this.name = name;
            this.initializer = initializer;
        }
        get astNodeType() {
            return "constExpr";
        }
        evaluate(context) {
            var _a, _b;
            if (this.initializer instanceof CreateExpr) {
                // This is a struct constant
                const property = (_a = this.postfix) === null || _a === void 0 ? void 0 : _a.evaluateString(context);
                const type = (_b = this.initializer.type) === null || _b === void 0 ? void 0 : _b.name;
                const struct = context.structs.get(type);
                const memberIndex = struct === null || struct === void 0 ? void 0 : struct.getMemberIndex(property);
                if (memberIndex != -1) {
                    const value = this.initializer.args[memberIndex].evaluate(context);
                    return value;
                }
                console.log(memberIndex);
            }
            return this.initializer.evaluate(context);
        }
        search(callback) {
            this.initializer.search(callback);
        }
    }
    /**
     * @class LiteralExpr
     * @extends Expression
     * @category AST
     */
    class LiteralExpr extends Expression {
        constructor(value) {
            super();
            this.value = value;
        }
        get astNodeType() {
            return "literalExpr";
        }
        evaluate() {
            return this.value;
        }
    }
    /**
     * @class BitcastExpr
     * @extends Expression
     * @category AST
     */
    class BitcastExpr extends Expression {
        constructor(type, value) {
            super();
            this.type = type;
            this.value = value;
        }
        get astNodeType() {
            return "bitcastExpr";
        }
        search(callback) {
            this.value.search(callback);
        }
    }
    /**
     * @class TypecastExpr
     * @extends Expression
     * @category AST
     */
    class TypecastExpr extends Expression {
        constructor(type, args) {
            super();
            this.type = type;
            this.args = args;
        }
        get astNodeType() {
            return "typecastExpr";
        }
        evaluate(context) {
            return this.args[0].evaluate(context);
        }
        search(callback) {
            this.searchBlock(this.args, callback);
        }
    }
    /**
     * @class GroupingExpr
     * @extends Expression
     * @category AST
     */
    class GroupingExpr extends Expression {
        constructor(contents) {
            super();
            this.contents = contents;
        }
        get astNodeType() {
            return "groupExpr";
        }
        evaluate(context) {
            return this.contents[0].evaluate(context);
        }
        search(callback) {
            this.searchBlock(this.contents, callback);
        }
    }
    /**
     * @class ArrayIndex
     * @extends Expression
     * @category AST
     */
    class ArrayIndex extends Expression {
        constructor(index) {
            super();
            this.index = index;
        }
        search(callback) {
            this.index.search(callback);
        }
    }
    /**
     * @class Operator
     * @extends Expression
     * @category AST
     */
    class Operator extends Expression {
        constructor() {
            super();
        }
    }
    /**
     * @class UnaryOperator
     * @extends Operator
     * @category AST
     * @property {string} operator +, -, !, ~
     */
    class UnaryOperator extends Operator {
        constructor(operator, right) {
            super();
            this.operator = operator;
            this.right = right;
        }
        get astNodeType() {
            return "unaryOp";
        }
        evaluate(context) {
            switch (this.operator) {
                case "+":
                    return this.right.evaluate(context);
                case "-":
                    return -this.right.evaluate(context);
                case "!":
                    return this.right.evaluate(context) ? 0 : 1;
                case "~":
                    return ~this.right.evaluate(context);
                default:
                    throw new Error("Unknown unary operator: " + this.operator);
            }
        }
        search(callback) {
            this.right.search(callback);
        }
    }
    /**
     * @class BinaryOperator
     * @extends Operator
     * @category AST
     * @property {string} operator +, -, *, /, %, ==, !=, <, >, <=, >=, &&, ||
     */
    class BinaryOperator extends Operator {
        constructor(operator, left, right) {
            super();
            this.operator = operator;
            this.left = left;
            this.right = right;
        }
        get astNodeType() {
            return "binaryOp";
        }
        evaluate(context) {
            switch (this.operator) {
                case "+":
                    return this.left.evaluate(context) + this.right.evaluate(context);
                case "-":
                    return this.left.evaluate(context) - this.right.evaluate(context);
                case "*":
                    return this.left.evaluate(context) * this.right.evaluate(context);
                case "/":
                    return this.left.evaluate(context) / this.right.evaluate(context);
                case "%":
                    return this.left.evaluate(context) % this.right.evaluate(context);
                case "==":
                    return this.left.evaluate(context) == this.right.evaluate(context)
                        ? 1
                        : 0;
                case "!=":
                    return this.left.evaluate(context) != this.right.evaluate(context)
                        ? 1
                        : 0;
                case "<":
                    return this.left.evaluate(context) < this.right.evaluate(context)
                        ? 1
                        : 0;
                case ">":
                    return this.left.evaluate(context) > this.right.evaluate(context)
                        ? 1
                        : 0;
                case "<=":
                    return this.left.evaluate(context) <= this.right.evaluate(context)
                        ? 1
                        : 0;
                case ">=":
                    return this.left.evaluate(context) >= this.right.evaluate(context)
                        ? 1
                        : 0;
                case "&&":
                    return this.left.evaluate(context) && this.right.evaluate(context)
                        ? 1
                        : 0;
                case "||":
                    return this.left.evaluate(context) || this.right.evaluate(context)
                        ? 1
                        : 0;
                default:
                    throw new Error(`Unknown operator ${this.operator}`);
            }
        }
        search(callback) {
            this.left.search(callback);
            this.right.search(callback);
        }
    }
    /**
     * @class SwitchCase
     * @extends Node
     * @category AST
     */
    class SwitchCase extends Node {
        constructor() {
            super();
        }
    }
    /**
     * @class Case
     * @extends SwitchCase
     * @category AST
     */
    class Case extends SwitchCase {
        constructor(selector, body) {
            super();
            this.selector = selector;
            this.body = body;
        }
        get astNodeType() {
            return "case";
        }
        search(callback) {
            this.searchBlock(this.body, callback);
        }
    }
    /**
     * @class Default
     * @extends SwitchCase
     * @category AST
     */
    class Default extends SwitchCase {
        constructor(body) {
            super();
            this.body = body;
        }
        get astNodeType() {
            return "default";
        }
        search(callback) {
            this.searchBlock(this.body, callback);
        }
    }
    /**
     * @class Argument
     * @extends Node
     * @category AST
     */
    class Argument extends Node {
        constructor(name, type, attributes) {
            super();
            this.name = name;
            this.type = type;
            this.attributes = attributes;
        }
        get astNodeType() {
            return "argument";
        }
    }
    /**
     * @class ElseIf
     * @extends Node
     * @category AST
     */
    class ElseIf extends Node {
        constructor(condition, body) {
            super();
            this.condition = condition;
            this.body = body;
        }
        get astNodeType() {
            return "elseif";
        }
        search(callback) {
            this.condition.search(callback);
            this.searchBlock(this.body, callback);
        }
    }
    /**
     * @class Member
     * @extends Node
     * @category AST
     */
    class Member extends Node {
        constructor(name, type, attributes) {
            super();
            this.name = name;
            this.type = type;
            this.attributes = attributes;
        }
        get astNodeType() {
            return "member";
        }
    }
    /**
     * @class Attribute
     * @extends Node
     * @category AST
     */
    class Attribute extends Node {
        constructor(name, value) {
            super();
            this.name = name;
            this.value = value;
        }
        get astNodeType() {
            return "attribute";
        }
    }

    var _a;
    var TokenClass;
    (function (TokenClass) {
        TokenClass[TokenClass["token"] = 0] = "token";
        TokenClass[TokenClass["keyword"] = 1] = "keyword";
        TokenClass[TokenClass["reserved"] = 2] = "reserved";
    })(TokenClass || (TokenClass = {}));
    class TokenType {
        constructor(name, type, rule) {
            this.name = name;
            this.type = type;
            this.rule = rule;
        }
        toString() {
            return this.name;
        }
    }
    /// Catalog of defined token types, keywords, and reserved words.
    class TokenTypes {
    }
    _a = TokenTypes;
    TokenTypes.none = new TokenType("", TokenClass.reserved, "");
    TokenTypes.eof = new TokenType("EOF", TokenClass.token, "");
    TokenTypes.reserved = {
        asm: new TokenType("asm", TokenClass.reserved, "asm"),
        bf16: new TokenType("bf16", TokenClass.reserved, "bf16"),
        do: new TokenType("do", TokenClass.reserved, "do"),
        enum: new TokenType("enum", TokenClass.reserved, "enum"),
        f16: new TokenType("f16", TokenClass.reserved, "f16"),
        f64: new TokenType("f64", TokenClass.reserved, "f64"),
        handle: new TokenType("handle", TokenClass.reserved, "handle"),
        i8: new TokenType("i8", TokenClass.reserved, "i8"),
        i16: new TokenType("i16", TokenClass.reserved, "i16"),
        i64: new TokenType("i64", TokenClass.reserved, "i64"),
        mat: new TokenType("mat", TokenClass.reserved, "mat"),
        premerge: new TokenType("premerge", TokenClass.reserved, "premerge"),
        regardless: new TokenType("regardless", TokenClass.reserved, "regardless"),
        typedef: new TokenType("typedef", TokenClass.reserved, "typedef"),
        u8: new TokenType("u8", TokenClass.reserved, "u8"),
        u16: new TokenType("u16", TokenClass.reserved, "u16"),
        u64: new TokenType("u64", TokenClass.reserved, "u64"),
        unless: new TokenType("unless", TokenClass.reserved, "unless"),
        using: new TokenType("using", TokenClass.reserved, "using"),
        vec: new TokenType("vec", TokenClass.reserved, "vec"),
        void: new TokenType("void", TokenClass.reserved, "void"),
    };
    TokenTypes.keywords = {
        array: new TokenType("array", TokenClass.keyword, "array"),
        atomic: new TokenType("atomic", TokenClass.keyword, "atomic"),
        bool: new TokenType("bool", TokenClass.keyword, "bool"),
        f32: new TokenType("f32", TokenClass.keyword, "f32"),
        i32: new TokenType("i32", TokenClass.keyword, "i32"),
        mat2x2: new TokenType("mat2x2", TokenClass.keyword, "mat2x2"),
        mat2x3: new TokenType("mat2x3", TokenClass.keyword, "mat2x3"),
        mat2x4: new TokenType("mat2x4", TokenClass.keyword, "mat2x4"),
        mat3x2: new TokenType("mat3x2", TokenClass.keyword, "mat3x2"),
        mat3x3: new TokenType("mat3x3", TokenClass.keyword, "mat3x3"),
        mat3x4: new TokenType("mat3x4", TokenClass.keyword, "mat3x4"),
        mat4x2: new TokenType("mat4x2", TokenClass.keyword, "mat4x2"),
        mat4x3: new TokenType("mat4x3", TokenClass.keyword, "mat4x3"),
        mat4x4: new TokenType("mat4x4", TokenClass.keyword, "mat4x4"),
        ptr: new TokenType("ptr", TokenClass.keyword, "ptr"),
        sampler: new TokenType("sampler", TokenClass.keyword, "sampler"),
        sampler_comparison: new TokenType("sampler_comparison", TokenClass.keyword, "sampler_comparison"),
        struct: new TokenType("struct", TokenClass.keyword, "struct"),
        texture_1d: new TokenType("texture_1d", TokenClass.keyword, "texture_1d"),
        texture_2d: new TokenType("texture_2d", TokenClass.keyword, "texture_2d"),
        texture_2d_array: new TokenType("texture_2d_array", TokenClass.keyword, "texture_2d_array"),
        texture_3d: new TokenType("texture_3d", TokenClass.keyword, "texture_3d"),
        texture_cube: new TokenType("texture_cube", TokenClass.keyword, "texture_cube"),
        texture_cube_array: new TokenType("texture_cube_array", TokenClass.keyword, "texture_cube_array"),
        texture_multisampled_2d: new TokenType("texture_multisampled_2d", TokenClass.keyword, "texture_multisampled_2d"),
        texture_storage_1d: new TokenType("texture_storage_1d", TokenClass.keyword, "texture_storage_1d"),
        texture_storage_2d: new TokenType("texture_storage_2d", TokenClass.keyword, "texture_storage_2d"),
        texture_storage_2d_array: new TokenType("texture_storage_2d_array", TokenClass.keyword, "texture_storage_2d_array"),
        texture_storage_3d: new TokenType("texture_storage_3d", TokenClass.keyword, "texture_storage_3d"),
        texture_depth_2d: new TokenType("texture_depth_2d", TokenClass.keyword, "texture_depth_2d"),
        texture_depth_2d_array: new TokenType("texture_depth_2d_array", TokenClass.keyword, "texture_depth_2d_array"),
        texture_depth_cube: new TokenType("texture_depth_cube", TokenClass.keyword, "texture_depth_cube"),
        texture_depth_cube_array: new TokenType("texture_depth_cube_array", TokenClass.keyword, "texture_depth_cube_array"),
        texture_depth_multisampled_2d: new TokenType("texture_depth_multisampled_2d", TokenClass.keyword, "texture_depth_multisampled_2d"),
        texture_external: new TokenType("texture_external", TokenClass.keyword, "texture_external"),
        u32: new TokenType("u32", TokenClass.keyword, "u32"),
        vec2: new TokenType("vec2", TokenClass.keyword, "vec2"),
        vec3: new TokenType("vec3", TokenClass.keyword, "vec3"),
        vec4: new TokenType("vec4", TokenClass.keyword, "vec4"),
        bitcast: new TokenType("bitcast", TokenClass.keyword, "bitcast"),
        block: new TokenType("block", TokenClass.keyword, "block"),
        break: new TokenType("break", TokenClass.keyword, "break"),
        case: new TokenType("case", TokenClass.keyword, "case"),
        continue: new TokenType("continue", TokenClass.keyword, "continue"),
        continuing: new TokenType("continuing", TokenClass.keyword, "continuing"),
        default: new TokenType("default", TokenClass.keyword, "default"),
        diagnostic: new TokenType("diagnostic", TokenClass.keyword, "diagnostic"),
        discard: new TokenType("discard", TokenClass.keyword, "discard"),
        else: new TokenType("else", TokenClass.keyword, "else"),
        enable: new TokenType("enable", TokenClass.keyword, "enable"),
        fallthrough: new TokenType("fallthrough", TokenClass.keyword, "fallthrough"),
        false: new TokenType("false", TokenClass.keyword, "false"),
        fn: new TokenType("fn", TokenClass.keyword, "fn"),
        for: new TokenType("for", TokenClass.keyword, "for"),
        function: new TokenType("function", TokenClass.keyword, "function"),
        if: new TokenType("if", TokenClass.keyword, "if"),
        let: new TokenType("let", TokenClass.keyword, "let"),
        const: new TokenType("const", TokenClass.keyword, "const"),
        loop: new TokenType("loop", TokenClass.keyword, "loop"),
        while: new TokenType("while", TokenClass.keyword, "while"),
        private: new TokenType("private", TokenClass.keyword, "private"),
        read: new TokenType("read", TokenClass.keyword, "read"),
        read_write: new TokenType("read_write", TokenClass.keyword, "read_write"),
        return: new TokenType("return", TokenClass.keyword, "return"),
        requires: new TokenType("requires", TokenClass.keyword, "requires"),
        storage: new TokenType("storage", TokenClass.keyword, "storage"),
        switch: new TokenType("switch", TokenClass.keyword, "switch"),
        true: new TokenType("true", TokenClass.keyword, "true"),
        alias: new TokenType("alias", TokenClass.keyword, "alias"),
        type: new TokenType("type", TokenClass.keyword, "type"),
        uniform: new TokenType("uniform", TokenClass.keyword, "uniform"),
        var: new TokenType("var", TokenClass.keyword, "var"),
        override: new TokenType("override", TokenClass.keyword, "override"),
        workgroup: new TokenType("workgroup", TokenClass.keyword, "workgroup"),
        write: new TokenType("write", TokenClass.keyword, "write"),
        r8unorm: new TokenType("r8unorm", TokenClass.keyword, "r8unorm"),
        r8snorm: new TokenType("r8snorm", TokenClass.keyword, "r8snorm"),
        r8uint: new TokenType("r8uint", TokenClass.keyword, "r8uint"),
        r8sint: new TokenType("r8sint", TokenClass.keyword, "r8sint"),
        r16uint: new TokenType("r16uint", TokenClass.keyword, "r16uint"),
        r16sint: new TokenType("r16sint", TokenClass.keyword, "r16sint"),
        r16float: new TokenType("r16float", TokenClass.keyword, "r16float"),
        rg8unorm: new TokenType("rg8unorm", TokenClass.keyword, "rg8unorm"),
        rg8snorm: new TokenType("rg8snorm", TokenClass.keyword, "rg8snorm"),
        rg8uint: new TokenType("rg8uint", TokenClass.keyword, "rg8uint"),
        rg8sint: new TokenType("rg8sint", TokenClass.keyword, "rg8sint"),
        r32uint: new TokenType("r32uint", TokenClass.keyword, "r32uint"),
        r32sint: new TokenType("r32sint", TokenClass.keyword, "r32sint"),
        r32float: new TokenType("r32float", TokenClass.keyword, "r32float"),
        rg16uint: new TokenType("rg16uint", TokenClass.keyword, "rg16uint"),
        rg16sint: new TokenType("rg16sint", TokenClass.keyword, "rg16sint"),
        rg16float: new TokenType("rg16float", TokenClass.keyword, "rg16float"),
        rgba8unorm: new TokenType("rgba8unorm", TokenClass.keyword, "rgba8unorm"),
        rgba8unorm_srgb: new TokenType("rgba8unorm_srgb", TokenClass.keyword, "rgba8unorm_srgb"),
        rgba8snorm: new TokenType("rgba8snorm", TokenClass.keyword, "rgba8snorm"),
        rgba8uint: new TokenType("rgba8uint", TokenClass.keyword, "rgba8uint"),
        rgba8sint: new TokenType("rgba8sint", TokenClass.keyword, "rgba8sint"),
        bgra8unorm: new TokenType("bgra8unorm", TokenClass.keyword, "bgra8unorm"),
        bgra8unorm_srgb: new TokenType("bgra8unorm_srgb", TokenClass.keyword, "bgra8unorm_srgb"),
        rgb10a2unorm: new TokenType("rgb10a2unorm", TokenClass.keyword, "rgb10a2unorm"),
        rg11b10float: new TokenType("rg11b10float", TokenClass.keyword, "rg11b10float"),
        rg32uint: new TokenType("rg32uint", TokenClass.keyword, "rg32uint"),
        rg32sint: new TokenType("rg32sint", TokenClass.keyword, "rg32sint"),
        rg32float: new TokenType("rg32float", TokenClass.keyword, "rg32float"),
        rgba16uint: new TokenType("rgba16uint", TokenClass.keyword, "rgba16uint"),
        rgba16sint: new TokenType("rgba16sint", TokenClass.keyword, "rgba16sint"),
        rgba16float: new TokenType("rgba16float", TokenClass.keyword, "rgba16float"),
        rgba32uint: new TokenType("rgba32uint", TokenClass.keyword, "rgba32uint"),
        rgba32sint: new TokenType("rgba32sint", TokenClass.keyword, "rgba32sint"),
        rgba32float: new TokenType("rgba32float", TokenClass.keyword, "rgba32float"),
        static_assert: new TokenType("static_assert", TokenClass.keyword, "static_assert"),
        // WGSL grammar has a few keywords that have different token names than the strings they
        // represent. Aliasing them here.
        /*int32: new TokenType("i32", TokenClass.keyword, "i32"),
            uint32: new TokenType("u32", TokenClass.keyword, "u32"),
            float32: new TokenType("f32", TokenClass.keyword, "f32"),
            pointer: new TokenType("ptr", TokenClass.keyword, "ptr"),*/
    };
    TokenTypes.tokens = {
        decimal_float_literal: new TokenType("decimal_float_literal", TokenClass.token, /((-?[0-9]*\.[0-9]+|-?[0-9]+\.[0-9]*)((e|E)(\+|-)?[0-9]+)?f?)|(-?[0-9]+(e|E)(\+|-)?[0-9]+f?)|([0-9]+f)/),
        hex_float_literal: new TokenType("hex_float_literal", TokenClass.token, /-?0x((([0-9a-fA-F]*\.[0-9a-fA-F]+|[0-9a-fA-F]+\.[0-9a-fA-F]*)((p|P)(\+|-)?[0-9]+f?)?)|([0-9a-fA-F]+(p|P)(\+|-)?[0-9]+f?))/),
        int_literal: new TokenType("int_literal", TokenClass.token, /-?0x[0-9a-fA-F]+|0i?|-?[1-9][0-9]*i?/),
        uint_literal: new TokenType("uint_literal", TokenClass.token, /0x[0-9a-fA-F]+u|0u|[1-9][0-9]*u/),
        ident: new TokenType("ident", TokenClass.token, /[_a-zA-Z][0-9a-zA-Z_]*/),
        and: new TokenType("and", TokenClass.token, "&"),
        and_and: new TokenType("and_and", TokenClass.token, "&&"),
        arrow: new TokenType("arrow ", TokenClass.token, "->"),
        attr: new TokenType("attr", TokenClass.token, "@"),
        attr_left: new TokenType("attr_left", TokenClass.token, "[["),
        attr_right: new TokenType("attr_right", TokenClass.token, "]]"),
        forward_slash: new TokenType("forward_slash", TokenClass.token, "/"),
        bang: new TokenType("bang", TokenClass.token, "!"),
        bracket_left: new TokenType("bracket_left", TokenClass.token, "["),
        bracket_right: new TokenType("bracket_right", TokenClass.token, "]"),
        brace_left: new TokenType("brace_left", TokenClass.token, "{"),
        brace_right: new TokenType("brace_right", TokenClass.token, "}"),
        colon: new TokenType("colon", TokenClass.token, ":"),
        comma: new TokenType("comma", TokenClass.token, ","),
        equal: new TokenType("equal", TokenClass.token, "="),
        equal_equal: new TokenType("equal_equal", TokenClass.token, "=="),
        not_equal: new TokenType("not_equal", TokenClass.token, "!="),
        greater_than: new TokenType("greater_than", TokenClass.token, ">"),
        greater_than_equal: new TokenType("greater_than_equal", TokenClass.token, ">="),
        shift_right: new TokenType("shift_right", TokenClass.token, ">>"),
        less_than: new TokenType("less_than", TokenClass.token, "<"),
        less_than_equal: new TokenType("less_than_equal", TokenClass.token, "<="),
        shift_left: new TokenType("shift_left", TokenClass.token, "<<"),
        modulo: new TokenType("modulo", TokenClass.token, "%"),
        minus: new TokenType("minus", TokenClass.token, "-"),
        minus_minus: new TokenType("minus_minus", TokenClass.token, "--"),
        period: new TokenType("period", TokenClass.token, "."),
        plus: new TokenType("plus", TokenClass.token, "+"),
        plus_plus: new TokenType("plus_plus", TokenClass.token, "++"),
        or: new TokenType("or", TokenClass.token, "|"),
        or_or: new TokenType("or_or", TokenClass.token, "||"),
        paren_left: new TokenType("paren_left", TokenClass.token, "("),
        paren_right: new TokenType("paren_right", TokenClass.token, ")"),
        semicolon: new TokenType("semicolon", TokenClass.token, ";"),
        star: new TokenType("star", TokenClass.token, "*"),
        tilde: new TokenType("tilde", TokenClass.token, "~"),
        underscore: new TokenType("underscore", TokenClass.token, "_"),
        xor: new TokenType("xor", TokenClass.token, "^"),
        plus_equal: new TokenType("plus_equal", TokenClass.token, "+="),
        minus_equal: new TokenType("minus_equal", TokenClass.token, "-="),
        times_equal: new TokenType("times_equal", TokenClass.token, "*="),
        division_equal: new TokenType("division_equal", TokenClass.token, "/="),
        modulo_equal: new TokenType("modulo_equal", TokenClass.token, "%="),
        and_equal: new TokenType("and_equal", TokenClass.token, "&="),
        or_equal: new TokenType("or_equal", TokenClass.token, "|="),
        xor_equal: new TokenType("xor_equal", TokenClass.token, "^="),
        shift_right_equal: new TokenType("shift_right_equal", TokenClass.token, ">>="),
        shift_left_equal: new TokenType("shift_left_equal", TokenClass.token, "<<="),
    };
    TokenTypes.simpleTokens = {
        "@": _a.tokens.attr,
        "{": _a.tokens.brace_left,
        "}": _a.tokens.brace_right,
        ":": _a.tokens.colon,
        ",": _a.tokens.comma,
        "(": _a.tokens.paren_left,
        ")": _a.tokens.paren_right,
        ";": _a.tokens.semicolon,
    };
    TokenTypes.literalTokens = {
        "&": _a.tokens.and,
        "&&": _a.tokens.and_and,
        "->": _a.tokens.arrow,
        "[[": _a.tokens.attr_left,
        "]]": _a.tokens.attr_right,
        "/": _a.tokens.forward_slash,
        "!": _a.tokens.bang,
        "[": _a.tokens.bracket_left,
        "]": _a.tokens.bracket_right,
        "=": _a.tokens.equal,
        "==": _a.tokens.equal_equal,
        "!=": _a.tokens.not_equal,
        ">": _a.tokens.greater_than,
        ">=": _a.tokens.greater_than_equal,
        ">>": _a.tokens.shift_right,
        "<": _a.tokens.less_than,
        "<=": _a.tokens.less_than_equal,
        "<<": _a.tokens.shift_left,
        "%": _a.tokens.modulo,
        "-": _a.tokens.minus,
        "--": _a.tokens.minus_minus,
        ".": _a.tokens.period,
        "+": _a.tokens.plus,
        "++": _a.tokens.plus_plus,
        "|": _a.tokens.or,
        "||": _a.tokens.or_or,
        "*": _a.tokens.star,
        "~": _a.tokens.tilde,
        "_": _a.tokens.underscore,
        "^": _a.tokens.xor,
        "+=": _a.tokens.plus_equal,
        "-=": _a.tokens.minus_equal,
        "*=": _a.tokens.times_equal,
        "/=": _a.tokens.division_equal,
        "%=": _a.tokens.modulo_equal,
        "&=": _a.tokens.and_equal,
        "|=": _a.tokens.or_equal,
        "^=": _a.tokens.xor_equal,
        ">>=": _a.tokens.shift_right_equal,
        "<<=": _a.tokens.shift_left_equal,
    };
    TokenTypes.regexTokens = {
        decimal_float_literal: _a.tokens.decimal_float_literal,
        hex_float_literal: _a.tokens.hex_float_literal,
        int_literal: _a.tokens.int_literal,
        uint_literal: _a.tokens.uint_literal,
        ident: _a.tokens.ident,
    };
    TokenTypes.storage_class = [
        _a.keywords.function,
        _a.keywords.private,
        _a.keywords.workgroup,
        _a.keywords.uniform,
        _a.keywords.storage,
    ];
    TokenTypes.access_mode = [
        _a.keywords.read,
        _a.keywords.write,
        _a.keywords.read_write,
    ];
    TokenTypes.sampler_type = [
        _a.keywords.sampler,
        _a.keywords.sampler_comparison,
    ];
    TokenTypes.sampled_texture_type = [
        _a.keywords.texture_1d,
        _a.keywords.texture_2d,
        _a.keywords.texture_2d_array,
        _a.keywords.texture_3d,
        _a.keywords.texture_cube,
        _a.keywords.texture_cube_array,
    ];
    TokenTypes.multisampled_texture_type = [
        _a.keywords.texture_multisampled_2d,
    ];
    TokenTypes.storage_texture_type = [
        _a.keywords.texture_storage_1d,
        _a.keywords.texture_storage_2d,
        _a.keywords.texture_storage_2d_array,
        _a.keywords.texture_storage_3d,
    ];
    TokenTypes.depth_texture_type = [
        _a.keywords.texture_depth_2d,
        _a.keywords.texture_depth_2d_array,
        _a.keywords.texture_depth_cube,
        _a.keywords.texture_depth_cube_array,
        _a.keywords.texture_depth_multisampled_2d,
    ];
    TokenTypes.texture_external_type = [_a.keywords.texture_external];
    TokenTypes.any_texture_type = [
        ..._a.sampled_texture_type,
        ..._a.multisampled_texture_type,
        ..._a.storage_texture_type,
        ..._a.depth_texture_type,
        ..._a.texture_external_type,
    ];
    TokenTypes.texel_format = [
        _a.keywords.r8unorm,
        _a.keywords.r8snorm,
        _a.keywords.r8uint,
        _a.keywords.r8sint,
        _a.keywords.r16uint,
        _a.keywords.r16sint,
        _a.keywords.r16float,
        _a.keywords.rg8unorm,
        _a.keywords.rg8snorm,
        _a.keywords.rg8uint,
        _a.keywords.rg8sint,
        _a.keywords.r32uint,
        _a.keywords.r32sint,
        _a.keywords.r32float,
        _a.keywords.rg16uint,
        _a.keywords.rg16sint,
        _a.keywords.rg16float,
        _a.keywords.rgba8unorm,
        _a.keywords.rgba8unorm_srgb,
        _a.keywords.rgba8snorm,
        _a.keywords.rgba8uint,
        _a.keywords.rgba8sint,
        _a.keywords.bgra8unorm,
        _a.keywords.bgra8unorm_srgb,
        _a.keywords.rgb10a2unorm,
        _a.keywords.rg11b10float,
        _a.keywords.rg32uint,
        _a.keywords.rg32sint,
        _a.keywords.rg32float,
        _a.keywords.rgba16uint,
        _a.keywords.rgba16sint,
        _a.keywords.rgba16float,
        _a.keywords.rgba32uint,
        _a.keywords.rgba32sint,
        _a.keywords.rgba32float,
    ];
    TokenTypes.const_literal = [
        _a.tokens.int_literal,
        _a.tokens.uint_literal,
        _a.tokens.decimal_float_literal,
        _a.tokens.hex_float_literal,
        _a.keywords.true,
        _a.keywords.false,
    ];
    TokenTypes.literal_or_ident = [
        _a.tokens.ident,
        _a.tokens.int_literal,
        _a.tokens.uint_literal,
        _a.tokens.decimal_float_literal,
        _a.tokens.hex_float_literal,
    ];
    TokenTypes.element_count_expression = [
        _a.tokens.int_literal,
        _a.tokens.uint_literal,
        _a.tokens.ident,
    ];
    TokenTypes.template_types = [
        _a.keywords.vec2,
        _a.keywords.vec3,
        _a.keywords.vec4,
        _a.keywords.mat2x2,
        _a.keywords.mat2x3,
        _a.keywords.mat2x4,
        _a.keywords.mat3x2,
        _a.keywords.mat3x3,
        _a.keywords.mat3x4,
        _a.keywords.mat4x2,
        _a.keywords.mat4x3,
        _a.keywords.mat4x4,
        _a.keywords.atomic,
        _a.keywords.bitcast,
        ..._a.any_texture_type,
    ];
    // The grammar calls out 'block', but attribute grammar is defined to use a 'ident'.
    // The attribute grammar should be ident | block.
    TokenTypes.attribute_name = [_a.tokens.ident, _a.keywords.block, _a.keywords.diagnostic];
    TokenTypes.assignment_operators = [
        _a.tokens.equal,
        _a.tokens.plus_equal,
        _a.tokens.minus_equal,
        _a.tokens.times_equal,
        _a.tokens.division_equal,
        _a.tokens.modulo_equal,
        _a.tokens.and_equal,
        _a.tokens.or_equal,
        _a.tokens.xor_equal,
        _a.tokens.shift_right_equal,
        _a.tokens.shift_left_equal,
    ];
    TokenTypes.increment_operators = [
        _a.tokens.plus_plus,
        _a.tokens.minus_minus,
    ];
    /// A token parsed by the WgslScanner.
    class Token {
        constructor(type, lexeme, line) {
            this.type = type;
            this.lexeme = lexeme;
            this.line = line;
        }
        toString() {
            return this.lexeme;
        }
        isTemplateType() {
            return TokenTypes.template_types.indexOf(this.type) != -1;
        }
        isArrayType() {
            return this.type == TokenTypes.keywords.array;
        }
        isArrayOrTemplateType() {
            return this.isArrayType() || this.isTemplateType();
        }
    }
    /// Lexical scanner for the WGSL language. This takes an input source text and generates a list
    /// of Token objects, which can then be fed into the WgslParser to generate an AST.
    class WgslScanner {
        constructor(source) {
            this._tokens = [];
            this._start = 0;
            this._current = 0;
            this._line = 1;
            this._source = source !== null && source !== void 0 ? source : "";
        }
        /// Scan all tokens from the source.
        scanTokens() {
            while (!this._isAtEnd()) {
                this._start = this._current;
                if (!this.scanToken()) {
                    throw `Invalid syntax at line ${this._line}`;
                }
            }
            this._tokens.push(new Token(TokenTypes.eof, "", this._line));
            return this._tokens;
        }
        /// Scan a single token from the source.
        scanToken() {
            // Find the longest consecutive set of characters that match a rule.
            let lexeme = this._advance();
            // Skip line-feed, adding to the line counter.
            if (lexeme == "\n") {
                this._line++;
                return true;
            }
            // Skip whitespace
            if (this._isWhitespace(lexeme)) {
                return true;
            }
            if (lexeme == "/") {
                // If it's a // comment, skip everything until the next line-feed.
                if (this._peekAhead() == "/") {
                    while (lexeme != "\n") {
                        if (this._isAtEnd()) {
                            return true;
                        }
                        lexeme = this._advance();
                    }
                    // skip the linefeed
                    this._line++;
                    return true;
                }
                else if (this._peekAhead() == "*") {
                    // If it's a / * block comment, skip everything until the matching * /,
                    // allowing for nested block comments.
                    this._advance();
                    let commentLevel = 1;
                    while (commentLevel > 0) {
                        if (this._isAtEnd()) {
                            return true;
                        }
                        lexeme = this._advance();
                        if (lexeme == "\n") {
                            this._line++;
                        }
                        else if (lexeme == "*") {
                            if (this._peekAhead() == "/") {
                                this._advance();
                                commentLevel--;
                                if (commentLevel == 0) {
                                    return true;
                                }
                            }
                        }
                        else if (lexeme == "/") {
                            if (this._peekAhead() == "*") {
                                this._advance();
                                commentLevel++;
                            }
                        }
                    }
                    return true;
                }
            }
            // Shortcut single character tokens
            const simpleToken = TokenTypes.simpleTokens[lexeme];
            if (simpleToken) {
                this._addToken(simpleToken);
                return true;
            }
            // Shortcut keywords and identifiers
            let matchType = TokenTypes.none;
            const isAlpha = this._isAlpha(lexeme);
            const isUnderscore = lexeme === "_";
            if (this._isAlphaNumeric(lexeme)) {
                let nextChar = this._peekAhead();
                while (this._isAlphaNumeric(nextChar)) {
                    lexeme += this._advance();
                    nextChar = this._peekAhead();
                }
            }
            if (isAlpha) {
                const matchedType = TokenTypes.keywords[lexeme];
                if (matchedType) {
                    this._addToken(matchedType);
                    return true;
                }
            }
            if (isAlpha || isUnderscore) {
                this._addToken(TokenTypes.tokens.ident);
                return true;
            }
            // Scan for the next valid token type
            for (;;) {
                let matchedType = this._findType(lexeme);
                // An exception to "longest lexeme" rule is '>>'. In the case of 1>>2, it's a
                // shift_right.
                // In the case of array<vec4<f32>>, it's two greater_than's (one to close the vec4,
                // and one to close the array).
                // Another ambiguity is '>='. In the case of vec2<i32>=vec2(1,2),
                // it's a greather_than and an equal, not a greater_than_equal.
                // WGSL requires context sensitive parsing to resolve these ambiguities. Both of these cases
                // are predicated on it the > either closing a template, or being part of an operator.
                // The solution here is to check if there was a less_than up to some number of tokens
                // previously, and the token prior to that is a keyword that requires a '<', then it will be
                // split into two operators; otherwise it's a single operator.
                const nextLexeme = this._peekAhead();
                if (lexeme == ">" && (nextLexeme == ">" || nextLexeme == "=")) {
                    let foundLessThan = false;
                    let ti = this._tokens.length - 1;
                    for (let count = 0; count < 5 && ti >= 0; ++count, --ti) {
                        if (this._tokens[ti].type === TokenTypes.tokens.less_than) {
                            if (ti > 0 && this._tokens[ti - 1].isArrayOrTemplateType()) {
                                foundLessThan = true;
                            }
                            break;
                        }
                    }
                    // If there was a less_than in the recent token history, then this is probably a
                    // greater_than.
                    if (foundLessThan) {
                        this._addToken(matchedType);
                        return true;
                    }
                }
                // The current lexeme may not match any rule, but some token types may be invalid for
                // part of the string but valid after a few more characters.
                // For example, 0x.5 is a hex_float_literal. But as it's being scanned,
                // "0" is a int_literal, then "0x" is invalid. If we stopped there, it would return
                // the int_literal "0", but that's incorrect. So if we look forward a few characters,
                // we'd get "0x.", which is still invalid, followed by "0x.5" which is the correct
                // hex_float_literal. So that means if we hit an non-matching string, we should look
                // ahead up to two characters to see if the string starts matching a valid rule again.
                if (matchedType === TokenTypes.none) {
                    let lookAheadLexeme = lexeme;
                    let lookAhead = 0;
                    const maxLookAhead = 2;
                    for (let li = 0; li < maxLookAhead; ++li) {
                        lookAheadLexeme += this._peekAhead(li);
                        matchedType = this._findType(lookAheadLexeme);
                        if (matchedType !== TokenTypes.none) {
                            lookAhead = li;
                            break;
                        }
                    }
                    if (matchedType === TokenTypes.none) {
                        if (matchType === TokenTypes.none) {
                            return false;
                        }
                        this._current--;
                        this._addToken(matchType);
                        return true;
                    }
                    lexeme = lookAheadLexeme;
                    this._current += lookAhead + 1;
                }
                matchType = matchedType;
                if (this._isAtEnd()) {
                    break;
                }
                lexeme += this._advance();
            }
            // We got to the end of the input stream. Then the token we've ready so far is it.
            if (matchType === TokenTypes.none) {
                return false;
            }
            this._addToken(matchType);
            return true;
        }
        _findType(lexeme) {
            for (const name in TokenTypes.regexTokens) {
                const type = TokenTypes.regexTokens[name];
                if (this._match(lexeme, type.rule)) {
                    return type;
                }
            }
            const type = TokenTypes.literalTokens[lexeme];
            if (type) {
                return type;
            }
            return TokenTypes.none;
        }
        _match(lexeme, rule) {
            const match = rule.exec(lexeme);
            return match && match.index == 0 && match[0] == lexeme;
        }
        _isAtEnd() {
            return this._current >= this._source.length;
        }
        _isAlpha(c) {
            return (c >= "a" && c <= "z") || (c >= "A" && c <= "Z");
        }
        _isAlphaNumeric(c) {
            return (c >= "a" && c <= "z") || (c >= "A" && c <= "Z") || c == "_" || (c >= "0" && c <= "9");
        }
        _isWhitespace(c) {
            return c == " " || c == "\t" || c == "\r";
        }
        _advance(amount = 0) {
            let c = this._source[this._current];
            amount = amount || 0;
            amount++;
            this._current += amount;
            return c;
        }
        _peekAhead(offset = 0) {
            offset = offset || 0;
            if (this._current + offset >= this._source.length) {
                return "\0";
            }
            return this._source[this._current + offset];
        }
        _addToken(type) {
            const text = this._source.substring(this._start, this._current);
            this._tokens.push(new Token(type, text, this._line));
        }
    }

    /**
     * @author Brendan Duncan / https://github.com/brendan-duncan
     */
    /// Parse a sequence of tokens from the WgslScanner into an Abstract Syntax Tree (AST).
    class WgslParser {
        constructor() {
            this._tokens = [];
            this._current = 0;
            this._currentLine = 0;
            this._context = new ParseContext();
            this._deferArrayCountEval = [];
        }
        parse(tokensOrCode) {
            this._initialize(tokensOrCode);
            this._deferArrayCountEval.length = 0;
            const statements = [];
            while (!this._isAtEnd()) {
                const statement = this._global_decl_or_directive();
                if (!statement) {
                    break;
                }
                statements.push(statement);
            }
            // Since constants can be declared after they are used, and
            // constants can be used to size arrays, defer calculating the
            // size until after the shader has finished parsing.
            if (this._deferArrayCountEval.length > 0) {
                for (const arrayDecl of this._deferArrayCountEval) {
                    const arrayType = arrayDecl["arrayType"];
                    const countNode = arrayDecl["countNode"];
                    if (countNode instanceof VariableExpr) {
                        const variable = countNode;
                        const name = variable.name;
                        const constant = this._context.constants.get(name);
                        if (constant) {
                            try {
                                const count = constant.evaluate(this._context);
                                arrayType.count = count;
                            }
                            catch (e) {
                            }
                        }
                    }
                }
                this._deferArrayCountEval.length = 0;
            }
            return statements;
        }
        _initialize(tokensOrCode) {
            if (tokensOrCode) {
                if (typeof tokensOrCode == "string") {
                    const scanner = new WgslScanner(tokensOrCode);
                    this._tokens = scanner.scanTokens();
                }
                else {
                    this._tokens = tokensOrCode;
                }
            }
            else {
                this._tokens = [];
            }
            this._current = 0;
        }
        _error(token, message) {
            return {
                token,
                message,
                toString: function () {
                    return `${message}`;
                },
            };
        }
        _isAtEnd() {
            return (this._current >= this._tokens.length ||
                this._peek().type == TokenTypes.eof);
        }
        _match(types) {
            if (types instanceof TokenType) {
                if (this._check(types)) {
                    this._advance();
                    return true;
                }
                return false;
            }
            for (let i = 0, l = types.length; i < l; ++i) {
                const type = types[i];
                if (this._check(type)) {
                    this._advance();
                    return true;
                }
            }
            return false;
        }
        _consume(types, message) {
            if (this._check(types)) {
                return this._advance();
            }
            throw this._error(this._peek(), message);
        }
        _check(types) {
            if (this._isAtEnd()) {
                return false;
            }
            const tk = this._peek();
            if (types instanceof Array) {
                const t = tk.type;
                const index = types.indexOf(t);
                return index != -1;
            }
            return tk.type == types;
        }
        _advance() {
            var _a, _b;
            this._currentLine = (_b = (_a = this._peek()) === null || _a === void 0 ? void 0 : _a.line) !== null && _b !== void 0 ? _b : -1;
            if (!this._isAtEnd()) {
                this._current++;
            }
            return this._previous();
        }
        _peek() {
            return this._tokens[this._current];
        }
        _previous() {
            return this._tokens[this._current - 1];
        }
        _global_decl_or_directive() {
            // semicolon
            // global_variable_decl semicolon
            // global_constant_decl semicolon
            // type_alias semicolon
            // struct_decl
            // function_decl
            // enable_directive
            // Ignore any stand-alone semicolons
            while (this._match(TokenTypes.tokens.semicolon) && !this._isAtEnd())
                ;
            if (this._match(TokenTypes.keywords.alias)) {
                const type = this._type_alias();
                this._consume(TokenTypes.tokens.semicolon, "Expected ';'");
                return type;
            }
            if (this._match(TokenTypes.keywords.diagnostic)) {
                const directive = this._diagnostic();
                this._consume(TokenTypes.tokens.semicolon, "Expected ';'");
                return directive;
            }
            if (this._match(TokenTypes.keywords.requires)) {
                const requires = this._requires_directive();
                this._consume(TokenTypes.tokens.semicolon, "Expected ';'");
                return requires;
            }
            if (this._match(TokenTypes.keywords.enable)) {
                const enable = this._enable_directive();
                this._consume(TokenTypes.tokens.semicolon, "Expected ';'");
                return enable;
            }
            // The following statements have an optional attribute*
            const attrs = this._attribute();
            if (this._check(TokenTypes.keywords.var)) {
                const _var = this._global_variable_decl();
                if (_var != null) {
                    _var.attributes = attrs;
                }
                this._consume(TokenTypes.tokens.semicolon, "Expected ';'.");
                return _var;
            }
            if (this._check(TokenTypes.keywords.override)) {
                const _override = this._override_variable_decl();
                if (_override != null) {
                    _override.attributes = attrs;
                }
                this._consume(TokenTypes.tokens.semicolon, "Expected ';'.");
                return _override;
            }
            if (this._check(TokenTypes.keywords.let)) {
                const _let = this._global_let_decl();
                if (_let != null) {
                    _let.attributes = attrs;
                }
                this._consume(TokenTypes.tokens.semicolon, "Expected ';'.");
                return _let;
            }
            if (this._check(TokenTypes.keywords.const)) {
                const _const = this._global_const_decl();
                if (_const != null) {
                    _const.attributes = attrs;
                }
                this._consume(TokenTypes.tokens.semicolon, "Expected ';'.");
                return _const;
            }
            if (this._check(TokenTypes.keywords.struct)) {
                const _struct = this._struct_decl();
                if (_struct != null) {
                    _struct.attributes = attrs;
                }
                return _struct;
            }
            if (this._check(TokenTypes.keywords.fn)) {
                const _fn = this._function_decl();
                if (_fn != null) {
                    _fn.attributes = attrs;
                }
                return _fn;
            }
            return null;
        }
        _function_decl() {
            // attribute* function_header compound_statement
            // function_header: fn ident paren_left param_list? paren_right (arrow attribute* type_decl)?
            if (!this._match(TokenTypes.keywords.fn)) {
                return null;
            }
            const startLine = this._currentLine;
            const name = this._consume(TokenTypes.tokens.ident, "Expected function name.").toString();
            this._consume(TokenTypes.tokens.paren_left, "Expected '(' for function arguments.");
            const args = [];
            if (!this._check(TokenTypes.tokens.paren_right)) {
                do {
                    if (this._check(TokenTypes.tokens.paren_right)) {
                        break;
                    }
                    const argAttrs = this._attribute();
                    const name = this._consume(TokenTypes.tokens.ident, "Expected argument name.").toString();
                    this._consume(TokenTypes.tokens.colon, "Expected ':' for argument type.");
                    const typeAttrs = this._attribute();
                    const type = this._type_decl();
                    if (type != null) {
                        type.attributes = typeAttrs;
                        args.push(new Argument(name, type, argAttrs));
                    }
                } while (this._match(TokenTypes.tokens.comma));
            }
            this._consume(TokenTypes.tokens.paren_right, "Expected ')' after function arguments.");
            let _return = null;
            if (this._match(TokenTypes.tokens.arrow)) {
                const attrs = this._attribute();
                _return = this._type_decl();
                if (_return != null) {
                    _return.attributes = attrs;
                }
            }
            const body = this._compound_statement();
            const endLine = this._currentLine;
            return new Function(name, args, _return, body, startLine, endLine);
        }
        _compound_statement() {
            // brace_left statement* brace_right
            const statements = [];
            this._consume(TokenTypes.tokens.brace_left, "Expected '{' for block.");
            while (!this._check(TokenTypes.tokens.brace_right)) {
                const statement = this._statement();
                if (statement !== null) {
                    statements.push(statement);
                }
            }
            this._consume(TokenTypes.tokens.brace_right, "Expected '}' for block.");
            return statements;
        }
        _statement() {
            // semicolon
            // return_statement semicolon
            // if_statement
            // switch_statement
            // loop_statement
            // for_statement
            // func_call_statement semicolon
            // variable_statement semicolon
            // break_statement semicolon
            // continue_statement semicolon
            // continuing_statement compound_statement
            // discard semicolon
            // assignment_statement semicolon
            // compound_statement
            // increment_statement semicolon
            // decrement_statement semicolon
            // static_assert_statement semicolon
            // Ignore any stand-alone semicolons
            while (this._match(TokenTypes.tokens.semicolon) && !this._isAtEnd())
                ;
            if (this._check(TokenTypes.tokens.attr)) {
                this._attribute();
            }
            if (this._check(TokenTypes.keywords.if)) {
                return this._if_statement();
            }
            if (this._check(TokenTypes.keywords.switch)) {
                return this._switch_statement();
            }
            if (this._check(TokenTypes.keywords.loop)) {
                return this._loop_statement();
            }
            if (this._check(TokenTypes.keywords.for)) {
                return this._for_statement();
            }
            if (this._check(TokenTypes.keywords.while)) {
                return this._while_statement();
            }
            if (this._check(TokenTypes.keywords.continuing)) {
                return this._continuing_statement();
            }
            if (this._check(TokenTypes.keywords.static_assert)) {
                return this._static_assert_statement();
            }
            if (this._check(TokenTypes.tokens.brace_left)) {
                return this._compound_statement();
            }
            let result = null;
            if (this._check(TokenTypes.keywords.return)) {
                result = this._return_statement();
            }
            else if (this._check([
                TokenTypes.keywords.var,
                TokenTypes.keywords.let,
                TokenTypes.keywords.const,
            ])) {
                result = this._variable_statement();
            }
            else if (this._match(TokenTypes.keywords.discard)) {
                result = new Discard();
            }
            else if (this._match(TokenTypes.keywords.break)) {
                result = new Break();
            }
            else if (this._match(TokenTypes.keywords.continue)) {
                result = new Continue();
            }
            else {
                result =
                    this._increment_decrement_statement() ||
                        this._func_call_statement() ||
                        this._assignment_statement();
            }
            if (result != null) {
                this._consume(TokenTypes.tokens.semicolon, "Expected ';' after statement.");
            }
            return result;
        }
        _static_assert_statement() {
            if (!this._match(TokenTypes.keywords.static_assert)) {
                return null;
            }
            const expression = this._optional_paren_expression();
            return new StaticAssert(expression);
        }
        _while_statement() {
            if (!this._match(TokenTypes.keywords.while)) {
                return null;
            }
            const condition = this._optional_paren_expression();
            if (this._check(TokenTypes.tokens.attr)) {
                this._attribute();
            }
            const block = this._compound_statement();
            return new While(condition, block);
        }
        _continuing_statement() {
            if (!this._match(TokenTypes.keywords.continuing)) {
                return null;
            }
            const block = this._compound_statement();
            return new Continuing(block);
        }
        _for_statement() {
            // for paren_left for_header paren_right compound_statement
            if (!this._match(TokenTypes.keywords.for)) {
                return null;
            }
            this._consume(TokenTypes.tokens.paren_left, "Expected '('.");
            // for_header: (variable_statement assignment_statement func_call_statement)? semicolon short_circuit_or_expression? semicolon (assignment_statement func_call_statement)?
            const init = !this._check(TokenTypes.tokens.semicolon)
                ? this._for_init()
                : null;
            this._consume(TokenTypes.tokens.semicolon, "Expected ';'.");
            const condition = !this._check(TokenTypes.tokens.semicolon)
                ? this._short_circuit_or_expression()
                : null;
            this._consume(TokenTypes.tokens.semicolon, "Expected ';'.");
            const increment = !this._check(TokenTypes.tokens.paren_right)
                ? this._for_increment()
                : null;
            this._consume(TokenTypes.tokens.paren_right, "Expected ')'.");
            if (this._check(TokenTypes.tokens.attr)) {
                this._attribute();
            }
            const body = this._compound_statement();
            return new For(init, condition, increment, body);
        }
        _for_init() {
            // (variable_statement assignment_statement func_call_statement)?
            return (this._variable_statement() ||
                this._func_call_statement() ||
                this._assignment_statement());
        }
        _for_increment() {
            // (assignment_statement func_call_statement increment_statement)?
            return (this._func_call_statement() ||
                this._increment_decrement_statement() ||
                this._assignment_statement());
        }
        _variable_statement() {
            // variable_decl
            // variable_decl equal short_circuit_or_expression
            // let (ident variable_ident_decl) equal short_circuit_or_expression
            // const (ident variable_ident_decl) equal short_circuit_or_expression
            if (this._check(TokenTypes.keywords.var)) {
                const _var = this._variable_decl();
                if (_var === null) {
                    throw this._error(this._peek(), "Variable declaration expected.");
                }
                let value = null;
                if (this._match(TokenTypes.tokens.equal)) {
                    value = this._short_circuit_or_expression();
                }
                return new Var(_var.name, _var.type, _var.storage, _var.access, value);
            }
            if (this._match(TokenTypes.keywords.let)) {
                const name = this._consume(TokenTypes.tokens.ident, "Expected name for let.").toString();
                let type = null;
                if (this._match(TokenTypes.tokens.colon)) {
                    const typeAttrs = this._attribute();
                    type = this._type_decl();
                    if (type != null) {
                        type.attributes = typeAttrs;
                    }
                }
                this._consume(TokenTypes.tokens.equal, "Expected '=' for let.");
                const value = this._short_circuit_or_expression();
                return new Let(name, type, null, null, value);
            }
            if (this._match(TokenTypes.keywords.const)) {
                const name = this._consume(TokenTypes.tokens.ident, "Expected name for const.").toString();
                let type = null;
                if (this._match(TokenTypes.tokens.colon)) {
                    const typeAttrs = this._attribute();
                    type = this._type_decl();
                    if (type != null) {
                        type.attributes = typeAttrs;
                    }
                }
                this._consume(TokenTypes.tokens.equal, "Expected '=' for const.");
                const value = this._short_circuit_or_expression();
                return new Const(name, type, null, null, value);
            }
            return null;
        }
        _increment_decrement_statement() {
            const savedPos = this._current;
            const _var = this._unary_expression();
            if (_var == null) {
                return null;
            }
            if (!this._check(TokenTypes.increment_operators)) {
                this._current = savedPos;
                return null;
            }
            const token = this._consume(TokenTypes.increment_operators, "Expected increment operator");
            return new Increment(token.type === TokenTypes.tokens.plus_plus
                ? IncrementOperator.increment
                : IncrementOperator.decrement, _var);
        }
        _assignment_statement() {
            // (unary_expression underscore) equal short_circuit_or_expression
            let _var = null;
            if (this._check(TokenTypes.tokens.brace_right)) {
                return null;
            }
            let isUnderscore = this._match(TokenTypes.tokens.underscore);
            if (!isUnderscore) {
                _var = this._unary_expression();
            }
            if (!isUnderscore && _var == null) {
                return null;
            }
            const type = this._consume(TokenTypes.assignment_operators, "Expected assignment operator.");
            const value = this._short_circuit_or_expression();
            return new Assign(AssignOperator.parse(type.lexeme), _var, value);
        }
        _func_call_statement() {
            // ident argument_expression_list
            if (!this._check(TokenTypes.tokens.ident)) {
                return null;
            }
            const savedPos = this._current;
            const name = this._consume(TokenTypes.tokens.ident, "Expected function name.");
            const args = this._argument_expression_list();
            if (args === null) {
                this._current = savedPos;
                return null;
            }
            return new Call(name.lexeme, args);
        }
        _loop_statement() {
            // loop brace_left statement* continuing_statement? brace_right
            if (!this._match(TokenTypes.keywords.loop)) {
                return null;
            }
            if (this._check(TokenTypes.tokens.attr)) {
                this._attribute();
            }
            this._consume(TokenTypes.tokens.brace_left, "Expected '{' for loop.");
            // statement*
            const statements = [];
            let statement = this._statement();
            while (statement !== null) {
                if (Array.isArray(statement)) {
                    for (let s of statement) {
                        statements.push(s);
                    }
                }
                else {
                    statements.push(statement);
                }
                statement = this._statement();
            }
            // continuing_statement: continuing compound_statement
            let continuing = null;
            if (this._match(TokenTypes.keywords.continuing)) {
                continuing = this._compound_statement();
            }
            this._consume(TokenTypes.tokens.brace_right, "Expected '}' for loop.");
            return new Loop(statements, continuing);
        }
        _switch_statement() {
            // switch optional_paren_expression brace_left switch_body+ brace_right
            if (!this._match(TokenTypes.keywords.switch)) {
                return null;
            }
            const condition = this._optional_paren_expression();
            if (this._check(TokenTypes.tokens.attr)) {
                this._attribute();
            }
            this._consume(TokenTypes.tokens.brace_left, "Expected '{' for switch.");
            const body = this._switch_body();
            if (body == null || body.length == 0) {
                throw this._error(this._previous(), "Expected 'case' or 'default'.");
            }
            this._consume(TokenTypes.tokens.brace_right, "Expected '}' for switch.");
            return new Switch(condition, body);
        }
        _switch_body() {
            // case case_selectors colon brace_left case_body? brace_right
            // default colon brace_left case_body? brace_right
            const cases = [];
            if (this._match(TokenTypes.keywords.case)) {
                const selector = this._case_selectors();
                this._match(TokenTypes.tokens.colon); // colon is optional
                if (this._check(TokenTypes.tokens.attr)) {
                    this._attribute();
                }
                this._consume(TokenTypes.tokens.brace_left, "Exected '{' for switch case.");
                const body = this._case_body();
                this._consume(TokenTypes.tokens.brace_right, "Exected '}' for switch case.");
                cases.push(new Case(selector, body));
            }
            if (this._match(TokenTypes.keywords.default)) {
                this._match(TokenTypes.tokens.colon); // colon is optional
                if (this._check(TokenTypes.tokens.attr)) {
                    this._attribute();
                }
                this._consume(TokenTypes.tokens.brace_left, "Exected '{' for switch default.");
                const body = this._case_body();
                this._consume(TokenTypes.tokens.brace_right, "Exected '}' for switch default.");
                cases.push(new Default(body));
            }
            if (this._check([TokenTypes.keywords.default, TokenTypes.keywords.case])) {
                const _cases = this._switch_body();
                cases.push(_cases[0]);
            }
            return cases;
        }
        _case_selectors() {
            // const_literal (comma const_literal)* comma?
            const selectors = [
                this._shift_expression(), //?.evaluate(this._context).toString() ?? "",
            ];
            while (this._match(TokenTypes.tokens.comma)) {
                selectors.push(this._shift_expression());
            }
            return selectors;
        }
        _case_body() {
            // statement case_body?
            // fallthrough semicolon
            if (this._match(TokenTypes.keywords.fallthrough)) {
                this._consume(TokenTypes.tokens.semicolon, "Expected ';'");
                return [];
            }
            let statement = this._statement();
            if (statement == null) {
                return [];
            }
            if (!(statement instanceof Array)) {
                statement = [statement];
            }
            const nextStatement = this._case_body();
            if (nextStatement.length == 0) {
                return statement;
            }
            return [...statement, nextStatement[0]];
        }
        _if_statement() {
            // if optional_paren_expression compound_statement elseif_statement? else_statement?
            if (!this._match(TokenTypes.keywords.if)) {
                return null;
            }
            const condition = this._optional_paren_expression();
            if (this._check(TokenTypes.tokens.attr)) {
                this._attribute();
            }
            const block = this._compound_statement();
            let elseif = [];
            if (this._match_elseif()) {
                if (this._check(TokenTypes.tokens.attr)) {
                    this._attribute();
                }
                elseif = this._elseif_statement(elseif);
            }
            let _else = null;
            if (this._match(TokenTypes.keywords.else)) {
                if (this._check(TokenTypes.tokens.attr)) {
                    this._attribute();
                }
                _else = this._compound_statement();
            }
            return new If(condition, block, elseif, _else);
        }
        _match_elseif() {
            if (this._tokens[this._current].type === TokenTypes.keywords.else &&
                this._tokens[this._current + 1].type === TokenTypes.keywords.if) {
                this._advance();
                this._advance();
                return true;
            }
            return false;
        }
        _elseif_statement(elseif = []) {
            // else_if optional_paren_expression compound_statement elseif_statement?
            const condition = this._optional_paren_expression();
            const block = this._compound_statement();
            elseif.push(new ElseIf(condition, block));
            if (this._match_elseif()) {
                if (this._check(TokenTypes.tokens.attr)) {
                    this._attribute();
                }
                this._elseif_statement(elseif);
            }
            return elseif;
        }
        _return_statement() {
            // return short_circuit_or_expression?
            if (!this._match(TokenTypes.keywords.return)) {
                return null;
            }
            const value = this._short_circuit_or_expression();
            return new Return(value);
        }
        _short_circuit_or_expression() {
            // short_circuit_and_expression
            // short_circuit_or_expression or_or short_circuit_and_expression
            let expr = this._short_circuit_and_expr();
            while (this._match(TokenTypes.tokens.or_or)) {
                expr = new BinaryOperator(this._previous().toString(), expr, this._short_circuit_and_expr());
            }
            return expr;
        }
        _short_circuit_and_expr() {
            // inclusive_or_expression
            // short_circuit_and_expression and_and inclusive_or_expression
            let expr = this._inclusive_or_expression();
            while (this._match(TokenTypes.tokens.and_and)) {
                expr = new BinaryOperator(this._previous().toString(), expr, this._inclusive_or_expression());
            }
            return expr;
        }
        _inclusive_or_expression() {
            // exclusive_or_expression
            // inclusive_or_expression or exclusive_or_expression
            let expr = this._exclusive_or_expression();
            while (this._match(TokenTypes.tokens.or)) {
                expr = new BinaryOperator(this._previous().toString(), expr, this._exclusive_or_expression());
            }
            return expr;
        }
        _exclusive_or_expression() {
            // and_expression
            // exclusive_or_expression xor and_expression
            let expr = this._and_expression();
            while (this._match(TokenTypes.tokens.xor)) {
                expr = new BinaryOperator(this._previous().toString(), expr, this._and_expression());
            }
            return expr;
        }
        _and_expression() {
            // equality_expression
            // and_expression and equality_expression
            let expr = this._equality_expression();
            while (this._match(TokenTypes.tokens.and)) {
                expr = new BinaryOperator(this._previous().toString(), expr, this._equality_expression());
            }
            return expr;
        }
        _equality_expression() {
            // relational_expression
            // relational_expression equal_equal relational_expression
            // relational_expression not_equal relational_expression
            const expr = this._relational_expression();
            if (this._match([TokenTypes.tokens.equal_equal, TokenTypes.tokens.not_equal])) {
                return new BinaryOperator(this._previous().toString(), expr, this._relational_expression());
            }
            return expr;
        }
        _relational_expression() {
            // shift_expression
            // relational_expression less_than shift_expression
            // relational_expression greater_than shift_expression
            // relational_expression less_than_equal shift_expression
            // relational_expression greater_than_equal shift_expression
            let expr = this._shift_expression();
            while (this._match([
                TokenTypes.tokens.less_than,
                TokenTypes.tokens.greater_than,
                TokenTypes.tokens.less_than_equal,
                TokenTypes.tokens.greater_than_equal,
            ])) {
                expr = new BinaryOperator(this._previous().toString(), expr, this._shift_expression());
            }
            return expr;
        }
        _shift_expression() {
            // additive_expression
            // shift_expression shift_left additive_expression
            // shift_expression shift_right additive_expression
            let expr = this._additive_expression();
            while (this._match([TokenTypes.tokens.shift_left, TokenTypes.tokens.shift_right])) {
                expr = new BinaryOperator(this._previous().toString(), expr, this._additive_expression());
            }
            return expr;
        }
        _additive_expression() {
            // multiplicative_expression
            // additive_expression plus multiplicative_expression
            // additive_expression minus multiplicative_expression
            let expr = this._multiplicative_expression();
            while (this._match([TokenTypes.tokens.plus, TokenTypes.tokens.minus])) {
                expr = new BinaryOperator(this._previous().toString(), expr, this._multiplicative_expression());
            }
            return expr;
        }
        _multiplicative_expression() {
            // unary_expression
            // multiplicative_expression star unary_expression
            // multiplicative_expression forward_slash unary_expression
            // multiplicative_expression modulo unary_expression
            let expr = this._unary_expression();
            while (this._match([
                TokenTypes.tokens.star,
                TokenTypes.tokens.forward_slash,
                TokenTypes.tokens.modulo,
            ])) {
                expr = new BinaryOperator(this._previous().toString(), expr, this._unary_expression());
            }
            return expr;
        }
        _unary_expression() {
            // singular_expression
            // minus unary_expression
            // bang unary_expression
            // tilde unary_expression
            // star unary_expression
            // and unary_expression
            if (this._match([
                TokenTypes.tokens.minus,
                TokenTypes.tokens.bang,
                TokenTypes.tokens.tilde,
                TokenTypes.tokens.star,
                TokenTypes.tokens.and,
            ])) {
                return new UnaryOperator(this._previous().toString(), this._unary_expression());
            }
            return this._singular_expression();
        }
        _singular_expression() {
            // primary_expression postfix_expression ?
            const expr = this._primary_expression();
            const p = this._postfix_expression();
            if (p) {
                expr.postfix = p;
            }
            return expr;
        }
        _postfix_expression() {
            // bracket_left short_circuit_or_expression bracket_right postfix_expression?
            if (this._match(TokenTypes.tokens.bracket_left)) {
                const expr = this._short_circuit_or_expression();
                this._consume(TokenTypes.tokens.bracket_right, "Expected ']'.");
                const arrayIndex = new ArrayIndex(expr);
                const p = this._postfix_expression();
                if (p) {
                    arrayIndex.postfix = p;
                }
                return arrayIndex;
            }
            // period ident postfix_expression?
            if (this._match(TokenTypes.tokens.period)) {
                const name = this._consume(TokenTypes.tokens.ident, "Expected member name.");
                const p = this._postfix_expression();
                const expr = new StringExpr(name.lexeme);
                if (p) {
                    expr.postfix = p;
                }
                return expr;
            }
            return null;
        }
        _getStruct(name) {
            if (this._context.aliases.has(name)) {
                const alias = this._context.aliases.get(name).type;
                return alias;
            }
            if (this._context.structs.has(name)) {
                const struct = this._context.structs.get(name);
                return struct;
            }
            return null;
        }
        _primary_expression() {
            // ident argument_expression_list?
            if (this._match(TokenTypes.tokens.ident)) {
                const name = this._previous().toString();
                if (this._check(TokenTypes.tokens.paren_left)) {
                    const args = this._argument_expression_list();
                    const struct = this._getStruct(name);
                    if (struct != null) {
                        return new CreateExpr(struct, args);
                    }
                    return new CallExpr(name, args);
                }
                if (this._context.constants.has(name)) {
                    const c = this._context.constants.get(name);
                    return new ConstExpr(name, c.value);
                }
                return new VariableExpr(name);
            }
            // const_literal
            if (this._match(TokenTypes.const_literal)) {
                return new LiteralExpr(parseFloat(this._previous().toString()));
            }
            // paren_expression
            if (this._check(TokenTypes.tokens.paren_left)) {
                return this._paren_expression();
            }
            // bitcast less_than type_decl greater_than paren_expression
            if (this._match(TokenTypes.keywords.bitcast)) {
                this._consume(TokenTypes.tokens.less_than, "Expected '<'.");
                const type = this._type_decl();
                this._consume(TokenTypes.tokens.greater_than, "Expected '>'.");
                const value = this._paren_expression();
                return new BitcastExpr(type, value);
            }
            // type_decl argument_expression_list
            const type = this._type_decl();
            const args = this._argument_expression_list();
            return new TypecastExpr(type, args);
        }
        _argument_expression_list() {
            // paren_left ((short_circuit_or_expression comma)* short_circuit_or_expression comma?)? paren_right
            if (!this._match(TokenTypes.tokens.paren_left)) {
                return null;
            }
            const args = [];
            do {
                if (this._check(TokenTypes.tokens.paren_right)) {
                    break;
                }
                const arg = this._short_circuit_or_expression();
                args.push(arg);
            } while (this._match(TokenTypes.tokens.comma));
            this._consume(TokenTypes.tokens.paren_right, "Expected ')' for agument list");
            return args;
        }
        _optional_paren_expression() {
            // [paren_left] short_circuit_or_expression [paren_right]
            this._match(TokenTypes.tokens.paren_left);
            const expr = this._short_circuit_or_expression();
            this._match(TokenTypes.tokens.paren_right);
            return new GroupingExpr([expr]);
        }
        _paren_expression() {
            // paren_left short_circuit_or_expression paren_right
            this._consume(TokenTypes.tokens.paren_left, "Expected '('.");
            const expr = this._short_circuit_or_expression();
            this._consume(TokenTypes.tokens.paren_right, "Expected ')'.");
            return new GroupingExpr([expr]);
        }
        _struct_decl() {
            // attribute* struct ident struct_body_decl
            if (!this._match(TokenTypes.keywords.struct)) {
                return null;
            }
            const startLine = this._currentLine;
            const name = this._consume(TokenTypes.tokens.ident, "Expected name for struct.").toString();
            // struct_body_decl: brace_left (struct_member comma)* struct_member comma? brace_right
            this._consume(TokenTypes.tokens.brace_left, "Expected '{' for struct body.");
            const members = [];
            while (!this._check(TokenTypes.tokens.brace_right)) {
                // struct_member: attribute* variable_ident_decl
                const memberAttrs = this._attribute();
                const memberName = this._consume(TokenTypes.tokens.ident, "Expected variable name.").toString();
                this._consume(TokenTypes.tokens.colon, "Expected ':' for struct member type.");
                const typeAttrs = this._attribute();
                const memberType = this._type_decl();
                if (memberType != null) {
                    memberType.attributes = typeAttrs;
                }
                if (!this._check(TokenTypes.tokens.brace_right))
                    this._consume(TokenTypes.tokens.comma, "Expected ',' for struct member.");
                else
                    this._match(TokenTypes.tokens.comma); // trailing comma optional.
                members.push(new Member(memberName, memberType, memberAttrs));
            }
            this._consume(TokenTypes.tokens.brace_right, "Expected '}' after struct body.");
            const endLine = this._currentLine;
            const structNode = new Struct(name, members, startLine, endLine);
            this._context.structs.set(name, structNode);
            return structNode;
        }
        _global_variable_decl() {
            // attribute* variable_decl (equal const_expression)?
            const _var = this._variable_decl();
            if (_var && this._match(TokenTypes.tokens.equal)) {
                _var.value = this._const_expression();
            }
            return _var;
        }
        _override_variable_decl() {
            // attribute* override_decl (equal const_expression)?
            const _override = this._override_decl();
            if (_override && this._match(TokenTypes.tokens.equal)) {
                _override.value = this._const_expression();
            }
            return _override;
        }
        _global_const_decl() {
            // attribute* const (ident variable_ident_decl) global_const_initializer?
            if (!this._match(TokenTypes.keywords.const)) {
                return null;
            }
            const name = this._consume(TokenTypes.tokens.ident, "Expected variable name");
            let type = null;
            if (this._match(TokenTypes.tokens.colon)) {
                const attrs = this._attribute();
                type = this._type_decl();
                if (type != null) {
                    type.attributes = attrs;
                }
            }
            let value = null;
            if (this._match(TokenTypes.tokens.equal)) {
                const valueExpr = this._short_circuit_or_expression();
                if (valueExpr instanceof CreateExpr) {
                    value = valueExpr;
                }
                else if (valueExpr instanceof ConstExpr &&
                    valueExpr.initializer instanceof CreateExpr) {
                    value = valueExpr.initializer;
                }
                else {
                    try {
                        const constValue = valueExpr.evaluate(this._context);
                        value = new LiteralExpr(constValue);
                    }
                    catch (_a) {
                        value = valueExpr;
                    }
                }
            }
            const c = new Const(name.toString(), type, "", "", value);
            this._context.constants.set(c.name, c);
            return c;
        }
        _global_let_decl() {
            // attribute* let (ident variable_ident_decl) global_const_initializer?
            if (!this._match(TokenTypes.keywords.let)) {
                return null;
            }
            const name = this._consume(TokenTypes.tokens.ident, "Expected variable name");
            let type = null;
            if (this._match(TokenTypes.tokens.colon)) {
                const attrs = this._attribute();
                type = this._type_decl();
                if (type != null) {
                    type.attributes = attrs;
                }
            }
            let value = null;
            if (this._match(TokenTypes.tokens.equal)) {
                value = this._const_expression();
            }
            return new Let(name.toString(), type, "", "", value);
        }
        _const_expression() {
            // type_decl paren_left ((const_expression comma)* const_expression comma?)? paren_right
            // const_literal
            if (this._match(TokenTypes.const_literal)) {
                return new StringExpr(this._previous().toString());
            }
            const type = this._type_decl();
            this._consume(TokenTypes.tokens.paren_left, "Expected '('.");
            let args = [];
            while (!this._check(TokenTypes.tokens.paren_right)) {
                args.push(this._const_expression());
                if (!this._check(TokenTypes.tokens.comma)) {
                    break;
                }
                this._advance();
            }
            this._consume(TokenTypes.tokens.paren_right, "Expected ')'.");
            return new CreateExpr(type, args);
        }
        _variable_decl() {
            // var variable_qualifier? (ident variable_ident_decl)
            if (!this._match(TokenTypes.keywords.var)) {
                return null;
            }
            // variable_qualifier: less_than storage_class (comma access_mode)? greater_than
            let storage = "";
            let access = "";
            if (this._match(TokenTypes.tokens.less_than)) {
                storage = this._consume(TokenTypes.storage_class, "Expected storage_class.").toString();
                if (this._match(TokenTypes.tokens.comma))
                    access = this._consume(TokenTypes.access_mode, "Expected access_mode.").toString();
                this._consume(TokenTypes.tokens.greater_than, "Expected '>'.");
            }
            const name = this._consume(TokenTypes.tokens.ident, "Expected variable name");
            let type = null;
            if (this._match(TokenTypes.tokens.colon)) {
                const attrs = this._attribute();
                type = this._type_decl();
                if (type != null) {
                    type.attributes = attrs;
                }
            }
            return new Var(name.toString(), type, storage, access, null);
        }
        _override_decl() {
            // override (ident variable_ident_decl)
            if (!this._match(TokenTypes.keywords.override)) {
                return null;
            }
            const name = this._consume(TokenTypes.tokens.ident, "Expected variable name");
            let type = null;
            if (this._match(TokenTypes.tokens.colon)) {
                const attrs = this._attribute();
                type = this._type_decl();
                if (type != null) {
                    type.attributes = attrs;
                }
            }
            return new Override(name.toString(), type, null);
        }
        _diagnostic() {
            // diagnostic(severity_control_name, diagnostic_rule_name)
            this._consume(TokenTypes.tokens.paren_left, "Expected '('");
            const severity = this._consume(TokenTypes.tokens.ident, "Expected severity control name.");
            this._consume(TokenTypes.tokens.comma, "Expected ','");
            const rule = this._consume(TokenTypes.tokens.ident, "Expected diagnostic rule name.");
            this._consume(TokenTypes.tokens.paren_right, "Expected ')'");
            return new Diagnostic(severity.toString(), rule.toString());
        }
        _enable_directive() {
            // enable ident semicolon
            const name = this._consume(TokenTypes.tokens.ident, "identity expected.");
            return new Enable(name.toString());
        }
        _requires_directive() {
            // requires extension [, extension]* semicolon
            const extensions = [this._consume(TokenTypes.tokens.ident, "identity expected.").toString()];
            while (this._match(TokenTypes.tokens.comma)) {
                const name = this._consume(TokenTypes.tokens.ident, "identity expected.");
                extensions.push(name.toString());
            }
            return new Requires(extensions);
        }
        _type_alias() {
            // type ident equal type_decl
            const name = this._consume(TokenTypes.tokens.ident, "identity expected.");
            this._consume(TokenTypes.tokens.equal, "Expected '=' for type alias.");
            let aliasType = this._type_decl();
            if (aliasType === null) {
                throw this._error(this._peek(), "Expected Type for Alias.");
            }
            if (this._context.aliases.has(aliasType.name)) {
                aliasType = this._context.aliases.get(aliasType.name).type;
            }
            const aliasNode = new Alias(name.toString(), aliasType);
            this._context.aliases.set(aliasNode.name, aliasNode);
            return aliasNode;
        }
        _type_decl() {
            // ident
            // bool
            // float32
            // int32
            // uint32
            // vec2 less_than type_decl greater_than
            // vec3 less_than type_decl greater_than
            // vec4 less_than type_decl greater_than
            // mat2x2 less_than type_decl greater_than
            // mat2x3 less_than type_decl greater_than
            // mat2x4 less_than type_decl greater_than
            // mat3x2 less_than type_decl greater_than
            // mat3x3 less_than type_decl greater_than
            // mat3x4 less_than type_decl greater_than
            // mat4x2 less_than type_decl greater_than
            // mat4x3 less_than type_decl greater_than
            // mat4x4 less_than type_decl greater_than
            // atomic less_than type_decl greater_than
            // pointer less_than storage_class comma type_decl (comma access_mode)? greater_than
            // array_type_decl
            // texture_sampler_types
            if (this._check([
                TokenTypes.tokens.ident,
                ...TokenTypes.texel_format,
                TokenTypes.keywords.bool,
                TokenTypes.keywords.f32,
                TokenTypes.keywords.i32,
                TokenTypes.keywords.u32,
            ])) {
                const type = this._advance();
                const typeName = type.toString();
                if (this._context.structs.has(typeName)) {
                    return this._context.structs.get(typeName);
                }
                if (this._context.aliases.has(typeName)) {
                    return this._context.aliases.get(typeName).type;
                }
                return new Type(type.toString());
            }
            // texture_sampler_types
            let type = this._texture_sampler_types();
            if (type) {
                return type;
            }
            if (this._check(TokenTypes.template_types)) {
                let type = this._advance().toString();
                let format = null;
                let access = null;
                if (this._match(TokenTypes.tokens.less_than)) {
                    format = this._type_decl();
                    access = null;
                    if (this._match(TokenTypes.tokens.comma)) {
                        access = this._consume(TokenTypes.access_mode, "Expected access_mode for pointer").toString();
                    }
                    this._consume(TokenTypes.tokens.greater_than, "Expected '>' for type.");
                }
                return new TemplateType(type, format, access);
            }
            // pointer less_than storage_class comma type_decl (comma access_mode)? greater_than
            if (this._match(TokenTypes.keywords.ptr)) {
                let pointer = this._previous().toString();
                this._consume(TokenTypes.tokens.less_than, "Expected '<' for pointer.");
                const storage = this._consume(TokenTypes.storage_class, "Expected storage_class for pointer");
                this._consume(TokenTypes.tokens.comma, "Expected ',' for pointer.");
                const decl = this._type_decl();
                let access = null;
                if (this._match(TokenTypes.tokens.comma)) {
                    access = this._consume(TokenTypes.access_mode, "Expected access_mode for pointer").toString();
                }
                this._consume(TokenTypes.tokens.greater_than, "Expected '>' for pointer.");
                return new PointerType(pointer, storage.toString(), decl, access);
            }
            // The following type_decl's have an optional attribyte_list*
            const attrs = this._attribute();
            // attribute* array
            // attribute* array less_than type_decl (comma element_count_expression)? greater_than
            if (this._match(TokenTypes.keywords.array)) {
                let format = null;
                let countInt = -1;
                const array = this._previous();
                let countNode = null;
                if (this._match(TokenTypes.tokens.less_than)) {
                    format = this._type_decl();
                    if (this._context.aliases.has(format.name)) {
                        format = this._context.aliases.get(format.name).type;
                    }
                    let count = "";
                    if (this._match(TokenTypes.tokens.comma)) {
                        countNode = this._shift_expression();
                        // If we can't evaluate the node, defer evaluating it until after the shader has
                        // finished being parsed, because const statements can be declared **after** they
                        // are used.
                        try {
                            count = countNode.evaluate(this._context).toString();
                            countNode = null;
                        }
                        catch (e) {
                            count = "1";
                        }
                    }
                    this._consume(TokenTypes.tokens.greater_than, "Expected '>' for array.");
                    countInt = count ? parseInt(count) : 0;
                }
                const arrayType = new ArrayType(array.toString(), attrs, format, countInt);
                if (countNode) {
                    this._deferArrayCountEval.push({ arrayType, countNode });
                }
                return arrayType;
            }
            return null;
        }
        _texture_sampler_types() {
            // sampler_type
            if (this._match(TokenTypes.sampler_type)) {
                return new SamplerType(this._previous().toString(), null, null);
            }
            // depth_texture_type
            if (this._match(TokenTypes.depth_texture_type)) {
                return new SamplerType(this._previous().toString(), null, null);
            }
            // sampled_texture_type less_than type_decl greater_than
            // multisampled_texture_type less_than type_decl greater_than
            if (this._match(TokenTypes.sampled_texture_type) ||
                this._match(TokenTypes.multisampled_texture_type)) {
                const sampler = this._previous();
                this._consume(TokenTypes.tokens.less_than, "Expected '<' for sampler type.");
                const format = this._type_decl();
                this._consume(TokenTypes.tokens.greater_than, "Expected '>' for sampler type.");
                return new SamplerType(sampler.toString(), format, null);
            }
            // storage_texture_type less_than texel_format comma access_mode greater_than
            if (this._match(TokenTypes.storage_texture_type)) {
                const sampler = this._previous();
                this._consume(TokenTypes.tokens.less_than, "Expected '<' for sampler type.");
                const format = this._consume(TokenTypes.texel_format, "Invalid texel format.").toString();
                this._consume(TokenTypes.tokens.comma, "Expected ',' after texel format.");
                const access = this._consume(TokenTypes.access_mode, "Expected access mode for storage texture type.").toString();
                this._consume(TokenTypes.tokens.greater_than, "Expected '>' for sampler type.");
                return new SamplerType(sampler.toString(), format, access);
            }
            return null;
        }
        _attribute() {
            // attr ident paren_left (literal_or_ident comma)* literal_or_ident paren_right
            // attr ident
            let attributes = [];
            while (this._match(TokenTypes.tokens.attr)) {
                const name = this._consume(TokenTypes.attribute_name, "Expected attribute name");
                const attr = new Attribute(name.toString(), null);
                if (this._match(TokenTypes.tokens.paren_left)) {
                    // literal_or_ident
                    attr.value = this._consume(TokenTypes.literal_or_ident, "Expected attribute value").toString();
                    if (this._check(TokenTypes.tokens.comma)) {
                        this._advance();
                        do {
                            const v = this._consume(TokenTypes.literal_or_ident, "Expected attribute value").toString();
                            if (!(attr.value instanceof Array)) {
                                attr.value = [attr.value];
                            }
                            attr.value.push(v);
                        } while (this._match(TokenTypes.tokens.comma));
                    }
                    this._consume(TokenTypes.tokens.paren_right, "Expected ')'");
                }
                attributes.push(attr);
            }
            // Deprecated:
            // attr_left (attribute comma)* attribute attr_right
            while (this._match(TokenTypes.tokens.attr_left)) {
                if (!this._check(TokenTypes.tokens.attr_right)) {
                    do {
                        const name = this._consume(TokenTypes.attribute_name, "Expected attribute name");
                        const attr = new Attribute(name.toString(), null);
                        if (this._match(TokenTypes.tokens.paren_left)) {
                            // literal_or_ident
                            attr.value = [
                                this._consume(TokenTypes.literal_or_ident, "Expected attribute value").toString(),
                            ];
                            if (this._check(TokenTypes.tokens.comma)) {
                                this._advance();
                                do {
                                    const v = this._consume(TokenTypes.literal_or_ident, "Expected attribute value").toString();
                                    attr.value.push(v);
                                } while (this._match(TokenTypes.tokens.comma));
                            }
                            this._consume(TokenTypes.tokens.paren_right, "Expected ')'");
                        }
                        attributes.push(attr);
                    } while (this._match(TokenTypes.tokens.comma));
                }
                // Consume ]]
                this._consume(TokenTypes.tokens.attr_right, "Expected ']]' after attribute declarations");
            }
            if (attributes.length == 0) {
                return null;
            }
            return attributes;
        }
    }

    /**
     * @author Brendan Duncan / https://github.com/brendan-duncan
     */
    class TypeInfo {
        constructor(name, attributes) {
            this.name = name;
            this.attributes = attributes;
            this.size = 0;
        }
        get isArray() {
            return false;
        }
        get isStruct() {
            return false;
        }
        get isTemplate() {
            return false;
        }
    }
    class MemberInfo {
        constructor(name, type, attributes) {
            this.name = name;
            this.type = type;
            this.attributes = attributes;
            this.offset = 0;
            this.size = 0;
        }
        get isArray() {
            return this.type.isArray;
        }
        get isStruct() {
            return this.type.isStruct;
        }
        get isTemplate() {
            return this.type.isTemplate;
        }
        get align() {
            return this.type.isStruct ? this.type.align : 0;
        }
        get members() {
            return this.type.isStruct ? this.type.members : null;
        }
        get format() {
            return this.type.isArray
                ? this.type.format
                : this.type.isTemplate
                    ? this.type.format
                    : null;
        }
        get count() {
            return this.type.isArray ? this.type.count : 0;
        }
        get stride() {
            return this.type.isArray ? this.type.stride : this.size;
        }
    }
    class StructInfo extends TypeInfo {
        constructor(name, attributes) {
            super(name, attributes);
            this.members = [];
            this.align = 0;
            this.startLine = -1;
            this.endLine = -1;
            this.inUse = false;
        }
        get isStruct() {
            return true;
        }
    }
    class ArrayInfo extends TypeInfo {
        constructor(name, attributes) {
            super(name, attributes);
            this.count = 0;
            this.stride = 0;
        }
        get isArray() {
            return true;
        }
    }
    class TemplateInfo extends TypeInfo {
        constructor(name, format, attributes, access) {
            super(name, attributes);
            this.format = format;
            this.access = access;
        }
        get isTemplate() {
            return true;
        }
    }
    var ResourceType;
    (function (ResourceType) {
        ResourceType[ResourceType["Uniform"] = 0] = "Uniform";
        ResourceType[ResourceType["Storage"] = 1] = "Storage";
        ResourceType[ResourceType["Texture"] = 2] = "Texture";
        ResourceType[ResourceType["Sampler"] = 3] = "Sampler";
        ResourceType[ResourceType["StorageTexture"] = 4] = "StorageTexture";
    })(ResourceType || (ResourceType = {}));
    class VariableInfo {
        constructor(name, type, group, binding, attributes, resourceType, access) {
            this.name = name;
            this.type = type;
            this.group = group;
            this.binding = binding;
            this.attributes = attributes;
            this.resourceType = resourceType;
            this.access = access;
        }
        get isArray() {
            return this.type.isArray;
        }
        get isStruct() {
            return this.type.isStruct;
        }
        get isTemplate() {
            return this.type.isTemplate;
        }
        get size() {
            return this.type.size;
        }
        get align() {
            return this.type.isStruct ? this.type.align : 0;
        }
        get members() {
            return this.type.isStruct ? this.type.members : null;
        }
        get format() {
            return this.type.isArray
                ? this.type.format
                : this.type.isTemplate
                    ? this.type.format
                    : null;
        }
        get count() {
            return this.type.isArray ? this.type.count : 0;
        }
        get stride() {
            return this.type.isArray ? this.type.stride : this.size;
        }
    }
    class AliasInfo {
        constructor(name, type) {
            this.name = name;
            this.type = type;
        }
    }
    class _TypeSize {
        constructor(align, size) {
            this.align = align;
            this.size = size;
        }
    }
    class InputInfo {
        constructor(name, type, locationType, location) {
            this.name = name;
            this.type = type;
            this.locationType = locationType;
            this.location = location;
            this.interpolation = null;
        }
    }
    class OutputInfo {
        constructor(name, type, locationType, location) {
            this.name = name;
            this.type = type;
            this.locationType = locationType;
            this.location = location;
        }
    }
    class FunctionInfo {
        constructor(name, stage = null) {
            this.stage = null;
            this.inputs = [];
            this.outputs = [];
            this.resources = [];
            this.startLine = -1;
            this.endLine = -1;
            this.inUse = false;
            this.calls = new Set();
            this.name = name;
            this.stage = stage;
        }
    }
    class EntryFunctions {
        constructor() {
            this.vertex = [];
            this.fragment = [];
            this.compute = [];
        }
    }
    class OverrideInfo {
        constructor(name, type, attributes, id) {
            this.name = name;
            this.type = type;
            this.attributes = attributes;
            this.id = id;
        }
    }
    class _FunctionResources {
        constructor(node) {
            this.resources = null;
            this.inUse = false;
            this.info = null;
            this.node = node;
        }
    }
    class WgslReflect {
        constructor(code) {
            /// All top-level uniform vars in the shader.
            this.uniforms = [];
            /// All top-level storage vars in the shader.
            this.storage = [];
            /// All top-level texture vars in the shader;
            this.textures = [];
            // All top-level sampler vars in the shader.
            this.samplers = [];
            /// All top-level type aliases in the shader.
            this.aliases = [];
            /// All top-level overrides in the shader.
            this.overrides = [];
            /// All top-level structs in the shader.
            this.structs = [];
            /// All entry functions in the shader: vertex, fragment, and/or compute.
            this.entry = new EntryFunctions();
            /// All functions in the shader, including entry functions.
            this.functions = [];
            this._types = new Map();
            this._functions = new Map();
            if (code) {
                this.update(code);
            }
        }
        _isStorageTexture(type) {
            return (type.name == "texture_storage_1d" ||
                type.name == "texture_storage_2d" ||
                type.name == "texture_storage_2d_array" ||
                type.name == "texture_storage_3d");
        }
        update(code) {
            const parser = new WgslParser();
            const ast = parser.parse(code);
            for (const node of ast) {
                if (node instanceof Function) {
                    this._functions.set(node.name, new _FunctionResources(node));
                }
            }
            for (const node of ast) {
                if (node instanceof Struct) {
                    const info = this._getTypeInfo(node, null);
                    if (info instanceof StructInfo) {
                        this.structs.push(info);
                    }
                }
            }
            for (const node of ast) {
                if (node instanceof Alias) {
                    this.aliases.push(this._getAliasInfo(node));
                    continue;
                }
                if (node instanceof Override) {
                    const v = node;
                    const id = this._getAttributeNum(v.attributes, "id", 0);
                    const type = v.type != null ? this._getTypeInfo(v.type, v.attributes) : null;
                    this.overrides.push(new OverrideInfo(v.name, type, v.attributes, id));
                    continue;
                }
                if (this._isUniformVar(node)) {
                    const v = node;
                    const g = this._getAttributeNum(v.attributes, "group", 0);
                    const b = this._getAttributeNum(v.attributes, "binding", 0);
                    const type = this._getTypeInfo(v.type, v.attributes);
                    const varInfo = new VariableInfo(v.name, type, g, b, v.attributes, ResourceType.Uniform, v.access);
                    this.uniforms.push(varInfo);
                    continue;
                }
                if (this._isStorageVar(node)) {
                    const v = node;
                    const g = this._getAttributeNum(v.attributes, "group", 0);
                    const b = this._getAttributeNum(v.attributes, "binding", 0);
                    const type = this._getTypeInfo(v.type, v.attributes);
                    const isStorageTexture = this._isStorageTexture(type);
                    const varInfo = new VariableInfo(v.name, type, g, b, v.attributes, isStorageTexture ? ResourceType.StorageTexture : ResourceType.Storage, v.access);
                    this.storage.push(varInfo);
                    continue;
                }
                if (this._isTextureVar(node)) {
                    const v = node;
                    const g = this._getAttributeNum(v.attributes, "group", 0);
                    const b = this._getAttributeNum(v.attributes, "binding", 0);
                    const type = this._getTypeInfo(v.type, v.attributes);
                    const isStorageTexture = this._isStorageTexture(type);
                    const varInfo = new VariableInfo(v.name, type, g, b, v.attributes, isStorageTexture ? ResourceType.StorageTexture : ResourceType.Texture, v.access);
                    if (isStorageTexture) {
                        this.storage.push(varInfo);
                    }
                    else {
                        this.textures.push(varInfo);
                    }
                    continue;
                }
                if (this._isSamplerVar(node)) {
                    const v = node;
                    const g = this._getAttributeNum(v.attributes, "group", 0);
                    const b = this._getAttributeNum(v.attributes, "binding", 0);
                    const type = this._getTypeInfo(v.type, v.attributes);
                    const varInfo = new VariableInfo(v.name, type, g, b, v.attributes, ResourceType.Sampler, v.access);
                    this.samplers.push(varInfo);
                    continue;
                }
                if (node instanceof Function) {
                    const vertexStage = this._getAttribute(node, "vertex");
                    const fragmentStage = this._getAttribute(node, "fragment");
                    const computeStage = this._getAttribute(node, "compute");
                    const stage = vertexStage || fragmentStage || computeStage;
                    const fn = new FunctionInfo(node.name, stage === null || stage === void 0 ? void 0 : stage.name);
                    fn.startLine = node.startLine;
                    fn.endLine = node.endLine;
                    this.functions.push(fn);
                    this._functions.get(node.name).info = fn;
                    if (stage) {
                        this._functions.get(node.name).inUse = true;
                        fn.inUse = true;
                        fn.resources = this._findResources(node, !!stage);
                        fn.inputs = this._getInputs(node.args);
                        fn.outputs = this._getOutputs(node.returnType);
                        this.entry[stage.name].push(fn);
                    }
                    continue;
                }
            }
            for (const fn of this._functions.values()) {
                if (fn.info) {
                    fn.info.inUse = fn.inUse;
                    this._addCalls(fn.node, fn.info.calls);
                }
            }
            for (const u of this.uniforms) {
                this._markStructsInUse(u.type);
            }
            for (const s of this.storage) {
                this._markStructsInUse(s.type);
            }
        }
        _markStructsInUse(type) {
            if (type.isStruct) {
                type.inUse = true;
                for (const m of type.members) {
                    this._markStructsInUse(m.type);
                }
            }
            else if (type.isArray) {
                this._markStructsInUse(type.format);
            }
            else if (type.isTemplate) {
                this._markStructsInUse(type.format);
            }
            else {
                const alias = this._getAlias(type.name);
                if (alias) {
                    this._markStructsInUse(alias);
                }
            }
        }
        _addCalls(fn, calls) {
            var _a;
            for (const call of fn.calls) {
                const info = (_a = this._functions.get(call.name)) === null || _a === void 0 ? void 0 : _a.info;
                if (info) {
                    calls.add(info);
                }
            }
        }
        /// Find a resource by its group and binding.
        findResource(group, binding) {
            for (const u of this.uniforms) {
                if (u.group == group && u.binding == binding) {
                    return u;
                }
            }
            for (const s of this.storage) {
                if (s.group == group && s.binding == binding) {
                    return s;
                }
            }
            for (const t of this.textures) {
                if (t.group == group && t.binding == binding) {
                    return t;
                }
            }
            for (const s of this.samplers) {
                if (s.group == group && s.binding == binding) {
                    return s;
                }
            }
            return null;
        }
        _findResource(name) {
            for (const u of this.uniforms) {
                if (u.name == name) {
                    return u;
                }
            }
            for (const s of this.storage) {
                if (s.name == name) {
                    return s;
                }
            }
            for (const t of this.textures) {
                if (t.name == name) {
                    return t;
                }
            }
            for (const s of this.samplers) {
                if (s.name == name) {
                    return s;
                }
            }
            return null;
        }
        _markStructsFromAST(type) {
            const info = this._getTypeInfo(type, null);
            this._markStructsInUse(info);
        }
        _findResources(fn, isEntry) {
            const resources = [];
            const self = this;
            const varStack = [];
            fn.search((node) => {
                if (node instanceof _BlockStart) {
                    varStack.push({});
                }
                else if (node instanceof _BlockEnd) {
                    varStack.pop();
                }
                else if (node instanceof Var) {
                    const v = node;
                    if (isEntry && v.type !== null) {
                        this._markStructsFromAST(v.type);
                    }
                    if (varStack.length > 0) {
                        varStack[varStack.length - 1][v.name] = v;
                    }
                }
                else if (node instanceof CreateExpr) {
                    const c = node;
                    if (isEntry && c.type !== null) {
                        this._markStructsFromAST(c.type);
                    }
                }
                else if (node instanceof Let) {
                    const v = node;
                    if (isEntry && v.type !== null) {
                        this._markStructsFromAST(v.type);
                    }
                    if (varStack.length > 0) {
                        varStack[varStack.length - 1][v.name] = v;
                    }
                }
                else if (node instanceof VariableExpr) {
                    const v = node;
                    // Check to see if the variable is a local variable before checking to see if it's
                    // a resource.
                    if (varStack.length > 0) {
                        const varInfo = varStack[varStack.length - 1][v.name];
                        if (varInfo) {
                            return;
                        }
                    }
                    const varInfo = self._findResource(v.name);
                    if (varInfo) {
                        resources.push(varInfo);
                    }
                }
                else if (node instanceof CallExpr) {
                    const c = node;
                    const callFn = self._functions.get(c.name);
                    if (callFn) {
                        if (isEntry) {
                            callFn.inUse = true;
                        }
                        fn.calls.add(callFn.node);
                        if (callFn.resources === null) {
                            callFn.resources = self._findResources(callFn.node, isEntry);
                        }
                        resources.push(...callFn.resources);
                    }
                }
                else if (node instanceof Call) {
                    const c = node;
                    const callFn = self._functions.get(c.name);
                    if (callFn) {
                        if (isEntry) {
                            callFn.inUse = true;
                        }
                        fn.calls.add(callFn.node);
                        if (callFn.resources === null) {
                            callFn.resources = self._findResources(callFn.node, isEntry);
                        }
                        resources.push(...callFn.resources);
                    }
                }
            });
            return [...new Map(resources.map(r => [r.name, r])).values()];
        }
        getBindGroups() {
            const groups = [];
            function _makeRoom(group, binding) {
                if (group >= groups.length) {
                    groups.length = group + 1;
                }
                if (groups[group] === undefined) {
                    groups[group] = [];
                }
                if (binding >= groups[group].length) {
                    groups[group].length = binding + 1;
                }
            }
            for (const u of this.uniforms) {
                _makeRoom(u.group, u.binding);
                const group = groups[u.group];
                group[u.binding] = u;
            }
            for (const u of this.storage) {
                _makeRoom(u.group, u.binding);
                const group = groups[u.group];
                group[u.binding] = u;
            }
            for (const t of this.textures) {
                _makeRoom(t.group, t.binding);
                const group = groups[t.group];
                group[t.binding] = t;
            }
            for (const t of this.samplers) {
                _makeRoom(t.group, t.binding);
                const group = groups[t.group];
                group[t.binding] = t;
            }
            return groups;
        }
        _getOutputs(type, outputs = undefined) {
            if (outputs === undefined) {
                outputs = [];
            }
            if (type instanceof Struct) {
                this._getStructOutputs(type, outputs);
            }
            else {
                const output = this._getOutputInfo(type);
                if (output !== null) {
                    outputs.push(output);
                }
            }
            return outputs;
        }
        _getStructOutputs(struct, outputs) {
            for (const m of struct.members) {
                if (m.type instanceof Struct) {
                    this._getStructOutputs(m.type, outputs);
                }
                else {
                    const location = this._getAttribute(m, "location") || this._getAttribute(m, "builtin");
                    if (location !== null) {
                        const typeInfo = this._getTypeInfo(m.type, m.type.attributes);
                        const locationValue = this._parseInt(location.value);
                        const info = new OutputInfo(m.name, typeInfo, location.name, locationValue);
                        outputs.push(info);
                    }
                }
            }
        }
        _getOutputInfo(type) {
            const location = this._getAttribute(type, "location") ||
                this._getAttribute(type, "builtin");
            if (location !== null) {
                const typeInfo = this._getTypeInfo(type, type.attributes);
                const locationValue = this._parseInt(location.value);
                const info = new OutputInfo("", typeInfo, location.name, locationValue);
                return info;
            }
            return null;
        }
        _getInputs(args, inputs = undefined) {
            if (inputs === undefined) {
                inputs = [];
            }
            for (const arg of args) {
                if (arg.type instanceof Struct) {
                    this._getStructInputs(arg.type, inputs);
                }
                else {
                    const input = this._getInputInfo(arg);
                    if (input !== null) {
                        inputs.push(input);
                    }
                }
            }
            return inputs;
        }
        _getStructInputs(struct, inputs) {
            for (const m of struct.members) {
                if (m.type instanceof Struct) {
                    this._getStructInputs(m.type, inputs);
                }
                else {
                    const input = this._getInputInfo(m);
                    if (input !== null) {
                        inputs.push(input);
                    }
                }
            }
        }
        _getInputInfo(node) {
            const location = this._getAttribute(node, "location") ||
                this._getAttribute(node, "builtin");
            if (location !== null) {
                const interpolation = this._getAttribute(node, "interpolation");
                const type = this._getTypeInfo(node.type, node.attributes);
                const locationValue = this._parseInt(location.value);
                const info = new InputInfo(node.name, type, location.name, locationValue);
                if (interpolation !== null) {
                    info.interpolation = this._parseString(interpolation.value);
                }
                return info;
            }
            return null;
        }
        _parseString(s) {
            if (s instanceof Array) {
                s = s[0];
            }
            return s;
        }
        _parseInt(s) {
            if (s instanceof Array) {
                s = s[0];
            }
            const n = parseInt(s);
            return isNaN(n) ? s : n;
        }
        _getAlias(name) {
            for (const a of this.aliases) {
                if (a.name == name) {
                    return a.type;
                }
            }
            return null;
        }
        _getAliasInfo(node) {
            return new AliasInfo(node.name, this._getTypeInfo(node.type, null));
        }
        _getTypeInfo(type, attributes) {
            if (this._types.has(type)) {
                return this._types.get(type);
            }
            if (type instanceof ArrayType) {
                const a = type;
                const t = this._getTypeInfo(a.format, a.attributes);
                const info = new ArrayInfo(a.name, attributes);
                info.format = t;
                info.count = a.count;
                this._types.set(type, info);
                this._updateTypeInfo(info);
                return info;
            }
            if (type instanceof Struct) {
                const s = type;
                const info = new StructInfo(s.name, attributes);
                info.startLine = s.startLine;
                info.endLine = s.endLine;
                for (const m of s.members) {
                    const t = this._getTypeInfo(m.type, m.attributes);
                    info.members.push(new MemberInfo(m.name, t, m.attributes));
                }
                this._types.set(type, info);
                this._updateTypeInfo(info);
                return info;
            }
            if (type instanceof SamplerType) {
                const s = type;
                const formatIsType = s.format instanceof Type;
                const format = s.format
                    ? formatIsType
                        ? this._getTypeInfo(s.format, null)
                        : new TypeInfo(s.format, null)
                    : null;
                const info = new TemplateInfo(s.name, format, attributes, s.access);
                this._types.set(type, info);
                this._updateTypeInfo(info);
                return info;
            }
            if (type instanceof TemplateType) {
                const t = type;
                const format = t.format ? this._getTypeInfo(t.format, null) : null;
                const info = new TemplateInfo(t.name, format, attributes, t.access);
                this._types.set(type, info);
                this._updateTypeInfo(info);
                return info;
            }
            const info = new TypeInfo(type.name, attributes);
            this._types.set(type, info);
            this._updateTypeInfo(info);
            return info;
        }
        _updateTypeInfo(type) {
            var _a, _b;
            const typeSize = this._getTypeSize(type);
            type.size = (_a = typeSize === null || typeSize === void 0 ? void 0 : typeSize.size) !== null && _a !== void 0 ? _a : 0;
            if (type instanceof ArrayInfo) {
                const formatInfo = this._getTypeSize(type["format"]);
                type.stride = (_b = formatInfo === null || formatInfo === void 0 ? void 0 : formatInfo.size) !== null && _b !== void 0 ? _b : 0;
                this._updateTypeInfo(type["format"]);
            }
            if (type instanceof StructInfo) {
                this._updateStructInfo(type);
            }
        }
        _updateStructInfo(struct) {
            var _a;
            let offset = 0;
            let lastSize = 0;
            let lastOffset = 0;
            let structAlign = 0;
            for (let mi = 0, ml = struct.members.length; mi < ml; ++mi) {
                const member = struct.members[mi];
                const sizeInfo = this._getTypeSize(member);
                if (!sizeInfo) {
                    continue;
                }
                (_a = this._getAlias(member.type.name)) !== null && _a !== void 0 ? _a : member.type;
                const align = sizeInfo.align;
                const size = sizeInfo.size;
                offset = this._roundUp(align, offset + lastSize);
                lastSize = size;
                lastOffset = offset;
                structAlign = Math.max(structAlign, align);
                member.offset = offset;
                member.size = size;
                this._updateTypeInfo(member.type);
            }
            struct.size = this._roundUp(structAlign, lastOffset + lastSize);
            struct.align = structAlign;
        }
        _getTypeSize(type) {
            var _a;
            if (type === null || type === undefined) {
                return null;
            }
            const explicitSize = this._getAttributeNum(type.attributes, "size", 0);
            const explicitAlign = this._getAttributeNum(type.attributes, "align", 0);
            if (type instanceof MemberInfo) {
                type = type.type;
            }
            if (type instanceof TypeInfo) {
                const alias = this._getAlias(type.name);
                if (alias !== null) {
                    type = alias;
                }
            }
            {
                const info = WgslReflect._typeInfo[type.name];
                if (info !== undefined) {
                    const divisor = type["format"] === "f16" ? 2 : 1;
                    return new _TypeSize(Math.max(explicitAlign, info.align / divisor), Math.max(explicitSize, info.size / divisor));
                }
            }
            {
                const info = WgslReflect._typeInfo[type.name.substring(0, type.name.length - 1)];
                if (info) {
                    const divisor = type.name[type.name.length - 1] === "h" ? 2 : 1;
                    return new _TypeSize(Math.max(explicitAlign, info.align / divisor), Math.max(explicitSize, info.size / divisor));
                }
            }
            if (type instanceof ArrayInfo) {
                let arrayType = type;
                let align = 8;
                let size = 8;
                // Type                 AlignOf(T)          Sizeof(T)
                // array<E, N>          AlignOf(E)          N * roundUp(AlignOf(E), SizeOf(E))
                // array<E>             AlignOf(E)          N * roundUp(AlignOf(E), SizeOf(E))  (N determined at runtime)
                //
                // @stride(Q)
                // array<E, N>          AlignOf(E)          N * Q
                //
                // @stride(Q)
                // array<E>             AlignOf(E)          Nruntime * Q
                //const E = type.format.name;
                const E = this._getTypeSize(arrayType.format);
                if (E !== null) {
                    size = E.size;
                    align = E.align;
                }
                const N = arrayType.count;
                const stride = this._getAttributeNum((_a = type === null || type === void 0 ? void 0 : type.attributes) !== null && _a !== void 0 ? _a : null, "stride", this._roundUp(align, size));
                size = N * stride;
                if (explicitSize) {
                    size = explicitSize;
                }
                return new _TypeSize(Math.max(explicitAlign, align), Math.max(explicitSize, size));
            }
            if (type instanceof StructInfo) {
                let align = 0;
                let size = 0;
                // struct S     AlignOf:    max(AlignOfMember(S, M1), ... , AlignOfMember(S, MN))
                //              SizeOf:     roundUp(AlignOf(S), OffsetOfMember(S, L) + SizeOfMember(S, L))
                //                          Where L is the last member of the structure
                let offset = 0;
                let lastSize = 0;
                let lastOffset = 0;
                for (const m of type.members) {
                    const mi = this._getTypeSize(m.type);
                    if (mi !== null) {
                        align = Math.max(mi.align, align);
                        offset = this._roundUp(mi.align, offset + lastSize);
                        lastSize = mi.size;
                        lastOffset = offset;
                    }
                }
                size = this._roundUp(align, lastOffset + lastSize);
                return new _TypeSize(Math.max(explicitAlign, align), Math.max(explicitSize, size));
            }
            return null;
        }
        _isUniformVar(node) {
            return node instanceof Var && node.storage == "uniform";
        }
        _isStorageVar(node) {
            return node instanceof Var && node.storage == "storage";
        }
        _isTextureVar(node) {
            return (node instanceof Var &&
                node.type !== null &&
                WgslReflect._textureTypes.indexOf(node.type.name) != -1);
        }
        _isSamplerVar(node) {
            return (node instanceof Var &&
                node.type !== null &&
                WgslReflect._samplerTypes.indexOf(node.type.name) != -1);
        }
        _getAttribute(node, name) {
            const obj = node;
            if (!obj || !obj["attributes"]) {
                return null;
            }
            const attrs = obj["attributes"];
            for (let a of attrs) {
                if (a.name == name) {
                    return a;
                }
            }
            return null;
        }
        _getAttributeNum(attributes, name, defaultValue) {
            if (attributes === null) {
                return defaultValue;
            }
            for (let a of attributes) {
                if (a.name == name) {
                    let v = a !== null && a.value !== null ? a.value : defaultValue;
                    if (v instanceof Array) {
                        v = v[0];
                    }
                    if (typeof v === "number") {
                        return v;
                    }
                    if (typeof v === "string") {
                        return parseInt(v);
                    }
                    return defaultValue;
                }
            }
            return defaultValue;
        }
        _roundUp(k, n) {
            return Math.ceil(n / k) * k;
        }
    }
    // Type                 AlignOf(T)          Sizeof(T)
    // i32, u32, or f32     4                   4
    // atomic<T>            4                   4
    // vec2<T>              8                   8
    // vec3<T>              16                  12
    // vec4<T>              16                  16
    // mat2x2<f32>          8                   16
    // mat3x2<f32>          8                   24
    // mat4x2<f32>          8                   32
    // mat2x3<f32>          16                  32
    // mat3x3<f32>          16                  48
    // mat4x3<f32>          16                  64
    // mat2x4<f32>          16                  32
    // mat3x4<f32>          16                  48
    // mat4x4<f32>          16                  64
    WgslReflect._typeInfo = {
        f16: { align: 2, size: 2 },
        i32: { align: 4, size: 4 },
        u32: { align: 4, size: 4 },
        f32: { align: 4, size: 4 },
        atomic: { align: 4, size: 4 },
        vec2: { align: 8, size: 8 },
        vec3: { align: 16, size: 12 },
        vec4: { align: 16, size: 16 },
        mat2x2: { align: 8, size: 16 },
        mat3x2: { align: 8, size: 24 },
        mat4x2: { align: 8, size: 32 },
        mat2x3: { align: 16, size: 32 },
        mat3x3: { align: 16, size: 48 },
        mat4x3: { align: 16, size: 64 },
        mat2x4: { align: 16, size: 32 },
        mat3x4: { align: 16, size: 48 },
        mat4x4: { align: 16, size: 64 },
    };
    WgslReflect._textureTypes = TokenTypes.any_texture_type.map((t) => {
        return t.name;
    });
    WgslReflect._samplerTypes = TokenTypes.sampler_type.map((t) => {
        return t.name;
    });

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
     *    returned from @link {makeShaderDataDefinitions}. If an array more than 1
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
            case ResourceType.Uniform:
                return {
                    binding,
                    visibility,
                    buffer: {},
                };
            case ResourceType.Storage:
                return {
                    binding,
                    visibility,
                    buffer: {
                        type: (access === '' || access === 'read') ? 'read-only-storage' : 'storage',
                    },
                };
            case ResourceType.Texture: {
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
            case ResourceType.Sampler:
                return {
                    binding,
                    visibility,
                    sampler: {
                        type: getSamplerType(type),
                    },
                };
            case ResourceType.StorageTexture:
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
        const reflect = new WgslReflect(code);
        const structs = Object.fromEntries(reflect.structs.map(structInfo => {
            return [structInfo.name, makeStructDefinition(reflect, structInfo, 0)];
        }));
        const uniforms = getNamedVariables(reflect, reflect.uniforms);
        const storages = getNamedVariables(reflect, reflect.storage.filter(v => v.resourceType === ResourceType.Storage));
        const storageTextures = getNamedVariables(reflect, reflect.storage.filter(v => v.resourceType === ResourceType.StorageTexture));
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
    function assert(cond, msg = '') {
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
            case ResourceType.Uniform:
            case ResourceType.Storage:
            case ResourceType.StorageTexture:
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
            assert(!typeInfo.isStruct, 'struct array is invalid');
            assert(!typeInfo.isStruct, 'template array is invalid');
            const arrayInfo = typeInfo;
            // ArrayDefinition
            return {
                size: arrayInfo.size,
                elementType: addType(reflect, arrayInfo.format, offset),
                numElements: arrayInfo.count,
            };
        }
        else if (typeInfo.isStruct) {
            assert(!typeInfo.isTemplate, 'template struct is invalid');
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

    function validateEncoderState(encoder, state) {
        assert$1(state === 'open', () => `encoder state(${state}) is not "open"`, [encoder]);
    }
    const s_commandEncoderToInfoMap = new WeakMap();
    function createCommandEncoder(commandEncoder) {
        s_commandEncoderToInfoMap.set(commandEncoder, { state: 'open' });
    }
    function unlockCommandEncoder(commandEncoder) {
        const info = s_commandEncoderToInfoMap.get(commandEncoder);
        assert$1(info.state === 'locked');
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
        s_bindGroupLayoutToBindGroupLayoutDescriptorPlus.set(layout, descPlus);
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
            bindingResource instanceof GPUExternalTexture) {
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
    //function validateEncoderBindGroupsDoNotAliasAWritableResource() {
    //  //
    //}
    function validateEncoderBindGroups(bindGroups, pipeline) {
        assert$1(!!pipeline, 'no pipeline set');
        const device = s_objToDevice.get(pipeline);
        const reifiedPipelineDescriptor = s_pipelineToReifiedPipelineLayoutDescriptor.get(pipeline);
        reifiedPipelineDescriptor.bindGroupLayoutDescriptors.forEach((bindGroupLayoutDescriptor, group) => {
            const binding = bindGroups[group];
            assert$1(!!binding, () => `required bindGroup missing from group(${group})`);
            const bindGroupInfo = s_bindGroupToInfo.get(binding.bindGroup);
            assert$1(bindGroupInfo.layoutPlus.signature === bindGroupLayoutDescriptor.signature, () => generateErrorMessageForMismatchedBindGroupLayouts(group, bindGroupInfo, bindGroupLayoutDescriptor));
            for (const { binding, resource: bindingResource } of bindGroupInfo.entries) {
                const resource = getResourceFromBindingResource(bindingResource);
                if (resource instanceof GPUTexture || resource instanceof GPUBuffer) {
                    assertNotDestroyed(resource);
                }
                assert$1(s_objToDevice.get(resource) === device, () => `texture at binding(${binding}) group(${group}) is not from same device`, [resource]);
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
        const layout = info.layoutPlus.bindGroupLayoutDescriptor;
        for (const entry of info.entries) {
            const bindingDescriptor = layout.entries[entry.binding];
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
            assert$1(dynamicOffsets.length === dynamicOffsetCount, `there must be the same number of dynamicOffsets(${dynamicOffsets.length}) as the layout requires (${dynamicOffsetCount})`);
            const device = s_objToDevice.get(this);
            const maxIndex = device.limits.maxBindGroups;
            assert$1(index >= 0, () => `index(${index}) must be >= 0`);
            assert$1(index < maxIndex, () => `index(${index}) must be < device.limits.maxBindGroups(${maxIndex})`);
            if (bindGroup) {
                assert$1(device === s_objToDevice.get(bindGroup), () => `bindGroup must be from same device as ${parent.constructor.name}`, [bindGroup, parent]);
                // Validate resources are not destroyed
                const info = s_bindGroupToInfo.get(bindGroup);
                validateBindGroupResourcesNotDestroyed(info.entries);
                // Validate Dynamic Offsets
                for (const { bufferBinding, bufferLayout, dynamicOffsetIndex } of forEachDynamicBinding(info)) {
                    const dynamicOffset = dynamicOffsets[dynamicOffsetIndex];
                    assert$1((bufferBinding.offset || 0) + dynamicOffset + (bufferLayout.minBindingSize || 0) <= bufferBinding.buffer.size, 'dynamic offset is out of range');
                    switch (bufferLayout.type) {
                        case 'uniform':
                            assert$1(dynamicOffset % device.limits.minUniformBufferOffsetAlignment === 0, () => `dynamicOffset[${dynamicOffsetIndex}](${dynamicOffset}) used for a uniform buffer is not a multiple of device.limits.minUniformBufferOffsetAlignment(${device.limits.minUniformBufferOffsetAlignment})`);
                            break;
                        case 'storage':
                        case 'read-only-storage':
                            assert$1(dynamicOffset % device.limits.minStorageBufferOffsetAlignment === 0, () => `dynamicOffset[${dynamicOffsetIndex}](${dynamicOffset}) used for a uniform buffer is not a multiple of device.limits.minStorageBufferOffsetAlignment(${device.limits.minStorageBufferOffsetAlignment})`);
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
                    assert$1(!!vertexBufferBinding, () => `no vertexBuffer in slot(${slot})`);
                    assertNotDestroyed(vertexBufferBinding.buffer);
                    fn(slot, buffer, vertexBufferBinding);
                    // don't need to check that vertex buffer is same device as was checked at setVertexBuffer
                    vertexBufferSpaceUsed = slot;
                }
            });
        }
        // TODO: test!
        assert$1(bindGroupSpaceUsed + vertexBufferSpaceUsed <= device.limits.maxBindGroupsPlusVertexBuffers, () => `bindGroupSpaceUsed(${bindGroupSpaceUsed}) + vertexBufferSpaceUsed(${vertexBufferSpaceUsed}) <= device.limits.maxBindGroupsPlusVertexBuffers(${device.limits.maxBindGroupsPlusVertexBuffers})`);
    }
    function validateValidToDrawIndexed(mixin, info, fn) {
        assert$1(!!info.indexBuffer, 'indexBuffer is not set');
        const device = s_objToDevice.get(mixin);
        assertNotDestroyed(info.indexBuffer.buffer);
        assert$1(device === s_objToDevice.get(info.indexBuffer.buffer), 'indexBuffer is not from same device');
        validateValidToDraw(mixin, info, fn);
        const pipelineDescriptor = s_renderPipelineToRenderPipelineDescriptor.get(info.pipeline);
        switch (pipelineDescriptor.primitive?.topology) {
            case 'line-strip':
            case 'triangle-strip':
                assert$1(info.indexFormat === pipelineDescriptor.primitive?.stripIndexFormat, () => `indexFormat(${info.indexFormat}) !== pipeline.primitive.stripIndexFormat(${pipelineDescriptor.primitive?.stripIndexFormat})`);
        }
    }
    function bufferSizeFromBufferBinding({ buffer, offset, size }) {
        offset = offset ?? 0;
        return size ?? buffer.size - offset;
    }
    const kVertexFormatInfo = {
        "uint8x2": { components: 2, bytes: 2, type: "vec2<u32>" },
        "uint8x4": { components: 4, bytes: 4, type: "vec4<u32>" },
        "sint8x2": { components: 2, bytes: 2, type: "vec2<i32>" },
        "sint8x4": { components: 4, bytes: 4, type: "vec4<i32>" },
        "unorm8x2": { components: 2, bytes: 2, type: "vec2<f32>" },
        "unorm8x4": { components: 4, bytes: 4, type: "vec4<f32>" },
        "snorm8x2": { components: 2, bytes: 2, type: "vec2<f32>" },
        "snorm8x4": { components: 4, bytes: 4, type: "vec4<f32>" },
        "uint16x2": { components: 2, bytes: 4, type: "vec2<u32>" },
        "uint16x4": { components: 4, bytes: 8, type: "vec4<u32>" },
        "sint16x2": { components: 2, bytes: 4, type: "vec2<i32>" },
        "sint16x4": { components: 4, bytes: 8, type: "vec4<i32>" },
        "unorm16x2": { components: 2, bytes: 4, type: "vec2<f32>" },
        "unorm16x4": { components: 4, bytes: 8, type: "vec4<f32>" },
        "snorm16x2": { components: 2, bytes: 4, type: "vec2<f32>" },
        "snorm16x4": { components: 4, bytes: 8, type: "vec4<f32>" },
        "float16x2": { components: 2, bytes: 4, type: "vec2<f16>" },
        "float16x4": { components: 4, bytes: 8, type: "vec4<f16>" },
        "float32": { components: 1, bytes: 4, type: "f32" },
        "float32x2": { components: 2, bytes: 8, type: "vec2<f32>" },
        "float32x3": { components: 3, bytes: 12, type: "vec3<f32>" },
        "float32x4": { components: 4, bytes: 16, type: "vec4<f32>" },
        "uint32": { components: 1, bytes: 4, type: "u32" },
        "uint32x2": { components: 2, bytes: 8, type: "vec2<u32>" },
        "uint32x3": { components: 3, bytes: 12, type: "vec3<u32>" },
        "uint32x4": { components: 4, bytes: 16, type: "vec4<u32>" },
        "sint32": { components: 1, bytes: 4, type: "i32" },
        "sint32x2": { components: 2, bytes: 8, type: "vec2<i32>" },
        "sint32x3": { components: 3, bytes: 12, type: "vec3<i32>" },
        "sint32x4": { components: 4, bytes: 16, type: "vec4<i32>" },
        "unorm10-10-10-2": { components: 4, bytes: 4, type: "vec4<f32>" },
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
                    assert$1(bytesNeeded <= bufferSize, () => `slot(${slot}) vertex buffer binding size ${bufferSize} is not large enough for bytes needed(${bytesNeeded})`);
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
                    assert$1(bytesNeeded <= bufferSize, () => `slot(${slot}) vertex buffer binding size ${bufferSize} is not large enough for bytes needed(${bytesNeeded})`);
                }
            });
            const bufferSize = bufferSizeFromBufferBinding(info.indexBuffer);
            const indexByteSize = info.indexFormat === 'uint16' ? 2 : 4;
            const bytesNeeded = firstIndex + indexCount * indexByteSize;
            assert$1(bytesNeeded <= bufferSize, () => `indexBuffer bound size(${bufferSize}) is not large enough for bytesNeeded(${bytesNeeded})`);
        });
        const kIndirectDrawParametersSize = 16;
        wrapFunctionBefore(API, 'drawIndirect', function ([indirectBuffer, indirectOffset]) {
            const info = s_renderPassToPassInfoMap.get(this);
            validateEncoderState(this, info.state);
            validateValidToDraw(this, info, () => { });
            assertNotDestroyed(indirectBuffer);
            const device = s_objToDevice.get(this);
            assert$1(device === s_objToDevice.get(indirectBuffer), 'indirectBuffer is not from same device', [indirectBuffer]);
            assert$1(!!(indirectBuffer.usage & GPUBufferUsage.INDIRECT), () => `buffer(${bufferUsageToString(indirectBuffer.usage)}) must have usage INDIRECT`, [indirectBuffer, this]);
            assert$1(indirectOffset + kIndirectDrawParametersSize <= indirectBuffer.size, `indirectOffset(${indirectOffset}) + sizeOfIndirectParameters(${kIndirectDrawParametersSize}) > indirectBuffer.size(${indirectBuffer.size})`, [indirectBuffer]);
            assert$1(indirectOffset % 4 === 0, () => `indirectOffset(${indirectOffset}) is not multiple of 4`);
        });
        const kIndirectDrawIndexedParametersSize = 20;
        wrapFunctionBefore(API, 'drawIndexedIndirect', function ([indirectBuffer, indirectOffset]) {
            const info = s_renderPassToPassInfoMap.get(this);
            validateEncoderState(this, info.state);
            validateValidToDrawIndexed(this, info, () => { });
            assertNotDestroyed(indirectBuffer);
            const device = s_objToDevice.get(this);
            assert$1(device === s_objToDevice.get(indirectBuffer), 'indirectBuffer is not from same device', [indirectBuffer]);
            assert$1(!!(indirectBuffer.usage & GPUBufferUsage.INDIRECT), () => `buffer(${bufferUsageToString(indirectBuffer.usage)}) must have usage INDIRECT`, [indirectBuffer, this]);
            assert$1(indirectOffset + kIndirectDrawIndexedParametersSize <= indirectBuffer.size, `indirectOffset(${indirectOffset}) + sizeOfIndirectParameters(${kIndirectDrawIndexedParametersSize}) > indirectBuffer.size(${indirectBuffer.size})`, [indirectBuffer]);
            assert$1(indirectOffset % 4 === 0, () => `indirectOffset(${indirectOffset}) is not multiple of 4`);
        });
        wrapFunctionBefore(API, 'setPipeline', function ([pipeline]) {
            const info = s_renderPassToPassInfoMap.get(this);
            validateEncoderState(this, info.state);
            assert$1(s_objToDevice.get(this) === s_objToDevice.get(pipeline), 'pipeline must be from same device as renderPassEncoder', [pipeline, this]);
            const pipelineDesc = s_renderPipelineToRenderPipelineDescriptor.get(pipeline);
            const passLayoutInfo = getRenderPassInfo(this);
            assert$1(pipelineDesc.passLayoutInfo.passLayoutSignature === passLayoutInfo.passLayoutSignature, () => `pipeline is not compatible with ${this.constructor.name}

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
            assert$1(device === s_objToDevice.get(buffer), 'buffer must be from the same device', [buffer, this]);
            assertNotDestroyed(buffer);
            assert$1(!!(buffer.usage & GPUBufferUsage.INDEX), () => `buffer(${bufferUsageToString(buffer.usage)}) must have usage INDEX`, [buffer, this]);
            const align = format === 'uint16' ? 2 : 4;
            assert$1(offset % align === 0, () => `offset(${offset}) must be multiple of index format: ${format}`, [buffer, this]);
            assert$1(offset + size <= buffer.size, () => `offset(${offset}) + size(${size}) is not <= buffer.size(${buffer.size})`, [buffer, this]);
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
            assert$1(slot >= 0, () => `slot(${slot}) must be >= 0`, [this]);
            assert$1(slot < maxSlot, () => `slot(${slot}) must be < device.limits.maxVertexBuffers(${maxSlot})`, [this]);
            assert$1(offset % 4 === 0, () => `offset(${offset}) must be multiple of 4`, [this]);
            assert$1(offset + size <= bufferSize, () => `offset(${offset}) + size(${size}) is not <= buffer.size(${bufferSize})`, [this, ...(buffer ? [buffer] : [])]);
            if (!buffer) {
                info.vertexBuffers[slot] = undefined;
            }
            else {
                assert$1(device === s_objToDevice.get(buffer), 'buffer must be from the same device', [buffer, this]);
                assertNotDestroyed(buffer);
                assert$1(!!(buffer.usage & GPUBufferUsage.VERTEX), () => `buffer(${bufferUsageToString(buffer.usage)}) must have usage VERTEX`, [buffer, this]);
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
            entries: [...src.entries].map(reifyBindGroupLayoutEntry).sort((a, b) => a.binding - b.binding),
        };
        const dynamicOffsetCount = bindGroupLayoutDescriptor.entries.reduce((a, v) => a + (v.buffer?.hasDynamicOffset ? 1 : 0), 0);
        const signature = `${JSON.stringify(bindGroupLayoutDescriptor)}${autoId ? `:autoId(${autoId})` : ''})`;
        return {
            bindGroupLayoutDescriptor,
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
            const r = resource instanceof GPUSampler ||
                resource instanceof GPUTextureView ||
                resource instanceof GPUExternalTexture
                ? resource
                : { ...resource };
            const rb = r;
            if (rb.buffer instanceof GPUBuffer) {
                const offset = rb.offset || 0;
                const size = rb.size || rb.buffer.size - offset;
                assert$1(offset + size <= rb.buffer.size, () => `offset(${offset} + size(${size}) > buffer.size(${rb.buffer.size}))`, [rb.buffer]);
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
        const bglDescriptorsPlus = [...desc.bindGroupLayouts].map(bgl => s_bindGroupLayoutToBindGroupLayoutDescriptorPlus.get(bgl));
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
        assert$1(s_objToDevice.get(querySet) === device, 'querySet not from same device', [querySet]);
        assert$1(querySet.type === 'timestamp', () => `querySet.type(${querySet.type}) !== 'timestamp'`);
        assert$1(beginningOfPassWriteIndex === undefined || beginningOfPassWriteIndex < querySet.count, () => `timestampWrites.beginningOfPassWriteIndex(${beginningOfPassWriteIndex}) is >= querySet.count(${querySet.count})`);
        assert$1(endOfPassWriteIndex === undefined || endOfPassWriteIndex < querySet.count, () => `timestampWrites.endOfPassWriteIndex(${endOfPassWriteIndex}) is >= querySet.count(${querySet.count})`);
        assert$1(beginningOfPassWriteIndex !== undefined || endOfPassWriteIndex !== undefined, () => `at least one of beginningOfPassWriteIndex(${beginningOfPassWriteIndex}) or endOfPassWriteIndex(${endOfPassWriteIndex})`);
        assert$1(beginningOfPassWriteIndex !== endOfPassWriteIndex, () => `beginningOfPassWriteIndex(${beginningOfPassWriteIndex}) and endOfPassWriteIndex(${endOfPassWriteIndex}) may not be the same`);
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
        assert$1(s_objToDevice.get(info.commandEncoder) === s_objToDevice.get(pipeline), 'pipeline must be from same device as computePassEncoder', [this, info.commandEncoder]);
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
        assert$1(workgroupCountX < device.limits.maxComputeWorkgroupsPerDimension, () => `workGroupCountX(${workgroupCountX} > device.limits.maxComputeWorkgroupsPerDimension(${device.limits.maxComputeWorkgroupsPerDimension})`);
        assert$1(workgroupCountY < device.limits.maxComputeWorkgroupsPerDimension, () => `workGroupCountY(${workgroupCountY} > device.limits.maxComputeWorkgroupsPerDimension(${device.limits.maxComputeWorkgroupsPerDimension})`);
        assert$1(workgroupCountZ < device.limits.maxComputeWorkgroupsPerDimension, () => `workGroupCountZ(${workgroupCountZ} > device.limits.maxComputeWorkgroupsPerDimension(${device.limits.maxComputeWorkgroupsPerDimension})`);
    });
    const kIndirectDispatchWorkgroupsParametersSize = 12;
    wrapFunctionBefore(GPUComputePassEncoder, 'dispatchWorkgroupsIndirect', function ([indirectBuffer, indirectOffset]) {
        const info = s_computePassToPassInfoMap.get(this);
        validateEncoderState(this, info.state);
        validateEncoderBindGroups(info.bindGroups, info.pipeline);
        assertNotDestroyed(indirectBuffer);
        const device = s_objToDevice.get(this);
        assert$1(device === s_objToDevice.get(indirectBuffer), 'indirectBuffer is not from same device', [indirectBuffer]);
        assert$1(!!(indirectBuffer.usage & GPUBufferUsage.INDIRECT), () => `buffer(${bufferUsageToString(indirectBuffer.usage)}) must have usage INDIRECT`, [indirectBuffer, this]);
        assert$1(indirectOffset + kIndirectDispatchWorkgroupsParametersSize <= indirectBuffer.size, `indirectOffset(${indirectOffset}) + sizeOfIndirectParameters(${kIndirectDispatchWorkgroupsParametersSize}) > indirectBuffer.size(${indirectBuffer.size})`, [indirectBuffer]);
        assert$1(indirectOffset % 4 === 0, () => `indirectOffset(${indirectOffset}) is not multiple of 4`);
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
                assert$1(!inUseMipLevels.has(mipLevel), () => `mipLevel(${mipLevel}) of layer(${layer}) is already in use`, [texture]);
                inUseMipLevels.add(mipLevel);
            }
        }
    }
    function validateViewAspectIsAllAspectsOfTexture(texture, aspect) {
        const { depth, stencil } = kAllTextureFormatInfo[texture.format];
        if (depth && stencil) {
            assert$1(aspect === 'all', 'aspect must be all for depth-stencil textures', [texture]);
        }
        else if (depth) {
            assert$1(aspect === 'all' || aspect === 'depth-only', 'aspect must be all or depth-only for depth textures', [texture]);
        }
        else if (stencil) {
            assert$1(aspect === 'all' || aspect === 'stencil-only', 'aspect must be all or stencil-only for stencil textures', [texture]);
        }
    }
    function validateRenderableTextureView(texture, viewDesc) {
        assert$1((texture.usage & GPUTextureUsage.RENDER_ATTACHMENT) !== 0, () => `texture.usage(${textureUsageToString(texture.usage)}) is missing RENDER_ATTACHMENT`, [texture]);
        const { dimension, mipLevelCount, arrayLayerCount, aspect } = viewDesc;
        assert$1(dimension === '2d' || dimension === '3d', () => `dimension(${dimension}) must be 2d or 3d`);
        assert$1(mipLevelCount === 1, () => `mipLevelCount(${mipLevelCount}) must be 1`);
        assert$1(arrayLayerCount === 1, () => `arrayLayerCount(${arrayLayerCount}) must be 1`);
        validateViewAspectIsAllAspectsOfTexture(texture, aspect);
    }
    function validateRenderPassColorAttachment(attachment, slot) {
        const { view, resolveTarget, depthSlice, loadOp } = attachment;
        const renderViewDesc = s_textureViewToDesc.get(view);
        const renderTexture = s_textureViewToTexture.get(view);
        const formatInfo = kAllTextureFormatInfo[renderViewDesc.format];
        validateRenderableTextureView(renderTexture, renderViewDesc);
        assert$1(!!formatInfo.colorRender, () => `format(${renderViewDesc.format}) is not color renderable`);
        if (renderViewDesc.dimension === '3d') {
            assert$1(!!depthSlice, () => `attachment(${slot})'s dimension is '3d' but depthSlice is missing`);
            const [, , d] = logicalMipLevelSpecificTextureExtent(renderTexture, renderViewDesc.baseMipLevel);
            assert$1(depthSlice < d, () => `depthSlice(${depthSlice}) must be < depth(${d}) at mipLevel(${renderViewDesc.mipLevelCount}) of texture`, [renderTexture]);
        }
        else {
            assert$1(depthSlice === undefined, `attachment(${slot}) is not 3d so depthSlice must NOT be provided`);
        }
        if (resolveTarget) {
            const resolveViewDesc = s_textureViewToDesc.get(resolveTarget);
            const resolveTexture = s_textureViewToTexture.get(resolveTarget);
            const [tw, th] = logicalMipLevelSpecificTextureExtent(renderTexture, renderViewDesc.baseMipLevel);
            const [rw, rh] = logicalMipLevelSpecificTextureExtent(resolveTexture, resolveViewDesc.baseMipLevel);
            assert$1(tw === rw && th === rh, () => `resolveTarget render extent(${rw}, ${rh}) != view render extent (${tw}, ${th})`);
            assert$1(renderTexture.sampleCount > 1, 'resolveTarget is set so view texture must have sampleCount > 1', [renderTexture]);
            assert$1(resolveTexture.sampleCount === 1, 'resolveTarget.sampleCount must be 1', [resolveTarget]);
            validateRenderableTextureView(resolveTexture, resolveViewDesc);
            assert$1(resolveViewDesc.format === renderViewDesc.format, () => `resolveTarget.view.format(${resolveViewDesc.format}) must equal target.view.format(${renderViewDesc.format})`);
            assert$1(resolveTexture.format === renderTexture.format, () => `resolve texture format(${resolveTexture.format}) must equal target texture format(${renderTexture.format})`);
            const resolveFormatInfo = kAllTextureFormatInfo[resolveTexture.format];
            assert$1(!!resolveFormatInfo?.colorRender?.resolve, () => `resolve texture.format(${resolveTexture.format}) does not support resolving`);
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
            assert$1(s_objToDevice.get(texture) === device, 'texture is not from same device as command encoder', [texture, commandEncoder]);
            const { sampleCount, format } = texture;
            const formatInfo = kAllTextureFormatInfo[format];
            markTextureInUse(inuseTextures, texture, view);
            const { colorRender, depth, stencil } = formatInfo;
            checkRenderExtent(texture, view);
            if (isDepth) {
                assert$1(!!depth || !!stencil, () => `format(${format}) is not a depth stencil format`);
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
                assert$1(sampleCount === passSampleCount, 'all attachments do not have the same sampleCount');
            }
        };
        const { timestampWrites, colorAttachments, depthStencilAttachment, occlusionQuerySet } = desc;
        for (const colorAttachment of colorAttachments || []) {
            addView(colorAttachment);
        }
        addView(depthStencilAttachment, true);
        assert$1(numAttachments > 0, 'there must be at least 1 colorAttachment or depthStencilAttachment');
        assert$1(numAttachments <= device.limits.maxColorAttachments, () => `numAttachments(${numAttachments}) > device.limits.maxColorAttachments(${device.limits.maxColorAttachments})`);
        assert$1(bytesPerSample <= device.limits.maxColorAttachmentBytesPerSample, () => `color attachments bytesPerSample(${bytesPerSample}) > device.limits.maxColorAttachmentBytesPerSample(${device.limits.maxColorAttachmentBytesPerSample})`);
        if (timestampWrites) {
            validateTimestampWrites(device, timestampWrites);
        }
        if (occlusionQuerySet) {
            assertNotDestroyed(occlusionQuerySet);
            assert$1(device === s_objToDevice.get(occlusionQuerySet), 'occlusionQuerySet is not from same device', [occlusionQuerySet]);
            assert$1(occlusionQuerySet.type === 'occlusion', () => `occlusionQuerySet.type(${occlusionQuerySet.type}) is not 'occlusion'`, [occlusionQuerySet]);
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
            assert$1(s_objToDevice.get(bundle) === device, () => 'bundle[${count}] is not from same device as render pass encoder', [bundle]);
            const count = bundleCount;
            const bundleDesc = getRenderPassLayoutForRenderBundle(bundle);
            const passLayoutInfo = getRenderPassLayout(this);
            assert$1(bundleDesc.passLayoutInfo.passLayoutSignature === passLayoutInfo.passLayoutSignature, () => `bundle[${count}] is not compatible with ${this.constructor.name}

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
        assert$1(!!occlusionQuerySet, 'no occlusionQuerySet in pass');
        assertNotDestroyed(occlusionQuerySet);
        assert$1(queryIndex < occlusionQuerySet.count, () => `queryIndex(${queryIndex}) >= occlusionQuerySet.count(${occlusionQuerySet.count})`, [occlusionQuerySet]);
        const queryErr = occlusionIndices.get(queryIndex);
        assert$1(!queryErr, () => `queryIndex(${queryIndex}) was already used in this pass at ${queryErr.stack}`);
        assert$1(!occlusionQueryActive, () => `another query is already active from ${occlusionQueryActive.stack}`);
        info.occlusionQueryActive = new Error();
        info.occlusionQueryActiveIndex = queryIndex;
    });
    wrapFunctionBefore(GPURenderPassEncoder, 'endOcclusionQuery', function () {
        const info = s_renderPassToPassInfoMap.get(this);
        validateEncoderState(this, info.state);
        const { occlusionIndices, occlusionQueryActive, occlusionQueryActiveIndex, occlusionQuerySet } = info;
        assert$1(!!info.occlusionQueryActive, 'no occlusion query is active');
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
        assert$1(!info.occlusionQueryActive, () => `occlusion queryIndex(${info.occlusionQueryActiveIndex}) is still active`);
    });
    wrapFunctionBefore(GPURenderPassEncoder, 'setViewport', function ([x, y, width, height, minDepth, maxDepth]) {
        const info = s_renderPassToPassInfoMap.get(this);
        validateEncoderState(this, info.state);
        const { targetWidth, targetHeight, } = info;
        assert$1(x >= 0, () => `x(${x}) < 0`, [this]);
        assert$1(y >= 0, () => `y(${y}) < 0`, [this]);
        assert$1(x + width <= targetWidth, () => `x(${x}) + width(${width}) > texture.width(${targetWidth})`, [this]);
        assert$1(y + height <= targetHeight, () => `y(${x}) + height(${height}) > texture.height(${targetHeight})`, [this]);
        assert$1(minDepth >= 0 && minDepth <= 1.0, () => `minDepth(${minDepth}) must be >= 0 and <= 1`);
        assert$1(maxDepth >= 0 && maxDepth <= 1.0, () => `maxDepth(${maxDepth}) must be >= 0 and <= 1`);
        assert$1(minDepth < maxDepth, () => `minDepth(${minDepth}) must be < maxDepth(${maxDepth})`);
    });
    wrapFunctionBefore(GPURenderPassEncoder, 'setScissorRect', function ([x, y, width, height]) {
        const info = s_renderPassToPassInfoMap.get(this);
        validateEncoderState(this, info.state);
        const { targetWidth, targetHeight, } = info;
        assert$1(x >= 0, () => `x(${x}) < 0`, [this]);
        assert$1(y >= 0, () => `y(${y}) < 0`, [this]);
        assert$1(x + width <= targetWidth, () => `x(${x}) + width(${width}) > texture.width(${targetWidth})`, [this]);
        assert$1(y + height <= targetHeight, () => `y(${x}) + height(${height}) > texture.height(${targetHeight})`, [this]);
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
        const device = s_objToDevice.get(this);
        assert$1(device === s_objToDevice.get(src), 'src is not from same device as commandEncoder', [src, this]);
        assert$1(device === s_objToDevice.get(dst), 'dst is not from same device as commandEncoder', [dst, this]);
        assert$1(src !== dst, 'src must not be same buffer as dst', [src, dst]);
        assert$1(!!(src.usage & GPUBufferUsage.COPY_SRC), () => `src.usage(${bufferUsageToString(src.usage)} missing COPY_SRC)`, [src]);
        assert$1(!!(dst.usage & GPUBufferUsage.COPY_DST), () => `dst.usage(${bufferUsageToString(dst.usage)} missing COPY_DST)`, [dst]);
        assert$1(srcOffset + size <= src.size, () => `srcOffset(${srcOffset}) + size(${size}) > srcBuffer.size(${src.size})`, [src]);
        assert$1(dstOffset + size <= dst.size, () => `dstOffset(${dstOffset}) + size(${size}) > dstBuffer.size(${dst.size})`, [dst]);
        assert$1(size % 4 === 0, () => `size(${size}) is not multiple of 4`);
        assert$1(srcOffset % 4 === 0, () => `srcOffset(${srcOffset}) is not multiple of 4`);
        assert$1(dstOffset % 4 === 0, () => `dstOffset(${dstOffset}) is not multiple of 4`);
    });
    function validateImageCopyBuffer(icb) {
        assertNotDestroyed(icb.buffer);
        const bytesPerRow = icb.bytesPerRow || 0;
        assert$1(bytesPerRow % 256 === 0, () => `src.bytesPerRow(${bytesPerRow}) not multiple of 256`, [icb.buffer]);
    }
    function validateImageCopyTexture(ict, copySize) {
        assertNotDestroyed(ict.texture);
        const formatInfo = kAllTextureFormatInfo[ict.texture.format];
        const { blockWidth, blockHeight, } = formatInfo;
        const mipLevel = ict.mipLevel || 0;
        const [origX, origY] = reifyGPUOrigin3D(ict.origin);
        assert$1(mipLevel < ict.texture.mipLevelCount, () => `mipLevel(${mipLevel}) must be less than texture.mipLevelCount(${ict.texture.mipLevelCount})`, [ict.texture]);
        assert$1(origX % blockWidth === 0, () => `origin.x(${origX}) not multiple of blockWidth(${blockWidth})`, [ict.texture]);
        assert$1(origY % blockHeight === 0, () => `origin.y(${origY}) not multiple of blockHeight(${blockHeight})`, [ict.texture]);
        const [copyWidth, copyHeight, copyDepthOrArrayLayers] = reifyGPUExtent3D(copySize);
        if (formatInfo.depth && formatInfo.stencil && ict.texture.sampleCount > 1) {
            const [w, h, d] = physicalMipLevelSpecificTextureExtent(ict.texture, mipLevel);
            assert$1(copyWidth === w &&
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
        assert$1(origX + copyWidth <= w, () => `origin.x(${origX}) + copySize.width(${copyWidth}) is > physical width(${w}) of mipLevel(${mipLevel})`, res);
        assert$1(origY + copyHeight <= h, () => `origin.y(${origY}) + copySize.height(${copyHeight}) is > physical height(${h}) of mipLevel(${mipLevel})`, res);
        assert$1(origZ + copyDepthOrArrayLayers <= d, () => `origin.z(${origZ}) + copySize.depthOrArrayBuffers(${copyDepthOrArrayLayers}) is > texture.depthOrArrayLayers(${d}) of mipLevel(${mipLevel})`, res);
        assert$1(copyWidth % blockWidth === 0, () => `copySize.width(${copyWidth}) is not multiple of blockWidth(${blockWidth})`, res);
        assert$1(copyHeight % blockHeight === 0, () => `copySize.height(${copyHeight}) is not multiple of blockHeight(${blockHeight})`, res);
    }
    function validateLinearTextureData(idl, byteSize, format, copyExtent) {
        const formatInfo = kAllTextureFormatInfo[format];
        const [copyWidth, copyHeight, copyDepthOrArrayLayers] = reifyGPUExtent3D(copyExtent);
        const { blockWidth, blockHeight } = formatInfo;
        const widthInBlocks = copyWidth / blockWidth;
        const heightInBlocks = copyHeight / blockHeight;
        const bytesInLastRow = widthInBlocks * formatInfo.bytesPerBlock;
        assert$1(widthInBlocks % 1 === 0, () => `width(${copyWidth}) must be multiple of blockWidth${blockWidth}`);
        assert$1(heightInBlocks % 1 === 0, () => `height(${copyHeight}) must be multiple of blockHeight${blockHeight}`);
        if (heightInBlocks > 1) {
            assert$1(idl.bytesPerRow !== undefined, () => `bytesPerRow must be set if heightInBlocks(${heightInBlocks}) > 1`);
        }
        if (copyDepthOrArrayLayers > 1) {
            assert$1(idl.bytesPerRow !== undefined, () => `bytesPerRow must be set if copySize.depthOrArrayLayers(${copyDepthOrArrayLayers}) > 1`);
        }
        if (copyDepthOrArrayLayers > 1) {
            assert$1(idl.rowsPerImage !== undefined, () => `rowsPerImage must be set if copySize.depthOrArrayLayers(${copyDepthOrArrayLayers}) > 1`);
        }
        if (idl.bytesPerRow !== undefined) {
            assert$1(idl.bytesPerRow >= bytesInLastRow, () => `bytesPerRow(${idl.bytesPerRow}) must be >= bytes in the last row(${bytesInLastRow})`);
        }
        if (idl.rowsPerImage !== undefined) {
            assert$1(idl.rowsPerImage >= heightInBlocks, () => `rowsPerImage(${idl.rowsPerImage}) must be >= heightInBlocks(${heightInBlocks})`);
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
        assert$1(offset + requiredBytesInCopy <= byteSize, () => `offset(${offset}) + requiredBytesInCopy(${requiredBytesInCopy}) must be <= buffer.size(${byteSize})`);
    }
    function validateB2TorT2BCopy(encoder, buf, tex, copySize, bufferIsSource) {
        const device = s_objToDevice.get(encoder);
        assert$1(device === s_objToDevice.get(buf.buffer), 'buffer is not from same device as commandEncoder', [buf.buffer, encoder]);
        assert$1(device === s_objToDevice.get(tex.texture), 'texture is not from same device as commandEncoder', [tex.texture, encoder]);
        validateImageCopyBuffer(buf);
        const [bufRequiredUsage, texRequiredUsage] = bufferIsSource
            ? ['COPY_SRC', 'COPY_DST']
            : ['COPY_DST', 'COPY_SRC'];
        assert$1(!!(buf.buffer.usage & GPUBufferUsage[bufRequiredUsage]), () => `src.usage(${bufferUsageToString(buf.buffer.usage)} missing ${bufRequiredUsage})`, [buf.buffer]);
        validateImageCopyTexture(tex, copySize);
        const formatInfo = kAllTextureFormatInfo[tex.texture.format];
        assert$1(!!(tex.texture.usage & GPUTextureUsage[texRequiredUsage]), () => `dst.texture.usage(${textureUsageToString(tex.texture.usage)} missing ${texRequiredUsage})`, [tex.texture]);
        assert$1(tex.texture.sampleCount === 1, 'sampleCount must be 1', [tex.texture]);
        let aspectSpecificFormat = tex.texture.format;
        const isDepthOrStencil = formatInfo.depth || formatInfo.stencil;
        if (isDepthOrStencil) {
            if (!formatInfo.stencil) {
                assert$1(tex.aspect !== 'stencil-only', 'can not use stencil-only aspect on non stencil texture', [tex.texture]);
            }
            if (!formatInfo.depth) {
                assert$1(tex.aspect !== 'depth-only', 'can not use depth-only aspect on non depth texture', [tex.texture]);
            }
            assert$1(tex.aspect === 'depth-only' || tex.aspect === 'stencil-only', 'must use one aspect');
            const aspect = tex.aspect === 'depth-only' ? 'depth' : 'stencil';
            const info = formatInfo[aspect];
            assert$1(!!info?.copyDst, `can not copy to ${tex.aspect} of texture of format(${tex.texture.format})`, [tex.texture]);
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
            assert$1(srcOffset % texelCopyBlockFootPrint === 0, () => `src.offset(${srcOffset}) must multiple of blockSize(${texelCopyBlockFootPrint})`);
        }
        else {
            assert$1(srcOffset % 4 === 0, () => `src.offset(${srcOffset}) must by multiple of 4 for depth and/or stencil textures`);
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
        assert$1(device === s_objToDevice.get(src.texture), 'src.texture is not from same device as commandEncoder', [src, this]);
        assert$1(device === s_objToDevice.get(dst.texture), 'dst.texture is not from same device as commandEncoder', [dst, this]);
        validateImageCopyTexture(src, copySize);
        assert$1(!!(src.texture.usage & GPUTextureUsage.COPY_SRC), () => `src.texture.usage(${textureUsageToString(src.texture.usage)} missing COPY_SRC`, [src.texture]);
        validateImageCopyTexture(dst, copySize);
        assert$1(!!(dst.texture.usage & GPUTextureUsage.COPY_DST), () => `src.texture.usage(${textureUsageToString(dst.texture.usage)} missing COPY_DST`, [dst.texture]);
        assert$1(src.texture.sampleCount === dst.texture.sampleCount, () => `src.texture.sampleCount(${src.texture.sampleCount}) must equal dst.texture.sampleCount(${dst.texture.sampleCount})`, [src.texture, dst.texture]);
        assert$1(isCopyCompatible(src.texture.format, dst.texture.format), () => `src.texture.format(${src.texture.format}) must be copy compatible with dst.texture.format(${dst.texture.format})`, [src.texture, dst.texture]);
        const formatInfo = kAllTextureFormatInfo[src.texture.format];
        const isDepthStencil = !!formatInfo.depth && !!formatInfo.stencil;
        if (isDepthStencil) {
            assert$1(src.aspect === 'all', () => `src.aspect must be 'all' when format(${src.texture.format}) is a depth-stencil format`, [src.texture]);
            assert$1(dst.aspect === 'all', () => `dst.aspect must be 'all' when format(${dst.texture.format}) is a depth-stencil format`, [dst.texture]);
        }
        validateTextureCopyRange(src, copySize);
        validateTextureCopyRange(dst, copySize);
        if (src.texture === dst.texture) {
            const srcOrigin = reifyGPUOrigin3D(src.origin);
            const dstOrigin = reifyGPUOrigin3D(dst.origin);
            const size = reifyGPUExtent3D(copySize);
            assert$1(!isIntersectingAxis(srcOrigin[0], dstOrigin[0], size[0]) &&
                !isIntersectingAxis(srcOrigin[1], dstOrigin[1], size[1]) &&
                !isIntersectingAxis(srcOrigin[2], dstOrigin[2], size[2]), () => `when src and dst textures are the same texture, copy boxes must not overlap`, [src.texture, dst.texture]);
        }
    });
    wrapFunctionBefore(GPUCommandEncoder, 'clearBuffer', function ([buffer, offset, size]) {
        getCommandBufferInfoAndValidateState(this);
        assertNotDestroyed(buffer);
        offset = offset ?? 0;
        size = size ?? buffer.size - offset;
        assert$1(s_objToDevice.get(this) === s_objToDevice.get(buffer), 'buffer not from same device as encoder', [buffer, this]);
        assert$1(!!(buffer.usage & GPUBufferUsage.COPY_DST), () => `buffer.usage(${bufferUsageToString(buffer.usage)}) must have COPY_DST`, [buffer]);
        assert$1(size % 4 === 0, () => `size(${size}) must be multiple of 4`);
        assert$1(offset % 4 === 0, () => `offset(${offset}) must be multiple of 4`);
        assert$1(offset + size <= buffer.size, () => `offset(${offset}) + size(${size}) must be <= buffer.size(${buffer.size})`);
    });
    wrapFunctionBefore(GPUCommandEncoder, 'resolveQuerySet', function ([querySet, firstQuery, queryCount, destination, destinationOffset]) {
        getCommandBufferInfoAndValidateState(this);
        assertNotDestroyed(querySet);
        assertNotDestroyed(destination);
        const device = s_objToDevice.get(this);
        assert$1(s_objToDevice.get(querySet) === device, 'querySet not from same device', [querySet]);
        assert$1(s_objToDevice.get(destination) === device, 'destination buffer not from same device', [destination]);
        assert$1((destination.usage & GPUBufferUsage.QUERY_RESOLVE) !== 0, () => `destination.usage(${bufferUsageToString(destination.usage)} does not contain QUERY_RESOLVE)`, [destination]);
        assert$1(firstQuery < querySet.count, () => `firstQuery(${firstQuery}) out of range for querySet.count(${querySet.count})`);
        assert$1(firstQuery + queryCount <= querySet.count, () => `firstQuery(${firstQuery}) + queryCount(${queryCount}) > querySet.count(${querySet.count})`);
        assert$1(destinationOffset % 256 === 0, () => `destinationOffset(${destinationOffset}) is not multiple of 256`);
        assert$1(destinationOffset + queryCount * 8 <= destination.size, () => `destinationOffset(${destinationOffset}) + queryCount(${queryCount}) * 8 > destination.size(${destination.size})`);
    });

    console.log('webgpu-debug-helper running');

}));
//# sourceMappingURL=webgpu-debug-helper.js.map
