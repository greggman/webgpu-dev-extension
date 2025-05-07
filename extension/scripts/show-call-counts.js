// DO NOT EDIT !!! AUTO-GENERATED-FILE !!!
(function () {
    'use strict';

    function addElementToWebgpuDevExtension(elem) {
        const webgpuDevExtensionElemId = 'webgpu-dev-extension';
        let webgpuDevExtensionElem = document.getElementById(webgpuDevExtensionElemId);
        if (!webgpuDevExtensionElem) {
            webgpuDevExtensionElem = document.createElement('div');
            webgpuDevExtensionElem.id = webgpuDevExtensionElemId;
            Object.assign(webgpuDevExtensionElem.style, {
                margin: '0',
                padding: '0.25em',
                fontSize: '8px',
                fontFamily: 'monospace',
                color: '#fff',
                backgroundColor: 'rgba(0,0,0,0.8)',
                position: 'fixed',
                left: '0',
                bottom: '0',
                zIndex: 1000000,
            });
            document.documentElement.append(webgpuDevExtensionElem);
        }
        webgpuDevExtensionElem.append(elem);
    }

    /* eslint-disable no-inner-declarations */
    if (typeof GPUDevice !== 'undefined') {
        const s_counts = new Map();
        function addCount(name) {
            s_counts.set(name, (s_counts.get(name) ?? 0) + 1);
        }
        // @ts-expect-error this code is difficult to type
        function addCountWrapper(API, apiName, methodName, origFn) {
            const name = `${apiName}.${methodName}`;
            // @ts-expect-error this code is difficult to type
            API.prototype[methodName] = function (...args) {
                addCount(name);
                return origFn.call(this, ...args);
            };
        }
        const APIs = [
            GPU,
            GPUAdapter,
            GPUBuffer,
            GPUCanvasContext,
            GPUCommandEncoder,
            GPUComputePassEncoder,
            GPUDevice,
            GPUQueue,
            GPUQuerySet,
            GPURenderBundleEncoder,
            GPURenderPassEncoder,
            GPUTexture,
        ];
        for (const API of APIs) {
            const apiName = API.prototype.constructor.name;
            const prototype = API.prototype;
            const methodNames = Object.entries(Object.getOwnPropertyDescriptors(prototype))
                .filter(([, v]) => v.writable && v.enumerable && v.configurable && typeof v.value === 'function')
                .map(([k]) => k);
            for (const name of methodNames) {
                // @ts-expect-error this code is difficult to type
                addCountWrapper(API, apiName, name, API.prototype[name]);
            }
        }
        const baseElem = document.createElement('details');
        const summaryElem = document.createElement('summary');
        const infoElem = document.createElement('pre');
        const summaryContentElem = document.createElement('span');
        Object.assign(summaryContentElem.style, {
            cursor: 'pointer',
        });
        const resetElem = document.createElement('span');
        Object.assign(resetElem.style, {
            marginLeft: '0.5em',
            cursor: 'pointer',
            title: 'remove zero count',
        });
        resetElem.textContent = '🔄';
        resetElem.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            s_counts.clear();
            return false;
        }, { passive: false });
        baseElem.append(summaryElem);
        baseElem.append(infoElem);
        summaryElem.append(summaryContentElem);
        summaryElem.append(resetElem);
        addElementToWebgpuDevExtension(baseElem);
        function updateAndResetCount() {
            let total = 0;
            const calls = [];
            s_counts.forEach((v, k) => {
                total += v;
                calls.push(`${k}: ${v}`);
                s_counts.set(k, 0);
            });
            calls.sort();
            infoElem.textContent = calls.join('\n');
            summaryContentElem.textContent = `cpf: ${total}`;
            requestAnimationFrame(updateAndResetCount);
        }
        requestAnimationFrame(updateAndResetCount);
    }
    document.currentScript?.remove();

})();
//# sourceMappingURL=show-call-counts.js.map
