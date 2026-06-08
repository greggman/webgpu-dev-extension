// DO NOT EDIT !!! AUTO-GENERATED-FILE !!!
(function () {
    'use strict';

    /* eslint-disable no-inner-declarations */
    if (typeof GPUDevice !== 'undefined') {
        console.log('webgpu-dev-extension: check-for-multiple-updates enabled');
        const s_bufferUpdateMap = new WeakMap();
        const s_textureUpdateMap = new WeakMap();
        const s_resourcesUsed = new WeakMap();
        const s_encoderResourcesUsed = new WeakMap();
        const s_passEncoderToCommandEncoder = new WeakMap();
        const s_textureViewToTexture = new WeakMap();
        const s_bindGroupResources = new WeakMap();
        function addWrapper(API, methodName, wrapper) {
            const origFn = API.prototype[methodName];
            API.prototype[methodName] = function (...args) {
                wrapper(this, ...args);
                return origFn.call(this, ...args);
            };
        }
        function getTypedArrayInfo(source) {
            if (ArrayBuffer.isView(source)) {
                if (source instanceof DataView) {
                    return { bytesPerElement: 1, length: source.byteLength };
                }
                else {
                    const typedArray = source;
                    return {
                        bytesPerElement: typedArray.BYTES_PER_ELEMENT ?? 1,
                        length: typedArray.length,
                    };
                }
            }
            else {
                return { bytesPerElement: 1, length: source.byteLength };
            }
        }
        function trackWriteBuffer(queue, buffer, bufferOffset, source, dataOffset, dataSize) {
            const { bytesPerElement, length: dataLength } = getTypedArrayInfo(source);
            const size = typeof dataSize === 'undefined' ? (dataLength - (dataOffset ?? 0)) * bytesPerElement : dataSize;
            const updates = s_bufferUpdateMap.get(buffer) ?? [];
            s_bufferUpdateMap.set(buffer, updates);
            for (const update of updates) {
                if (bufferOffset < update.offset + update.size && update.offset < bufferOffset + size) {
                    console.error(`webgpu-dev-extension: multiple updates to the same buffer(${buffer.label || 'unlabeled'}) sub region`);
                    break;
                }
            }
            updates.push({ offset: bufferOffset, size });
        }
        function normalizeOrigin(origin) {
            if (!origin) {
                return { x: 0, y: 0, z: 0 };
            }
            if (Array.isArray(origin)) {
                return {
                    x: origin[0] ?? 0,
                    y: origin[1] ?? 0,
                    z: origin[2] ?? 0,
                };
            }
            const dict = origin;
            return {
                x: dict.x ?? 0,
                y: dict.y ?? 0,
                z: dict.z ?? 0,
            };
        }
        function normalizeExtent(extent) {
            if (Array.isArray(extent)) {
                return {
                    width: extent[0] ?? 1,
                    height: extent[1] ?? 1,
                    depthOrArrayLayers: extent[2] ?? 1,
                };
            }
            const dict = extent;
            return {
                width: dict.width,
                height: dict.height ?? 1,
                depthOrArrayLayers: dict.depthOrArrayLayers ?? 1,
            };
        }
        function boxesOverlap(o1, s1, o2, s2) {
            const normO1 = normalizeOrigin(o1);
            const normS1 = normalizeExtent(s1);
            const normO2 = normalizeOrigin(o2);
            const normS2 = normalizeExtent(s2);
            const xOverlap = normO1.x < normO2.x + normS2.width && normO2.x < normO1.x + normS1.width;
            const yOverlap = normO1.y < normO2.y + normS2.height && normO2.y < normO1.y + normS1.height;
            const zOverlap = normO1.z < normO2.z + normS2.depthOrArrayLayers && normO2.z < normO1.z + normS1.depthOrArrayLayers;
            return xOverlap && yOverlap && zOverlap;
        }
        function trackWriteTexture(queue, destination, data, dataLayout, size) {
            const texture = destination.texture;
            const mipLevel = destination.mipLevel ?? 0;
            const origin = destination.origin;
            const updates = s_textureUpdateMap.get(texture) ?? [];
            s_textureUpdateMap.set(texture, updates);
            for (const update of updates) {
                if (update.mipLevel === mipLevel && boxesOverlap(update.origin, update.size, origin, size)) {
                    console.error(`webgpu-dev-extension: multiple updates to the same texture(${texture.label || 'unlabeled'}) sub region`);
                    break;
                }
            }
            updates.push({ origin, size, mipLevel });
        }
        function trackMapAsync(buffer, mode, offset, sizeArg) {
            if (mode & GPUMapMode.WRITE) {
                const bufferOffset = offset ?? 0;
                const size = sizeArg ?? (buffer.size - bufferOffset);
                const updates = s_bufferUpdateMap.get(buffer) ?? [];
                s_bufferUpdateMap.set(buffer, updates);
                for (const update of updates) {
                    if (bufferOffset < update.offset + update.size && update.offset < bufferOffset + size) {
                        console.error(`webgpu-dev-extension: multiple updates to the same buffer(${buffer.label || 'unlabled'}) sub region`);
                        break;
                    }
                }
                updates.push({ offset: bufferOffset, size });
            }
        }
        function trackCopyExternalImageToTexture(queue, source, destination, copySize) {
            const texture = destination.texture;
            const mipLevel = destination.mipLevel ?? 0;
            const origin = destination.origin;
            const updates = s_textureUpdateMap.get(texture) ?? [];
            s_textureUpdateMap.set(texture, updates);
            for (const update of updates) {
                if (update.mipLevel === mipLevel && boxesOverlap(update.origin, update.size, origin, copySize)) {
                    console.error(`webgpu-dev-extension: multiple updates to the same texture(${texture.label || 'unlabeled'}) sub region`);
                    break;
                }
            }
            updates.push({ origin, size: copySize, mipLevel });
        }
        function markEncoderResourceUsed(encoder, resource, type) {
            const resources = s_encoderResourcesUsed.get(encoder) ?? {
                buffers: new Set(),
                textures: new Set(),
            };
            s_encoderResourcesUsed.set(encoder, resources);
            if (type === 'buffer') {
                resources.buffers.add(resource);
            }
            else {
                resources.textures.add(resource);
            }
        }
        function trackCopyBufferToBuffer(encoder, source, sourceOffset, destination, destinationOffset, size) {
            const updates = s_bufferUpdateMap.get(destination) ?? [];
            s_bufferUpdateMap.set(destination, updates);
            updates.push({ offset: destinationOffset, size });
            markEncoderResourceUsed(encoder, source, 'buffer');
            markEncoderResourceUsed(encoder, destination, 'buffer');
        }
        function trackCopyTextureToTexture(encoder, source, destination, copySize) {
            const texture = destination.texture;
            const mipLevel = destination.mipLevel ?? 0;
            const origin = destination.origin;
            const updates = s_textureUpdateMap.get(texture) ?? [];
            s_textureUpdateMap.set(texture, updates);
            updates.push({ origin, size: copySize, mipLevel });
            markEncoderResourceUsed(encoder, source.texture, 'texture');
            markEncoderResourceUsed(encoder, destination.texture, 'texture');
        }
        function trackCopyBufferToTexture(encoder, source, destination, copySize) {
            const texture = destination.texture;
            const mipLevel = destination.mipLevel ?? 0;
            const origin = destination.origin;
            const updates = s_textureUpdateMap.get(texture) ?? [];
            s_textureUpdateMap.set(texture, updates);
            updates.push({ origin, size: copySize, mipLevel });
            markEncoderResourceUsed(encoder, source.buffer, 'buffer');
            markEncoderResourceUsed(encoder, destination.texture, 'texture');
        }
        function trackCopyTextureToBuffer(encoder, source, destination, copySize) {
            const offset = destination.offset ?? 0;
            const bytesPerRow = destination.bytesPerRow ?? 0;
            const rowsPerImage = destination.rowsPerImage ?? 0;
            const normExtent = normalizeExtent(copySize);
            const depth = normExtent.depthOrArrayLayers;
            const height = normExtent.height;
            const size = bytesPerRow ? (bytesPerRow * (rowsPerImage || height) * (depth - 1) + bytesPerRow * height) : (destination.buffer.size - offset);
            const updates = s_bufferUpdateMap.get(destination.buffer) ?? [];
            s_bufferUpdateMap.set(destination.buffer, updates);
            updates.push({ offset, size });
            markEncoderResourceUsed(encoder, source.texture, 'texture');
            markEncoderResourceUsed(encoder, destination.buffer, 'buffer');
        }
        function trackSetBindGroup(passEncoder, index, bindGroup) {
            const encoder = s_passEncoderToCommandEncoder.get(passEncoder);
            if (!encoder) {
                return;
            }
            const resources = s_bindGroupResources.get(bindGroup);
            if (resources) {
                for (const buffer of resources.buffers) {
                    markEncoderResourceUsed(encoder, buffer, 'buffer');
                }
                for (const texture of resources.textures) {
                    markEncoderResourceUsed(encoder, texture, 'texture');
                }
            }
        }
        function handleSubmit(queue, commandBuffers) {
            for (const commandBuffer of commandBuffers) {
                const resources = s_resourcesUsed.get(commandBuffer);
                if (resources) {
                    for (const buffer of resources.buffers) {
                        s_bufferUpdateMap.delete(buffer);
                    }
                    for (const texture of resources.textures) {
                        s_textureUpdateMap.delete(texture);
                    }
                }
            }
        }
        addWrapper(GPUQueue, 'writeBuffer', trackWriteBuffer);
        addWrapper(GPUQueue, 'writeTexture', trackWriteTexture);
        addWrapper(GPUBuffer, 'mapAsync', trackMapAsync);
        addWrapper(GPUQueue, 'copyExternalImageToTexture', trackCopyExternalImageToTexture);
        addWrapper(GPUCommandEncoder, 'copyBufferToBuffer', trackCopyBufferToBuffer);
        addWrapper(GPUCommandEncoder, 'copyTextureToTexture', trackCopyTextureToTexture);
        addWrapper(GPUCommandEncoder, 'copyBufferToTexture', trackCopyBufferToTexture);
        addWrapper(GPUCommandEncoder, 'copyTextureToBuffer', trackCopyTextureToBuffer);
        addWrapper(GPURenderPassEncoder, 'setBindGroup', trackSetBindGroup);
        addWrapper(GPUComputePassEncoder, 'setBindGroup', trackSetBindGroup);
        addWrapper(GPUQueue, 'submit', handleSubmit);
        GPUTexture.prototype.createView = (function (origFn) {
            return function (descriptor) {
                const view = origFn.call(this, descriptor);
                s_textureViewToTexture.set(view, this);
                return view;
            };
        })(GPUTexture.prototype.createView);
        GPUDevice.prototype.createBindGroup = (function (origFn) {
            return function (descriptor) {
                const bindGroup = origFn.call(this, descriptor);
                const buffers = new Set();
                const textures = new Set();
                for (const entry of descriptor.entries) {
                    const res = entry.resource;
                    if (res instanceof GPUTextureView) {
                        const texture = s_textureViewToTexture.get(res);
                        if (texture) {
                            textures.add(texture);
                        }
                    }
                    else if (res instanceof GPUBuffer) {
                        buffers.add(res);
                    }
                    else if (res && typeof res === 'object' && 'buffer' in res) {
                        const bufferBinding = res;
                        if (bufferBinding.buffer instanceof GPUBuffer) {
                            buffers.add(bufferBinding.buffer);
                        }
                    }
                }
                s_bindGroupResources.set(bindGroup, { buffers, textures });
                return bindGroup;
            };
        })(GPUDevice.prototype.createBindGroup);
        GPUCommandEncoder.prototype.beginRenderPass = (function (origFn) {
            return function (descriptor) {
                const passEncoder = origFn.call(this, descriptor);
                s_passEncoderToCommandEncoder.set(passEncoder, this);
                if (descriptor.colorAttachments) {
                    for (const attachment of descriptor.colorAttachments) {
                        if (attachment?.view) {
                            const texture = s_textureViewToTexture.get(attachment.view);
                            if (texture) {
                                markEncoderResourceUsed(this, texture, 'texture');
                            }
                        }
                        if (attachment?.resolveTarget) {
                            const texture = s_textureViewToTexture.get(attachment.resolveTarget);
                            if (texture) {
                                markEncoderResourceUsed(this, texture, 'texture');
                            }
                        }
                    }
                }
                if (descriptor.depthStencilAttachment) {
                    const attachment = descriptor.depthStencilAttachment;
                    if (attachment.view) {
                        const texture = s_textureViewToTexture.get(attachment.view);
                        if (texture) {
                            markEncoderResourceUsed(this, texture, 'texture');
                        }
                    }
                }
                return passEncoder;
            };
        })(GPUCommandEncoder.prototype.beginRenderPass);
        GPUCommandEncoder.prototype.beginComputePass = (function (origFn) {
            return function (descriptor) {
                const passEncoder = origFn.call(this, descriptor);
                s_passEncoderToCommandEncoder.set(passEncoder, this);
                return passEncoder;
            };
        })(GPUCommandEncoder.prototype.beginComputePass);
        GPUCommandEncoder.prototype.finish = (function (origFn) {
            return function (descriptor) {
                const commandBuffer = origFn.call(this, descriptor);
                const resources = s_encoderResourcesUsed.get(this);
                if (resources) {
                    s_resourcesUsed.set(commandBuffer, resources);
                }
                return commandBuffer;
            };
        })(GPUCommandEncoder.prototype.finish);
    }
    document.currentScript?.remove();

})();
//# sourceMappingURL=check-for-multiple-updates.js.map
